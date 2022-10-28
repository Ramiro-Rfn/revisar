import produce from "immer";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { data } from "../pages/data";


type StudyItem = {
    id: string,
    front: string,
    back: string,
}

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    studyItems: StudyItem[],
    studyPlans: StudyPlan[]
    
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
    createStudyPlan: (studyPlanName: string) => void,
}

interface StudyPlan {
    id: string,
    name: string,
    studyItems: StudyItem[]
}

interface studyContextProviderProps {
    children: ReactNode,
}

type BoxItems = {
    id: string;
}


export const studyContext = createContext({} as studyContextProps)



export function StudyContextProvider({ children }: studyContextProviderProps) {
    const { push } = useRouter()
    
    const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([])
    const [studyItems, setStudyItems] = useState(data);
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);

    useEffect(() => {
        const coockies = parseCookies()
    
        let parsedStudyPlan =  coockies['studar.studyPlan'] ? JSON.parse(coockies['studar.studyPlan']) : []

        setStudyPlans(parsedStudyPlan);
    },[])

    async function createStudyPlan(studyPlanName: string) {
        try {
            const studyPlan = {
                id: String(Date.now()),
                name: studyPlanName,
                studyItems: []
            }

            setStudyPlans(produce((draft) => {
                draft.push(studyPlan)
            }))
    
            setCookie(undefined, `studar.studyPlan`, JSON.stringify(studyPlans), {
                maxAge: 60 * 60 * 24 * 30 // 30 dias
            })
        } catch (error) {
            alert(error?.message);
        }
    }

    function moveToBox(item: any, boxType: any, dropped: boolean) {
        switch (boxType) {
            case 'good':
                setGoodItems(produce((draft) => {
                    draft.push(item)
                }))        
                break;
            case 'normal':
                setNormalItems(produce((draft) => {
                    draft.push(item)
                }))
                break;
            case 'wrong':
                setWrongItems(produce((draft) => {
                    draft.push(item)
                }))
                break;
            default:
                break;
        }
        
        
        setStudyItems(produce((draft) => {
            draft.pop();
        }))

    }

    return (
        <studyContext.Provider 
            value={{ 
                goodItems, 
                normalItems, 
                wrongItems,
                studyItems,
                studyPlans,
                moveToBox,
                createStudyPlan
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
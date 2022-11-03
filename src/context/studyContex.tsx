import produce from "immer";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

type StudyItem = {
    id: string,
    front: string,
    back: string,
    studyPlan_id: string,
}

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    studyItems: StudyItem[],
    studyPlans: StudyPlan[]
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
    createStudyPlan: (studyPlanName: string) => void,
    createStudyItems: (front: string, back: string, studyPlan_id: string) => void,
}

interface StudyPlan {
    id: string,
    name: string,
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
    const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);

    useEffect(() => {
        const coockies = parseCookies()
    
        let parsedStudyPlan =  coockies['studar.studyPlan'] ? JSON.parse(coockies['studar.studyPlan']) : []
        console.log(parsedStudyPlan)
        setStudyPlans(parsedStudyPlan);
    },[])

    useEffect(() => {
        const coockies = parseCookies()
    
        let parsedStudyItems =  coockies['studar.studyItems'] ? JSON.parse(coockies['studar.studyItems']) : []

        console.log(parsedStudyItems)
        setStudyItems(parsedStudyItems);
    },[])

    async function createStudyItems(front: string, back: string, studyPlan_id: string) {
        try {
            if(!front && !back && !studyPlan_id){
                return;
            }
            
            setStudyItems(produce((draft) => {
                draft.push({
                    id: String(Date.now()),
                    front,
                    back,
                    studyPlan_id
                })
            }))
    
            setCookie(undefined, `studar.studyItems`, JSON.stringify(studyPlans), {
                maxAge: 60 * 60 * 24 * 30 // 30 dias
            })
        } catch (error) {
            alert(error?.message);
        }
    }

    async function createStudyPlan(studyPlanName: string) {
        try {
            const studyPlan = {
                id: String(Date.now()),
                name: studyPlanName,
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
                createStudyPlan,
                createStudyItems
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
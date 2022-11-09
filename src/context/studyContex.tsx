import produce from "immer";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type StudyQuation = {
    id: string,
    question: string,
    answer: string,
}

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    setNewStudyQuestions: Dispatch<SetStateAction<StudyQuation[]>>,
    newStudyQuestions: StudyQuation[],
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
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
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);
    const [isDropped, setIsDropped] = useState(false);
    const [newStudyQuestions, setNewStudyQuestions] =  useState<StudyQuation[]>([]);

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

        setNewStudyQuestions(produce((draft)=>{
            draft.pop()
        }))

    }

    return (
        <studyContext.Provider 
            value={{ 
                goodItems, 
                normalItems, 
                wrongItems,
                moveToBox,
                newStudyQuestions,
                setNewStudyQuestions
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
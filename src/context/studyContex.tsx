import produce from "immer";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type StudyQuestion = {
    id: string,
    question: string,
    answer: string,
}

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    newStudyQuestions: StudyQuestion[],
    setNewStudyQuestions: Dispatch<SetStateAction<StudyQuestion[]>>,
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
    studyQuestionsInBox: (boxType: string) => void,
    resetStudy: (studyQuestions: StudyQuestion[]) => void,
}

interface StudyPlan {
    id: string,
    name: string,
}

interface studyContextProviderProps {
    children: ReactNode,
}

type BoxItems = {
    id: string,
    question: string,
    answer: string,
}


export const studyContext = createContext({} as studyContextProps)

export function StudyContextProvider({ children }: studyContextProviderProps) {
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);
    const [isDropped, setIsDropped] = useState(false);
    const [newStudyQuestions, setNewStudyQuestions] =  useState<StudyQuestion[]>([]);

    function moveToBox(item: any, boxType: any, dropped: boolean) {
        switch (boxType) {
            case 'good':
                setGoodItems(produce((draft) => {
                    draft.push(item.data)
                }))        
                break;
            case 'normal':
                setNormalItems(produce((draft) => {
                    draft.push(item.data)
                }))
                break;
            case 'wrong':
                setWrongItems(produce((draft) => {
                    draft.push(item.data)
                }))
                break;
            default:
                break;
        }

        setNewStudyQuestions(produce((draft)=>{
            draft.pop()
        }))

    }

    function resetStudy(studyQuestions: StudyQuestion[]) {
        setNewStudyQuestions(studyQuestions);
        setGoodItems([]);
        setNormalItems([]);
        setWrongItems([]);
    }

    function studyQuestionsInBox(boxType: string) {
        if(newStudyQuestions.length) return;
        
        switch (boxType) {
            case 'good':
                if(!goodItems.length) return;
                setNewStudyQuestions(goodItems)       
                break;
            case 'normal':
                if(!normalItems.length) return;

                setNewStudyQuestions(normalItems)       
                break;
            case 'wrong':
                if(!wrongItems.length) return;

                setNewStudyQuestions(wrongItems)       
                break;
            default:
                break;
        }
    }

    return (
        <studyContext.Provider 
            value={{ 
                goodItems, 
                normalItems, 
                wrongItems,
                moveToBox,
                newStudyQuestions,
                setNewStudyQuestions,
                studyQuestionsInBox,
                resetStudy
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
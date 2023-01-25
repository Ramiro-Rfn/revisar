import produce from "immer";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type StudyQuestion = {
    id: string,
    question: string,
    answer: string,
}

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    visibleQuestions: StudyQuestion[],
    studyPercentage: number,
    setNewStudyQuestions: Dispatch<SetStateAction<StudyQuestion[]>>,
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
    studyQuestionsInBox: (boxType: string) => void,
    resetStudy: (studyQuestions: StudyQuestion[]) => void,
    nextStudyQuestions: () => void;
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

type PaginationMeta = {
    PER_PAGE: number;
    PAGE_COUNT: number;
    TOTAL_PAGE: number;
}


export const studyContext = createContext({} as studyContextProps)

export function StudyContextProvider({ children }: studyContextProviderProps) {
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);
    const [newStudyQuestions, setNewStudyQuestions] =  useState<StudyQuestion[]>([]);
    const [visibleQuestions, setVisibleQuestions] = useState<StudyQuestion[]>([]);
    const [page, setPage] = useState(1);
    const [studyPercentage, setStudyPercentage] = useState(0);
    
    const paginationMeta: PaginationMeta = {
        PER_PAGE: 10,
        TOTAL_PAGE: newStudyQuestions.length,
        PAGE_COUNT: Math.ceil(newStudyQuestions.length/10),
    }

    useEffect(()=>{
        const PER_PAGE = 10;

        let pageStart = (Number(page) - 1) * Number(PER_PAGE);

        let pageEnd = pageStart + Number(PER_PAGE);
        
        function calculateQuestionVisible() {
            console.log(pageStart, pageEnd, page, PER_PAGE);
            
            const items = newStudyQuestions.slice(pageStart, pageEnd);

            return items;
        }

        setVisibleQuestions(calculateQuestionVisible());

        console.log(calculateQuestionVisible(), pageStart, pageEnd, studyPercentage)

    }, [page, newStudyQuestions])

    function nextStudyQuestions() {
        if(page > paginationMeta.PAGE_COUNT - 1) return;

        setPage(page + 1);

        setStudyPercentage(Math.floor((Number(page) * 100)/(paginationMeta.PAGE_COUNT - 1)));

        console.log(page);
    }

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

        setVisibleQuestions(produce((draft)=>{
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
        if((page < paginationMeta.PAGE_COUNT- 1)) return;
        
        switch (boxType) {
            case 'good':
                if(!goodItems.length) return;

                setNewStudyQuestions(goodItems);
                setGoodItems([]);
                setPage(1)       
                break;
            case 'normal':
                if(!normalItems.length) return;

                setNewStudyQuestions(normalItems);
                setNormalItems([]);
                setPage(1)        
                break;
            case 'wrong':
                if(!wrongItems.length) return;

                setNewStudyQuestions(wrongItems);
                setWrongItems([])
                setPage(1)        
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
                visibleQuestions,
                setNewStudyQuestions,
                studyQuestionsInBox,
                resetStudy,
                nextStudyQuestions,
                studyPercentage
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
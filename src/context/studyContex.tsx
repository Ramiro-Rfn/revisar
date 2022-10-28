import produce from "immer";
import { createContext, ReactNode, useState } from "react";
import { data } from "../pages/data";

interface studyContextProps {
    goodItems: BoxItems[],
    normalItems: BoxItems[],
    wrongItems: BoxItems[],
    studyItems: {
        id: string,
        front: string,
        back: string,
    }[],
    
    moveToBox: (item: any, destination: any, dropped: boolean) => void,
}

interface studyContextProviderProps {
    children: ReactNode,
}

type BoxItems = {
    id: string;
}


export const studyContext = createContext({} as studyContextProps)



export function StudyContextProvider({ children }: studyContextProviderProps) {
    const [studyItems, setStudyItems] = useState(data);
    
    const [goodItems, setGoodItems] = useState<BoxItems[]>([]);
    const [normalItems, setNormalItems] = useState<BoxItems[]>([]);
    const [wrongItems, setWrongItems] = useState<BoxItems[]>([]);

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
                moveToBox
            }}
        >
            {children}
        </studyContext.Provider>
    )

}
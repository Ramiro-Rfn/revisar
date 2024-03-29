import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useDrag } from 'react-dnd';

import styles from './styles.module.scss';

interface StudyCardProps {
    data: {
        id: string,
        question: string,
        answer: string,
    }

    index: number,
}

export function StudyCard( { data, index }: StudyCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const [{ isDragging } , drag, id] = useDrag(() => ({
        type: 'CARD',
        item: { data },

        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging()
            } 
        }
    }))


    function handleClick({}) {
        setIsFlipped(!isFlipped);
    }
    return (
        <div 
            ref={drag}  
            className={styles.reactCardFlip} 
            style={{
                width: isDragging ? '6.5rem': '',
                height: isDragging ? '6.5rem': '', 
                top: index * 5, 
                zIndex: index + 1,
                display: isDragging ? 'none': 'flex',
            }}
        >
            <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                <div className={styles.item}>
                    <h4>{index +1} - {data.question}</h4>

                    <button onClick={handleClick}>Ver Respota</button>
                </div>

                <div className={styles.item}>
                    <h4>{data.answer}</h4>

                    <button onClick={handleClick} >Ver Pergunta</button>
                </div>
            </ReactCardFlip>
        </div>
    )
}
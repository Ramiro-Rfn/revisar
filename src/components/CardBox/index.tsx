import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { studyContext } from '../../context/studyContex';

import styles from './styles.module.scss';

interface CardBoxProps {
    label: string,
    color: string,
    totalItem: number,
    image: {
        boxEmpty: string,
        boxFilled: string,
    },
    boxType: string,
}

export function CardBox({ label, color, totalItem, image, boxType }: CardBoxProps) {
    const {
        moveToBox,
        studyQuestionsInBox
    } = useContext(studyContext);

    const [{ isOver, dropped }, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item, monitor) => {
            moveToBox(item, boxType, dropped)
        },
        
        collect: ( monitor) => ({
            isOver: !!monitor.isOver(),
            dropped: monitor.didDrop(),
          })
    }))

    function handleClickBox() {
        studyQuestionsInBox(boxType);
    }

    return (
        <div 
            ref={drop} 
            className={styles.cardBox}
            onClick={handleClickBox}
        >
            <div 
                style={{ 
                    boxShadow: isOver ? `1px 1px 30px ${color }`: '', 
                }}
            >
                {
                    totalItem ? (
                        <img src={image.boxFilled} alt="" />
                    ):
                    (
                        <img src={image.boxEmpty} alt="" />
                    )
                }
            </div>

            <p style={{color}}>{label} - {totalItem}</p>
        </div>
    )
}
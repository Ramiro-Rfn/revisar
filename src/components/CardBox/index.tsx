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
        moveToBox
    } = useContext(studyContext);

    const [{ isOver, canDrop, item, destination, dropped }, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item, monitor) => {
            moveToBox(item, boxType, monitor.didDrop())
        },
        
        collect: ( monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            item: monitor.getItem(),
            destination: monitor.getHandlerId(),
            dropped: monitor.didDrop(),
          })
      }))

    return (
        <div 
            ref={drop} 
            style={{
            }} 
            className={styles.cardBox}
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
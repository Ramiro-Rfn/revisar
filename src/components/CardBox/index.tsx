import { useDrop } from 'react-dnd';

import styles from './styles.module.scss';

interface CardBoxProps {
    label: string,
    color: string,
}

export function CardBox({ label, color }: CardBoxProps) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'CARD',
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
      }))

      console.log(isOver, canDrop)
    return (
        <div 
            ref={drop} 
            style={{
                width: isOver ? '8rem': '', 
                height: isOver ? '8rem': ''
            }} 
            className={styles.cardBox}
        >
            <div style={{backgroundColor: color}}>

            </div>

            <p style={{color}}>{label}</p>
        </div>
    )
}
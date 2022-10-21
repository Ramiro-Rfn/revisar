import { FaPen } from 'react-icons/fa';

import styles from '../styles/Deck.module.scss';

export default function Deck(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Curso de inglês</h2>

                <form action="">
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Texto frontal</label>
                        <input type="text" />
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Texto Traseiro</label>
                        <input type="text" />
                    </div>

                    <button type='submit'>Adicionar</button>
                </form>

                <div className={styles.itemsContainer}>
                    {[1,2,1,1,1].map(()=>{
                        return(
                            <div className={styles.item}>
                                <h4>How you doing now?</h4>

                                <button>
                                    <FaPen/>
                                </button>
                            </div>
                        )
                    })}
                </div>  
            </div>
        </div>
    )
}
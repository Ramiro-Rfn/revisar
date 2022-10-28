import Head from 'next/head';
import { useContext } from 'react';
import { CardBox } from '../components/CardBox';
import { StudyCard } from '../components/StudyCard';
import { studyContext } from '../context/studyContex';

import styles from '../styles/Study.module.scss';

export default function Study() {
    const { goodItems, normalItems, wrongItems, studyItems } = useContext(studyContext)
    

    return(
        <>
            <Head>
                <title>Estudar</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.content}>

                    <div>
                        
                    </div>
                    <div className={styles.itemsContainer} >

                        <div className={styles.cardEmpty}>
                            Lista Vazia
                        </div>
                        
                        {
                            studyItems.map((data, index)=>{
                                return (
                                    <StudyCard key={data.id} data={data} index={index}/>
                                )
                            })
                        }
                    </div>

                    <div  className={styles.boxsContainer}>
                        <CardBox 
                            image={{ 
                                boxEmpty: '/images/greenBox.svg', 
                                boxFilled: '/images/greenBox-filled.svg' 
                            }} 
                            totalItem={goodItems.length} 
                            label='Acertei' 
                            color='green'
                            boxType='good'
                        />
                        
                        <CardBox 
                            image={{ 
                                boxEmpty: '/images/orangeBox.svg', 
                                boxFilled: '/images/orangeBox-filled.svg' 
                            }} 
                            totalItem={normalItems.length} 
                            label='Normal' 
                            color='orange'
                            boxType='normal'
                        />

                        <CardBox 
                            image={{ 
                                boxEmpty: '/images/redBox.svg', 
                                boxFilled: '/images/redBox-filled.svg' 
                            }}
                            totalItem={wrongItems.length} 
                            label='Errei' 
                            color='red'
                            boxType='wrong'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
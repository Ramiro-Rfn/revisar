import Head from 'next/head';
import { CardBox } from '../components/CardBox';
import { StudyCard } from '../components/StudyCard';

import styles from '../styles/Study.module.scss';
import { data } from './data';

export default function Study() {
    

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
                        {data.map((data, index)=>{
                            return (
                                <StudyCard data={data} index={index}/>
                            )
                        })}
                    </div>

                    <div  className={styles.boxsContainer}>
                        <CardBox label='Bom' color='green'/>
                        <CardBox label='Normal' color='orange'/>
                        <CardBox label='Ruim' color='red'/>
                    </div>
                </div>
            </div>
        </>
    )
}
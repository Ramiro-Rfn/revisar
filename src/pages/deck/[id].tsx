import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { studyContext } from '../../context/studyContex';

import styles from '../../styles/Deck.module.scss';

type StudyItem = {
    id: string,
    front: string,
    back: string,
}

interface StudyPlan {
    id: string,
    name: string,
}

interface DeckProps {
    studyPlanId: string;
}


export default function Deck({ studyPlanId }: DeckProps) {
    const [frontField, setFrontField] = useState('');
    const [backField, setBackField] = useState('');
    
    const {
        studyPlans,
        createStudyItems,
        studyItems
    } = useContext(studyContext);

    const [studyPlan, setStudyPlan] = useState<StudyPlan>();

    function handleAddItem(event: FormEvent) {
        event.preventDefault()

        createStudyItems(frontField, backField, String(studyPlan?.id))

        setBackField('')
        setFrontField('')
    }

    useEffect(() => {
        const newStudyPlan = studyPlans.find((studyPlan)=> studyPlan.id === studyPlanId); 
        setStudyPlan(newStudyPlan)
    }, [])

    return (
        <>
            <Head>
                <title>{`Deck | ${studyPlan?.name}`}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>{studyPlan?.name}</h2>

                    <form action="">
                        <div className={styles.inputWrapper}>
                            <input 
                                type="text" 
                                placeholder='Parte frontal'
                                value={frontField}
                                onChange={(event)=> setFrontField(event.target.value)} 
                            />
                        </div>

                        <div className={styles.inputWrapper}>
                            <input 
                                type="text" 
                                placeholder='Parte traseira'
                                value={backField}
                                onChange={(event)=> setBackField(event.target.value)}
                            />
                        </div>

                        <button onClick={handleAddItem} type='submit'>Adicionar</button>
                    </form>

                    <div className={styles.itemsContainer}>
                        {studyItems.filter((studyItem) => studyItem.studyPlan_id === studyPlanId).map((item)=>{
                            return(
                                <div key={item.id} className={styles.item}>
                                    <h4>{item.front}</h4>

                                    <button>
                                        <FaPen/>
                                    </button>
                                </div>
                            )
                        })}
                    </div>  
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const studyPlanId = params?.id;
    
    return {
        props: {
            studyPlanId
        }
    }
}
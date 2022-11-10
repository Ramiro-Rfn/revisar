import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import { Header } from '../../components/Header';
import { prisma } from '../../lib/prisma';
import { api } from '../../services/api';

import styles from '../../styles/Deck.module.scss';

type StudyQuestion = {
    id: string,
    question: string,
    answer: string,
}

interface StudyPlan {
    id: string,
    name: string,
}

interface DeckProps {
    studyPlan: StudyPlan;
    studyQuestions: StudyQuestion[] 
}


export default function Deck({ studyPlan, studyQuestions }: DeckProps) {
    const [frontField, setFrontField] = useState('');
    const [backField, setBackField] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    console.log(studyQuestions)
    
    async function handleAddItem(event: FormEvent) {
        event.preventDefault();

        try {
            if(!frontField && !backField) return;
             
            setIsLoading(true)

            const { data } = await api.post('/studyQuestion/create' , { 
                question: frontField,
                answer: backField,
                studyPlanId: studyPlan.id
            })

            if(data.id) {
                setIsLoading(false)
            }
            
        } catch (error) {
            
        }

        setBackField('')
        setFrontField('')
    }

    return (
        <>
            <Head>
                <title>{`Deck | ${studyPlan?.name}`}</title>
            </Head>
            <div className={styles.container}>
                <Header title={studyPlan?.name} hasEstudyButton studyPlan_id={studyPlan.id} />
                <div className={styles.content}>
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

                        <button onClick={handleAddItem} type='submit'>
                        {
                          isLoading? (
                            <Oval
                              height={24}
                              width={24}
                              color="#121214"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              ariaLabel='oval-loading'
                              secondaryColor="#1f2729"
                              strokeWidth={4}
                              strokeWidthSecondary={4}

                            />
                          ):
                          'Adicionar'
                        }
                        </button>
                    </form>

                    <div className={styles.itemsContainer}>
                        {studyQuestions.map((item)=>{
                            return(
                                <div key={item.id} className={styles.item}>
                                    <h4>{item.question}</h4>

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

    const studyPlan = await prisma.studyPlan.findUnique({where: { id: String(studyPlanId) }});
    const studyQuestions = await prisma.studyQuestion.findMany({where: { studyPlanId: String(studyPlanId) }})
    
    const data = studyQuestions.map((data)=> {
        return {
            id: data.id,
            question: data.question,
            answer: data.answer,
            createdAt: data.createdAt.toLocaleDateString(),
            updatedAt: data.updatedAt.toLocaleDateString()
        }
    })
    
    return {
        props: {
            studyPlan: {
                id: studyPlan?.id,
                name: studyPlan?.name,
                createdAt: studyPlan?.createdAt.toLocaleDateString(),
                updatedAt: studyPlan?.updatedAt.toLocaleDateString()
            },
            studyQuestions: data
        }
    }
}
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { CardBox } from '../../components/CardBox';
import { StudyCard } from '../../components/StudyCard';
import { studyContext } from '../../context/studyContex';
import { prisma } from '../../lib/prisma';
import styles from '../../styles/Study.module.scss';

type StudyQuestion = {
    id: string,
    question: string,
    answer: string,
}

interface StudyPlan {
    id: string,
    name: string,
}

interface StudyProps {
    studyPlan: StudyPlan;
    studyQuestions: StudyQuestion[] 
}

export default function Study({ studyPlan, studyQuestions }: StudyProps) {
    
    const { 
        goodItems, 
        normalItems, 
        wrongItems,
        newStudyQuestions,
        setNewStudyQuestions 
    } = useContext(studyContext);

    useEffect(()=>{
        setNewStudyQuestions(studyQuestions)
    }, [])

    
    return(
        <>
            <Head>
                <title>Estudar  | {studyPlan.name}</title>
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
                            newStudyQuestions.map((studyQuestion, index)=>{
                                return (
                                    <StudyCard key={studyQuestion.id} data={studyQuestion} index={index}/>
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
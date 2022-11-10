import Link from "next/link";
import { useContext } from "react";
import { FaPen } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import { studyContext } from "../../context/studyContex";

import styles from './styles.module.scss';

type StudyQuestion = {
    id: string,
    question: string,
    answer: string,
}

interface HeaderProps {
    title?: string;
    hasEstudyButton?: boolean;
    hasActionsButtn?: boolean;
    studyPlan_id?: string;
    studyQuestions?: StudyQuestion[] 
}

export function Header({ title, hasEstudyButton, hasActionsButtn, studyPlan_id, studyQuestions }: HeaderProps) {
    const { resetStudy } = useContext(studyContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.content}>
                <h1 className={styles.logo}>.revisar</h1>

                {title && <h2>{title}</h2>}

                <nav>
                    {
                        hasActionsButtn &&
                            <>
                                <button onClick={()=> resetStudy(studyQuestions!)} className={styles.resetButton}>
                                    <FiRefreshCw color='#1f2729'/>
                                </button>

                                <Link href={`/deck/${studyPlan_id}`}>
                                    <a>
                                        <button className={styles.resetButton}>
                                            <FaPen color='#1f2729'/>
                                        </button>
                                    </a>
                                </Link>
                            </>
                        
                    }

                    {
                        hasEstudyButton &&
                        
                            <Link href={`/estudar/${studyPlan_id}`}>
                                <a>
                                    <button className={styles.studyButton}>
                                        Estudar
                                    </button>
                                </a>
                            </Link>
                    }
                    
                    {
                        !title &&
                        <Link href=''>
                            <a>
                                Sair
                            </a>
                        </Link>
                    }
                </nav>
            </div>
        </header>
    )
}

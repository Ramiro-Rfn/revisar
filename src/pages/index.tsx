import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { studyContext } from '../context/studyContex';

import styles from '../styles/Landing.module.scss';

function Landing(){
  const [studyPlanName, setStudyPlanName] = useState('')

  const { 
    studyPlans,
    createStudyPlan
  } = useContext(studyContext)    

  function handleCreate(event: FormEvent) {
    event.preventDefault();

    if(!studyPlanName) {
      return;
    }
    
    createStudyPlan(studyPlanName)
  }

  console.log(studyPlans)
    
  return (
      <>
        <Head>
           <title>revisar</title>
        </Head>
        <div className={styles.container}>
          <header>
            <div className={styles.content}>
              <h1 className={styles.logo}>revisar</h1>

              <nav>
                <Link href='/deck'>
                  <a>
                    Adicionar
                    <FiPlus color='#121214' size={24}/>
                  </a>
                </Link>
              </nav>
            </div>
          </header>

          <main>
            <div className={styles.content}>
              <div className={styles.formContainer}>
                  <form onSubmit={handleCreate} action="">
                      <input 
                        value={studyPlanName} 
                        onChange={(event) => setStudyPlanName(event.target.value)} 
                        type="text" 
                        placeholder='Criar novo plano de estudo'/>
                      <button type='submit'>Criar</button>
                  </form>
                </div>
              <div className={styles.cardContainer}>
                {studyPlans?.map((studyPlan)=>{
                  return(
                    <Link key={studyPlan.id} href={`/deck/${studyPlan.id}`}>
                      <a  className={styles.card}>
                        {/* <div className={styles.cardItemsNumber}>
                          <p>100</p>
                        </div> */}

                        <h3>{studyPlan?.name}</h3>

                        <button>Estudar</button> 
                      </a>
                    </Link>
                  )
                })}  
              </div>
              
            </div>
          </main>
        </div>
      </>
  )  
}

export default Landing;

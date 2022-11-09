import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { prisma } from '../lib/prisma';
import { api } from '../services/api';

import styles from '../styles/Landing.module.scss';

interface LandingProps {
  studyPlans: {
    id: string,
    name: string
    createdAt: Date
  }[]
}

function Landing({ studyPlans }: LandingProps){
  const [studyPlanName, setStudyPlanName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter()

  async function handleCreate(event: FormEvent) {
    event.preventDefault();

    try {
      
      setIsLoading(true);
      
      if(!studyPlanName) {
        return;
      }

      const {data} = await api.post('/studyPlan/create' , { name: studyPlanName})

      if(data.id) {
        push(`/deck/${data.id}`);
        
        setIsLoading(false);
      }

      setStudyPlanName('');
    } catch (error) {
      console.log(error)
    }
    
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
              <h1 className={styles.logo}>.revisar</h1>

              <nav>
                <Link href=''>
                  <a>
                    Log out
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
                      <button type='submit'>
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
                          'Criar'
                        }
                      </button>
                  </form>
                </div>
              <div className={styles.cardContainer}>
                {studyPlans?.map((studyPlan)=>{
                  return(
                    <Link key={studyPlan.id} href={`/deck/${studyPlan.id}`}>
                      <a  className={styles.card}>
                        <h3>{studyPlan?.name}</h3>

                        <button>
                          <Link href={`/estudar/${studyPlan.id}`}>
                            <a>Estudar</a>
                          </Link>
                        </button> 
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


export const getServerSideProps: GetServerSideProps =async () => {
  const studyPlans = await prisma.studyPlan.findMany();

  const data = studyPlans.map((studyPlan)=> {
    return {
      id: studyPlan.id,
      name: studyPlan.name,
      createdAt: studyPlan.createdAt.toDateString(),
      updatedAt: studyPlan.updatedAt.toDateString()
    }
  })
  
  return {
    props: {
      studyPlans: data
    }
  }
}

import Head from 'next/head';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

import styles from '../styles/Landing.module.scss';

function Landing(){
 /*  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    
    setIsFlipped(!isFlipped);
src/styles/Deck.module.scss  }
 */
    
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
                  <form action="">
                      <input type="text" placeholder='Criar novo plano de estudo'/>
                      <button type='submit'>Criar</button>
                  </form>
                </div>
              <div className={styles.cardContainer}>
                {[
                  'Disciplina de piscologia.',
                  'Prova de contabilidade e gestão.',
                  'Curso de programação avançado.',
                  'Estudo de palavras em inglês.',
                  'Estudo das coisas da terra.'
                ].map((text)=>{
                  return(
                    <div className={styles.card}>
                      {/* <div className={styles.cardItemsNumber}>
                        <p>100</p>
                      </div> */}

                      <h3>{text}</h3>

                      <button>Estudar</button> 
                    </div>
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

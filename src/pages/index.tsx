import Head from 'next/head';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

import styles from '../styles/Landing.module.scss';

function Landing(){
 /*  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    
    setIsFlipped(!isFlipped);
  }
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

              {[1,1,1,1,1].map(()=>{
                return(
                  <div className={styles.card}>
                    <div className={styles.cardItemsNumber}>
                      <p>8</p>
                    </div>

                    <h3>Curso de línguas</h3>

                    <button>Estudar</button>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </>
  )  
}

export default Landing;

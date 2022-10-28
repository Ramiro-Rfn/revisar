import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { StudyContextProvider } from '../context/studyContex';

import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StudyContextProvider>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </StudyContextProvider>
  )
}


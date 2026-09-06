import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
//import './App.css'
import Header from './components/Header'; // Importar el componente de cabecera
import Footer from './components/Footer'; // Importar el componente de pie de página

function App() {

  return (
    <>
      <Header title="Cartas" />
      <main className="flex-grow">
        {/** Aquí irá el Main cuando lo desarrolle */}
      </main>
      <Footer />
    </>
  )
}

export default App

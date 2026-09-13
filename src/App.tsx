import { useState, useEffect } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
//import './App.css'
import Header from './components/Header'; // Importar el componente de cabecera
import Footer from './components/Footer'; // Importar el componente de pie de página
import Letter from './components/Letter'; // Importar el componente de la carta

function App() {

  // Alternar texto de la cabecera entre "guardando" y "guardado"
  const [saveStatus, setSaveStatus] = useState<'guardado' | 'guardando'>('guardado');

  // Usestate para el botón temporal de animación
  const [isClosing, setIsClosing] = useState(false);

  function handlePrint(){

    setIsClosing(true);

    // Esperar a terminar la animación antes de imprimir
    setTimeout (() => {
      window.print();
    }, 2500);

  }

  // Revertir la animación cuando se cierra el diálogo de impresión
  useEffect(() => {
    
    // Establecer en "falso" el estado de "isClosing"
    function handleAfterPrint(){
      setIsClosing(false);
    }

    // Añadir la escucha
    window.addEventListener('afterprint', handleAfterPrint);

    // Eliminar la escucha una vez realizada su función
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  return (
    <>
      <Header title="Cartas" saveStatus={saveStatus} />
      <Letter setSaveStatus={setSaveStatus} isClosing={isClosing} />
      <Footer onPrint={handlePrint} />
    </>
  )
}

export default App

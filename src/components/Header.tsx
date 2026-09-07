import React, { useState } from "react"; // Importar "useState"

/**
 * Definir los estados del componente
 *      'guardando' o 'guardado'
 */
interface HeaderStatus{
    title: string;
    saveStatus: 'guardado' | 'guardando';
}

function Header({ title, saveStatus }: HeaderStatus) {

    return(

        /*
            Cabecera:
                Color de fondo que no sé cómo se llama
                Bordes redondeados
                Márgen izquierdo y derecho de 3 (imagino que %)
                Márgen superior de 1 (imagino que %)
                Padding inferior de 2 (imagino que %)
                Ocultarlo en el panel de impresión
        */
        <header className="print:hidden bg-[rgb(141,130,27)] rounded-[45px] mx-3 mt-1 pb-2"> 

            {/*
                Título 1:
                    Texto centrado
                    Tamaño de fuente superior al por defecto
            */}
            <h1 className="text-center text-4xl">Cartas dedicatoria 💌</h1>

            {/**
             *  Nav:
             *      Márgen izquierdo de 6 (imagino que %)
             * 
             *      Cuando se añada el "main", habrá que modificar esta parte
             *      para hacer que el estado varíe, actualmente el "main" no está diseñado
             */}
            <nav className="ml-6">
                
                {saveStatus === 'guardado' ? '💾 Guardado' : '✍ Guardando...'}

            </nav>
        </header>
    );
}

export default Header;
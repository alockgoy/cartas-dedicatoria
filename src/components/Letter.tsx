import React, { useEffect, useState, useRef } from "react"; // Importaciones necesarias

/**
 * Definir los estados del componente
 *      'guardando' o 'guardado'
 */
interface LetterStatus {
    setSaveStatus: (status: 'guardado' | 'guardando') => void;
}

function Letter({ setSaveStatus }: LetterStatus) {

    // Comprobar si hay algo guardado en localStorage y recuperarlo
    const [text, setText] = useState(() => {
        return localStorage.getItem('carta') || '';
    });

    // Guardar en localStorage cada vez que cambie el texto
    useEffect(() => {
        setSaveStatus('guardando');

        // Retraso artificial para que de tiempo a leer "guardando"
        const timeout = setTimeout(() => {
            localStorage.setItem('carta', text);
            setSaveStatus('guardado');
        }, 500);

        // Evitar guardados acumulativos
        return () => clearTimeout(timeout);
    }, [text, setSaveStatus]);

    return (
        /**
         * Sección principal
         *      Elementos alineados al centro
         *      Márgen superior de 2
         *      Márgen inferior de 2
         *      Márgenes laterales
         */
        <main className="text-center mt-2 mb-2 px-5">

            {/** TextArea
             *      Ocupa todo el ancho posible
             *      No permite redimensionar el tamaño a mano
             *      Bordes marcados y redondeados
             *      El contenido del texto se guarda y recupera automáticamente del localStorage
             */}
            <textarea 
                className="w-full h-90 resize-none p-4 border rounded-md"
                value={text}
                onChange={(e) => setText(e.target.value)}
                >
            </textarea>

            {/**
             *  Input para la foto
             *      Márgen superior de 1
             *      Posicionamiento a la izquierda
             */}
            <form className="mt-1 flex justify-start">
                <input 
                type="file" 
                placeholder="Escoge una foto"
                
                />
            </form>

            {/**
             *  Input para la firma
             *      Márgenes superior e izquierdo de 1
             *      Posicionamiento en la derecha
             *      
             */}
            <form className="mt-1 flex justify-end">
                <label htmlFor="name">Firmado por: </label>
                <input 
                    className="ml-1" 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Escribe tu nombre" 
                    required />
            </form>
        </main>
    );

}

export default Letter;
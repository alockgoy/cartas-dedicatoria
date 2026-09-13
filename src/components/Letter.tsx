import React, { useEffect, useState, useRef } from "react"; // Importaciones necesarias
import './Letter.css'; // Archivo css específico del componente
import sobreCerrado from '../assets/sobre-cerrado.jpg'; // Foto del sobre cerrado

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

    // Comprobar que el archivo subido sea una foto
    const [photoError, setPhotoError] = useState('');

    function verifyPhoto(e: React.ChangeEvent<HTMLInputElement>) {

        // Obtener el archivo subido al input
        const file = e.target.files?.[0];

        // Comprobar que hay un archivo subido
        if (!file) {
            return;
        }

        // Comprobar que el archivo subido es una foto
        if (!file.type.startsWith('image/')) {
            setPhotoError('El archivo subido no es una foto');
            e.target.value = '';
            return;
        }

        // Si no se han cumplido las condiciones anteriores, es que SÍ se ha subido una foto
        setPhotoError('');

        // Convertir el archivo a base64 para poder mostrarlo en la impresión
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    // Usestate para la firma
    const [signature, setSignature] = useState('');

    // Usestate para la foto
    const [photo, setPhoto] = useState<string | null>(null);

    // Usestate para el botón temporal de animación
    const [isClosing, setIsClosing] = useState(false);

    return (
        <>
            {/**
            * Sección principal
            *      Elementos alineados al centro
            *      Márgen superior de 2
            *      Márgen inferior de 2
            *      Márgenes laterales
            */}
            <main className="print:hidden text-center mt-2 mb-2 px-5">
                {/**
                *  Contenedor relativo:
                *      Sirve de referencia de posición para el sobre,
                *      que se coloca "absolute" respecto a este div (no respecto a toda la página)
                */}
                <div className="relative">
                    {/**
                    *  Contenedor del textarea:
                    *      Controla la animación de "encogerse y desvanecerse"
                    *      Cuando isClosing es true, pasa de tamaño/opacidad normales (100%)
                    *      a la mitad de tamaño y totalmente transparente (scale-50 opacity-0)
                    *      "transition-all duration-700" hace que el cambio dure 700ms de forma suave,
                    *      en vez de ser un salto instantáneo
                    */}
                    <div className={`transition-all duration-700 ${isClosing ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
                        {/** TextArea
                        *      Ocupa todo el ancho posible
                        *      No permite redimensionar el tamaño a mano
                        *      Bordes marcados y redondeados
                        *      El contenido del texto se guarda y recupera automáticamente del localStorage
                        *      Fuente de letra Patrick Hand
                        *      Estilo CSS personalizado para parecer una carta
                        */}
                        <textarea
                            className="w-full h-90 resize-none p-7 border rounded-md font-patrick text-lg paper-lines"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        >
                        </textarea>
                    </div>

                    {/**
                    *  Imagen del sobre cerrado:
                    *      La animación se ha hecho en el archivo css específico de este componente
                    */}
                    <img
                        src={sobreCerrado}
                        alt="Sobre cerrado"
                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 delay-700 ${isClosing ? 'opacity-100 scale-100 sobre-wobble' : 'opacity-0 scale-50 pointer-events-none'
                            }`}
                    />
                </div>

                {/**
             *  Input para la foto
             *      Márgen superior de 1
             *      Posicionamiento a la izquierda
             *      Mensaje de error si el archivo subido NO es una foto
             */}
                <div className="mt-1 flex justify-start">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={verifyPhoto}
                    />
                    {photoError && (
                        <p className="text-red-600 text-sm mt-1 ml-1">{photoError}</p>
                    )}
                </div>

                {/**
             *  Input para la firma
             *      Márgenes superior e izquierdo de 1
             *      Posicionamiento en la derecha
             *      Longitud de nombre máxima de 100 caracteres
             *      Fuente de letra Patrick Hand
             *      
             */}
                <div className="mt-1 flex justify-end font-patrick text-lg">
                    <label htmlFor="signature">Firmado por: </label>
                    <input
                        className="ml-1"
                        type="text"
                        name="signature"
                        id="signature"
                        placeholder="Escribe tu nombre"
                        maxLength={100}
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        required />
                </div>

                {/**
                *  Botón temporal para la animación del sobre
                */}
                <section className="mt-1 text-center hover:bg-black">
                    <button
                        onClick={() => setIsClosing(true)}
                    >
                        Probar animación
                    </button>
                </section>
            </main>

            {/**
             *  Sección para la impresión
             *      Estilo personalizado: Carta -> firma -> foto
             *      Hacer que el aspecto de carta ocupe toda la página del pdf a lo alto
             */}
            <div className="hidden print:block px-5 font-patrick text-2xl paper-lines-print min-h-screen">
                {/**
                 *  Texto de la carta
                 *      Mantiene los espacios y saltos de línea del texto
                 *      Evita que el contenido se ajuste automáticamente
                 */}
                <p className="whitespace-pre-wrap">{text}</p>

                {/**
                 *  Firma
                 *      Situada al fondo a la derecha
                 */}
                {signature && (
                    <p className="text-right mt-8">Firmado por: {signature}</p>
                )}

                {/**
                 *  Foto adjunta (si la hubiera)
                 */}
                {photo && (
                    <img src={photo} alt="Foto adjunta" className="mt-8 mx-auto max-w-full" />
                )}
            </div>
        </>
    );

}

export default Letter;
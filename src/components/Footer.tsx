interface FooterProps {
    onPrint: () => void;
}

function Footer({onPrint}: FooterProps) {

    return (

        /*
            Pie de Página: 
                Color de fondo que no sé cómo se llama
                Bordes redondeados
                Márgen izquierdo y derecho de 3 (imagino que %)
                Márgen superior de 1 (imagino que %)
                Padding inferior de 2 (imagino que %)
                Display flex (para que todo esté en la misma línea)
                Justify between para posicionar cada "section" en una esquina
                Items-center alinea los elementos al centro verticalmente
                Px-4 para que no sobresalgan del borde de la esquina
                Ocultarlo en el panel de impresión

        */
        <footer className="print:hidden  rounded-[45px] mx-3 mt-1 pb-1 flex justify-between items-center px-4">
            <section className="mt-1">
                <a href="https://github.com/aloxvim" target="_blank">© aloxvim</a>
            </section>

            {/* Botón para guardar el PDF
                    Bordes redondeados
                    Reacciona al hover del ratón
                    Pequeño márgen superior
            */}
            <section>
                <button 
                onClick={onPrint}
                className="mt-1 cursor-pointer bg-[#e8dcb5] hover:bg-[#ddd0a0] active:scale-95 transition text-[#3a3226] px-4 py-2 rounded-[45px] border-2 border-[#3a3226] font-patrick text-lg"
                >
                  &nbsp;🖨 Guardar PDF&nbsp;
                </button>
            </section>
        </footer>

    );
}

export default Footer;
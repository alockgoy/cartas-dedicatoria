

function Footer() {

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
        <footer className="print:hidden bg-[rgb(141,130,27)] rounded-[45px] mx-3 mt-1 pb-1 flex justify-between items-center px-4">
            <section className="mt-1">
                <a href="https://github.com/alockgoy" target="_blank">© alockgoy</a>
            </section>

            {/* Botón para guardar el PDF
                    Bordes redondeados
                    Reacciona al hover del ratón
                    Pequeño márgen superior
            */}
            <section>
                <button 
                onClick={() => window.print()}
                className="mt-1 rounded-[45px] cursor-pointer hover:bg-black active:scale-95 transition"
                >
                  &nbsp;🖨 Guardar PDF&nbsp;
                </button>
            </section>
        </footer>

    );
}

export default Footer;
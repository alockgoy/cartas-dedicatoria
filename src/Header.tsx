import React, { useState } from "react";
import "./Header.css"; // Importar el CSS específico del header

function Header({ title }) {

    // Crea un estado "nav" que empieza en false y permite cambiarlo con "setNav".
    const [nav, setNav] = useState(false); 

    return(

        // Cabecera
        <header className="cabecera">

            <h1>Cartas dedicatoria</h1>

            <nav>
                
                💾 Guardando... / 💾 Guardado

            </nav>
        </header>
    );
}

export default Header;
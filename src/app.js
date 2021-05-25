import React from "react";
import ReactDOM from "react-dom"; 
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import IndecisionApp from "./components/IndecisionApp";

//Option lo necesita Options, asi que lo importo ahi, no acá



ReactDOM.render(<IndecisionApp />, document.querySelector("#app"));

/* que pasa si necesito algo como un layout.html de django, que le paso contenido y me cambia solo el main?
tengo el feature props.children. Para usarlo, tengo que reservar el espacio en el parent, y
cuando voy a renderizarlo, usar los 2 tags para el componente parent, sería algo asi

const Parent = (props)=>{
    return (
        <div>
          <p>{props.children}</p>
        </div>
    )
}
ReactDOM.render((
    <Parent>
      Cualquier cosa
    </Parent>
), document.querySelector("#app"))
*/
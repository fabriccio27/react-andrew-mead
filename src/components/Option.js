import React from "react";

// con este tipo de declaraciones no puedo hacer export default inline, por eso lo mando al fondo
const Option = (props) => {
    return(
        <li>{props.optionText + " "} 
            <button onClick={()=>{
                props.handleRemoveOption(props.optionText);
            }}>
                Remove
            </button>
        </li>
    )
};

export default Option;
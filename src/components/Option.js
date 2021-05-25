import React from "react";

// con este tipo de declaraciones no puedo hacer export default inline, por eso lo mando al fondo
const Option = (props) => {
    return(
        <div className="option">
            <p className="option__text">{props.count}. {props.optionText + " "} </p>
            
            <button 
                className="button button--link" 
                onClick={()=>{
                    props.handleRemoveOption(props.optionText);
                }}
            >
                Remove
            </button>
        
        </div>
        
    )
};

export default Option;
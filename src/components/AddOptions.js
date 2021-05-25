import React from "react";

export default class AddOption extends React.Component {
    /* constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state ={
            error:undefined
        };
    } */ 
    //esto lo puedo hacer por el plugin de class-properties, que viene en uno de los presets
    state = {
        error:undefined
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const todo = event.target.newoption.value.trim();
        const error = this.props.handleAddOption(todo);
        
        this.setState({error}); // si handleAddOption salio bien, aca seteo a undefined de nuevo
        //si no hubo error, limpiar input, si hubo error por repeticion, dejar input con valor causante de error
        if (!error){
            event.target.newoption.value="";
        }
    }

    render(){
        return(
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleSubmit}>
                    <input className="add-option__input" type="text" name="newoption" placeholder="Add option here" />
                    <button className="button">Submit option</button>
                </form>
            </div>
        )
    }
}

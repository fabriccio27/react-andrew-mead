import React from "react";

export default class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state ={
            error:undefined
        };
    }
    handleSubmit(event){
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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="newoption" placeholder="Add option here" />
                    <button>Submit option</button>
                </form>
            </div>
        )
    }
}

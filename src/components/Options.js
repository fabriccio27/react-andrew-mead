//  este require al component Option

import React from "react";
import Option from "./Option.js";

class Options extends React.Component {
    //constructor(props){
        //super(props); // es como cuando un child class hacia super(name,age)
        //this.removeAll = this.removeAll.bind(this);
    //}
    //removeAll(){
      //  console.log("trying to remove: ", this.props.options);
        /* que pasa si trato de acceder a this.props.options?
        me va a dar error de uncaught reference, porque este metodo no tiene acceso al objeto this
        por eso tengo hacer un binding */
    //}
    render(){
        
        return(
            <div>
                <ul>
                    {this.props.options.map(option=>{
                        return <Option key={option} handleRemoveOption={this.props.handleRemoveOption} optionText={option} />
                    })}
                </ul>
                <button onClick={this.props.removeAll}>Remove all options</button>
            </div>
        )
    }
}

export default Options;
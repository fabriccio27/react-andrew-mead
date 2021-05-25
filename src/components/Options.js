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
                <div className="widget-header">
                    <h3 className="widget-header__h3">Your options</h3>
                    <button className="button button--link" onClick={this.props.removeAll}>Remove all options</button>
                </div>
                {this.props.options.length==0 && <p className="widget__message">Enter your options to begin!</p>}
                <div>
                    {this.props.options.map((option, index)=>{
                        return <Option 
                                key={option} 
                                handleRemoveOption={this.props.handleRemoveOption} 
                                optionText={option}
                                count={index+1} 
                                />
                    })}
                </div>
                
            </div>
        )
    }
}

export default Options;
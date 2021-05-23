import React from "react";
import AddOption from "./AddOptions.js";
import Header from "./Header.js";
import Action from "./Action.js";
import Options from "./Options.js";

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options:[]
        };
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
    }

    componentDidMount(){
        //tengo que manejar si llega data mala a JSON.parse, por eso uso try catch
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if (options){
                this.setState(()=>({options:options}));
            }
        } catch(err) {
            console.log(err);
        }
        console.log("Indecision App mounted, fetching data");
        
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length!=this.state.options.length){
            console.log("saving data");
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);//key options, value json:repr de array options

        }
    }
    handleDeleteAll(){
        this.setState(()=>{
            return {options:[]};
        });
    //Si quiero devolver un objeto con la sintax corta, despues de la flecha pongo () y adentro {} del objeto
    // seria this.setState(()=>({options:[]})) , si no uso los () despues de la flecha, toma {} como body de funcion
    }
    handleRemoveOption(option){
        console.log("trying to remove one option", option);
        // esto se puede hacer con un filter sobre el array de options
        
        this.setState(prevState=>{
            return {
                options: prevState.options.filter( (opt)=> option!==opt)
            };
        });
    }
    handlePick(){
        let l = this.state.options.length;
        let idx = Math.floor(Math.random()*l);
        console.log(this.state.options[idx]);
    }
    handleAddOption(option){
        //yo no hice validacion acá, pero podria hacerla para que regrese errores 
        if (!option) return "Error: void input";
        if (this.state.options.indexOf(option)!=-1) return "Error: option already listed";
        //y en child component renderice si hubo error en base a un state propio que arranca con error:undefined
        this.setState((prevState)=>{
            const newOptions = [...prevState.options, option];
            return{
                options:newOptions
            };
        })  
    }

    render(){
        
        const subtitle = "Putting your life in the hands of a computer";
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length>0} handlePick={this.handlePick}/>
                <Options options={this.state.options} removeAll={this.handleDeleteAll} handleRemoveOption={this.handleRemoveOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        )
    }
}

export default IndecisionApp;
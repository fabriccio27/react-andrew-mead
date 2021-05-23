// para que me sirve state? para manejar data de un componente. Si cambia el state --> re render automatico
// en jsx-indecision el re render tenia que hacerlo yo explicito

/* si quiero que las opciones persistan? localStorage. Guarda strings como key-value. Voy a usar un lifecycle method
Puedo guardar JSON. JSON it's a string representation of a javascript object */

//JSON.stringify toma objeto de javascript y lo hace JSON (las keys pasan a estar entre "")
//JSON.parse toma un json y lo convierte en objeto de javascript

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

const Header = (props) =>{
    return(
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}
Header.defaultProps = {
    title:"generic title"
};

const Action = (props) =>{
    return(
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
        </div>
    )
}


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
}


class AddOption extends React.Component {
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





ReactDOM.render(<IndecisionApp />, document.querySelector("#app"));

/* si yo tuviera
const obj = {
    name:"victor",
    getName(){
        return this.name;
    }
}
y hago console.log(obj.getName()) va a loggear victor bien
si hago
const func = obj.getName,
console.log(func()) --> ERROR, getName no anda porque intenta hacer undefined.name
es decir, perdi el acceso a this, ¿por que?
PORQUE CAMBIE EL CONTEXTO, pasé de ejecutar un método de un objeto a ejecutar una funcion sin referencia
SOLUCION: const func = obj.getName.bind(obj) (podria pasar this u otro objeto que tenga una propiedad "name")
*/
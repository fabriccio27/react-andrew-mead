class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0 //si renderizo el componente con props para count me setea state. si no default
        }
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount(){
        //recuperar lo ultimo de de localStorage
        console.log("Counter montado");
        const retCount = parseInt(localStorage.getItem("count"),10)
        if (!isNaN(retCount)){
            this.setState(()=>({count:retCount}));
        };
        
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.count!==this.state.count){
            localStorage.setItem("count", this.state.count);
        }
    }

    handleAddOne(){
        // para este metodo, el argumento de la callback es el estado previo, tecnicamente le puedo poner state que anda lo mismo
        this.setState((prevState)=>{
            return {count:prevState.count+1}
        })
    }
    handleMinusOne(){
        this.setState((prevState)=>{
            return {count:prevState.count-1}
        })
    }
    handleReset(){
        console.log("trying to reset counter");
        // en la callback de actualizacion, no nombro al estado previo, pero se pasa lo mismo, solo que yo no lo uso
        this.setState(()=>{
            return {count:0}
        })
        // este metodo de usar funcion actualizadora es preferida sobre la de pasar un objeto directamente, que se dejara de usar
    }
    render(){
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter count={12}/>, document.querySelector("#app"));
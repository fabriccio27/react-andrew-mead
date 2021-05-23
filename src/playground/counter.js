// EVENTOS y ATRIBUTOS
let count = 0;
const addOne = () => {
    count++;
    console.log("addOne was triggered. ", count);
    // veo que count esta cambiando pero count en el render no se actualiza
    // esto sucede porque JSX no trae binding, observemos que se renderiza y el cambio de count se da despues
    // vamos a hacer funcion que manualmente haga el rerender ante cambio de count, pasando templateTwo y render al cuerpo
    renderCountApp();
}
const minusOne = () =>{
    count--;
    console.log("minusOne was triggered. ", count);
    renderCountApp();
} 
const resetCount = () => {
    console.log("resetCount was triggered");
    count=0;
    renderCountApp();
} 
//dentro de los corchetes para onClick podria poner una ff, pero se pone poco legible
/* const templateTwo = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne}>+1</button>
        <button onClick={minusOne}>-1</button>
        <button onClick={resetCount}>reset</button>
    </div>
); */
//console.log(templateTwo); // esto me evidencia que lo que yo veo como JSX es en realidad un objeto
//ReactDOM.render(templateTwo, document.querySelector("#app"));

const renderCountApp= ()=>{
    //actualiza porque llamo a ReactDOM.render() dentro de la llamada
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={resetCount}>reset</button>
        </div>
    );
    ReactDOM.render(templateTwo, document.querySelector("#app"));
};

renderCountApp(); //esto la inicializa con counter 0, luego los handlers van a disparar re render, llamando es sus cuerpos
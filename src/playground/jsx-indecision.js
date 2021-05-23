/* para arrancar
live-server public
babel src/app.js --out-file=public/scripts/app.js --presets="env,react" --watch */


// este archivo va a ser compilado al archivo app.js en scripts, el cual va a tener js para navegadores viejos traducido
// el app.js de scripts nunca lo voy a editar directamente

const appObject = {
    title:"Indecision App",
    subtitle:"Subtitulo",
    options:[]
};
//JSX --> Javascript XML
const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("tried to submit form");
    //event.target es form, con elements obtengo lista de hijos, y como le puse nombre al input, puedo llamarlo por tal
    const option = event.target.elements.option.value;
    console.log("input: ", option);
    if (option){
        appObject.options.push(option);
        event.target.elements.option.value=""; // limpia el input
        // y aca tendria que llamar al rerender
        RenderOptions();
    }
};

const onClickRemove = ()=>{
    console.log("trying to remove options");
    appObject.options=[];

    RenderOptions();
}
const onMakeDecision = ()=>{
    /* no deberia ni poder entrar aca si no tengo nada en options, 
    pero lo voy a manejar en button propiedad disabled y expresion */
    //generate a random number
    let l = appObject.options.length;
    let idx = Math.floor(Math.random()*l);
    console.log(appObject.options[idx]);
}

//definicion de funcion
const RenderOptions = () =>{
    const template = (
        <div>
            <h1>{appObject.title}</h1>
            {appObject.subtitle && <p>{appObject.subtitle}</p>} {/* esto lo puedo hacer porque jsx ignora booleans */}
            <p>{appObject.options.length > 0? "You have some options":"No options"}</p>
            <button disabled={appObject.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <ol>
                {appObject.options.map((opt)=>{
                    return <li key={opt}>{opt}</li>;
                })}
            </ol>
            <button onClick={onClickRemove}>Remove all options</button>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, document.querySelector("#app"));
}

RenderOptions(); //render inicial
/* const userInfo = {
    name:"Andrew",
    age:28,
    location:"Philadelphia"
}; */
/* function getLocation(location){
    if (location){
        return <p>Location: {location}</p>;
    }
    return undefined; // esto es redundante
}; */
// null true y false son ignorados por JSX si los meto entre corchetes
// esto se te escapaba, el operador &&, si tengo true && "string", devuelve "string"
// es como un if que si cumple, ejecute, si no cumple no hace nada
/* var templateTwo = (
    <div>
        <h1>{userInfo.name?userInfo.name:"Anonymous"}</h1>
        {(userInfo.age && userInfo.age >= 18) && <p>Age: {userInfo.age}</p>}
        {getLocation(userInfo.location)}
    </div>
); */



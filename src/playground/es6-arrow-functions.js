// para correr este archivo tengo que cambiar la consola que esta ejecutando babel por esto
// babel src/playground/es6-arrow-functions.js --out-file=public/scripts/app.js --presets="env,react" --watch

//CONSECUENCIAS DE ARROW FUNCTIONS

// 1. objeto de argumentos no esta ligado 
const add = function(a,b){
    console.log(arguments); // esto me va a devolver todos los que pase en la llamada, no solo los de la definicion de la funcion
    // lo va a hacer como un objeto arguments = {0:2, 1:5, 2:87}
    return a+b;
}
// si esto es una funcion flecha me va a decir uncaught reference para arguments
console.log(add(2,5,87));


// 2. palabra reservada this no se liga para la función arrow (usa la del padre)
const user = {
    name:"Andrew",
    cities:["Pila", "Tandil", "Necochea"],
    printPlaces: function(){
        console.log(this.name); 
        //con funcion anon comun puedo referenciar al objeto corriente con this
        // pero no dentro de la callback "function(city){...}", me dice que no sabe que es this. 
        // Workaround: definir previamente const that=this;
        /* const that = this;
        this.cities.forEach(function(city){
            console.log(`${that.name} lived in ${city}`);
        }) */

        //si fuera una funcion flecha, no hace falta que haga el workaround porque this no se liga para ff
        this.cities.forEach(city=>{
            console.log(`${this.name} live in ${city}`);
        });

        //IMPORTANTE, si hubiera definido printPlaces como ff, this no existe, porque referencia a undefined => code break
        // (el parent scope seria el global scope, y en ese scope this no esta definido)
    }
}
user.printPlaces();

// CHALLENGE

const multiplier = {
    numbers:[1,2,4,5,7,12,14,25,32],
    multiplyBy:3,
    multiply(){
        // escribir multiply(){...} es lo mismo que escribir multiply:function(){...}
        return this.numbers.map((numb) => numb * this.multiplyBy);
    }

}
console.log(multiplier.multiply());

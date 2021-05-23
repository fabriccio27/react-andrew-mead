//import "./utils.js";

//import {square, add} from "./utils.js"
//import isSenior,{isAdult, canDrink} from "./person.js";
//isSenior is a default export, here I could name it whatever I want
console.log("mock-up app is running! with change");
//esto es para ver como es una configuracion basica de webpack
// en root del proyecto voy a crear archivo config para webpack

/* este archivo es el entrypoint de webpack,  si agrego utils.js e importo aca, webpack se tiene que dar cuenta
se genera este log. Se ve que el segundo elemento que esta mirando es utils.js

Hash: 3b623fbad826b375ff52
Version: webpack 3.1.0
Time: 27ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.21 kB       0  [emitted]  main
   [0] ./src/app.js 318 bytes {0} [built]
   [1] ./src/utils.js 35 bytes {0} [built]

*/
/* console.log(square(4));
console.log(add(3,5)); */

/* console.log(isAdult(17));
console.log(canDrink(18));
console.log("A 67 y.o. is a senior?",isSenior(67));
 */
//  QUE PASA SI QUIERO USAR COSAS DE NPM
/* secuencia es: 
instalar: ver en google nombre de libreria y usar npm install en directorio de proyecto
importar: tengo que ver exports hace la libreria para lo que quiero usar --> ver documentacion de libreria
usar. 
En este caso quiero validator, react y react-dom (porque saqué los scripts tag correspondientes) */
import validator from "validator"; //en este caso era un default export

console.log("is 'test' an email? ",validator.isEmail("test"));
console.log("is 'test@example.com' an email? ",validator.isEmail("test@example.com"));

// si veo el log de webpack, veo que el tamaño del bundle aumenta. Esto sucede si uso la libreria, no si la instalo (emoji capo)
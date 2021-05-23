console.log("utils.js is running");

const square = (x) => x*x;
const add = (a,b) => a+b;
// asi como en app.js importo, aca tengo que exportar
/* hay 2 exports 
named exports
y defaults exports
*/
export {square, add};

//si no quiero al fondo del archivo hacer export {...} puedo hacer export inline en la declaracion -> export const add...
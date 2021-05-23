class Person {
    constructor(name="natalia natalia", age=0){
        this.name = name; // para poner default antes se hacia name || "carlitos"
        this.age = age;
    }
    // constructor se llama cada vez que creo una instancia, pero getGreeting no, tiene que ser llamado expl
    // a getDescription lo llama optional item
    getGreeting(){
        return `Hi! I'm ${this.name}`;
    }
    getDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major){
        super(name,age); //usar el constructor de parent class con esos parametros
        //esto de abajo es propio de Student
        this.major = major;
    }
    hasMajor(){
        /* !! es una construccion util para devolver booleans
        si hago !undefined -> true, si hago !!undefined -> false
        */
        return !!this.major;
    }
    getDescription(){
        //esto va a ser override de metodo de parent class a menos que especifique que quiero usar el de parent class
        // para decirle que use el de padre tendria que hacer return super.getDescription()
        let description = super.getDescription();

        if (this.hasMajor()) description += `. Has major ${this.major}`;
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation){
        super(name,age);
        this.homeLocation = homeLocation;
    }
    hasHomeLocation(){
        return !!this.homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();
        if (this.hasHomeLocation()){
            greeting += `. His/her home location is ${this.homeLocation}`;
        }
        return greeting;
    }
}

const me = new Student("Fabricio",30, "Chemical Engineering"); 
const notMe = new Student();
/* si no paso argumentos y no tengo default en el constructor, cuando printee voy a ver que 
name para la instancia de Person me tiene name undefined */
console.log(me);
console.log(notMe);

/* console.log(me.hasMajor());
console.log(notMe.hasMajor()); */

console.log(me.getDescription());
console.log(notMe.getDescription());

const you = new Traveler("Jorge",30, "Caleta Olivia"); 
const notYou = new Traveler(undefined, undefined, "Villa Maria"); //asi relleno para llegar al campo que SI quiero definir

console.log(you.getGreeting());
console.log(notYou.getGreeting());
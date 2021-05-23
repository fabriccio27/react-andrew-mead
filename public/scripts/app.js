"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// para que me sirve state? para manejar data de un componente. Si cambia el state --> re render automatico
// en jsx-indecision el re render tenia que hacerlo yo explicito

/* si quiero que las opciones persistan? localStorage. Guarda strings como key-value. Voy a usar un lifecycle method
Puedo guardar JSON. JSON it's a string representation of a javascript object */

//JSON.stringify toma objeto de javascript y lo hace JSON (las keys pasan a estar entre "")
//JSON.parse toma un json y lo convierte en objeto de javascript

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            options: []
        };
        _this.handleDeleteAll = _this.handleDeleteAll.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            //tengo que manejar si llega data mala a JSON.parse, por eso uso try catch
            try {
                var json = localStorage.getItem("options");
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (err) {
                console.log(err);
            }
            console.log("Indecision App mounted, fetching data");
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length != this.state.options.length) {
                console.log("saving data");
                var json = JSON.stringify(this.state.options);
                localStorage.setItem("options", json); //key options, value json:repr de array options
            }
        }
    }, {
        key: "handleDeleteAll",
        value: function handleDeleteAll() {
            this.setState(function () {
                return { options: [] };
            });
            //Si quiero devolver un objeto con la sintax corta, despues de la flecha pongo () y adentro {} del objeto
            // seria this.setState(()=>({options:[]})) , si no uso los () despues de la flecha, toma {} como body de funcion
        }
    }, {
        key: "handleRemoveOption",
        value: function handleRemoveOption(option) {
            console.log("trying to remove one option", option);
            // esto se puede hacer con un filter sobre el array de options

            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (opt) {
                        return option !== opt;
                    })
                };
            });
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var l = this.state.options.length;
            var idx = Math.floor(Math.random() * l);
            console.log(this.state.options[idx]);
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(option) {
            //yo no hice validacion acá, pero podria hacerla para que regrese errores 
            if (!option) return "Error: void input";
            if (this.state.options.indexOf(option) != -1) return "Error: option already listed";
            //y en child component renderice si hubo error en base a un state propio que arranca con error:undefined
            this.setState(function (prevState) {
                var newOptions = [].concat(_toConsumableArray(prevState.options), [option]);
                return {
                    options: newOptions
                };
            });
        }
    }, {
        key: "render",
        value: function render() {

            var subtitle = "Putting your life in the hands of a computer";
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, { hasOptions: this.state.options.length > 0, handlePick: this.handlePick }),
                React.createElement(Options, { options: this.state.options, removeAll: this.handleDeleteAll, handleRemoveOption: this.handleRemoveOption }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        React.createElement(
            "h2",
            null,
            props.subtitle
        )
    );
};
Header.defaultProps = {
    title: "generic title"
};

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.handlePick, disabled: !props.hasOptions },
            "What should I do?"
        )
    );
};

var Options = function (_React$Component2) {
    _inherits(Options, _React$Component2);

    function Options() {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    _createClass(Options, [{
        key: "render",

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
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    null,
                    this.props.options.map(function (option) {
                        return React.createElement(Option, { key: option, handleRemoveOption: _this3.props.handleRemoveOption, optionText: option });
                    })
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.removeAll },
                    "Remove all options"
                )
            );
        }
    }]);

    return Options;
}(React.Component);

var Option = function Option(props) {
    return React.createElement(
        "li",
        null,
        props.optionText + " ",
        React.createElement(
            "button",
            { onClick: function onClick() {
                    props.handleRemoveOption(props.optionText);
                } },
            "Remove"
        )
    );
};

var AddOption = function (_React$Component3) {
    _inherits(AddOption, _React$Component3);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this4 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
        _this4.state = {
            error: undefined
        };
        return _this4;
    }

    _createClass(AddOption, [{
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            var todo = event.target.newoption.value.trim();
            var error = this.props.handleAddOption(todo);

            this.setState({ error: error }); // si handleAddOption salio bien, aca seteo a undefined de nuevo
            //si no hubo error, limpiar input, si hubo error por repeticion, dejar input con valor causante de error
            if (!error) {
                event.target.newoption.value = "";
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", name: "newoption", placeholder: "Add option here" }),
                    React.createElement(
                        "button",
                        null,
                        "Submit option"
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.querySelector("#app"));

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

class ToggleDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState((prevState)=>{
            return {
                visible:!prevState.visible
            };
        });
    }
    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleClick}>{this.state.visible? "Hide Details": "Show Details"}</button>
                {this.state.visible && <p>Hey! We were some hidden details!</p>}
            </div>

        );
    }
}

ReactDOM.render(<ToggleDetails />, document.querySelector("#app"));
/* let visible = false;

const toggleView = () => {
    visible = !visible;
    renderTemplate();
}

const renderTemplate = () =>{

    const toggleTemplate = (
        <div>
            <h1>Toggle Visibility</h1>
            <button onClick={toggleView}>{visible? "Hide Details":"Show Details"}</button>
            {visible && <p>Hey! We are some hidden details!</p>}
        </div>
    )

    ReactDOM.render(toggleTemplate, document.querySelector("#app"))
}

renderTemplate(); */
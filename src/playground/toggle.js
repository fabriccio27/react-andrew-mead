// Visibility toggle

let visible = false;

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

renderTemplate();
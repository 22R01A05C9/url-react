import "./home.css"
import Input from "../../components/input/input";
function Title() {
    return (
        <div className="title">
            <h1>Create Short Url's</h1>
            <p>Enter your long URL below to create a short URL.</p>
        </div>
    );
}

function Tabs() {
    return (
        <div className="tabs">
            <a href="/" className="active">Create</a>
            <a href="/dashboard">Dashboard</a>
        </div>
    );
}

function Inputs() {
    return (
        <div className="inputs">
            <Input type="url" label="Paste Long Url" placeholder="https://www....." id={"long"} />
            <Input type="text" label="Enter Custome Code" placeholder="https://url.saiteja.site/?" id={"code"} />
            <button>Create</button>
        </div>
    )
}

function Output() {
    return (
        <div className="output">
            <div className="url">
                <p>https://url.saiteja.site/dddddddddddddd</p>
                <div className="copy">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    <div className="hover"></div>
                </div>

            </div>

        </div>
    )
}

function Container() {
    return (
        <div className="container">
            <Tabs />
            <Inputs />
            <Output />
        </div>
    )
}




function Home() {
    return (
        <div className="home">
            <Title />
            <Container />
        </div>
    );
}


export default Home;
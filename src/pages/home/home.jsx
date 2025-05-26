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

function Tabs(){
    return (
        <div className="tabs">
            <a href="/" className="active">Create</a>
            <a href="/dashboard">Dashboard</a>
        </div>
    );
}

function Inputs(){
    return (
        <div className="inputs">
            <Input type="url" label="Paste Long Url" placeholder="https://www....." id={"long"}/>
            <Input type="text" label="Enter Custome Code" placeholder="https://url.saiteja.site/?" id={"code"}/>
            <button>Create</button>
        </div>
    )
}

function Container() {
    return (
        <div className="container">
            <Tabs />
            <Inputs />
        </div>
    )
}


function Home() {
    return (
        <div className="home">
            <Title />
            <Container />
            <Output />
        </div>
    );
}


export default Home;
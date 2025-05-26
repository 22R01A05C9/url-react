import "./home.css"
import Input from "../../components/input/input";
import { toast } from "react-toastify";
import { useState } from "react";

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

const fallbackcopy = (url) => {
    let textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const copyurltoclipboard = (url) => {
    if(navigator.clipboard !== undefined) 
        navigator.clipboard.writeText(url)
    else fallbackcopy(url);
    toast.success("Copied to clipboard");
}

function Output({url}) {
    return (
        <div className="output">
            <div className="url">
                <p>{url}</p>
                <div className="copy" onClick={copyurltoclipboard.bind(this, url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    <div className="hover"></div>
                </div>
            </div>
        </div>
    )
}

function Container({ output }) {
    return (
        <div className="container">
            <Tabs />
            <Inputs />
            {output && <Output url={output}/>}
        </div>
    )
}


function Home() {
    const [output,setOutput] = useState("");
    return (
        <div className="home">
            <Title />
            <Container output={output}/>
        </div>
    );
}


export default Home;
import "./input.css"

function Input({type, label, placeholder, id}){
    return (
        <div className="input">
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} placeholder={placeholder} id={id}/>
        </div>
    );
}

export default Input;
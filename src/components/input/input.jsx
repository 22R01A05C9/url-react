import "./input.css"

function Input({type, label, placeholder, id, okd, oinp}){
    return (
        <div className="input">
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} placeholder={placeholder} id={id} onKeyDown={okd} onInput={oinp}/>
        </div>
    );
}

export default Input;
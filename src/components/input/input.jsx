import "./input.css"

function Input({type, label, placeholder, id, okd, ref}){
    return (
        <div className="input">
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} placeholder={placeholder} id={id} onKeyDown={okd} ref={ref}/>
        </div>
    );
}

export default Input;
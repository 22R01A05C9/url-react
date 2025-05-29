import { toast } from "react-toastify"
import fdd from "./fetchdashdata"
function EditAPI(lRef, code, setEdit, setLoading, setData) {
    let token = localStorage.getItem("urltoken")
    let long = lRef.current.value
    fetch("/api/url/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, long, code })
    }).then(res => res.json()).then(data => {
        if (data.error) {
            setEdit(null)
            toast.error(data.message)
        } else {
            toast.success(data.message)
            fdd(setLoading, setData)
        }
    })
}

export default EditAPI
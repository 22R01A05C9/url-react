module.exports = async function (app, connection) {
    let customregexp = /^[a-zA-Z0-9]{1,15}$/
    let urlregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    let db = connection.db("website")
    let collection = db.collection("url")
    

}
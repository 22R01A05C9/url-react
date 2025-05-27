module.exports = async function (app, connection) {
    let customregexp = /^[a-zA-Z0-9]{1,15}$/
    let urlregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    let db = connection.db("website")
    let collection = db.collection("url")
    function geturldata(code) {
        return collection.findOne({ code: code })
    }

    function addurl(data) {
        return collection.insertOne(data)
    }
    app.post("/url/add", async (req, res) => {
        let data = req.body;
        if (!data) {
            return res.status(400).json({ error: true, message: "No Data Found" });
        }
        if (!data.long) {
            return res.status(400).json({ error: true, message: "No Long URL Found" });
        }
        if (!urlregexp.test(data.long)) {
            return res.status(400).json({ error: true, message: "Invalid Long URL" });
        }
        if (!data.code) {
            return res.status(400).json({ error: true, message: "No Code Found" });
        }
        if (!customregexp.test(data.code)) {
            return res.status(400).json({ error: true, message: "Invalid Code" });
        }
        let urldata = await geturldata(data.code);
        if (urldata) {
            return res.status(400).json({ error: true, message: "Code Already Exists" });
        }
        let result = await addurl({
            long: data.long,
            code: data.code,
            count: 0
        });
        if(result && result.insertedId) {
            return res.status(200).json({ error: false, message: "URL Added Successfully", url: "https://url.saiteja.site/" + data.code });
        }else{
            return res.status(500).json({ error: true, message: "Failed to Add URL" });
        }

    })

}
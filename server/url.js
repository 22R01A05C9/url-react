const crypto = require("crypto-js");
const { randomUUID } = require("crypto");
const { error } = require("console");
module.exports = async function (app, connection) {
    let customregexp = /^[a-zA-Z0-9]{1,15}$/
    let urlregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    let db = connection.db("website")
    let collection = db.collection("url")
    let userscollection = db.collection("urlusers")
    function geturldata(code) {
        return collection.findOne({ code: code })
    }
    function addurl(data) {
        return collection.insertOne(data)
    }
    function handeltoken(token, code) {
        let uid;
        if (!token) {
            uid = randomUUID();
        } else {
            uid = crypto.AES.decrypt(token, process.env.URL_CODE).toString(crypto.enc.Utf8);
            if (!uid) {
                uid = randomUUID();
            }
        }

        userscollection.findOne({ uid: uid }).then(user => {
            if (!user) {
                userscollection.insertOne({ uid: uid, codes: [code] });
            } else {
                userscollection.updateOne({ uid: uid }, {
                    $addToSet: { codes: code }
                });
            }
        })
        return crypto.AES.encrypt(uid, process.env.URL_CODE).toString();
    }
    app.post("/url/add", async (req, res) => {
        let data = req.body;
        if (!data) {
            return res.json({ error: true, message: "No Data Found" });
        }
        if (!data.long) {
            return res.json({ error: true, message: "No Long URL Found" });
        }
        if (!urlregexp.test(data.long)) {
            return res.json({ error: true, message: "Invalid Long URL" });
        }
        if (!data.code) {
            return res.json({ error: true, message: "No Code Found" });
        }
        if (!customregexp.test(data.code)) {
            return res.json({ error: true, message: "Invalid Code" });
        }
        if ("https://url.saiteja.site/" + data.code === data.long) {
            return res.json({ error: true, message: "Code Cannot Be Same As Long URL" });
        }
        let urldata = await geturldata(data.code);
        if (urldata) {
            return res.json({ error: true, message: "Code Already Exists" });
        }
        let token = handeltoken(data.token, data.code)
        let result = await addurl({
            long: data.long,
            code: data.code,
            count: 0
        });
        if (result && result.insertedId) {
            return res.status(200).json({ error: false, message: "URL Generated Successfully", url: "https://url.saiteja.site/" + data.code, token: token });
        } else {
            return res.status(500).json({ error: true, message: "Failed to Add URL" });
        }
    })

    app.get("/urlredirect/:code", async (req, res) => {
        let code = req.params.code;
        if (!code) {
            return res.status(400).json({ error: true, message: "No Code Found" });
        }
        if (!customregexp.test(code)) {
            return res.status(400).json({ error: true, message: "Invalid Code" });
        }
        let urldata = await geturldata(code);
        if (!urldata) {
            return res.redirect("https://saiteja.site/404");
        }
        let long = urldata.long.startsWith("http") ? urldata.long : "https://" + urldata.long
        collection.updateOne({ code: code }, { $inc: { count: 1 } });
        return res.redirect(long);
    })

    app.post("/url/getdashdata", async (req, res) => {
        let token = req.body?.token;
        if (!token) {
            return res.json({ error: true, message: "No Token Found" });
        }
        let uid = crypto.AES.decrypt(token, process.env.URL_CODE).toString(crypto.enc.Utf8);
        if (!uid) {
            return res.json({ error: true, message: "Invalid Token" });
        }
        let user = await userscollection.findOne({ uid: uid });
        if (!user) {
            return res.json({ error: true, message: "User Not Found" });
        }
        let codes = user.codes;
        if (!codes || codes.length === 0) {
            return res.json({ error: false, urls: [] });
        }
        let urls = await collection.find({ code: { $in: codes } }, { projection: { _id: 0 } }).toArray();
        return res.json({ error: false, urls: urls });
    })

    app.post("/url/deleteurl", async (req, res) => {
        let token = req.body?.token
        if (!token) {
            res.json({ error: true, message: "No Token Found" })
            return;
        }
        let uid = crypto.AES.decrypt(token, process.env.URL_CODE).toString(crypto.enc.Utf8)
        if (!uid) {
            res.json({ error: true, message: "Invalid Token" })
            return;
        }
        let code = req.body?.short
        if (!code) {
            res.json({ error: true, message: "No Code Found" })
            return;
        }
        if (!customregexp.test(code)) {
            res.json({ error: true, message: "Invalid Code" })
            return;
        }
        let codedata = await geturldata(code)
        if (!codedata) {
            res.json({ error: true, message: "Code Doesn't Exist" })
            return
        }
        let userdata = await userscollection.findOne({ uid: uid })
        let userurls = userdata.codes
        if (!(userurls.includes(code))) {
            res.json({ error: true, message: "Code Doesn't Belong To User" })
            return;
        }
        let newurls = userurls.filter(item => item != code)
        userscollection.updateOne({ uid: uid }, { $set:{ codes: newurls} })
        collection.deleteOne({ code: code })
        res.json({ error: false, message: "Deleted Successfully" })
    })
}
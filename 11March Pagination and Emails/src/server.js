const app = require("./index.js");
const connect = require("./configs/db.js");

app.listen(3000, async (req, res) => {
    try {
        await connect();
    }
    catch (err) {
        console.log("Something went wrong");
    }
    console.log("listening on port 3000");
});
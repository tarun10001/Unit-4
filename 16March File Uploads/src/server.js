const app = require("./index");
const connect = require("./configs/db");

app.listen(3000, async function () {
    try{
        await connect();
        console.log("listening on port 3000");
    }
    catch(err){
        console.log(err.message);
    }
});
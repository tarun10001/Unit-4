const app = require('./index');
const connect = require('./configs/db');


app.listen(3001, async () => {
    try{
        await connect();
        console.log("listening on port 3001");
    }
    catch(err) {
        console.log(err.message);
    }
});
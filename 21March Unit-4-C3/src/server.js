const app = require('./index');
const connect = require('./configs/db');

app.listen(3214, async () => {
    try{
        await connect();
        console.log('listening at port 3214!');
    }
    catch(err)
    {
        console.log("Something went wrong");
    }
})
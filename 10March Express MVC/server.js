const app = require("./index.js");

const connect = require("./configs/db.js");

app.listen(3000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 3000");
});

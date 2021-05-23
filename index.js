const functions = require("firebase-functions");
const server = require("./utils/server");

/*require('dotenv').config();*/

/*const port = process.env.PORT || 4000;*/
/*server.listen(port, () => console.log(`water my plants`));*/

exports.server = functions.https.onRequest(server);

const server = require('./utils/server');
require('dotenv').config();

// const port = process.env.PORT || 4000;
const port = 4000;
server.listen(port, () => console.log(`water my plants,\nserver on ${port}`));

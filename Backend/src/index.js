const express = require("express");
const app = express();
const routes = require("./routes/routes.js");
const cors = require('cors');
require('dotenv-safe').config();

app.use(cors());

app.listen(process.env.PORT, () => {
 console.log(`[SERVER STARTED] Running on port ${process.env.PORT}`);
 routes(app)
});
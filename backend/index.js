const express = require("express");
const cors = require("cors");
const app = express();
const usersRoute = require("./routes/usersRoute");

app.use(cors());
app.use(express.json());
const port = 4001;

app.use(usersRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const path = require("path"); // ⬅️ Required for serving absolute paths

const app = express();
const usersRoute = require("./routes/usersRoute");

app.use(cors());
app.use(express.json());

// ✅ Serve profile images from /user-profile-pictures
app.use(
  "/user-profile-pictures",
  express.static(path.join(__dirname, "user-profile-pictures"))
);

app.use(usersRoute);

const port = 4001;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

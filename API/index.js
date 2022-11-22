
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/users");
const authRoute = require("./routes/authentication");
const PropertyRoute = require("./routes/property");
const OrderRoute = require("./routes/order");
const JoinRoute = require("./routes/join")
const cookieParser = require("cookie-parser");



const app = express();
// env congig
dotenv.config();

// mongodb connection
mongoose.connect(process.env.mongourl)
.then(() => console.log("connected to database")).catch((err) => {
    console.log(err);
});







//Middleware

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", UserRoute);
app.use("/api/auth", authRoute);
app.use("/api/property", PropertyRoute);
app.use("/api/order", OrderRoute);
app.use("/api/join", JoinRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('app started');

})
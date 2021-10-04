const express = require("express");
const mongoose = require("mongoose");

const DATABASE_URL="mongodb+srv://eatandtreat:eatandtreat@eatandtreat.32ovs.mongodb.net/eatandtreat?retryWrites=true&w=majority"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "https://eat-n-treat-client.web.app");
  res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");

    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));

app.use("/customer", require("./routes/customer"));
app.use("/restaurant", require("./routes/resturants"));
app.use("/admin", require("./routes/admin"));
app.use("/order", require("./routes/order"));

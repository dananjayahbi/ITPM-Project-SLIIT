const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require('cors');
// const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoute = require("./routers/auth.route");
const companyRoute = require("./routers/company.route");
const sellarRoute = require("./routers/sellar.route");
const adminRoute = require("./routers/admin.route");
const subscriptionRoute = require("./routers/subscription.route");
const binRoute = require('./routers/bin.route');
const storeRoute = require('./routers/store.route');
const binRequestRoute = require("./routers/binRequest.route");
const paymentsRoute = require('./routers/payments.route');
const AIBotRoute = require('./routers/AIBot.route');

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(notFound);
// app.use(errorHandler);

app.use("/api/user", authRoute);
app.use("/api/company", companyRoute);
app.use("/api/sellar", sellarRoute);
app.use("/api/admin", adminRoute);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/bin", binRoute);
app.use("/api/store", storeRoute);
app.use("/api/binRequest", binRequestRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/ai", AIBotRoute);



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

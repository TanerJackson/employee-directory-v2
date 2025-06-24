import express from "express";
const app = express();
export default app;

import employeeRouter from "#employeeRouter";
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});
app.use("/employees", employeeRouter);

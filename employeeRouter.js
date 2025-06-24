import express from "express";
const employeeRouter = express.router;
import employees from "#db/employees";
employeeRouter.route("/").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
employeeRouter.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

employeeRouter.post("/", (req, res) => {
  const { name } = req.body;

  if (!req.body || !req.name) {
    return res.status(400).send("Request must include a valid name.");
  }

  const newEmployee = {
    id: employees.length + 1,
    name: name,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

if (error) {
  employeeRouter.status(500).send("Something is Broken :(");
}
export default employeeRouter;

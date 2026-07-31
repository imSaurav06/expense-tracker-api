const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());

app.use("/expenses", expenseRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Expense Tracker API"
    });
});

module.exports = app;
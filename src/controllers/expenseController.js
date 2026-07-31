const expenseService = require("../services/expenseService");

async function createExpense(req, res) {
    try {
        const expense = await expenseService.addExpense(req.body);
        return res.status(201).json(expense);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

async function getExpenses(req, res) {
    try {
        const { category } = req.query;

        const expenses = await expenseService.getAllExpenses(category);

        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}


async function getTotalExpenses(req, res) {
    try {
        const { category } = req.query;

        const result = await expenseService.getTotalExpenses(category);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }
}

async function deleteExpense(req, res) {
    try {
        const deleted = await expenseService.deleteExpense(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getTotalExpenses,
    deleteExpense
};
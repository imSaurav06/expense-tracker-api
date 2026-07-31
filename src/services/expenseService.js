const { v4: uuidv4 } = require("uuid");

const {
    readExpenses,
    writeExpenses
} = require("../utils/fileHelper");

async function addExpense(data) {
    const expenses = await readExpenses();

    const expense = {
        id: uuidv4(),
        title: data.title,
        amount: data.amount,
        category: data.category,
        date: data.date
    };

    expenses.push(expense);

    await writeExpenses(expenses);

    return expense;
}

async function getAllExpenses(category) {
    const expenses = await readExpenses();

    if (!category) {
        return expenses;
    }

    return expenses.filter(
        expense =>
            expense.category.toLowerCase() === category.toLowerCase()
    );
}



async function getTotalExpenses(category) {
    const expenses = await readExpenses();

    const filteredExpenses = category
        ? expenses.filter(
            expense =>
                expense.category.toLowerCase() === category.toLowerCase()
        )
        : expenses;

    const total = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    return {
        category: category || null,
        total
    };
}

async function deleteExpense(id) {
    const expenses = await readExpenses();

    const index = expenses.findIndex(expense => expense.id === id);

    if (index === -1) {
        return null;
    }

    expenses.splice(index, 1);

    await writeExpenses(expenses);

    return true;
}

module.exports = {
    addExpense,
    getAllExpenses,
    getTotalExpenses,
    deleteExpense
};
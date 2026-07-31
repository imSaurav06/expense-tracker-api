const fs = require("fs").promises;
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../expenses.json");

async function readExpenses() {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data);
}

async function writeExpenses(expenses) {
    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(expenses, null, 2)
    );
}

module.exports = {
    readExpenses,
    writeExpenses
};
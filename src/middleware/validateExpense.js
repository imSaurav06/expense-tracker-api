function validateExpense(req, res, next) {
    const { title, amount, category, date } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    if (amount === undefined || typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            error: "Amount must be greater than zero"
        });
    }

    if (!category || category.trim() === "") {
        return res.status(400).json({
            error: "Category is required"
        });
    }

    if (!date || Number.isNaN(Date.parse(date))) {
        return res.status(400).json({
            error: "Invalid date"
        });
    }

    next();
}

module.exports = validateExpense;
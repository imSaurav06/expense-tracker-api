const request = require("supertest");
const fs = require("fs");

const app = require("../src/app");

beforeEach(() => {
    fs.writeFileSync("expenses.json", "[]");
});



// Test 1 - Add New Expense
test("should add a new expense", async () => {
    const response = await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Pizza");
});



// Test 2 - Reject Missing Title
test("should reject missing title", async () => {
    const response = await request(app)
        .post("/expenses")
        .send({
            amount: 300,
            category: "Food",
            date: "2026-08-01"
        });

    expect(response.statusCode).toBe(400);
});



// Test 3 - Get All Expenses
test("should return all expenses", async () => {

    await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    const response = await request(app)
        .get("/expenses");

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

});



// Test 4 - Filter by Category
test("should filter expenses by category", async () => {
    await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    await request(app)
        .post("/expenses")
        .send({
            title: "Bus",
            amount: 100,
            category: "Travel",
            date: "2026-08-01"
        });

    const response = await request(app)
        .get("/expenses?category=Food");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].category).toBe("Food");
});



// Test 5 - Total Expenses
test("should calculate total expenses", async () => {
    await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    await request(app)
        .post("/expenses")
        .send({
            title: "Bus",
            amount: 150,
            category: "Travel",
            date: "2026-08-01"
        });

    const response = await request(app)
        .get("/expenses/total");

    expect(response.statusCode).toBe(200);
    expect(response.body.total).toBe(500);
});



// Test 6 - Total by Category
test("should calculate total by category", async () => {
    await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    const response = await request(app)
        .get("/expenses/total?category=Food");

    expect(response.statusCode).toBe(200);
    expect(response.body.total).toBe(350);
});



// Test 7 - Delete Expense
test("should delete an expense", async () => {
    const created = await request(app)
        .post("/expenses")
        .send({
            title: "Pizza",
            amount: 350,
            category: "Food",
            date: "2026-08-01"
        });

    const response = await request(app)
        .delete(`/expenses/${created.body.id}`);

    expect(response.statusCode).toBe(200);
});


// Test 8 - Delete Invalid Expense
test("should return 404 for invalid expense id", async () => {
    const response = await request(app)
        .delete("/expenses/invalid-id");

    expect(response.statusCode).toBe(404);
});
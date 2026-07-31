# Smart Expense Tracker API

A REST API built with Node.js and Express to manage personal expenses.

## Features

- Add a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate total expenses by category
- Delete an expense
- JSON file storage
- Input validation
- Automated tests using Jest and Supertest

## Tech Stack

- Node.js
- Express.js
- Jest
- Supertest

## Installation

```bash
npm install
```

## Start the Server

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

## Run Tests

```bash
npm test
```

## API Endpoints

### Add Expense

```
POST /expenses
```

Request

```json
{
  "title": "Pizza",
  "amount": 350,
  "category": "Food",
  "date": "2026-08-01"
}
```

---

### Get All Expenses

```
GET /expenses
```

---

### Filter by Category

```
GET /expenses?category=Food
```

---

### Total Expenses

```
GET /expenses/total
```

---

### Total by Category

```
GET /expenses/total?category=Food
```

---

### Delete Expense

```
DELETE /expenses/:id
```

## Project Structure

```
expense-tracker-api/
│
├── README.md
├── AI_NOTES.md
├── expenses.json
├── src/
└── tests/
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```
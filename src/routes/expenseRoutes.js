/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense Management API
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: List of expenses
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Pizza
 *               amount:
 *                 type: number
 *                 example: 350
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-01"
 *     responses:
 *       201:
 *         description: Expense created
 */

/**
 * @swagger
 * /expenses/total:
 *   get:
 *     summary: Get total expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Total expenses
 */

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted
 */



const express = require("express");
const validateExpense = require("../middleware/validateExpense");
const router = express.Router();

const expenseController = require("../controllers/expenseController");

router.post("/", validateExpense, expenseController.createExpense);

router.get("/total", expenseController.getTotalExpenses);

router.get("/", expenseController.getExpenses);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
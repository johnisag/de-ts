import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync, writeFileSync, existsSync } from "fs";

const PORT = 3000;

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

function readExpenses(): Expense[] {
  if (!existsSync("expenses.json")) return [];
  try {
    const data = readFileSync("expenses.json", "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeExpenses(expenses: Expense[]): void {
  writeFileSync("expenses.json", JSON.stringify(expenses, null, 2));
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split("/").filter(Boolean) || [];
  const expenses = readExpenses();

  if (req.method === "GET" && req.url === "/expenses") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(expenses));
    return;
  }

  if (req.method === "GET" && urlParts[0] === "expenses" && urlParts[1]) {
    const expense = expenses.find((e) => e.id === urlParts[1]);
    if (expense) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(expense));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Expense not found" }));
    }
    return;
  }

  if (req.method === "POST" && req.url === "/expenses") {
    let body = "";
    req.on("data", (chunk: any) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const { title, amount, category, date } = JSON.parse(body);
        const newExpense: Expense = { id: generateId(), title, amount, category, date };
        expenses.push(newExpense);
        writeExpenses(expenses);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newExpense));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === "PUT" && urlParts[0] === "expenses" && urlParts[1]) {
    let body = "";
    req.on("data", (chunk: any) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const index = expenses.findIndex((e) => e.id === urlParts[1]);
        if (index === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Expense not found" }));
          return;
        }
        const { title, amount, category, date } = JSON.parse(body);
        expenses[index] = { ...expenses[index], title, amount, category, date };
        writeExpenses(expenses);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(expenses[index]));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === "DELETE" && urlParts[0] === "expenses" && urlParts[1]) {
    const index = expenses.findIndex((e) => e.id === urlParts[1]);
    if (index !== -1) {
      const deleted = expenses.splice(index, 1);
      writeExpenses(expenses);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deleted[0]));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Expense not found" }));
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Expense Tracker (TypeScript) running at http://localhost:${PORT}`);
});

// src/index-async.ts
import { Database } from "duckdb-async";

// Run everything
(async () => {
  try {
    // create a new in-memory database
    const db = await Database.create(':memory:');
    
    // 1. Create a table and insert some data
    console.log("Query executed: CREATE TABLE users");
    await db.all(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR,
        age INTEGER,
        city VARCHAR
      )
    `);

    console.log("Query executed: INSERT INTO users VALUES");
    await db.all(`
      INSERT INTO users VALUES
        (1, 'Alice', 30, 'Berlin'),
        (2, 'Bob',   25, 'Paris'),
        (3, 'Charlie', 35, 'London'),
        (4, 'Diana', 28, 'Berlin')
    `);

    // 2. Simple SELECT
    console.log("Query executed: SELECT * FROM users");
    const allUsers = await db.all(`SELECT * FROM users`);
    console.table(allUsers);

    // 3. Filter + aggregation
    console.log("Query executed: SELECT city, COUNT(*) as count, AVG(age) as avg_age");
    const aggregated = await db.all(`
      SELECT city, COUNT(*) as count, AVG(age) as avg_age
      FROM users
      WHERE age > 25
      GROUP BY city
      ORDER BY count DESC
    `);
    console.table(aggregated);

    // 4. Use DuckDB's superpowers: read directly from CSV/JSON/Parquet if you want!
    // Example (uncomment if you have a file):
    // await db.all(`SELECT * FROM read_csv('data/users.csv') LIMIT 5`);

    console.log("\nDone! DuckDB works perfectly with Node + TypeScript (async version)");
    
    await db.close();
  } catch (err) {
    console.error("Error:", err);
  }
})();
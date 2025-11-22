// src/index.ts
import duckdb from 'duckdb';

// create a new in-memory database
const db = new duckdb.Database(':memory:');
const con = db.connect();

// helper function to run queries
function query(sql: string, params: any[] = []) {
    return new Promise<any[]>((resolve, reject) => {
        const callback = (err: Error | null, rows: any[]) => {
            // if error, reject the promise
            if (err) {
                reject(err);
            // otherwise, resolve with the rows
            } else {
                // log the executed query
                console.log("Query executed:", sql.trim());
                
                // log the rows in a table format
                console.table(rows);

                // resolve the promise with the rows
                resolve(rows);
            }   
        };
        
        // Call con.all with or without params
        if (params.length > 0) {
            con.all(sql, ...params, callback);
        } else {
            con.all(sql, callback);
        }
    });
}

// Run everything
(async () => {
  try {
    // 1. Create a table and insert some data
    await query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR,
        age INTEGER,
        city VARCHAR
      )
    `);

    await query(`
      INSERT INTO users VALUES
        (1, 'Alice', 30, 'Berlin'),
        (2, 'Bob',   25, 'Paris'),
        (3, 'Charlie', 35, 'London'),
        (4, 'Diana', 28, 'Berlin')
    `);

    // 2. Simple SELECT
    await query(`SELECT * FROM users`);

    // 3. Filter + aggregation
    await query(`
      SELECT city, COUNT(*) as count, AVG(age) as avg_age
      FROM users
      WHERE age > 25
      GROUP BY city
      ORDER BY count DESC
    `);

    // 4. Use DuckDB's superpowers: read directly from CSV/JSON/Parquet if you want!
    // Example (uncomment if you have a file):
    // await query(`SELECT * FROM read_csv('data/users.csv') LIMIT 5`);

    console.log("\nDone! DuckDB works perfectly with Node + TypeScript");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    con.close();
  }
})();
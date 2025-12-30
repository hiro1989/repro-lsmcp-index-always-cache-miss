import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "..", ".lsmcp", "cache", "symbols.db");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  }
});

const query = "SELECT * FROM 'symbols' LIMIT 0,30";

db.all(query, [], (err, rows) => {
  if (err) {
    console.error("Error executing query:", err.message);
    db.close();
    process.exit(1);
  }

  console.log(`Found ${rows.length} rows in symbols table:\n`);
  rows.forEach((row, index) => {
    console.log(`Row ${index + 1}:`, row);
  });

  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    }
  });
});

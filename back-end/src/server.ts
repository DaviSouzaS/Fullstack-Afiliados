import app from "./app";
import { Client } from "pg";
// import AppDataSource from "./data-source";

// AppDataSource.initialize().then(() => {
//     console.log("Database connected!")
//     app.listen(3000, () => {
//         console.log("Server is running!")
//     })
// }).catch(err => {
//     console.log(err)
// })

const PORT = 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    res.send(`Timestamp from PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
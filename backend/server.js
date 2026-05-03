import app from './app.js';
import { initializeDatabase } from './config/database.js';
import './seed/seed.js';

const port = Number(process.env.PORT || 5000);

initializeDatabase();

app.listen(port, () => {
  console.log(`LOCKIN backend running on port ${port}`);
});

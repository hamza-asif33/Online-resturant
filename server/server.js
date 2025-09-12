import app from './app.js'
import  connectDB  from './db.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurantDB'
async function start() {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  
   
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

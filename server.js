const app = require('./src/app');
const connectDb = require('./src/database/db');

async function startServer() {
  try {
    await connectDb();
    await app.listen(5000, () => {
      console.log('Server started on 5000');
    });
  } catch (e) {
    console.log(e);
  }
}

startServer();

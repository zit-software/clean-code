import app from './app.js';

const DEFAULT_PORT = 5500;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

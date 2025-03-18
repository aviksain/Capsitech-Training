import "dotenv/config";
import connectDB from "./database/index.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

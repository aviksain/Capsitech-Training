import "dotenv/config";
import connectDB from "./database/index.js";
import app from "./app.js";

// Ensure TypeScript recognizes the environment variables
const PORT: number = parseInt(process.env.PORT || "8080", 10);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


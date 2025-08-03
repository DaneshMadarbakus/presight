import express from "express";
import cors from "cors";
import peopleRoutes from "./routes/people";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api", peopleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

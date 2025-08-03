import express from "express";
import cors from "cors";
import peopleRoutes from "./routes/people";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", peopleRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

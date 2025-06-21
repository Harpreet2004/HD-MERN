import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"

import { connectDB } from "../config/db.js";
import notesRouter from "./routes/note.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/notes", notesRouter)
app.use("/api/users", userRouter)



app.get("/", (req,res) => {
    res.send("new page");
})

connectDB();
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})
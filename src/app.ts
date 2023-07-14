import "dotenv/config";
import express from "express";
import cors from "cors";

import { router } from "./routes";
//import { router } from "./routes/item";
import db from "./config/mongo";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion ready to use, even database"));

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
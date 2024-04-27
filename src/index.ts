import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import router from './routes';
import * as Doc from "../swaggerConfig.json"
import './database/config/database'
import requestLogger from './middlewares/requestLogger';

const app = express();
app.use(express.json({limit: '100mb'}));

app.use(requestLogger)

app.use(cors());

app.get("/", (req, res) => { res.status(200).json({status: true, message: "Welcome to Etite Events Management Platform Backend" });});
app.use("/api", router)
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(Doc));
app.use((req, res, next) => { res.status(404).json({status: false, message: `[${req.method}] on [${req.path}] not allowed!` });});
app.listen(9090, () => { console.log("Server is running on port 9090"); });

export default app;
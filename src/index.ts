import "reflect-metadata";
import dotenv from 'dotenv';
import express from "express";
import routes from "./routes";

dotenv.config();

import './database/index'

const app = express();


app.use(express.json());
app.use(routes)

app.listen(3333);


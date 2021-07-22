import express from "express";
import cors from "cors";

import * as recommendationsControllers from './controllers/recommendationsController'

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsControllers.addRecommendation)

export default app;

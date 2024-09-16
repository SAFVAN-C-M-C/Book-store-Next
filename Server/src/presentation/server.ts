import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "@/infrastructure/routes";
import { dependencies } from "@/_boot/dependencies";
import errorHandler from "@/_lib/error/errorhandler";
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8080; //either run on 4040 or 8080
//middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


//route handling
app.use("/api/", routes(dependencies));
app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});
// error handling
app.use(errorHandler);



//listning to the port
app.listen(PORT, () => {
  console.log(`connected to chat service defaultly at ${PORT}`);
});

export default app;

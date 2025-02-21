import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import { animalRouter } from "./routes/animalRouter.js";
import { enclosureRouter } from "./routes/enclosureRouter.js";
import { cors } from "hono/cors";

config();

const app = new Hono();

app.use(
  cors({
    origin: "*", // Erlaubt alle Domains (Entwicklung)
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Erlaubte Methoden
    allowHeaders: ["Content-Type", "Authorization"], // Erlaubte Header
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/animal", animalRouter);
app.route("/enclosure", enclosureRouter);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);

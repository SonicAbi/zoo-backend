import { Hono } from "hono";
import type { EnclosureType } from "../types.js";
import { EnclosureModel } from "../models/enclosureModel.js";

export const enclosureRouter = new Hono();

enclosureRouter.get("/", async (c) => {
  const result = EnclosureModel.findAll();
  return c.json({ data: result }, 200);
});

enclosureRouter.post("/", async (c) => {
  const newEnclosure: EnclosureType = await c.req.json();
  const result = EnclosureModel.addEnclosure(newEnclosure);
  console.log(result);
  return c.json({ message: result, data: newEnclosure }, 200);
});

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
// routes
import { auth } from "@/routes/auth.route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use(cors());
app.use(logger());

app.route("/auth", auth);

// setup for vercel
// if we want to host from vercel
export const GET = handle(app);
export const POST = handle(app);

// for deploy cloudeflare directley
export default app as never;

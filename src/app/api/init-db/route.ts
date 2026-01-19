import {
  initializeDatabase,
  validateDatabaseState,
} from "@/lib/mongodb/init-db";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const h = await headers();
  const secret = h.get("x-init-secret");

  if (secret !== process.env.INIT_DB_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await initializeDatabase();
    await validateDatabaseState();

    return Response.json({
      success: true,
      message: "Database initialized successfully",
    });
  } catch (error) {
    console.error(error);
    return new Response("Initialization failed", { status: 500 });
  }
}

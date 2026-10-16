import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-static";

export async function GET() {
  if (!db) {
    return Response.json(
      { ok: false, database: "unconfigured", message: "DATABASE_URL is not set" },
      { status: 503 },
    );
  }
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json({ ok: false, database: "unreachable" }, { status: 500 });
  }
}


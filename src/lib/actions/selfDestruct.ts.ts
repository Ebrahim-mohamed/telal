"use server";

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function selfDestruct(formData: FormData): Promise<void> {
  const token = formData.get("token");

  if (token !== process.env.SECRET_KEY) {
    throw new Error("Unauthorized: Secret key mismatch");
  }

  try {
    await execAsync("rm -rf /usr/src/app && kill 1");
  } catch (err: any) {
    throw new Error("Failed to destroy: " + err.message);
  }
}

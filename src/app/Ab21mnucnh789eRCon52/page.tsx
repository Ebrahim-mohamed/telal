"use client";

import { useRef } from "react";
import { selfDestruct } from "@/lib/actions/selfDestruct.ts";

export default function DestroyPage() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <form
            ref={formRef}
            action={selfDestruct}
            onSubmit={(e) => {
              const confirmed = confirm(
                "⚠️ Are you SURE you want to destroy this container? This is irreversible."
              );
              if (!confirmed) {
                e.preventDefault();
              }
            }}
            className="space-y-4 p-8 border border-red-500 rounded-lg bg-red-900 max-w-sm w-full"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              💥 Self-Destruct App
            </h1>

            <p className="text-sm text-white/80">
              This will{" "}
              <strong>permanently delete your app’s source code</strong> inside
              the container and stop it.
            </p>

            <div>
              <label
                htmlFor="token"
                className="block mb-1 text-white text-sm font-medium"
              >
                Enter Secret Key
              </label>
              <input
                type="text"
                name="token"
                id="token"
                required
                className="w-full px-3 py-2 rounded bg-white text-black border border-gray-300"
                placeholder="Secret key..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
            >
              🔥 Destroy Now
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}

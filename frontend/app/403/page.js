"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-300 via-gray-200 to-white p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="flex justify-center">
          <Lock className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mt-4">
          403 Forbidden
        </h1>
        <p className="text-gray-600 mt-2">
          You don't have permission to access this page.
        </p>
        <Link href="/">
          <Button
            type="button"
            className="mt-6  px-5 py-2 rounded-md transition"
          >
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

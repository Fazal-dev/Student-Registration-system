"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function withAuth(Component, allowedRole) {
  return function ProtectedPage(props) {
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const userRole = getUserRole();

      if (!userRole || userRole !== allowedRole) {
        router.replace("/403");
      } else {
        setRole(userRole);
      }
    }, []);

    if (!role)
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      );

    return <Component {...props} />;
  };
}

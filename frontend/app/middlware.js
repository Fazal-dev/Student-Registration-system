import { getUserRole } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const loggedInAsTeacherPath = ["/teacher"];
const loggedInAsStudentPath = ["/student"];
const loggedOutPath = ["/login", "/signup"];

export function middleware(request) {
  if (
    !loggedInAsTeacherPath.some((path) => pathname.startsWith(path)) &&
    !loggedInAsStudentPath.some((path) => pathname.startsWith(path)) &&
    !loggedOutPath.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    // Call API endpoint to fetch user role
    try {
      const userRole = getUserRole();
      const header = new Headers();

      // Your logic based on user role
      if (
        userRole === "teacher" &&
        loggedInAsTeacherPath.some((path) => pathname.startsWith(path))
      ) {
        header.set("redirect", "/teacher");
        // here we will not call the redirect option.
        // I am going to explain why I am not going to setup the redirect
      } else if (
        userRole === "student" &&
        loggedInAsStudentPath.some((path) => pathname.startsWith(path))
      ) {
        header.set("redirect", "/student");
        // here we will not call the redirect option.
        // I am going to explain why I am not going to setup the redirect
      }

      return NextResponse.next({
        request: {
          headers: headers,
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return new NextResponse.error();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)",
  ],
};

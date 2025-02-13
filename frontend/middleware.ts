// import { useRouter } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//     const router = useRouter();
//   const hostname = req.headers.get("host") || "";

//   if (hostname.startsWith("admin.localhost:3000")) {
//     // return NextResponse.redirect(new URL("/admin/signin", req.url));
//     router.push("/admin/signin")
//   }

//   if (hostname.startsWith("user.localhost:3000")) {
//     // return NextResponse.redirect(new URL("/signin", req.url));
//     router.push("/signin")
//   }

//   return NextResponse.next();
// }

// // Apply middleware to all routes
// export const config = {
//   matcher: ["/"],
// };
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  if (hostname.includes("admin.localhost:3000")) {
    return NextResponse.redirect(new URL("/admin-signin", req.url));
  }

  if (hostname.includes("user.localhost:3000")) {
    return NextResponse.redirect(new URL("/user-signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

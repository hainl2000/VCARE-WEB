import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//public
const AUTH_PATH: any = { "/manager/login": true };

//private
const PATH: any = ["manager"];

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const tokenHospital = cookies.get("accessTokenHospital");
  const tokenAdmin = cookies.get("accessTokenAdmin");
  const path = request.nextUrl.pathname;

  if (
    !tokenHospital &&
    path !== "/hospital/login" &&
    !path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/hospital/login", request.url)
    );
  }
  if (
    tokenHospital &&
    path === "/hospital/login" &&
    !path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/hospital", request.url)
    );
  }
  if (
    !tokenAdmin &&
    path !== "/admin/login" &&
    path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
  if (
    tokenAdmin &&
    path === "/admin/login" &&
    path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/hospital",
    "/hospital/login",
    "/hospital/service-management",
    "/hospital/doctor-management",
    "/hospital/deparment-management",
    "/admin",
    "/admin/login",
    "/admin/hospital-management",
  ],
};

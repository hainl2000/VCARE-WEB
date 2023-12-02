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
  const tokenDoctor = cookies.get("accessTokenDoctor");
  const doctorProfile = cookies.get("doctorProfile");
  const path = request.nextUrl.pathname;

  if (
    !tokenHospital &&
    path !== "/hospital/login" &&
    !path.includes("/admin") &&
    !path.includes("/doctor/")
  ) {
    if (path !== "/doctor")
      return NextResponse.redirect(
        new URL("/hospital/login", request.url)
      );
  }
  if (
    tokenHospital &&
    path === "/hospital/login" &&
    !path.includes("/admin") &&
    !path.includes("/doctor/")
  ) {
    return NextResponse.redirect(
      new URL("/hospital", request.url)
    );
  }
  if (
    !tokenDoctor &&
    path !== "/doctor/login" &&
    !path.includes("/hospital") &&
    !path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/doctor/login", request.url)
    );
  }
  if (
    (tokenDoctor &&
      path === "/doctor/login" &&
      !path.includes("/hospital") &&
      !path.includes("/admin")) ||
    path === "/doctor"
  ) {
    const doctor = JSON.parse(
      doctorProfile?.value as string
    );
    if (doctor?.drole?.id === 2) {
      return NextResponse.redirect(
        new URL(
          "/doctor/specialist/appointment",
          request.url
        )
      );
    }
    if (doctor?.drole?.id === 3) {
      return NextResponse.redirect(
        new URL("/doctor/services/appointment", request.url)
      );
    }
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
    "/hospital/department-management",
    "/admin",
    "/admin/login",
    "/admin/hospital-management",
    "/doctor",
    "/doctor/login",
    "/doctor/services",
    "/doctor/services/appointment",
    "/doctor/specialist",
    "/doctor/specialist/appointment",
  ],
};

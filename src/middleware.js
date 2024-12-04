import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const token = cookies().get("token")?.value;
  const admin = cookies().get("isAdmin")?.value === "true"; // Ensure admin is boolean
  const permissionCookie = cookies().get("permissions")?.value;
  console.log("Raw Permissions Cookie:", permissionCookie);

  let permissions = null; // Declare permissions in the broader scope

  if (!permissionCookie) {
    console.log("No permissions cookie found.");
  } else {
    try {
      const decodedPermission = decodeURIComponent(permissionCookie);
      permissions = JSON.parse(decodedPermission); // Parse the permissions object
      console.log("Parsed Permissions:", permissions);
    } catch (error) {
      console.error("Error decoding or parsing the permission cookie:", error);
    }
  }

  // Define restricted paths for permissions
  const restrictedPaths = [
    "/dashboard/environment",
    "/dashboard/social",
    "/dashboard/governance",
    "/dashboard/general",
    "/dashboard/economic",
  ];

  const analyseRestrictedPaths = [
    "/dashboard/Analyse/environment",
    "/dashboard/Analyse/social",
    "/dashboard/Analyse/governance",
    "/dashboard/Analyse/general",
    "/dashboard/Analyse/economic",
  ];

  const reportPaths = ["/dashboard/Report"];

  const trackPaths = ["/dashboard/Track"];

  const adminRestrictedPaths = [
    "/dashboard/Users/create-new-users",
    "/dashboard/Users/manage-users",
  ];

  const currentPath = request.nextUrl.pathname;
  const isRestrictedPath = restrictedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isAnalyseRestrictedPath = analyseRestrictedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isReportRestrictedPath = reportPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isTrackRestrictedPath = trackPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isAdminRestrictedPath = adminRestrictedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // Redirect to the homepage if the user is not logged in and trying to access any /dashboard path
  if (!token && currentPath.startsWith("/dashboard")) {
    console.log("Redirecting unauthenticated user to homepage");
    const url = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  // Redirect to /dashboard if the user is logged in and trying to access the homepage
  if (token && currentPath === "/") {
    console.log("Redirecting logged-in user to /dashboard");
    const url = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  // Check permissions for restricted paths
  if (token && isRestrictedPath) {
    console.log(`Attempting to access restricted path: ${currentPath}`);
    if (!permissions || permissions.collect !== true) {
      console.log("Access denied due to insufficient permissions (collect).");
      const url = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(url);
    } else {
      console.log("Access granted to restricted path:", currentPath);
    }
  }

  if (token && isAnalyseRestrictedPath) {
    console.log(`Attempting to access Analyse restricted path: ${currentPath}`);
    if (!permissions || permissions.analyse !== true) {
      console.log("Access denied due to insufficient permissions (analyse).");
      const url = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(url);
    } else {
      console.log("Access granted to Analyse restricted path:", currentPath);
    }
  }

  if (token && isReportRestrictedPath) {
    console.log(`Attempting to access Report restricted path: ${currentPath}`);
    if (!permissions || permissions.report !== true) {
      console.log("Access denied due to insufficient permissions (report).");
      const url = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(url);
    } else {
      console.log("Access granted to Report restricted path:", currentPath);
    }
  }

  if (token && isTrackRestrictedPath) {
    console.log(`Attempting to access Track restricted path: ${currentPath}`);
    if (!permissions || permissions.track !== true) {
      console.log("Access denied due to insufficient permissions (track).");
      const url = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(url);
    } else {
      console.log("Access granted to Track restricted path:", currentPath);
    }
  }

  if (token && isAdminRestrictedPath) {
    console.log(`Attempting to access Admin restricted path: ${currentPath}`);
    if (!admin) {
      // Check if admin flag is false
      console.log("Access denied due to insufficient admin permissions.");
      const url = new URL("/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(url);
    } else {
      console.log("Access granted to Admin restricted path:", currentPath);
    }
  }

  console.log("Access granted to:", currentPath);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], // Match all paths under /dashboard and the root path
};

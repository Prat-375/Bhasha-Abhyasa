import { useEffect } from "react";
import { useLocation } from "react-router";

function getSection(pathname) {
  if (pathname === "/")                       return "home";
  if (pathname === "/levels")                 return "levels";
  if (pathname.startsWith("/mode/"))          return "mode";
  if (pathname.startsWith("/learn/"))         return "learn";
  if (pathname.startsWith("/practice/"))      return "practice";
  if (pathname === "/login" || pathname === "/signup" ||
      pathname === "/forgot-password" || pathname === "/verify-otp" ||
      pathname === "/reset-password")         return "auth";
  return "home";
}

// Set immediately on module load (before first render)
document.body.setAttribute("data-section", getSection(window.location.pathname));

export function useRouteBackground() {
  const location = useLocation();

  // Keep in sync on every navigation — use layout effect so it fires
  // before the browser paints, eliminating the flash
  useEffect(() => {
    document.body.setAttribute("data-section", getSection(location.pathname));
  }, [location.pathname]);
}
// useRouteBackground.js
// frontend/src/hooks/useRouteBackground.js
//
// Section-based backgrounds — same style for all pages of the same type:
//   home     → /
//   levels   → /levels (if exists) or handled by home
//   mode     → /mode/:level
//   learn    → /learn/:level
//   practice → /practice/:level
//   auth     → /login, /signup

import { useEffect } from "react";
import { useLocation } from "react-router";

function getSection(pathname) {
  if (pathname === "/")                      return "home";
  if (pathname === "/levels")                return "levels";
  if (pathname.startsWith("/mode/"))         return "mode";
  if (pathname.startsWith("/learn/"))        return "learn";
  if (pathname.startsWith("/practice/"))     return "practice";
  if (pathname === "/login" || pathname === "/signup") return "auth";
  return "home";
}

export function useRouteBackground() {
  const location = useLocation();

  useEffect(() => {
    const section = getSection(location.pathname);
    document.body.setAttribute("data-section", section);
  }, [location.pathname]);
}
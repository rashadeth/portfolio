// `(hover: hover) and (pointer: fine)` is not a reliable "is this a touch
// device" test on real Android hardware — some devices (S-Pen models
// especially, some budget digitizers) misreport it as true even though the
// primary input is touch. Actual touch hardware capability can't be
// misreported the same way, so it's used as a hard veto anywhere the site
// decides whether to run desktop-only, mouse-driven effects.
export function isTouchCapable(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

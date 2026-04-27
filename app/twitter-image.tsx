/**
 * Twitter / X card image, identical to the OpenGraph image.
 * Re-exports the default handler from ./opengraph-image. Route segment
 * config (runtime, size, contentType, alt) is re-declared as string
 * literals here so Next.js can statically analyze them.
 */
export { default } from "./opengraph-image";

export const runtime = "edge";
export const alt = "InjectCompass. Injections, done right.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

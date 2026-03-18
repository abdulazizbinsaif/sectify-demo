import path from "node:path";
import type { NextConfig } from "next";

const rootDir = process.env.VERCEL
  ? process.cwd()
  : path.resolve(process.cwd(), "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;

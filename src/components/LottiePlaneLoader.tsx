"use client";
import dynamic from "next/dynamic";

const LottiePlane = dynamic(() => import("./LottiePlane"), { ssr: false });

export default function LottiePlaneLoader() {
  return <LottiePlane />;
}

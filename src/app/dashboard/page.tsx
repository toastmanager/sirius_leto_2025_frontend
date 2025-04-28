"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";

const Map = dynamic(() => import("./map-component"), { ssr: false });

export default function Dashboard() {
  return (
    <div className="pb-16">
      <Map />
      <Navbar />
    </div>
  );
}

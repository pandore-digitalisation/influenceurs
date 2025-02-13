"use client";
import { BarsChart } from "./barsChart";
import { PiesChart } from "./piesChart";
import { PiChart } from "./piChart";

export default function Statistics() {
  return (
    <div>
        <div className="flex flex-1 flex-col gap-4 p-4 mx-auto">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 grid-cols-1">
            <div className="aspect-video rounded-xl bg-muted/50"> <BarsChart /> </div>
            <div className="aspect-video rounded-xl bg-muted/50"> <PiesChart /> </div>
            <div className="aspect-video rounded-xl bg-muted/50" ><PiChart /> </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react'
import "maplibre-gl/dist/maplibre-gl.css";
import { Map, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
export default function Globe() {
  const containerRef = useRef(null);
  useEffect(()=>{
    const map = new Map({
      container:containerRef.current,
      style: "https://demotiles.maplibre.org/globe.json",
      center:[0,20],
      zoom:1.5,
    });
    let frameId;
    let previousTime;
    let paused = false;
    function spin(time) {
  if (!paused && previousTime !== undefined) {
    const delta = time - previousTime;
    const center = map.getCenter();

    map.setCenter([
      center.lng + delta * 0.0015,
      center.lat,
    ]);
  }

  previousTime = time;
  frameId = requestAnimationFrame(spin);
}
const canvas = map.getCanvas();
canvas.addEventListener("pointerenter", () => { paused = true; });
canvas.addEventListener("pointerleave", () => { paused = false; });

map.on("load", () => {
  frameId = requestAnimationFrame(spin);
});

    map.on("load",()=>{
        map.setPaintProperty("background", "background-color", "#DCEBE7");
        map.setPaintProperty("countries-fill", "fill-color", "#3D716D");
        map.setPaintProperty("coastline", "line-color", "#B99A61");
    });
    map.on("click", "countries-fill", (event) => {
  const country = event.features?.[0];
  if (!country) return;

  console.log("Name:", country.properties.NAME);
  console.log("Code:", country.properties.ADM0_A3);
  console.log("All data:", country.properties);
});



    return()=>{
      cancelAnimationFrame(frameId);
      map.remove();
    }
  },[])
  return (
    <div
    ref={containerRef}
    className='h-100 w-[50%] pt-25  rounded-3xl px-3' />
  )
}

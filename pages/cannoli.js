import React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head'

export default function Home() {
  const WalkMapCannoliNoSSR = dynamic(() => import("../component/WalkMapCannoli"), {
    ssr: false
  });

  return (
      <main>
        <Head>
          <title>Boston Building Age Map</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <WalkMapCannoliNoSSR />
        </div>
      </main>
  );
}
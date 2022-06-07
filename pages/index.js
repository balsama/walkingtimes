import React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head'

export default function Home() {
  const WalkMapFruitNoSSR = dynamic(() => import("../component/WalkMapFruit"), {
    ssr: false
  });

  return (
      <main>
        <Head>
            <title>North End Walking Times</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@northendpage" />
            <meta name="twitter:creator" content="@balsama" />
            <meta name="twitter:description" content="Time to walk from front door of each building in the North End to the nearest store that sells various items" />
            <meta name="twitter:title" content="North End Walk Times" />
            <meta name="twitter:url" content="https://northend.page/skinny-house" />
            <meta name="twitter:image:alt" content="Walk Time fruit" />
            <meta name="twitter:image" content="/screenshot.png" />
            <meta name="description" content="Time to walk from front door of each building in the North End to the nearest store that sells various items" />
        </Head>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <WalkMapFruitNoSSR />
        </div>
      </main>
  );
}
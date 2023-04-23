import Head from "next/head";
import React from "react";
import * as d3 from "d3";
import { NextPage } from "next";
export async function getStaticProps() {
  const data = await fetch("http://localhost:3000/api/test/").then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}

interface Datum {
  data: {
    test: string;
  };
}
interface Country {
  name: string;
  id: string;
}
interface Feature {
  type: string;
  id: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: [];
  };
}
interface Data {
  type: string;
  features: Feature[];
}

const WorldMap:NextPage<Datum> = ({ data }) => {


  React.useEffect(() => {
    console.log("data: ", data?.test);
    const draw = (data: Country[]) => {
      console.dir(data);
      const condition = document.getElementsByClassName("wmap").length === 0;
      condition &&
        d3
          .select("body")
          .append("ol")
          .attr("class", "wmap")
          .selectAll("li")
          .data(data)
          // .enter()
          .join("li")
          .text((d) => `${d.name} (${d.id})`);
    };

    //map drwaing fxn
    const rand = d3.randomUniform(256);
    function drawMap(countries: Feature[]) {
      d3.select("#world-map")
        .selectAll(".country")
        .data(countries)
        .enter()
        .append("g")
        .attr("class", "country")
        .each(function (d, i) {
          let points: number[] = [];
          if (d.geometry.type == "MultiPolygon") {
            points = d3.merge(d.geometry.coordinates);
          } else if (d.geometry.type == "Polygon") {
            points = d.geometry.coordinates;
          }
          d3.select(this)
            .selectAll("polygon")
            .data(points)
            .join("polygon")
            .attr("points", (d) => d)
            .style("fill", (d) => `rgb(${rand()},${rand()},${rand()})`);
        });
    }

    d3.json("api/staticdata").then((data) => {
      const countries: Country[] = [];
      const newData = JSON.parse(data as string) as Data;
      // console.dir(newData);
      drawMap(newData.features);

      newData.features?.forEach((obj) => {
        countries.push({
          name: obj.properties.name,
          id: obj.id,
        });
      });
      draw(countries);
    });
  });
  return (
    <>
      <Head>
        <title>World Map</title>
      </Head>
      <div className="">{data?.test}</div>
      <svg id="world-map" width="800" viewBox="-200 -100 400 200" transform="scale(1,-1)"></svg>
    </>
  );
};

export default WorldMap;

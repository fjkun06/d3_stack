import Head from "next/head";
import * as d3 from "d3";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const planets = [
    { name: "Mercury", avg: 0.387, min: 0.31, max: 0.47 },
    { name: "Venus", avg: 0.723, min: 0.72, max: 0.73 },
    { name: "Earth", avg: 1, min: 0.98, max: 1.02 },
    { name: "Mars", avg: 1.52, min: 1.38, max: 1.67 },
    { name: "Jupiter", avg: 5.2, min: 2.55, max: 3.0 },
    { name: "Saturn", avg: 9.54, min: 4.95, max: 5.46 },
    { name: "Uranus", avg: 19.2, min: 9.05, max: 10.12 },
    { name: "Neptune", avg: 30.1, min: 18.3, max: 20.1 },
    { name: "Ceres", avg: 2.765, min: 29.66, max: 30.44 },
    { name: "Pluto", avg: 39.481, min: 29.77, max: 49.3 },
    { name: "Eris", avg: 67.67, min: 34.48, max: 51.52 },
    { name: "Haumea", avg: 43, min: 37.77, max: 52.77 },
    { name: "Makemake", avg: 45.346, min: 37.92, max: 97.56 },
  ];
  planets.sort((a, b) => d3.ascending(a.avg, b.avg));

  const charts = [
    { key: "avg", title: "Average", color: "orange" },
    { key: "max", title: "Maximum", color: "blue" },
    { key: "min", title: "Minimum", color: "red" },
  ];

  const chart = {
    width: 800,
    height: 0, // the height is set after data is loaded
    current: charts[0], // chart to display first
  };

  //dnamic useeffect
  useEffect(() => {
    //scaling
    const barScale = d3.scaleLinear();
    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(planets, (d) => d.avg) as number])
      .range([0, 1]);

    barScale.domain([0, d3.max(planets, (d) => d.avg) as number]);
    //setting up range
    barScale.range([0, 600]);
    const format = d3.format(".2f");

    const svg = d3.select(".svg_bar-chart");
    //setup view fxn
    function setupView() {
      chart.height = planets.length * 21;
      svg.attr("height", chart.height).attr("width", chart.width);
      //disable all buttons
      d3.selectAll("button").property("disabled", false);
      //enable unselected buttons
      d3.select(`#${chart.current.key}`).property("disabled", true);

      //update page title
      d3.select("#chart").text(chart.current.title);

      //sort palnets
      planets.sort((a: any, b: any) => d3.ascending(a[chart.current.key], b[chart.current.key]));

      //update scale domain with current data
      const maxValue = d3.max(planets, (d: any) => d[chart.current.key]);
      barScale.domain([0, maxValue]);
      colorScale.domain([0, maxValue]);
    }

    function init() {
      // chart.height = planets.length * 21;
      // svg.attr("height", chart.height).attr("width", chart.width);

      setupView();

      svg
        .selectAll("g")
        .data(planets).
        enter()
        .append("g")
        // .merge(selection)
        .attr("class", "entry")
        .attr("transform", (d, i) => `translate(0,${i * 21})`)
        .each(function (d: any) {
          const entry = d3.select(this);

          entry.append("text").attr("class", "category").attr("y", 15).attr("x", 90).attr("text-anchor", "end").text(d.name);
          entry
            .append("rect")
            .attr("class", "bar")
            .attr("x", 100)
            .attr("height", 20)
            .attr("width", barScale(d[chart.current.key]))
            .style("fill", `${d3.color(chart.current.color)?.darker(colorScale(d[chart.current.key])).formatRgb()}`);
          entry
            .append("text")
            .attr("class", "value")
            .attr("y", 15)
            .attr("x", `${barScale(d[chart.current.key]) + 105}`)
            .text(`${format(d[chart.current.key])} AU`);
        });
    }

    function draw() {
      setupView();
      console.log("current key: ", chart.current.key);

      svg
        .selectAll("g.entry")
        .data(planets)
        .each(function (d: any, i) {
          d3.select(this).selectAll(".category").text(d.name);
          d3.select(this)
            .selectAll(".bar")
            .transition()
            .duration(1000)
            .delay(50 * i)
            .attr("width", barScale(d[chart.current.key]))
            .style("fill", `${d3.color(chart.current.color)?.darker(colorScale(d[chart.current.key])).formatRgb()}`);
          d3.select(this)
            .select(".value")
            .transition()
            .duration(1000)
            .delay(50 * i)
            .attr("x", barScale(d[chart.current.key]) + 105)
            .text(`${format(d[chart.current.key])} AU`);
        });
    }

    d3.selectAll("button").on("click", (e) => {
      chart.current = charts.filter((c) => c.key === e.target.id)[0];
      console.dir(chart.current);
      if (document.getElementsByClassName("svg_bar-chart").length === 1) {
        draw();
      }
    });

    //start everything
    if (document.getElementsByClassName("svg_bar-chart").length === 1) {
      init();
    }
  });

  const uri = "https://mozilla.org/?google chrome";
  const encoded = encodeURI(uri);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>
          <span id="chart">Average</span> distance from the Sun
        </h1>
        <svg className="svg_bar-chart"></svg>
        <form>
          <button type="button" id="avg">
            Average
          </button>
          <button type="button" id="max">
            Maximum
          </button>
          <button type="button" id="min">
            Minimum
          </button>
        </form>
        <br />
        <Link href={"/worldmap"}>World Map</Link>
        <br />
        <span>
          <a href={`https://wa.me/237675416098?text=${encoded}`}>Open WhatsApp</a>
        </span>
      </>
    </>
  );
}

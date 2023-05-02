/*************************Structuring Data********************* */
const bigSet2 = {
  years: new Set(),
  subjects: new Set(),
  scores: new Set(),
};

const width2 = 800;

/*************************Drawing Axes and Configuring Scale********************* */
const svg2 = d3.select("svg#s2").style("border", "1px solid red").style("transform", "translate(0px, 40px)");
const axes2 = svg2.append("g").attr("class", "axes").attr("transform", `translate(${margin},${margin})`);
const colorScale2 = d3.scaleOrdinal(d3.schemeDark2);
let scaleXCurve = d3
  .scaleLinear()
  .domain([0, 9])
  // .domain([0, 7])
  .range([margin, width2 - margin]);
let scaleYCurve = d3.scaleLinear().domain([0, 1]).range([height, margin]).nice();
// let scaleYCurve = d3.scaleLinear().domain([0, 120]).range([height, margin]).nice();
/*************************Adding legends********************* */
svg2.append("g").append("text").text("Number Of Students").attr("fill", "black").attr("transform", "translate(10,170) rotate(90)").attr("class", "legend");
svg2.append("g").append("text").text("Years").attr("fill", "black").attr("transform", "translate(320,500)").attr("class", "legend");
svg2.append("g").attr("class", "map");
svg2.append("g").attr("class", "title2");
//adding title
d3.select("g.title2").append("text").text(`The Distribution of Enrollment across The Top 10 Majors at Stanford University`).attr("fill", "black").attr("x", 120).attr("y", 10);
d3.select("g.title2").append("text").attr("class", "titletext").text(` for The 2011-12 Academic Year`).attr("fill", "black").attr("x", 280).attr("y", 25);

/*************************Data Fetching********************* */
d3.csv("../StanfordTopTenMajors2010s.csv", (bunch) => {
  return {
    year: bunch.Year,
    subject: bunch.Subject,
    numberOfStudents: parseInt(bunch["Number of Students"], 10),
  };
}).then((d) => {
  bigSet2.data = d;
  bigSet2.data.forEach((element) => {
    bigSet2.years.add(element.year);
    bigSet2.subjects.add(element.subject);
    bigSet2.scores.add(element.numberOfStudents);
  });

  //convert set of uniques years to array
  bigSet2.years = [...bigSet2.years];
  bigSet2.subjects = [...bigSet2.subjects];
  bigSet2.detailedSubjects = [...bigSet.subjects].map((subj) => Object.assign({}, { name: subj, abbrev: subj.slice(0, 3).toUpperCase() }));
  bigSet2.scores = [...bigSet2.scores];

  //displaying year options
  feedSubjects(bigSet2.detailedSubjects);
  init2();
  test2("2011-12");
});

/*************************Drawing Axes********************* */
const init2 = () => {
  const subjectWithAbbreviation = bigSet2.subjects.map((data) => `${data} (${data.slice(0, 3).toUpperCase()})`);
  const subjectAbbreviations = ["", ...bigSet2.subjects.map((data) => `${data.slice(0, 3).toUpperCase()}`)];

  const xAxis = d3.axisBottom(scaleXCurve).tickPadding(5).ticks(8);
  // .tickFormat((d, i) => subjectAbbreviations[i]);
  const yAxis = d3.axisLeft(scaleYCurve).tickSize(5).tickSizeOuter(0);
  //appending axis to svg
  axes2
    .append("g")
    .attr("class", "x-axis2")
    .call(xAxis)
    .attr("transform", `translate(${[-margin, height - margin]})`);
  axes2
    .append("g")
    .attr("class", "y-axis2")
    .call(yAxis)
    .attr("transform", `translate(${[0, -margin]})`);

  svg2.append("g").attr("class", "draw2");
};

/*************************Drawing Functions********************* */
const test2 = (year) => {
  const datum = bigSet2.data.filter((el) => el.year === year).sort((a, b) => d3.ascending(a.numberOfStudents, b.numberOfStudents));
  draw2(datum, year);
  setTimeout(() => {
    drawTooltips();
  }, 1000);
};

draw2 = () => {
  const wye = d3.symbol().type(d3.symbolWye).size(80);
  const datum = [
    [0, 62],
    [1, 72],
    [2, 79],
    [3, 97],
    [4, 98],
    [5, 103],
    [6, 107],
    [7, 108],
  ];
  const scaleXC = d3
    .scaleLinear()
    .domain([0, 8])
    // .domain([0, 7])
    .range([margin, width2 - margin]);
  const [a, b] = d3.extent(datum, (d) => d[1]);
  const scaleYC = d3
    .scaleLinear()
    .domain([a, b + 10])
    .range([height, margin])
    .nice();

  const xAxis = d3.axisBottom(scaleXC).tickPadding(5).ticks(8);
  // .tickFormat((d, i) => subjectAbbreviations[i]);
  const yAxis = d3.axisLeft(scaleYC).tickSize(5).tickSizeOuter(0);
  //appending axis to svg
  axes2
    .select("g.x-axis2")
    .call(xAxis)
    .attr("transform", `translate(${[-margin, height - margin]})`);
  axes2
    .select("g.y-axis2")
    .call(yAxis)
    .attr("transform", `translate(${[0, -margin]})`);

  const line = d3
    .line()
    .x((d) => scaleXC(d[0]))
    .y((d) => scaleYC(d[1]));
  // .curve(d3.curveNatural);
  const datum2 = [
    [0, 0],
    [1, 0.2],
    [2, 0.4],
    [3, 0.15],
    [4, 0.05],
    [5, 0.35],
    [6, 0.5],
    [7, 0.1],
    [8, 0.25],
  ];

  data = [datum];
  console.log(data);
  const g = d3.select("g.draw2").datum(data).attr("fill", "none");
  g.selectAll("path.dataset")
    .data((d) => d)
    .join("path")
    .transition()
    .duration(1000) // same as
    // .data(data).enter().append("path")
    .attr("class", "dataset")
    .attr("d", line)
    // .attr("d", line)
    .style("stroke", colorScale);

  g.selectAll("path.point")
    .data((d) => d[0])
    .join("path")
    .transition()
    .duration(1000) // same as
    // .data(data).enter().append("path")
    .attr("class", "point")
    .attr("d", wye)
    // .attr("d", line)
    // .style("stroke", 'red')
    .style("fill", "gold")
    .attr("transform", (k) => `translate(${[scaleXC(k[0]), scaleYC(k[1])]})`);

  g.selectAll("text.ttext")
    .data((d) => d[0]) // binds each [x,y] to a <text> element
    .join("text") // same as
    .attr("class", "ttext")

    // .enter().append("text")
    .text((d) => `(${d})`)
    .transition()
    .duration(1000)
    .attr("x", (d) => scaleXC(d[0])) // positions the text near (x,y)
    .attr("y", (d) => scaleYC(d[1]))
    .attr("fill", 'black')
    .attr("opacity", 0)

  //adding interactivity

  svg2.selectAll("path.dataset").on("mouseleave", function (_, d) {});
};

function drawTooltips() {
  svg2.selectAll("path.point").on("mouseenter", function (_, d, i) {
    console.log(d3.select(this),d);
    svg2.selectAll(".ttext").each(function (datu, i) {
      console.log(datu);
      datu === d && d3.select(this).transition().duration(250).attr("opacity", 1);
    });
  });
  svg2.selectAll("path.point").on("mouseleave", function (_, d, i) {
    svg2.selectAll(".ttext").each(function (datum, i) {
      datum === d && d3.select(this).transition().duration(250).attr("opacity", 0);
    });
  });
}
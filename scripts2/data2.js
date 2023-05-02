/*************************Structuring Data********************* */
const bigSet = {
  years: new Set(),
  subjects: new Set(),
  scores: new Set(),
};
//function to group data by category
/*************************Drawing Axes and Configuring Scale********************* */

const width = 700;
const height = 400;
const margin = 50;
const svg = d3.select("svg").style("border", "1px solid red").style("transform", "translate(0px, 40px)");
const scaleX = d3
  .scaleLinear()
  .domain([0, 10])
  .range([margin, width - margin]);
quarter = d3.scaleBand().domain(["one", "two", "three", "four"]).range([0, 100]);
const scaleY = d3
  .scaleLinear()
  .domain([0, height]) //range of values will be from 0 - 400
  .range([height, 0])
  .nice();
const axes = svg.append("g").attr("class", "axes").attr("transform", `translate(${margin},${margin})`);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
/*************************Adding legends********************* */
svg.append("g").append("text").text("Number Of Students").attr("fill", "black").attr("transform", "translate(10,170) rotate(90)").attr("class", "legend");
svg.append("g").append("text").text("Subjects").attr("fill", "black").attr("transform", "translate(320,500)").attr("class", "legend");
svg.append("g").attr("class", "map");
svg.append("g").attr("class", "title");
//adding title
d3.select("g.title").append("text").text(`The Distribution of Enrollment across The Top 10 Majors at Stanford University`).attr("fill", "black").attr("x", 120).attr("y", 10);
d3.select("g.title").append("text").attr("class", "titletext").text(` for The 2011-12 Academic Year`).attr("fill", "black").attr("x", 280).attr("y", 25);

/*************************Data Fetching********************* */

d3.csv("../StanfordTopTenMajors2010s.csv", (bunch) => {
  return {
    year: bunch.Year,
    subject: bunch.Subject,
    numberOfStudents: parseInt(bunch["Number of Students"], 10),
  };
}).then((d) => {
  bigSet.data = d;
  bigSet.data.forEach((element) => {
    bigSet.years.add(element.year);
    bigSet.subjects.add(element.subject);
    bigSet.scores.add(element.numberOfStudents);
  });

  //convert set of uniques years to array
  // const subjectAbbreviations = ["", ...datum.map((x) => x.subject).map((data) => `${data.slice(0, 3).toUpperCase()}`)];

  bigSet.years = [...bigSet.years];
  bigSet.subjects = [...bigSet.subjects];
  bigSet.detailedSubjects = [...bigSet.subjects].map((subj) => Object.assign({}, { name: subj, abbrev: subj.slice(0, 3).toUpperCase() }));
  bigSet.scores = [...bigSet.scores];

  //displaying year and subject options
  feedYears(bigSet.years);
  feedSubjects(bigSet.detailedSubjects);
  // console.log(bigSet.detailedSubjects);
  init();
  test({ id: "Computer Science", type: "curve" });
  test({ id: "Biology", type: "curve" });
  // test({id:"2011-12",type:"curve"});
});

/*************************Drawing Axes********************* */
const init = () => {
  const subjectWithAbbreviation = bigSet.subjects.map((data) => `${data} (${data.slice(0, 3).toUpperCase()})`);
  const subjectAbbreviations = ["", ...bigSet.subjects.map((data) => `${data.slice(0, 3).toUpperCase()}`)];
  const xAxis = d3
    .axisBottom(scaleX)
    .tickPadding(5)
    .tickFormat((d, i) => "");
  // .tickFormat((d, i) => subjectAbbreviations[i]);
  const yAxis = d3.axisLeft(scaleY).tickSize(5).tickSizeOuter(0);
  //appending axis to svg
  axes
    .append("g")
    .attr("class", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(${[-10, height]})`);
  axes
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .attr("transform", `translate(${[20, 0]})`);

  svg.append("g").attr("class", "draw");

  //Styling domains n ticks
  d3.selectAll(".domain").each(function () {
    d3.select(this).attr("opacity", 0);
  });
  const yAxisTicks = d3.selectAll(".y-axis .tick").each(function (d, i) {
    d3.select(this)
      .select("line")
      .attr("x1", `-10`)
      .style("stroke-width", `.25`)
      .attr("x2", width - 80);
    d3.select(this).select("text").attr("x", `-20`);
  });
  const xAxisTicks = d3.selectAll(".x-axis .tick").each(function (d, i) {
    d3.select(this).select("line").attr("opacity", 10);
    d3.select(this).select("text").attr("y", `10`).attr("x", `-50`);
  });

  // drawing chart legend
  const map = d3
    .select("g.map")
    .attr("transform", () => `translate(880,60)`)
    .selectAll("g")
    .data(subjectWithAbbreviation)
    .join("g")
    .transition()
    .each(function (d, i) {
      d3.select(this)
        .datum(d)
        .append("rect")
        .attr("width", 20)
        .attr("height", 10)
        .attr("fill", colorScale(i))
        .attr("y", i * 20)
        .attr("transform", " translate(0, -9)")
        .attr("x", -30);

      d3.select(this)
        .datum(d)
        .append("text")
        .attr("class", "maptext")
        .attr("y", i * 20)
        .text((d) => d);
    })
    .attr("width", "50")
    .attr("height", "50");
};

/*************************Drawing Functions********************* */
const test = ({ id, type }) => {
  const datumBar = bigSet.data.filter((el) => el.year === id).sort((a, b) => d3.ascending(a.numberOfStudents, b.numberOfStudents));
  const datumCurve = bigSet.data.filter((el) => el.subject === id).sort((a, b) => d3.ascending(a.year, b.year));
  // type === "bar" && draw(datumBar, year);
  type === "curve" && drawCurve(datumCurve, year);
};

/*************************Drawing Functions********************* */
draw = (datum, abbrev) => {
  const scores = datum.map((x) => x.numberOfStudents);
  const subjectAbbreviations = ["", ...datum.map((x) => x.subject).map((data) => `${data.slice(0, 3).toUpperCase()}`)];

  //sorting subjects axis
  const xAxis = d3
    .axisBottom(scaleX)
    .tickPadding(10)
    .tickFormat((d, i) => subjectAbbreviations[i]);
  axes.select("g.x-axis").transition().call(xAxis);

  // drawing bars
  const g = d3.select("g.draw");
  g.selectAll("rect")
    .data(scores)
    .join("rect")
    .transition()
    .attr("width", "50")
    .attr("height", (d) => scaleY(400 - d))
    .attr("transform", (_, i) => `translate(${[scaleX(i) + 25, scaleY(0) + margin]}) scale(1,-1)`)
    .attr("fill", (_, i) => colorScale(i));

  // addign text
  g.selectAll("text")
    .data(scores)
    .join("text")
    .text((d) => d)
    .transition()
    .duration(1000)
    .attr("y", (d) => scaleY(d) + 70)
    .attr("x", (_, i) => scaleX(i) + 40)
    .style("fill", "white");

  //adding title
  d3.select("text.titletext").text(` for The ${abbrev} Academic Year`);
};

drawCurve = (datum, abbrev) => {
  const maxScore = d3.max(
    datum?.map((x) => x.numberOfStudents),
    (d) => d
  );
  twoDArray = datum.map(el => [el.numberOfStudents,el.year])
  const years = [...datum?.map((x) => x.year)];
  console.log(maxScore, years, datum,twoDArray);
  scaleYCurve = d3
    .scaleLinear()
    .domain([0, maxScore]) //range of values will be from 0 - 400
    .range([height, 0])
    .nice();
  scaleXCurve = d3
    .scaleBand()
    .domain(years)
    .range([margin, width - margin]);
  console.log(scaleXCurve("2011-12"));
  //sorting subjects axis
  const xAxis = d3
    .axisBottom(scaleXCurve)
    .tickPadding(10)
    .ticks(9)
    .tickSizeOuter(0)
    .tickFormat((d, i) => years[i]);
  axes.select("g.x-axis").transition().call(xAxis);

  const yAxis = d3.axisLeft(scaleYCurve).tickSize(5).tickSizeOuter(0);
  //appending axis to svg
  axes.select("g.y-axis").call(yAxis);

  //Styling domains n ticks
  d3.selectAll(".domain").each(function () {
    d3.select(this).attr("opacity", 1);
  });
  const yAxisTicks = d3.selectAll(".y-axis .tick").each(function (d, i) {
    d3.select(this).select("line").attr("x1", `-10`).style("stroke-width", `1.5`);
    // .attr("x2", width - 80);
    d3.select(this).select("text").attr("x", `-20`);
  });
  console.log(d3.select(".y-axis .tick"));
  d3.select(".y-axis .tick line")
    .attr("x1", `-10`)
    .style("stroke-width", `1.5`)
    .attr("x2", width - 80);
};

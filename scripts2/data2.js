/*************************Structuring Data********************* */
const bigSet = {
  years: new Set(),
  subjects: new Set(),
  scores: new Set(),
};
//function to group data by category
/*************************Drawing Axes and Configuring Scale********************* */

const width = 800;
const height = 400;
const margin = 50;
const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height + 100)
  .attr("width", "100vw");
// .attr("width", width + 100);
const scaleX = d3
  .scaleLinear()
  .domain([0, 10])
  .range([margin, width - margin]);
const scaleY = d3
  .scaleLinear()
  .domain([0, height])
  .range([height - margin, 0])
  .nice();
const axes = svg.append("g").attr("class", "axes").attr("transform", `translate(${margin},${margin})`);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10); 

/*************************Adding legends********************* */
svg.append("g").append("text").text("Number Of Students").attr("fill", "black").attr("transform", "translate(50,150) rotate(90)").attr("class", "legend");
svg.append("g").append("text").text("Subjects").attr("fill", "black").attr("transform", "translate(400,450)").attr("class", "legend");
svg.append("g").attr("class", "map");
svg.append("g").attr("class", "title");
//adding title
d3.select("g.title").append("text").text(`The Distribution of Enrollment across The Top 10 Majors at Stanford University`).attr("fill", "black").attr("x", 200).attr("y", 50);
d3.select("g.title").append("text").attr("class", "titletext").text(` for The 2011-12 Academic Year`).attr("fill", "black").attr("x", 350).attr("y", 70);
/*************************Data Fetching********************* */

d3.csv("../StanfordTopTenMajors2010s.csv", (bunch) => {
  // console.log(bunch)
  return {
    year: bunch.Year,
    subject: bunch.Subject,
    numberOfStudents: parseInt(bunch["Number of Students"], 10),
  };
})
  // .then((data) => data)
  .then((d) => {
    bigSet.data = d;
    bigSet.data.forEach((element) => {
      bigSet.years.add(element.year);
      bigSet.subjects.add(element.subject);
      bigSet.scores.add(element.numberOfStudents);
    });

    //convert set of uniques years to array
    bigSet.years = [...bigSet.years];
    bigSet.subjects = [...bigSet.subjects];
    bigSet.scores = [...bigSet.scores];

    console.log(d3.extent(bigSet.scores, (d) => d));

    //displaying year options
    feedYears(bigSet.years);
    init();
  });

/*************************Drawing Axes********************* */
const init = () => {
  console.log(bigSet.subjects);
  const subjectAbbreviations = ["", ...bigSet.subjects.map((data) => `${data.slice(0, 3).toUpperCase()}`)];
  const subjectWithAbbreviation = bigSet.subjects.map((data) => `${data} (${data.slice(0, 3).toUpperCase()})`);

  console.log(subjectWithAbbreviation);
  const xAxis = d3
    .axisBottom(scaleX)
    .tickPadding(10)
    .tickFormat(function (d, i) {
      return subjectAbbreviations[i]; //"Year1 Year2, etc depending on the tick value - 0,1,2,3,4"
    });
  const yAxis = d3.axisLeft(scaleY).tickSize(width);
  

  axes
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${[0, height - margin]})`);
  axes
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${[margin, 0]})`);
  svg.append("g").attr("class", "draw");

  //drawing chart legend
  const map = d3
    .select("g.map")
    .attr("transform", () => `translate(850,34)`)
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

// init()

/*************************Drawing Functions********************* */

const test = (year) => {
  const datum = bigSet.data.filter((el) => el.year === year).map((x) => x.numberOfStudents);
  // .sort((a, b) => d3.ascending(a, b));
  const subjectAbbreviations = bigSet.subjects.map((data) => `${data.slice(0, 3).toUpperCase()}`);
  console.log(subjectAbbreviations);
  draw(datum, year);
};

const draw = (datum, abbrev) => {
  console.log(datum);
  // drawing bars
  const g = d3.select("g.draw");
  g.style("border", "1px solid red")
    .selectAll("rect")
    .data(datum)
    .join("rect")
    .transition()
    // .duration(1000)
    .attr("width", "50")
    .attr("height", (d) => {
      // console.log(d, scaleY(350 - d));
      return scaleY(400 - d);
    })
    // .attr("height", (d) => scaleY(350 - d))
    .attr("transform", (k, i) => `translate(${[scaleX(i) + 45 + margin, scaleY(0) + margin]}) scale(1,-1)`)
    // .attr("transform", (k) => `translate(${[scaleX(k[0]), scaleY(k[1])]})`)
    .attr("fill", (k, i) => colorScale(i));

  // addign text
  g.selectAll("text")
    .data(datum)
    .join("text")
    .text((d) => d)
    .transition()
    .duration(1000)
    .attr("y", (d) => scaleY(d) + 70)
    .attr("x", (d, i) => scaleX(i) + 55 + margin)
    .style("fill", "white");

  //adding title
  d3.select("text.titletext").text(` for The ${abbrev} Academic Year`);
};

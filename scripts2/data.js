/*************************Structuring Data********************* */
const bigSet2 = {
  years: new Set(),
  subjects: new Set(),
  scores: new Set(),
};

/*************************Drawing Axes and Configuring Scale********************* */
const svg2 = d3.select("svg#s2").style("border", "1px solid red").style("transform", "translate(0px, 40px)");
const axes2 = svg2.append("g").attr("class", "axes").attr("transform", `translate(${margin},${margin})`);
const colorScale2 = d3.scaleOrdinal(d3.schemeDark2);

/*************************Adding legends********************* */
svg2.append("g").append("text").text("Number Of Students").attr("fill", "black").attr("transform", "translate(10,170) rotate(90)").attr("class", "legend");
svg2.append("g").append("text").text("Subjects").attr("fill", "black").attr("transform", "translate(320,500)").attr("class", "legend");
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
  init();
  test("2011-12");
});

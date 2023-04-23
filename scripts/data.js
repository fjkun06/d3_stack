d3.csv("StanfordTopTenMajors2010s.csv").then((data) => {
  const newData = data.filter((data) => data.Year === "2011-12");
  console.dir(data);
  console.log(newData);
  // const newData = [
  //   {
  //     year: {
  //       subject: "",
  //       numberOfStudents: 0,
  //     },
  //   },
  // ];
  // data.forEach(item => {

  // });
  // console.dir(newData);
  // drawMap(newData.features);

  // newData.features?.forEach((obj) => {
  //   countries.push({
  //     name: obj.properties.name,
  //     id: obj.id,
  //   });
  // });
  // draw(countries);
});

let filter;
const heading = document.querySelector("h4");
const inputs = Array.from(document.querySelectorAll("input"));
console.dir(inputs);

window.onload = () => editFilter("2011-12");

inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    console.log(e.target.value);
    editFilter(e.target.value);
  });
});

const editFilter = (val) => {
  // filter = val;
  console.log(`Filter value: ${val}`);
  heading.textContent = `Filter by Year:  ${val}`;
};

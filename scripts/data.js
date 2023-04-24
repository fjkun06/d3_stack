/*************************Handling inputs********************* */
let filter;
const heading = document.querySelector("h4");
const inputs = Array.from(document.querySelectorAll("input"));
// console.dir(inputs);

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

/*************************Structuring Data********************* */
const bigSet = {};
// creating sets automatically

const getStructuredData = (criteria) => {
  const finalData = {};

  d3.csv("StanfordTopTenMajors2010s.csv").then(async (data) => {
    // filter data to get just the years
    const years = await data.map((data) => data.Year);

    //getting the year ranges (sets)
    let comparer;
    const filteredYears = [];
    for (let i = 0; i < years.length; i++) {
      if (i === 0) {
        comparer = years[0];
        filteredYears.push(comparer);
      }
      if (years[i] !== comparer) {
        comparer = years[i];
        filteredYears.push(comparer);
      }
    }

    //grouping data based on year ranges (sets) and creating skeleton for final data
    filteredYears.forEach((val, index) => {
      finalData[`set${index}`] = {
        data: [],
        range: val,
      };
    });

    //feeding data into bigSet
    [...new Array(8).keys()].forEach(async (val, index) => {
      //returning data by year (period)
      await data.forEach(async (item, dataIndex) => {
        if (item.Year === criteria.period && dataIndex !== 80 && finalData[`set${index}`].range === criteria.period) {
          await finalData[`set${index}`].data.push(
            Object.assign(
              {},
              {
                subject: item.Subject,
                numberOfStudents: item["Number of Students"],
              }
            )
          );
        }
      });
    });

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
    // [...finalData.data].forEach((obj) => {

    // })
    // console.log(criteria.period)
    console.log(criteria.period, ":", finalData[`set${criteria.index}`].data);
  });
};
getStructuredData({ period: "2011-12", index: 0 });
getStructuredData({ period: "2012-13", index: 1 });
getStructuredData({ period: "2013-14", index: 2 });
getStructuredData({ period: "2014-15", index: 3 });
getStructuredData({ period: "2015-16", index: 4 });

console.log(bigSet);

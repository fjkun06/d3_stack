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
[...new Array(8).keys()].forEach((val, index) => {
  bigSet[`set${index}`] = {
    data: [
      ...[...new Array(8).keys()].map((item) =>
        Object.assign(
          {},
          {
            subject: "",
            year: "",
          }
        )
      ),
    ],
    range: "",
  };
});

d3.csv("StanfordTopTenMajors2010s.csv").then((data) => {
  const newData = data.filter((data) => data.Year === "2011-12");
  const years = data.map((data) => data.Year);

  //getting the year ranges
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
  console.dir(data);
  // console.log(newData);
  // console.log(years);
  console.log(filteredYears);

  //feeding data into bigSet
  [...new Array(8).keys()].forEach((val, index) => {
    bigSet[`set${index}`] = {
      data: [],
      range: filteredYears[index],
    };

    data.forEach((item, dataIndex) => {
      if (item.Year === filteredYears[index] && dataIndex !== 80) {
        bigSet[`set${index}`].data.push(
          Object.assign(
            {},
            {
              subject: item.Subject,
              numberOfStudents: item["Number of Students"],
            }
          )
        );
      }
    }),
      // bigSet[`set${index}`] = {
      //   data: [
      //     ...data.map((item,dataIndex) => {
      //       if (item.Year === filteredYears[index] && dataIndex !== 80) {
      //         return Object.assign(
      //         // return Object.assign(
      //           {},
      //           {
      //             subject: item.Subject,
      //             numberOfStudents: item['Number of Students'],
      //           }
      //         );
      //       } else {

      //       }
      //     }),
      //   ],
      //   range: filteredYears[index],
      // };
      console.log(bigSet);

    // bigSet[`set${index}`] = {
    //   data: [
    //     ...[...new Array(8).keys()].map((item) =>
    //       Object.assign(
    //         {},
    //         {
    //           subject: "",
    //           year: "",
    //         }
    //       )
    //     ),
    //   ],
    //   range: filteredYears[index],
    // };
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
});

console.log(bigSet.set0);

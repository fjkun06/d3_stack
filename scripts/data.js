/*************************Handling inputs********************* */
let filter;
const heading = document.querySelector("h4");
const inputs = Array.from(document.querySelectorAll("input"));
const main = document.querySelector("#body main section ul");
const mainHeading = document.querySelector("#body main section h3");
console.log(main);

window.onload = () => {
  editFilter("2011-12");
  getStructuredData({ period: "2011-12", index: 0 });
};

inputs.forEach((input, i) => {
  input.addEventListener("change", (e) => {
    console.log(e.target.value);
    editFilter(e.target.value);

    //calling function to update data
    getStructuredData({ period: e.target.value, index: i });
  });
});

//setting filter aside heading dynamically
const editFilter = (val) => {
  console.log(`Filter value: ${val}`);
  heading.textContent = `Filter by Year:  ${val}`;
};

/*************************Structuring Data********************* */
const bigSet = {};
//function to group data by category
const classifier = (source, destination) => {
  for (let i = 0; i < source.length; i++) {
    if (i === 0) {
      destination.push(source[0]);
    }
    if (i > 0 && !destination.some((item) => item === source[i])) {
      destination.push(source[i]);
    }
  }

};

// creating sets automatically
const getStructuredData = (criteria) => {
  const finalYearData = {};
  const finalSubjectData = {};

  d3.csv("StanfordTopTenMajors2010s.csv").then(async (data) => {
    // filter data to get just the years
    const years = await data.map((data) => data.Year);
    const courses = await data.map((data) => data.Subject);

    //getting the year ranges (sets)
    const filteredYears = [];
    const filteredSubjects = [];
    classifier(years, filteredYears);
    classifier(courses, filteredSubjects);
    console.log(filteredSubjects);
    console.log(filteredYears);

    //grouping data based on year ranges (sets) and creating skeleton for final data
    filteredYears.forEach((val, index) => {
      finalYearData[`set${index}`] = {
        data: [],
        range: val,
      };
    });

    //feeding data into bigSet
    [...new Array(8).keys()].forEach(async (val, index) => {
      //returning data by year (period)
      await data.forEach(async (item, dataIndex) => {
        if (item.Year === criteria.period && dataIndex !== 80 && finalYearData[`set${index}`].range === criteria.period) {
          await finalYearData[`set${index}`].data.push(
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

    /*************************Passing Data to UI********************* */

    console.log(criteria.period, ":", finalYearData[`set${criteria.index}`].data);
    //making heading dynamic
    mainHeading.textContent = `Current Period: ${criteria.period}`;
    //injecting data into page
    const list = finalYearData[`set${criteria.index}`].data.map((item) => `<li>Subject: ${item.subject} , NumberOfStudents: ${item.numberOfStudents} </li>`);
    main.innerHTML = list.join("");
  });
};


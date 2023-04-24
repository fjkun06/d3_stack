

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

    /*************************Grouping Data********************* */
    //grouping data based on year ranges (sets) and creating skeleton for final data
    filteredYears.forEach((val, index) => {
      finalYearData[`set${index}`] = {
        data: [],
        range: val,
      };
    });

    //grouping data based on subject
    filteredSubjects.forEach((val, index) => {
      finalSubjectData[`${val}`] = {
        numberOfStudents: [],
        years: filteredYears,
      };
    });

    /*************************Feeding Data********************* */
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

    [...new Array(10).keys()].forEach(async (val, index) => {
      //returning data by subject
      await data.forEach(async (item, dataIndex) => {
        if (item.Subject === filteredSubjects[index] && dataIndex !== 80) {
          // data.f
          await finalSubjectData[`${filteredSubjects[index]}`].numberOfStudents.push(item["Number of Students"]);
        }
      });
    });

    /*************************Passing Data to UI********************* */
    console.log(finalSubjectData);

    console.log(criteria.period, ":", finalYearData[`set${criteria.index}`].data);
   
    //injecting data into page
    feedList(finalYearData,criteria.index,criteria.period);
    feedYears(filteredYears)
  });
};



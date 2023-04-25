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
const getStructuredData = ({ period, type }) => {
  const finalYearData = {};
  const finalSubjectData = {};
  const SubjectData = [];
  const YearlyData = [];

  d3.csv("StanfordTopTenMajors2010s.csv").then(async (data) => {
    // filter data to get just the years
    const years = await data.map((data) => data.Year);
    const courses = await data.map((data) => data.Subject);

    //getting the year ranges (sets)
    const filteredYears = [];
    const filteredSubjects = [];
    classifier(years, filteredYears);
    classifier(courses, filteredSubjects);

    //creating abbreviations and adding to subject name
    const subjectAbbreviations = filteredSubjects.map((data) => `${data.slice(0, 3).toUpperCase()}`);
    const subjectWithAbbreviation = filteredSubjects.map((data) => `${data} (${data.slice(0, 3).toUpperCase()})`);
    [...new Array(10).fill()].map((_, index) => SubjectData.push(Object.assign({}, { name: subjectWithAbbreviation[index], abbrev: subjectAbbreviations[index] })));


    /*************************Grouping Data********************* */
    //grouping data based on year ranges (sets) and creating skeleton for final data
    filteredYears.forEach((val, index) => {
      finalYearData[`set${index}`] = {
        data: [],
        range: val,
      };
    });

    finalSubjectData.numberOfStudents = [];
    finalSubjectData.years = filteredYears;

    /*************************Feeding Data********************* */
    data.forEach(async (item, dataIndex) => {
      if (item.Year === period && dataIndex !== 80) {
        await YearlyData.push(
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

    //returning data based on aubject (period)
    data.forEach(async (item, dataIndex) => {
      if (item.Subject === (period ?? "Biology") && dataIndex !== 80) {
        await finalSubjectData.numberOfStudents.push(item["Number of Students"]);
      }
    });
    //injecting data into page
    if (type === "year") feedYearList(YearlyData, period);
    if (type === "subject") feedSubjectList(finalSubjectData, period);
    if (!yearFilter.textContent.includes("2012-13")) feedYears(filteredYears);
    if (!subjectFilter.textContent.includes("Computer Science")) feedSubjects(SubjectData);
  });
};

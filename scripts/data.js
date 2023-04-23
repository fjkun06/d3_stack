d3.csv("StanfordTopTenMajors2010s.csv").then((data) => {
  const newData = data.filter(data => data.Year === '2011-12');
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

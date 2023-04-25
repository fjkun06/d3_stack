/*************************Handling inputs********************* */
const yearHeading = document.querySelector("#yearh");
const subjectHeading = document.querySelector("#subjecth");
const main = document.querySelector("#body main section ul");
const yearFilter = document.querySelector("#year");
const subjectFilter = document.querySelector("#subject");
const mainHeading = document.querySelector("#body main section h3");

const feedYearList = (data, period) => {
  //making heading dynamic
  mainHeading.textContent = `Current Period: ${period}`;
  const list = data.map((item) => `<li>Subject: ${item.subject}, NumberOfStudents: ${item.numberOfStudents} </li>`);
  main.innerHTML = list.join("");
};

const feedSubjectList = (data, period) => {
  //making heading dynamic
  mainHeading.textContent = `Current Subject: ${period}`;
  const list = [...new Array(data.years.length).fill()].map((_, i) => `<li>Period: ${data.years[i]}, NumberOfStudents: ${data.numberOfStudents[i]} </li>`);
  // data.map((item,i) => `<li>Period: ${item.year[i]}, NumberOfStudents: ${data.numberOfStudents[i]} </li>`);
  // const list = data.map((item,i) => `<li>Period: ${item.year[i]}, NumberOfStudents: ${item.numberOfStudents[i]} </li>`);
  main.innerHTML = list.join("");
};

const feedYears = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="">
        <input type="radio"  class="yearfilter" id="choice${index}" name="year" value=${item} checked />
        <label for="choice${index}">${item}</label>
        </span>`
      : `<span class="">
        <input type="radio" class="yearfilter"  id="choice${index}" name="year" value=${item} />
        <label for="choice${index}">${item}</label>
        </span>`
  );

  yearFilter.innerHTML += jahr.join("");
};
const feedSubjects = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="">
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item.abbrev} checked />
        <label for="choice${index}n">${item.name}</label>
        </span>`
      : `<span class="">
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item.abbrev} />
        <label for="choice${index}n">${item.name}</label>
        </span>`
  );

  subjectFilter.innerHTML += jahr.join("");
  // handleInputs()
};

/*************************Handling inputs********************* */

//setting filter aside heading dynamically
const editYearFilter = (val) => {
  yearHeading.textContent = `Filter by Year:  ${val}`;
};
const editSubjectFilter = (val) => {
  subjectHeading.textContent = `Filter by Subject:  ${val}`;
};

const handleInputs = () => {
  const inputsYear = Array.from(document.querySelectorAll(".yearfilter"));
  const inputsSubject = Array.from(document.querySelectorAll(".subjectfilter"));
  const yearh = document.querySelector("#yearh");
  const subjecth = document.querySelector("#subjecth");

  //handling changes for the years
  inputsYear.forEach((input, i) => {
    input.addEventListener("change", (e) => {
      //calling function to update data
      getStructuredData({ period: e.target.value, type: "year" });
      yearh.textContent = `Filter by Year:  ${e.target.value}`;
    });
  });

  //handling changes for the subjects
  inputsSubject.forEach((input, i) => {
    input.addEventListener("change", (e) => {
      console.log(e.target.nextElementSibling.textContent.slice(0, -6).trim());
      subjecth.textContent = `Filter by Subject:  ${e.target.value}`;
      //calling function to update data
      getStructuredData({ period: e.target.nextElementSibling.textContent.slice(0, -6).trim(), type: "subject" });
      // getStructuredData({ period: e.target.value, type: "subject" });
    });
  });
};

//loading default data
window.onload = () => {
  editYearFilter("2011-12");
  editSubjectFilter("BIO");
  getStructuredData({ period: "2011-12", type: "year" });
  setTimeout(() => {
    handleInputs();
  }, 3000);
};

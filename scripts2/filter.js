/*************************Handling inputs********************* */
const yearHeading = document.querySelector("#yearh");
const subjectHeading = document.querySelector("#subjecth");
const main = document.querySelector("#body main section ul");
const mainYearContainer = document.querySelector(".year ul");
const mainSubjectContainer = document.querySelector(".subject ul");
const yearFilter = document.querySelector("#year");
const subjectFilter = document.querySelector("#subject");
const mainHeading = document.querySelector("#body main section h3");
const mainYearContainerHeading = document.querySelector(".year h3");
const mainSubjectContainerHeading = document.querySelector(".subject h3");

//Display subjects and registration as per year filter
const feedYearList = (data, period) => {
  //making heading dynamic
  mainYearContainerHeading.textContent = `Current Period: ${period}`;
  // mainHeading.textContent = `Current Period: ${period}`;
  const list = data.map((item) => `<li>Subject: ${item.subject}, NumberOfStudents: ${item.numberOfStudents} </li>`);
  mainYearContainer.innerHTML = list.join("");
  // main.innerHTML = list.join("");
};

//Display years and registration as per subject filter
const feedSubjectList = (data, period) => {
  //making heading dynamic
  mainSubjectContainerHeading.textContent = `Current Subject: ${period}`;
  // mainHeading.textContent = `Current Subject: ${period}`;
  const list = [...new Array(data.years.length).fill()].map((_, i) => `<li>Period: ${data.years[i]}, NumberOfStudents: ${data.numberOfStudents[i]} </li>`);
  // main.innerHTML = list.join("");
  mainSubjectContainer.innerHTML = list.join("");
};

//display a list of years to use as filter
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

//display a list of years to use as filter
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

const handleInputs = () => {
  const inputsYear = Array.from(document.querySelectorAll(".yearfilter"));
  const yearh = document.querySelector("#yearh");
  console.log(inputsYear);
  //handling changes for the years
  inputsYear.forEach((input, i) => {
    if (input.checked) {
      yearh.textContent = `Filter by Year:  ${input.value}`;
      test(input.value);
      console.log(input.value);
    }
    input.addEventListener("change", (e) => {
      //calling function to update data
      yearh.textContent = `Filter by Year:  ${e.target.value}`;
      test(e.target.value);
    });
  });
};

//loading default data
window.onload = () => {
  // getStructuredData({ period: "2011-12", type: "year" });
  setTimeout(() => {
    handleInputs();
  }, 1000);
};

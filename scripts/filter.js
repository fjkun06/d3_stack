/*************************Handling inputs********************* */
const yearHeading = document.querySelector("#yearh");
const subjectHeading = document.querySelector("#subjecth");
const main = document.querySelector("#body main section ul");
const yearFilter = document.querySelector("#year");
const subjectFilter = document.querySelector("#subject");
const mainHeading = document.querySelector("#body main section h3");

const feedList = (data, period) => {
  //making heading dynamic
  mainHeading.textContent = `Current Period: ${period}`;
  const list = data.map((item) => `<li>Subject: ${item.subject}, NumberOfStudents: ${item.numberOfStudents} </li>`);
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
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item} checked />
        <label for="choice${index}n">${item}</label>
        </span>`
      : `<span class="">
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item} />
        <label for="choice${index}n">${item}</label>
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
      getStructuredData({ period: e.target.value, index: i });
      yearh.textContent = `Filter by Year:  ${e.target.value}`;
    });
  });

  //handling changes for the subjects
  inputsSubject.forEach((input, i) => {
    input.addEventListener("change", (e) => {
      subjecth.textContent = `Filter by Subject:  ${e.target.value}`;
      //calling function to update data
      getStructuredData({ period: e.target.value, index: i });
    });
  });
};

//loading default data
window.onload = () => {
  editYearFilter("2011-12");
  editSubjectFilter("Biology");
  getStructuredData({ period: "2011-12" });
  setTimeout(() => {
    handleInputs();
  }, 3000);
};

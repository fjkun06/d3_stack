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
  // mainYearContainer.innerHTML = list.join("");
  // main.innerHTML = list.join("");
};

//Display years and registration as per subject filter
const feedSubjectList = (data, period) => {
  //making heading dynamic
  // mainSubjectContainerHeading.textContent = `Current Subject: ${period}`;
  // mainHeading.textContent = `Current Subject: ${period}`;
  const list = [...new Array(data.years.length).fill()].map((_, i) => `<li>Period: ${data.years[i]}, NumberOfStudents: ${data.numberOfStudents[i]} </li>`);
  // main.innerHTML = list.join("");
  // mainSubjectContainer.innerHTML = list.join("");
};

//display a list of years to use as filter
const feedYears = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="jahr" >
        <input type="radio"  class="yearfilter" id="choice${index}" name="year" value=${item} checked />
        <label for="choice${index}">${item}</label>
        </span>`
      : `<span class="jahr">
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
  const closeSvg = document.querySelector("#close");
  const g1 = document.querySelector("#g1");
  const cp1 = document.querySelector("#cp1");
  const cp2 = document.querySelector("#cp2");
  const yearContainer = document.querySelector("#year");

  //handling dropdowns
  closeSvg.addEventListener("click", () => {
    const years = d3.select("#year").selectAll("span.jahr")._groups[0];
    const data = Array.from(years);
    d3.select("#cp1").transition().duration(250)
    d3.select("#cp2").transition().duration(250)
    //displaying or hiding list elements using classes
    data.forEach((el, i) => el.classList.toggle("yeartoggle"));

    if (data.every((el) => el.classList.contains("yeartoggle"))) {
      g1.setAttribute("transform", "scale(0.75) translate(3,4)");
      cp1.setAttribute("d", "M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
      cp2.setAttribute("d", "M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
    }

    if (data.every((el) => !el.classList.contains("yeartoggle"))) {
      g1.setAttribute("transform", "scale(0.75) translate(3,2)");
      cp1.setAttribute("d", "M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z");
      cp2.setAttribute("d", "M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z");
    }
  });

  const inputsYear = Array.from(document.querySelectorAll(".yearfilter"));
  const yearh = document.querySelector("#yearh");
  const inputsSubject = Array.from(document.querySelectorAll(".subjectfilter"));
  const subjecth = document.querySelector("#subjecth");

  //handling changes for the years
  inputsYear.forEach((input, i) => {
    if (input.checked) {
      getStructuredData({ period: input.value, type: "year" });
      // yearh.textContent = `Filter by Year:  ${input.value}`;
      // yearh.innerHTML = `<h4>Filter by Year:  ${input.value} <span style='display:inline;'><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm107.31 259.31a16 16 0 01-22.62 0L256 222.63l-84.69 84.68a16 16 0 01-22.62-22.62l96-96a16 16 0 0122.62 0l96 96a16 16 0 010 22.62z"/></svg></span></h4>`;
    }
    input.addEventListener("change", (e) => {
      //calling function to update data
      getStructuredData({ period: e.target.value, type: "year" });
      // yearh.textContent = `Filter by Year:  ${e.target.value}`;
      // yearh.innerHTML = `<h4>Filter by Year:  ${input.value} <span style='display:inline;'>V</span></h4>`;
    });
  });

  //handling changes for the subjects
  inputsSubject.forEach((input, i) => {
    if (input.checked) {
      getStructuredData({ period: input.nextElementSibling.textContent.slice(0, -6).trim(), type: "subject" });
      subjecth.textContent = `Filter by Subject:  ${input.value} <span>V</span>`;
    }
    input.addEventListener("change", (e) => {
      subjecth.textContent = `Filter by Subject:  ${e.target.value} <span>V</span>`;
      //calling function to update data
      getStructuredData({ period: e.target.nextElementSibling.textContent.slice(0, -6).trim(), type: "subject" });
      // getStructuredData({ period: e.target.value, type: "subject" });
    });
  });
};

//loading default data
window.onload = () => {
  getStructuredData({ period: "2011-12", type: "year" });
  setTimeout(() => {
    handleInputs();
  }, 3000);
};

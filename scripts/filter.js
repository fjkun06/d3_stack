const test = (val) => console.log(val);
//  export default test

const feedList = (data, index, period) => {
  //making heading dynamic
  mainHeading.textContent = `Current Period: ${period}`;
  const list = data[`set${index}`].data.map((item) => `<li>Subject: ${item.subject} , NumberOfStudents: ${item.numberOfStudents} </li>`);
  main.innerHTML = list.join("");
};
const feedYears = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="">
        <input type="radio" id="choice${index}" name="contact" value=${item} checked />
        <label for="choice${index}">${item}</label>
        </span>`
      : `<span class="">
        <input type="radio" id="choice${index}" name="contact" value=${item} />
        <label for="choice${index}">${item}</label>
        </span>`
  );

  yearFilter.innerHTML += jahr.join("");
  console.log(Array.from(document.querySelectorAll("input")));
  // window.onload = () => {
  // editFilter("2011-14");+
  // getStructuredData({ period: "2011-13", index: 0 });
  // };
};

/*************************Handling inputs********************* */
let filter;
const heading = document.querySelector("h4");
const inputs = Array.from(document.querySelectorAll("input"));
const main = document.querySelector("#body main section ul");
const yearFilter = document.querySelector("#body main aside");
const mainHeading = document.querySelector("#body main section h3");
// console.log(inputs);

window.onload = () => {
  editFilter("2011-12");
  getStructuredData({ period: "2012-13", index: 0 });
};

inputs.forEach((input, i) => {
  input.addEventListener("change", (e) => {
    console.log(e);
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

const handleInputs = () => {};

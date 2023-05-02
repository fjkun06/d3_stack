// /*************************Handling inputs********************* */
// let filter;
// const heading = document.querySelector("h4");
// const inputs = Array.from(document.querySelectorAll("input"));
// const main = document.querySelector("#body main section ul");
// const yearFilter = document.querySelector("#body main aside");
// const mainHeading = document.querySelector("#body main section h3");
// console.log(inputs);

// window.onload = () => {
//   editFilter("2011-12");
//   getStructuredData({ period: "2011-12", index: 0 });
//   console.log('====================================');
//   console.log( Array.from(document.querySelectorAll("input")));
//   console.log('====================================');
// };

// inputs.forEach((input, i) => {
//   input.addEventListener("change", (e) => {
//     console.log(e);
//     editFilter(e.target.value);
//     //calling function to update data
//     getStructuredData({ period: e.target.value, index: i });
//   });
// });

// //setting filter aside heading dynamically
// const editFilter = (val) => {
//   console.log(`Filter value: ${val}`);
//   heading.textContent = `Filter by Year:  ${val}`;
// };
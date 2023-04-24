// document.querySelector("body main").style.overflow = "hidden";
const loader = document.getElementById("loader");
const content = document.getElementById("body");
let timer;
let count = 0;
const cancel = (timestamp) => {
  if (count === undefined) {
    count = timestamp;
  }
  const elapsed = timestamp - count;
  // console.log(elapsed);
  //do this after 5s
  if (elapsed > 4800) {
    content.style.display = "grid";
  }
  if (elapsed > 5000) {
    // document.querySelector("body main").style.overflow = "";
    loader.style.display = "none";
    cancelAnimationFrame(timer);
  }

  timer = requestAnimationFrame(cancel);
};

requestAnimationFrame(cancel);


const x = 10
const y = 5
test(555)

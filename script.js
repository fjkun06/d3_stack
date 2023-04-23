// document.querySelector("body main").style.overflow = "hidden";
const loader = document.getElementById("loader");
let timer;
let count = 0;
const cancel = (timestamp) => {
  if (count === undefined) {
    count = timestamp;
  }
  const elapsed = timestamp - count;
  // console.log(elapsed);
  //do this after 5s
  if (elapsed > 5000) {
    // document.querySelector("body main").style.overflow = "";
    loader.style.display = "none";
    cancelAnimationFrame(timer);
  }

  timer = requestAnimationFrame(cancel);
};

requestAnimationFrame(cancel);

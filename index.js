const BOXWIDTH = 240;
const GAP = 10;
const CONTAINER = document.querySelector(".container");
const WIDTH_MARGIN = 40;
function waterFall() {
  CONTAINER.parentNode.style.width = window.innerWidth - WIDTH_MARGIN + "px";
  function getHeight() {
    height = Math.floor(Math.random() * 200 + 200) + "px";
    return height;
  }
  
  function getRandomColor() {
    return (
      "#" +
      ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
    );
  }
  function createBox(index) {
    oDivBox = document.createElement("div");
    oDivBox.classList = "box";
    oDivBox.style.lineHeight = oDivBox.style.height = getHeight();
    oDivBox.style.backgroundColor = getRandomColor();
    oDivBox.style.width = BOXWIDTH + "px";
    oDivBox.style.fontSize = "48px";
    oDivBox.style.textAlign = "center";
    oDivBox.style.verticalAlign = "middle";
    oDivBox.style.color = "#fff";
    oDivBox.innerText = `${index}`;
    return oDivBox;
  }

  for (let i = 0; i < 60; i++) {
    CONTAINER.append(createBox(i));
  }

  let viewport = document.querySelector(".box").parentNode.parentNode
    .clientWidth;

  let columns = Math.floor(viewport / (BOXWIDTH + GAP));

  let divArrDOM = document.querySelectorAll(".box");
  let lineHeightArr = [];

  for (let i = 0; i < divArrDOM.length; i++) {
    if (i < columns) {
      divArrDOM[i].style.top = 0 + "px";
      divArrDOM[i].style.left = 0 + i * BOXWIDTH + i * GAP + "px";
      lineHeightArr.push(divArrDOM[i].offsetHeight);
    } else {
      let minLineHeight = lineHeightArr[0];
      let indexHeight = 0;
      for (let j = 0; j < lineHeightArr.length; j++) {
        if (minLineHeight > lineHeightArr[j]) {
          minLineHeight = lineHeightArr[i];
          indexHeight = j;
        }
      }

      divArrDOM[i].style.top = lineHeightArr[indexHeight] + GAP + "px";
      divArrDOM[i].style.left = divArrDOM[indexHeight].offsetLeft + "px";

      lineHeightArr[indexHeight] =
        lineHeightArr[indexHeight] + divArrDOM[i].offsetHeight + GAP;
    }
  }

  CONTAINER.style.width = columns * BOXWIDTH + (columns - 1) * GAP + "px";
  //   form resize

  let oform = document.querySelector(".form-container");
  oform.style.width = CONTAINER.style.width;
}

waterFall();
window.onresize = function () {
  waterFall();
};

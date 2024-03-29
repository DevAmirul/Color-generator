
let div = null;

//create onload handler
window.onload = () => {
   main();
};

function main() {
   const root = document.getElementById("root");
   const output = document.getElementById("output");
   const changeBtn = document.getElementById("change-btn");
   const copyBtn = document.getElementById("copy-btn");

   changeBtn.addEventListener("click", function () {
      const bgColor = generateHexColor();
      root.style.backgroundColor = bgColor;
      output.value = bgColor;
   });

   copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(output.value);
      if (div !== null) {
         div.remove();
         div = null;
      }
      if (isValidHex(output.value)) {
         generateToastMessage(`${output.value} copied`);
      } else {
         alert("Please enter a valid code");
      }
   });

   output.addEventListener("keyup", function (e) {
      const color = e.target.value;
      if (isValidHex(color)) {
         root.style.backgroundColor = color;
      }
   });
}

//random color generator function
function generateHexColor() {
   // #000000 #ffffff
   // 255, 255, 255 -> #FFFFFF
   const red = Math.floor(Math.random() * 255);
   const green = Math.floor(Math.random() * 255);
   const blue = Math.floor(Math.random() * 255);

   return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

// Tost message generator function
function generateToastMessage(msg) {
   div = document.createElement("div");
   div.innerText = msg;
   div.className = "toast-message toast-message-slide-in";

   div.addEventListener("click", function () {
      div.classList.remove("toast-message-slide-in");
      div.classList.add("toast-message-slide-out");

      div.addEventListener("animationend", function () {
         div.remove();
         div = null;
      });
   });

   document.body.appendChild(div);
}

//hexacolor code validition function
function isValidHex(color) {
   if (color.length !== 7) return false;
   if (color[0] !== "#") return false;

   color = color.substring(1);
   return /^[0-9a-fA-F]{6}$/i.test(color);
}

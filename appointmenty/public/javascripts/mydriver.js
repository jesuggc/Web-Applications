// import { driver } from "/driver.js";
// import "driver.js/dist/driver.css";

// const driverObj = driver({
//   showProgress: true,
//   steps: [
//     { element: '.register', popover: { title: 'Registro', description: 'Pulsa este boton para registrarte' } },
//     // { element: '.top-nav', popover: { title: 'Title', description: 'Description' } },
//     // { element: '.sidebar', popover: { title: 'Title', description: 'Description' } },
//     // { element: '.footer', popover: { title: 'Title', description: 'Description' } },
//   ]
// });
const registerButton = document.getElementById("tutorial");

const driver = window.driver.js.driver;
const driverObj = driver();


registerButton.addEventListener('click', () => {
  driverObj.highlight({
    element: "#register",
    popover: {
      title: "Title",
      description: "Description"
    }
  });

});
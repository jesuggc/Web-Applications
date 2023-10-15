const URL = "https://v2.jokeapi.dev/joke/Any"
const button = document.getElementById("nextButton");


const getData = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if(data.type==="twopart") {
            document.getElementById("joke").innerHTML = data.setup;
            document.getElementById("delivery").innerHTML = data.delivery;
        }
        else {
            document.getElementById("joke").innerHTML = data.joke;
        }
    })
}

const cleanData = () => {
    document.getElementById("joke").innerHTML = "";
    document.getElementById("delivery").innerHTML = "";
}

const nextJoke = () => {
    cleanData();
    getData();
}


getData();
button.addEventListener("click", nextJoke);
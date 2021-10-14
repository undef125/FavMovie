const addBtn = document.querySelector(".Add");
const addBtnFinal = document.querySelector(".add-final");
const cancelBtn = addBtnFinal.nextElementSibling;
const backDrop = document.getElementById("backd");
const backDrop2 = document.getElementById("backd2");
const addItems = document.querySelector(".movieListParent");
const overlay = document.getElementById("overl");
const userInputs =
    overlay.firstElementChild.nextElementSibling.querySelectorAll("input");
const delBox = document.querySelector(".delete-cofc");
const delBtns = document.querySelector(".btns");

let moviesArray = [];

const toggle = () => {
    overlay.classList.toggle("visible");
    backDrop.classList.toggle("backdrop");
    clearInputs();
};

const toggleDelConf = () => {
    delBox.classList.toggle("visible");
    backDrop2.classList.toggle("backdrop");
};

const clearInputs = () => {
    for (const inputs of userInputs) {
        inputs.value = "";
    }
};

const addMovie = () => {
    const movieName = userInputs[0].value;
    const movieRating = userInputs[1].value;
    const movieImgUrl = userInputs[2].value;

    if (
        movieName.trim() === "" ||
        movieRating < 0 ||
        movieRating > 10 ||
        movieRating === '' ||
        movieImgUrl.trim() === ""
    ) {
        alert("Invalid Input");
    } else {
    const newMovie = {
        title: movieName,
        rating: movieRating,
        imageurl: movieImgUrl,
    };

    moviesArray.push(newMovie);
    let lis = document.createElement("li");
    lis.className = "movie";
    lis.innerHTML = `<div class="img-div">
                        <img src="${movieImgUrl}" alt="${movieName}">
                    </div>
                    <div class="name-div">${movieName}</div>
                    <div class="rating-div">${movieRating}</div>
                    <div class="del"><img src="img/delete.png" alt="delete-icon" class="del-icon"></div>`;
    addItems.append(lis);
    lis.lastChild.addEventListener(
        "click",
        deleteMovieConfirmation.bind(null, newMovie.title)
    );
    toggle();
    }
};

const deleteMovieConfirmation = (name) => {
    toggleDelConf();
    delBtns.firstElementChild.replaceWith(
        delBtns.firstElementChild.cloneNode(true)
    ); //will replace the actual button with the clone of itself everytime so that each time we add event listener it gets attached to the new button so that the old event listener won't be called
    delBtns.firstElementChild.addEventListener(
        "click",
        delMovie.bind(null, name)
    );
    delBtns.lastElementChild.removeEventListener("click", toggleDelConf); //removing old event listener the parameter must be same as that of eventlistener
    delBtns.lastElementChild.addEventListener("click", toggleDelConf); //Here event listener gets called everytime so there will be many event listener to one button which will get executed once means many execution at once so we need to remove the existing eventlisteners
};

const delMovie = (mName) => {
    let toDelIndex = 1;
    const moviesList = document.querySelector(".movieListParent");
    for (const movie of moviesArray) {
        if (movie.title === mName) {
            break;
        }
        toDelIndex++;
    }
    moviesList.children[toDelIndex].remove();
    moviesArray.splice(toDelIndex - 1, 1);
    console.log(moviesArray);
    toggleDelConf();
};

addBtn.addEventListener("click", toggle);
addBtnFinal.addEventListener("click", addMovie);
cancelBtn.addEventListener("click", toggle);
backDrop.addEventListener("click", toggle);
backDrop2.addEventListener("click", toggleDelConf);

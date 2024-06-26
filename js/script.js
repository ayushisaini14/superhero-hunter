// Selecting the element from DOM
let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

// Adding eventListener to search bar
searchBar.addEventListener("input", () => fecthHeros(searchBar.value));

// function for API call
async function fecthHeros(Search) {
  let PUBLIC_KEY = "6db35f6efa92ce37819fcfde849b2496";
  let PRIVATE_KEY = "50d96258abc37be78ce805c440b2d79d009c1fca";

  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

  // API call to get the data

  // To fetch default records
  let url = `https://gateway.marvel.com/v1/public/characters?limit=30&ts=${ts}&apikey=6db35f6efa92ce37819fcfde849b2496&hash=${hash}`;
  if (Search) {
    // To fetch searched records
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${Search}&ts=${ts}&apikey=6db35f6efa92ce37819fcfde849b2496&hash=${hash}`;
  }
  await fetch(url)
    .then((res) => res.json()) //Converting the data into JSON format
    .then((data) => showSearchedResults(data.data.results)); //sending the searched results characters to show in HTML
}

// Function for displaying the searched results in DOM
function showSearchedResults(searchedHero) {
  // if the id exist in localStorage favourites array then we display "Remove from favourites" button otherwise we display "Add to favourites button"
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
  if (!favouritesCharacterIDs) {
    // If we didn't get the favouritesCharacterIDs then we iniitalize it with empty map
    favouritesCharacterIDs = new Map();
  } else {
    // If the we got the favouritesCharacterIDs in localStorage then parsing it and converting it to map
    favouritesCharacterIDs = new Map(
      JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );
  }

  searchResults.innerHTML = ``;

  // iterating the searchedHero array using for loop
  for (const key in searchedHero) {
    let hero = searchedHero[key];
    // Appending the element into DOM
    searchResults.innerHTML += `
               <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                         <img src="${
                           hero.thumbnail.path +
                           "/portrait_medium." +
                           hero.thumbnail.extension
                         }" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./more-info.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                         </div>
                    </div>
                    <div class="flex-col buttons">
                         <button class="btn add-to-fav-btn">${
                           favouritesCharacterIDs.has(`${hero.id}`)
                             ? "Remove from Favourites"
                             : "Add to Favourites</button>"
                         }
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${
                           hero.thumbnail.path +
                           "/portrait_uncanny." +
                           hero.thumbnail.extension
                         }</span>
                         <span>${hero.id}</span>
                         <span>${
                           hero.thumbnail.path +
                           "/landscape_incredible." +
                           hero.thumbnail.extension
                         }</span>
                         <span>${
                           hero.thumbnail.path +
                           "/standard_fantastic." +
                           hero.thumbnail.extension
                         }</span>
                    </div>
               </li>
               `;
  }
  // Adding the events to the buttons after they are inserted in dom
  events();
}

// Function for adding eventListener to buttons
function events() {
  let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
  favouriteButton.forEach((btn) =>
    btn.addEventListener("click", addToFavourites)
  );

  let characterInfo = document.querySelectorAll(".character-info");
  characterInfo.forEach((character) =>
    character.addEventListener("click", addInfoInLocalStorage)
  );
}

// Function invoked when "Add to Favourites" button or "Remvove from favourites" button is click
function addToFavourites() {
  // If add to favourites button is clicked then
  if (this.innerHTML == "Add to Favourites") {
    // We cretate a new object containg revelent info of hero and push it into favouritesArray
    let heroInfo = {
      name: this.parentElement.parentElement.children[2].children[0].innerHTML,
      description:
        this.parentElement.parentElement.children[2].children[1].innerHTML,
      comics:
        this.parentElement.parentElement.children[2].children[2].innerHTML,
      series:
        this.parentElement.parentElement.children[2].children[3].innerHTML,
      stories:
        this.parentElement.parentElement.children[2].children[4].innerHTML,
      portraitImage:
        this.parentElement.parentElement.children[2].children[5].innerHTML,
      id: this.parentElement.parentElement.children[2].children[6].innerHTML,
      landscapeImage:
        this.parentElement.parentElement.children[2].children[7].innerHTML,
      squareImage:
        this.parentElement.parentElement.children[2].children[8].innerHTML,
    };

    // getting the favourites array which stores objects of character
    // We get null is no such array is created earlier i.e user is running the website for the first time
    let favouritesArray = localStorage.getItem("favouriteCharacters");

    // If favouritesArray is null (for the first time favourites array is null)
    if (!favouritesArray) {
      // favourites array is null so we create a new array
      favouritesArray = [];
    } else {
      // if it is not null then we parse so that it becomes an array
      favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
    }

    // favouritesCharacterIDs is taken from localStorage for adding ID of the character which is added in favourites
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

    if (!favouritesCharacterIDs) {
      // If we did't get the favouritesCharacterIDs then we iniitalize it with empty map
      favouritesCharacterIDs = new Map();
    } else {
      // getting the map as object from localStorage and pasrsing it and then converting into map
      favouritesCharacterIDs = new Map(
        JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
      );
    }

    // again setting the new favouritesCharacterIDs array to localStorage
    favouritesCharacterIDs.set(heroInfo.id, true);

    // adding the above created heroInfo object to favouritesArray
    favouritesArray.push(heroInfo);

    // Storing the new favouritesCharactersID map to localStorage after converting to string
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );
    // Setting the new favouritesCharacters array which now has the new character
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(favouritesArray)
    );

    // Convering the "Add to Favourites" button to "Remove from Favourites"
    this.innerHTML = "Remove from Favourites";
  }
  // For removing the character form favourites array
  else {
    // storing the id of character in a variable
    let idOfCharacterToBeRemoveFromFavourites =
      this.parentElement.parentElement.children[2].children[6].innerHTML;

    // getting the favourites array from localStorage for removing the character object which is to be removed
    let favouritesArray = JSON.parse(
      localStorage.getItem("favouriteCharacters")
    );

    // getting the favaourites character ids array for deleting the character id from favouritesCharacterIDs also
    let favouritesCharacterIDs = new Map(
      JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );

    // will contain the characters which should be present after the deletion of the character to be removed
    let newFavouritesArray = [];

    // deleting the character from map using delete function where id of character acts as key
    favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

    // creating the new array which does not include the deleted character
    // iterating each element of array
    favouritesArray.forEach((favourite) => {
      // if the id of the character doesn't matches the favourite (i.e a favourite character) then we append it in newFavourites array
      if (idOfCharacterToBeRemoveFromFavourites != favourite.id) {
        newFavouritesArray.push(favourite);
      }
    });

    // Updating the new array in localStorage
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(newFavouritesArray)
    );
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );

    // Convering the "Remove from Favourites" button to "Add to Favourites"
    this.innerHTML = "Add to Favourites";
  }
}

// Function which stores the info object of character for which user want to see the info
function addInfoInLocalStorage() {
  // This function basically stores the data of character in localStorage.
  // When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data
  let heroInfo = {
    name: this.parentElement.parentElement.parentElement.children[2].children[0]
      .innerHTML,
    description:
      this.parentElement.parentElement.parentElement.children[2].children[1]
        .innerHTML,
    comics:
      this.parentElement.parentElement.parentElement.children[2].children[2]
        .innerHTML,
    series:
      this.parentElement.parentElement.parentElement.children[2].children[3]
        .innerHTML,
    stories:
      this.parentElement.parentElement.parentElement.children[2].children[4]
        .innerHTML,
    portraitImage:
      this.parentElement.parentElement.parentElement.children[2].children[5]
        .innerHTML,
    id: this.parentElement.parentElement.parentElement.children[2].children[6]
      .innerHTML,
    landscapeImage:
      this.parentElement.parentElement.parentElement.children[2].children[7]
        .innerHTML,
    squareImage:
      this.parentElement.parentElement.parentElement.children[2].children[8]
        .innerHTML,
  };

  localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

window.onload = () => fecthHeros(null);

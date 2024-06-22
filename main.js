
// Main functions
let definition;

async function fetchWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {mode: 'cors'});
    return await response.json();
  }



function checkWord (word) {
    fetchWord(word)
        .then(function (result){
            definition = result;
            checkIfExistsAndAppend(definition);
        })
}

// Get definition of word from search bar
function checkInput() {
    let input = document.querySelector("div.search > input.input");

    if (input.value != "") {
        checkWord(input.value);
        input.value = "";
    } else {
        input.placeholder = "Type word to check definition";
    }

}

// Keyboard support
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkInput()
    }
})

// Check if word exists in dictionary
function checkIfExistsAndAppend(definition){

    if (definition.title == "No Definitions Found") {
        body.innerHTML = "";
        error();
    } else if (definition.title != "No Definitions Found") {
        console.log(definition);
        createDom();
    } else {
        body.innerHTML = "";
        error();
    }

}



// Create DOM
const body = document.querySelector("div#body");

function createDom() {
    body.innerHTML = "";
    createTitle();
    createDetails();
    createDefinitions();
}

function error() {
    let title = document.createElement("h1");
    title.textContent = "Word not found"
    body.appendChild(title);
}

function createTitle() {
    let title = document.createElement("h1");
    title.textContent = definition[0].word;
    body.appendChild(title);

}

function createDefinitions() {
    let definitionUl = document.createElement("ul");
    definitionUl.className = "definitions";

    for (let i = 0; i < definition[0].meanings[0].definitions.length; i++) {
        let li = document.createElement("li")
        li.textContent = definition[0].meanings[0].definitions[i].definition;
        li.className = "definition";
        definitionUl.appendChild(li);
        console.log(i);
    }

    body.appendChild(definitionUl);
}

function createDetails() {
    let type = document.createElement("p");
    type.className = "type";
    type.textContent = definition[0].meanings[0].partOfSpeech;

    let phonetic = document.createElement("p");
    phonetic.className = "phonetic"
    phonetic.textContent = definition[0].phonetic;

    body.append(phonetic, type);
}


// definition[0].meanings[0].definitions[0].definition
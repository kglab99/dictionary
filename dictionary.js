// Main functions
let definition;

async function fetchWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {mode: 'cors'});
    return await response.json();
  }

checkWord("programming");

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
        clear();
        error();
    } else if (definition.title != "No Definitions Found") {
        clear();
        buildDom();

    } else {
        clear();
        error();
    }

}

// build DOM
const divBody = document.querySelector("div#body");
const menu = document.querySelector("div#menu");
const title = document.querySelector("h1");

function buildDom() {
    title.textContent = definition[0].word;
    menu.insertAdjacentElement("beforebegin",title);


    const phonetic = document.querySelector("p.phonetic");
    phonetic.textContent = definition[0].phonetic;
    

    definition.forEach((element) => {

        element.meanings.forEach((element1) => {
            const div = document.createElement("div");
            div.className = `part ${element1.partOfSpeech}`;

            const part = document.createElement("p");
            part.className = "part"
            part.textContent = element1.partOfSpeech;

            part.addEventListener("click", () => {
                hideParts();
                div.style.display = "flex";
            })

            menu.appendChild(part);

            const partBody = document.createElement("p");
            partBody.className = "part-body"
            partBody.textContent = element1.partOfSpeech;
            div.appendChild(partBody);
            divBody.appendChild(div);

            element1.definitions.forEach((element2) => {
                const definitionUL = document.createElement("ul");
                const definition = document.createElement("li");
                definition.className = "definition"
                definition.textContent = element2.definition;
                definitionUL.appendChild(definition);
                div.appendChild(definitionUL);

                if (element2.example != undefined) {
                    const example = document.createElement("p");
                    example.className = "example"
                    example.textContent = `${element2.example}`;
                    div.appendChild(example);
                }

            })
        
        })
    })
}

function error() {
    let title = document.createElement("h1");
    title.textContent = "Word not found"
    divBody.appendChild(title);
}


function hideParts() {
    let partsOfSpeech = divBody.childElementCount;
    // Start from 1! The first child is phonetic

    for (i = 1; i <= partsOfSpeech; i++) {
        partDiv = document.querySelector(`div.part:nth-child(${i})`);
        partDiv.style.display = "none";
    }

}

function clear() {
    document.querySelector("p.phonetic").innerHTML = "";
    divBody.innerHTML = "";
    menu.innerHTML = "";
    title.innerHTML = "";
}
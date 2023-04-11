const wrapper = document.querySelector(".wrapper")
searchInput = wrapper.querySelector("input")
infoText = wrapper.querySelector(".info-text")
volumeIcon = wrapper.querySelector(".word i")
removeIcon = wrapper.querySelector(".search span")
let audio

function data(result, word) {
    if(result.title) {
        infoText.innerHTML = `Cant find the meaning of ${word}`
    } else {
        wrapper.classList.add("active")
        let defone = result[0].meanings[0].definitions[0]
        let deftwo = result[0].meanings[0].definitions[1]
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`
        document.querySelector(".word p").innerText = result[0].word
        document.querySelector(".word span").innerText = phonetics
        document.querySelector(".meaning span").innerText = defone.definition
        document.querySelector(".example span").innerText = deftwo.definition
        audio = new Audio(result[0].phonetics[0].audio)
    }
}

function search(word) {
    searchInput.value=word
    fetchApi(word)
}

function fetchApi(word) {
    infoText.style.color = "#000"
    infoText.innerText = `Searching for the meaning of ${word}`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res => res.json()).then(result => data(result, word))
}

searchInput.addEventListener("keyup", e => {
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key === "Enter" && word) {
        fetchApi(word)
    }
})

volumeIcon.addEventListener("click", () => {
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
})

removeIcon.addEventListener("click", () => {
    searchInput.value = ""
    searchInput.focus()
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
})
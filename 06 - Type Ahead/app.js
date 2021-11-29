const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search")
const suggestions = document.querySelector(".suggestions")

const cities = []

fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        cities.push(...data)
        // console.log(cities)
    })

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, "gi")
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let userInput = searchInput.value
    const matchArray = findMatches(userInput, cities)
    // console.log(matchArray)

    const html = matchArray.map(place => {
        const regex = new RegExp(userInput, "gi")
        const cityName = place.city.replace(regex, `<span class="hl">${userInput}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${userInput}</span>`)
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
    }).join("")
    suggestions.innerHTML = html

})
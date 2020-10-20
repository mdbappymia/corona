var inputCountry = document.getElementById('input-country')
var countryName = document.getElementById('country-name')
var date = document.getElementById('date')
var todayTotalrecover = document.getElementById('t-t-recover')
var todayTotalCase = document.getElementById('t-t-case')
var todayTotalDeath = document.getElementById('t-t-death')
var Totalrecover = document.getElementById('total-recover')
var TotalCase = document.getElementById('total-case')
var TotalDeath = document.getElementById('total-death')
var TotalPopulation = document.getElementById('total-population')
const BASE_URL = `https://api.covid19api.com/summary`
const DEFAULT_COUNTRY = 'bangladesh'

var url = BASE_URL


axios.get(BASE_URL)
    .then(({ data }) => {
        let country = {
            country: data.Countries
        }

        var arr = country.country
        for (var i = 0; i < arr.length; i++) {
            allCountrySet(arr[i])
            console.log(arr[i].Country)

        }
        console.log(arr)
        inputCountry.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (e.target.value != '') {
                    var resultObject = search(e.target.value, arr);
                    console.log(resultObject)
                    setHtml(resultObject);
                    e.target.value = ''
                }

            }

        })
        resultObject = search('BD', arr);
        setHtml(resultObject);


    })
    .catch(e => {
        console.log(e)
    })


function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Slug === nameKey) {
            return myArray[i];
        } else if (myArray[i].Country === nameKey) {
            return myArray[i];
        } else if (myArray[i].CountryCode === nameKey) {
            return myArray[i];
        }
    }
}

function setHtml(resultObject) {
    countryName.innerHTML = resultObject.Country
    todayTotalCase.innerHTML = resultObject.NewConfirmed
    todayTotalDeath.innerHTML = resultObject.NewDeaths
    todayTotalrecover.innerHTML = resultObject.NewRecovered
    TotalCase.innerHTML = resultObject.TotalConfirmed
    TotalDeath.innerHTML = resultObject.TotalDeaths
    Totalrecover.innerHTML = resultObject.TotalRecovered
}


var allCountryName = document.getElementById("myList")
var allTotalCase = document.getElementById('a-total-case')
var allCountry = document.getElementById('all-country')
function allCountrySet(c) {

}



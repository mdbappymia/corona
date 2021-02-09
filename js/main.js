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
        var temp = []
        for (var i = 0; i < arr.length; i++) {
            allCountrySet(arr[i])
            temp.push(arr[i].Country)
        }
        var countries = temp
        function createMenuItem(name) {
            let li = document.createElement('div');
            li.textContent = name;
            return li;
        }
        function allCountrySet(c) {
            const menu = document.querySelector('#container');
            menu.appendChild(createMenuItem("Country Name: " + c.Country)).className = 'allCountryName';
            menu.appendChild(createMenuItem("New Confirmed: " + c.NewConfirmed)).className = 'allCountryTTCase bg-warning';
            menu.appendChild(createMenuItem("New Deaths: " + c.NewDeaths)).className = 'allCountryTTDeaths bg-danger';
            menu.appendChild(createMenuItem("New Recovered: " + c.NewRecovered)).className = `allCountryTTRecovered bg-success`;
            menu.appendChild(createMenuItem("Total Confirmed: " + c.TotalConfirmed)).className = 'allCountryTTCase';
            menu.appendChild(createMenuItem("Total Deaths: " + c.TotalDeaths)).className = 'allCountryTDeadts';
            menu.appendChild(createMenuItem("Total Recovered: " + c.TotalRecovered)).className = 'allCountryTRecovered';

        }


        inputCountry.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (e.target.value != '') {
                    var resultObject = search(e.target.value.trim(), arr);
                    console.log(resultObject)
                    setHtml(resultObject);
                    e.target.value = ''
                }

            }

        })



        resultObject = search('BD', arr);
        setHtml(resultObject);



        //Auto complate//
        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            var b = search(inp.value, country.country)
                            setHtml(b)
                            /*close the list of autocompleted values,               
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function (e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                }

            });
            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });

        }
        autocomplete(inputCountry, countries);

        //auto complate//
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




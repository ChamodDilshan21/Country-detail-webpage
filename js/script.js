
let finalResult = "";

function getValuesFromArray(List) {
    let listItems = "";
    for (let element of List) {
        listItems += element + ", ";
    }
    return listItems.slice(0, -2);
}

function numberFormat(number) {
    if (number > 1000000) {
        number = (number / 1_000_000).toFixed(1);
        return `${number} million`;
    } else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

//---------------------Adding API data to show in the website-----------------------
fetch(`https://restcountries.com/v3.1/all`)
.then(response => response.json())
.then(data => {
        console.log(data[203]);
        data.forEach(element => {
            finalResult += `
            <div class="col">
            <div class="card">
            <img src="${element.flags.svg}" class="card-img-top" alt="${element.flags.alt}">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.name.common}</h5>
                    <p class="card-text"><span class="fw-bold">Capital : </span> ${element.capital}</p>
                    <p class="card-text"><span class="fw-bold">Region : </span> ${element.region}</p>
                    <p class="card-text"><span class="fw-bold">Popualtion : </span>
                        ${numberFormat(element.population)}</p>
                        <button type="button" class="btn learn-more" onclick="window.open('${element.maps.googleMaps}', '_blank')">
                        <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Google Map</span>
                    </button>
                </div>
            </div>
        </div>`;
    });
    document.getElementById("row").innerHTML = finalResult ;
});

//-----------Search Box-------------------------------
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const snippets = document.querySelectorAll(".col");

    snippets.forEach(snippet => {
        const title = snippet.querySelector("h5").textContent.toLowerCase();
        if (title.includes(query)) {
            snippet.classList.remove("hidden"); // Show matching snippet
        } else {
            snippet.classList.add("hidden"); // Hide non-matching snippet
        }
    });
});



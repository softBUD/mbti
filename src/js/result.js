const resultWrap = document.querySelector(".result-wrap");
const url = window.location.href;
const urlSplit = url.split("/");
const breedPk = parseInt(urlSplit[urlSplit.length - 1], 10 );

function getData() {
    const loadingContainer =document.querySelector('.loading-container');
    const resultContainer = document.querySelector('.result-container');

    fetch("../data/result.json")
        .then((response) => response.json())
        .then(data => {
            loadingContainer.style.display = "none";
            resultContainer.style.display = "block";
            const breedData = data [breedPk - 1];

            setElement(breedData);
        })
}
getData();

function setElement(data) {
    const tempContainer = document.createElement("div");
    for(let feature of data.features) {
        tempContainer.innerHTML += `<li>${feature}</li>`
    }

    resultWrap.innerHTML = `
    <div class="result-title">${data.title}</div>
        <div class="result-name">${data.name}</div>
        <div class="result-image">
            <img src="${data.img}" alt="">
        </div>
        <div class="result-features">
            <h3 class="result-features-title">나와 맞는 유형은 ${data.name}?!</h3>
            <ul class="result-features-desc">
                ${tempContainer.innerHTML}
            </ul>
        </div>
        `;

    tempContainer.remove();
}
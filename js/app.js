document.getElementById('error1').style.display = 'none'

const getInput = () => {
    const inputValue = document.getElementById('input-filed');
    const searchText = inputValue.value;
    inputValue.value = '';
    if (searchText === '') {
        document.getElementById('error1').style.display = 'block'
    }
    else {
        const url = `https://restcountries.eu/rest/v2/name/${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => showCountry(data))
    }
};

const showCountry = (country) => {
    const conutryContainer = document.getElementById('conutryContainer');
    conutryContainer.textContent = ''
    country.forEach(item => {

        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
            <img src="${item.flag}" class="img fluid w-75"/>
            <h5>${item.name}</h5>
            <button onclick="showModalData('${item.name}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            View Details
        </button>
            `;
        conutryContainer.appendChild(div);


    });
};

const showModalData = (data) => {

    fetch(`https://restcountries.eu/rest/v2/name/${data}`)
        .then(res => res.json())
        .then(result => resultShow(result[0]))
};
const resultShow = (data) => {

    const container = document.getElementById('modal-container');
    container.innerHTML = `
          <div>
          <h1>${data.name}</h1>
          <img   src="${data.flag}" width="400px"/>
         <ul >
         <li>capital: ${data.capital}</li>
         <li>population: ${data.population}</li>
         <li>Taka: ${data.currencies[0].name}</li>
         <li>code: ${data.currencies[0].code}</li>
         <li>symbol: ${data.currencies[0].symbol}</li>
         <li>symbol: ${data.languages[0].name}</li>
         </ul>
          </div>
            
            `;

}




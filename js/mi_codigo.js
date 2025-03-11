const buscarCharacters = document.getElementById('buscarCharacters');

const charactersContainer = document.getElementById('characters');
const nameFilters = document.getElementById('nameFilters');
const raceFilters = document.getElementById('raceFilters');


buscarCharacters.addEventListener('click', () => {
    getCharacters();
});


function getCharacters() {
    const nameFilter = nameFilters.value;
    const urlDragon = `https://dragonball-api.com/api/characters?name=${nameFilter}&limit=58`; 

    const opciones = {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    };

    fetch(urlDragon, opciones) 

        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayCharacters(data); 
            console.log('Personajes', data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        })
        .finally(() => {
            console.log('Finalizo la petición');
        });
}

function displayCharacters(characters) {
    charactersContainer.innerHTML = ''; 
    for (let character of characters) {
        const card = document.createElement('div');
        card.classList.add('character-card', 'col-12', 'col-md-8', 'col-lg-3', 'fondo', 'text-center', 'rounded'); 

        const img = document.createElement('img');
        img.src = character.image;
        img.classList.add('img-fluid', 'w-75', 'goku');

        const nombre = document.getElementById('nombre');
        nombre.textContent = nameFilters.value.toUpperCase()

        const enlace = document.createElement('a');
        enlace.href = `index_info.html?id=${character.id}`;

        enlace.appendChild(img)
        card.appendChild(enlace);
        charactersContainer.appendChild(card);

        console.log('ID del personaje (búsqueda):', character.id)
    };
    nameFilters.value = '';
};

//______________________________________________-

raceFilters.addEventListener('change', ()=>{
    filter()
    charactersContainer.innerHTML = '';
})

function filter(){
    const nombre = document.getElementById('nombre');
    const race = raceFilters.value;
    const urlfilter = `https://dragonball-api.com/api/characters?race=${race}`
    const opciones = {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    };

    fetch(urlfilter, opciones)
    .then(response =>{
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        if (race == '' || race == 'none'){
            charactersContainer.innerHTML = '';
            nombre.textContent = '';

        }else{
            console.log('Respuesta de la API:', data)

        const container = document.createElement("div");
        container.classList.add('container', 'mt-4');

        const row = document.createElement('div');
        row.classList.add('row', 'justify-content-center' )
        container.appendChild(row)

        if (Array.isArray(data)) {

            data.forEach(data => {

                const card = document.createElement("div");
                card.classList.add('character-card', 'col-8', 'col-md-5', 'col-lg-3', 'fondo', 'text-center', 'mx-4', 'mt-5', 'rounded');
                container.appendChild(card);

                nombre.textContent =  race.toUpperCase()

                const img = document.createElement("img");
                img.src = data.image;
                img.classList.add('img-fluid', 'w-75', 'goku');

                const enlace = document.createElement('a');
                enlace.href =`index_info.html?id=${data.id}`;

                enlace.appendChild(img)
                card.appendChild(enlace);
                row.appendChild(card);
                charactersContainer.appendChild(container);
            })
            console.log('ID del personaje (búsqueda):', data.id)

        }else{
            console.log("No hay personajes");
        }            
        console.log('personajes', data)
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}
//______________________________________________________________________________

const link = (`https://dragonball-api.com/api/characters?page=1&limit=58`);

const respuesta = {
    method: 'GET',
    headers: { 'accept': '/' }
};

fetch(link, respuesta)
    .then(response => {
        return response.json();
    })
    .then(personaje => {
        const contenedor = document.getElementById("personajes");

        if (Array.isArray(personaje.items)) {
            
            personaje.items.forEach(personaje => {

                const card = document.createElement("div");
                card.classList.add('character-card', 'col-8', 'col-md-5', 'col-lg-3', 'fondo', 'text-center', 'mx-4', 'mt-5', 'rounded');
                

                const img = document.createElement("img");
                img.src = personaje.image;
                img.classList.add('img-fluid', 'goku');

                const enlace = document.createElement('a');
                enlace.href = `index_info.html?id=${personaje.id}`;

                enlace.appendChild(img)
                card.appendChild(enlace);
                contenedor.appendChild(card);
            })
        }else{
            console.log("No hay personajes");
        } 
    })


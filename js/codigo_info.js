function prueba(id){
console.log('ID capturado:', characterId); 

console.log('ID del personaje capturado:', characterId); 
console.log('ID capturado:', characterId); 

console.log('ID del personaje capturado:', characterId); 

const urlInfo = `https://dragonball-api.com/api/characters/${id}/transformations`;
const urlTransformaciones = `https://dragonball-api.com/api/characters/${id}`;


const opciones = {
        method: 'GET',
        headers: { 'accept': '*' }
    };

if (characterId) {
    

    

    fetch(urlInfo, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta: ' + response.status);
            }
            return response.json();
        })
        .then(character => {
            const infoPersonaje = document.getElementById('infoPersonaje');
            const imagenPersonaje = document.getElementById('imagenPersonaje');

            if (infoPersonaje && imagenPersonaje) {

                const img = document.createElement('div');
                img.classList.add('character-card', 'bg-secondary', 'fondo', 'mx-4', 'mt-5', 'rounded')

                const imagen = document.createElement('img');
                imagen.src = character.image
                imagen.classList.add('img-fluid', 'imagen', 'mb-3', 'goku')
                img.appendChild(imagen)
                imagenPersonaje.appendChild(imagen);

                const nombreTitle = document.createElement('h2')
                nombreTitle.classList.add('card-title', 'text-white', 'mb-4');
                nombreTitle.textContent = character.name;

                const raceGender = document.createElement('h4');
                raceGender.classList.add('card-text', 'text-warning');
                raceGender.textContent =(`${character.race}-${character.gender}`)

                const kiBase = document.createElement('h3');
                kiBase.classList.add('card-title', 'text-white');
                kiBase.textContent = 'ki Base';

                const numberKi = document.createElement('h4');
                numberKi.classList.add('card-text', 'text-warning');
                numberKi.textContent = (`${character.ki}`);

                const kiTotal = document.createElement('h3');
                kiTotal.classList.add('card-title', 'text-white');
                kiTotal.textContent = 'ki Total';

                const numberKiTotal = document.createElement('h4');
                numberKiTotal.classList.add('card-text', 'text-warning');
                numberKiTotal.textContent = character.maxKi;

                const afiliation = document.createElement('h3');
                afiliation.classList.add('card-title', 'text-white');
                afiliation.textContent = 'Afiliación:';

                const afiliacion = document.createElement('h4');
                afiliacion.classList.add('card-text', 'text-warning');
                afiliacion.textContent = character.affiliation;
                

                const card = document.createElement('div');
                card.classList.add('character-card', 'bg-secondary', 'text-center', 'mx-4', 'mt-5', 'rounded');

                card.appendChild(nombreTitle)
                card.appendChild(kiBase)
                card.appendChild(numberKi)
                card.appendChild(kiTotal)
                card.appendChild(numberKiTotal)
                card.appendChild(afiliation)
                card.appendChild(afiliacion)
                
                infoPersonaje.appendChild(card)
            } else {
                console.error('Elementos del DOM no encontrados.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los detalles del personaje:', error);
        });
} else {
    console.log('No se proporcionó un ID de personaje válido.');
};

const transformaciones = document.getElementById('transformaciones')

fetch(urlTransformaciones, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta: ' + response.status);
            }
            return response.json();
        })
        .then(personaje => {

            if (Array.isArray(personaje.transformations)) {
                personaje.transformations.forEach(transformacion => {

                    // const card = document.createElement("div");
                    // card.classList.add('character-card', 'col-8', 'col-md-5', 'col-lg-3', 'fondo', 'text-center', 'mx-4', 'mt-5', 'rounded');
                    // container.appendChild(card);

                    // const img = document.createElement("img");
                    // img.src = transformacion.image;
                    // img.classList.add('img-fluid', 'w-75', 'goku');

                    // card.appendChild(img);
                    // transformaciones.appendChild(card);


                    const cartaTranfor = document.createElement("div");
                    cartaTranfor.classList.add('character-card', 'col-8', 'col-md-5', 'col-lg-3', 'carta3', 'text-center', 'mx-4', 'mt-5', 'rounded')
                    const imgTranfor = document.createElement("img");
                    imgTranfor.src = transformacion.image;
                    imgTranfor.classList.add('img-fluid', 'imgTransformation', 'goku');

                    const nombreTransfor = document.createElement("h2");
                    nombreTransfor.innerHTML = transformacion.name;

                    const containerInfo = document.createElement('div')
                    containerInfo.classList.add('character-card', 'col-8', 'col-md-5', 'text-white', 'col-lg-3', 'text-center', 'mx-4', 'mt-5', 'rounded')
                    
                    containerInfo.appendChild(cartaTranfor)
                    cartaTranfor.appendChild(imgTranfor);
                    containerInfo.appendChild(nombreTransfor);
                    transformaciones.appendChild(containerInfo);
                });
            } else {
                console.error("No se encontraron transformaciones.");
            }
        })
        .catch(error => {
            console.error("Error al obtener las transformaciones:", error);
        });
    };

    const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

if (characterId) {
    prueba(characterId);
}

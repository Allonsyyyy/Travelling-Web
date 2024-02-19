let data = null;

const fetchData = (jsonData) => {
    data = jsonData;
    addElement(data.slice(0, currentLoad));
}

fetch('../data/des.json')
    .then((response) => response.json())
    .then((json) => { fetchData(json); });


const removeExistAnimation = () => {
    CardAnimation = document.getElementsByClassName('card-animation');
    for (let i = 0; i < CardAnimation.length; i++) {
        CardAnimation[i].style.animation = 'none';
    }
}

const addElement = (data) => {

    removeExistAnimation();

    let html = document.getElementsByClassName('destination-list')[0].innerHTML;

    data.forEach(element => {
        html += `
                <li class="card-animation" >
                    <a href="${"detail-destination.html?id=" + element.id}" class="destination-card" >
                        <div class="card-top">
                            <figure class="card-banner">
                                <img src="${element.img}" width="1140" height="1100" loading="lazy" alt="Malé, Maldives" class="img-cover">
                            </figure>
            
                            <div class="card-content">
                                <p class="card-subtitle">${element.name}</p>
                                <h3 class="h3 card-title">${element.address}</h3>
                            </div>
                            
                        </div>
                      
                    </a>
                </li>
            `
    });
    document.getElementsByClassName('destination-list')[0].innerHTML = html;
}

let currentLoad = 3;

const LoadMoreButton = document.getElementById('loadMore');

LoadMoreButton.addEventListener('click', () => {
    currentLoad += 3;
    addElement(data.slice(currentLoad - 3, currentLoad));
    if (currentLoad >= data.length) {
        LoadMoreButton.style.display = 'none';
    }
})
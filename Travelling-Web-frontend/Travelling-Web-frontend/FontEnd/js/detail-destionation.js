const LoadData = async() => {
    let url = window.location.href;
    let params = getParams(url);

    if (params['id']) {
        detail = await getMethods('http://localhost:3000/destinations/getDetailById?id=' + params["id"]);

        let html = `
                    <div class="card-top">
                        <figure class="card-banner">
                            <img src="${detail.image}" loading="lazy" alt="Malé, Maldives" class="img-cover">
                        </figure>
            
                        <div class="card-content">
                            <p class="card-subtitle">${detail.name}</p>
                            <h3 class="h3 card-title">${detail.address}</h3>
                        </div>
                    </div>
                `

        document.getElementsByClassName('detailContainer')[0].innerHTML = html;

        detail.nearHotel.forEach(hotel => {
            document.getElementsByClassName('hotel-list')[0].innerHTML += HotelElement(hotel);
        });
    }
}
const HotelElement = (hotel) => {
    return html = `
        <li class="hotel-card">
            <figure class="hotel-banner">
                <img src="${hotel.image}" loading="lazy" alt="Malé, Maldives" class="img-cover">
            </figure>
            <div class="hotel-content">
                <h5>${hotel.distance} km </h5>
                <h4>${hotel.name}</h4>
                <p>${hotel.address}</p>
                <div class="bottom">
                    <h3> ${String(hotel.price) + " $"} </h3>
                    <div class="rate"> ${getRate(hotel.rating)} </div>
                </div>
            </div>
        </li>
    `

}

LoadData();

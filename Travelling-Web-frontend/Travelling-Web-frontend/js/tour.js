let data = null;

const fetchData = (jsonData) => {
        data = jsonData;
        addElement(data.slice(0, currentLoad));
    }
    // lấy dữ liệu từ file json truyền vào data để sử dụng

fetch('../data/tour.json')
    .then((response) => response.json())
    .then((json) => { fetchData(json); });


const removeExistAnimation = () => {
    CardAnimation = document.getElementsByClassName('card-animation');
    for (let i = 0; i < CardAnimation.length; i++) {
        CardAnimation[i].style.animation = 'none';
    }
}

const getRate = (rate) => {
        let xmlRate = '';
        for (let i = 0; i < rate; i++)
            xmlRate += ` <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path></svg> `
        for (let i = rate; i < 5; i++)
            xmlRate += `  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16zm-127.2 92.5c-10 7.2-14.2 20.2-10.2 31.8l30.1 87.7c1.3 3.7-2.9 6.8-6.1 4.6l-77.4-55.2c-4.9-3.5-10.6-5.2-16.3-5.2-5.7 0-11.4 1.7-16.2 5.2l-77.4 55.1c-3.2 2.3-7.4-.9-6.1-4.6l30.1-87.7c4-11.8-.2-24.8-10.3-32l-81-57.1c-3.2-2.2-1.6-7.3 2.3-7.3H196c12 0 22.7-7.7 26.5-19.1l29.6-88.2c1.2-3.6 6.4-3.6 7.6 0l29.6 88.2c3.8 11.4 14.5 19.1 26.5 19.1h97.3c3.9 0 5.5 5 2.3 7.2l-79.6 57.5z"></path></svg>`
        return xmlRate;
    }
    // đọc dữ liệu trong data

const addElement = (data) => {

        removeExistAnimation();
        // dùng render để tạo dữ liệu lên màn hình 

        let html = document.getElementsByClassName('tour-list')[0].innerHTML;

        data.forEach(element => {
            // đọc cái thuộc tính trong data thông qua cú pháp ${element.}
            html += `
                <li class="card-animation" >
                    <a href="${"detail-tour.html?id=" + element.id}" class="tour-card" >
                        <div class="card-top">
                            <div class="card-time">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"></path></svg>
                                <p> ${element.time} Days </p>
                            </div>
                            <figure class="card-banner">
                                <img src="${element.img}" loading="lazy" alt="Malé, Maldives" class="img-cover">
                            </figure>
            
                            <div class="card-content">
                                <p class="card-subtitle">${element.name}</p>
                                <h3 class="h3 card-title">${element.address}</h3>
                            </div>
                            
                        </div>
                        <div class="card-bottom">
                            <div class="card-price"> From ${element.price} </div>
                            <div class="card-rate"> ${ getRate(element.rate) } </div>
                        </div>
                    </a>
                </li>
            `
        });
        document.getElementsByClassName('tour-list')[0].innerHTML = html;
        //đổ thông tin vào thẻ tour-list
    }
    // xử lí nút loadmore

let currentLoad = 3;

const LoadMoreButton = document.getElementById('loadMore');

LoadMoreButton.addEventListener('click', () => {
    currentLoad += 3;
    //mỗi lần click sẽ sinh ra thêm 3 thẻ
    addElement(data.slice(currentLoad - 3, currentLoad));
    if (currentLoad >= data.length) {
        LoadMoreButton.style.display = 'none';
    }
})

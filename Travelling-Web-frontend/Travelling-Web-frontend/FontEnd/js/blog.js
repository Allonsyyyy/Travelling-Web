let data = null;
let currentLoad = 4;
const LoadMoreButton = document.getElementById('loadMore');

getMethods("http://localhost:3000/blogs/list").then((res) => {
    data = res;
    addElement(data.slice(0, currentLoad));
    if (currentLoad >= data.length) {
        LoadMoreButton.style.display = 'none';
    }
});

const removeExistAnimation = () => {
    CardAnimation = document.getElementsByClassName('card-animation');
    for (let i = 0; i < CardAnimation.length; i++) {
        CardAnimation[i].style.animation = 'none';
    }
}

const addElement = (data) => {

    removeExistAnimation();

    let html = '';
    data.forEach(element => {
        html += `
                <li>
                    <div class="blog-card">

                        <figure class="card-banner">

                            <a href="detail-blog.html?id=${element._id}">
                                <img src="${element.image}" width="740" height="518" loading="lazy" alt="A good traveler has no fixed plans and is not intent on arriving." class="img-cover">
                            </a

                        </figure>

                        <div class="card-content">

                            <div class="card-wrapper">

                                <div class="author-wrapper">
                                    <figure class="author-avatar">
                                        <img src="${element.author.image!=''?element.author.image:'../image/defaultAvata.jpg'}" width="30" height="30" alt="Jony bristow">
                                    </figure>

                                    <div>
                                        <a href="#" class="author-name"> ${element.author.userName} </a>

                                        <p class="author-title"> ${element.author.role} </p>
                                    </div>
                                </div>

                                <time class="publish-time" datetime="10:30"> ${formatTime(element.createdAt)} </time>

                            </div>

                            <h3 class="card-title">
                                <a href="detail-blog.html?id=${element._id}">
                                    ${element.title}
                                </a>
                            </h3>
                            <div class="bottom-card">
                                ${LoadReactionsComment(element.reactions, element.comments)}
                                <a href="detail-blog.html?id=${element._id}" class="btn-link">
                                    <span>Read More </span>
                                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                                </a>
                            </div>

                        </div>

                    </div>
                </li>
            `
    });
    document.getElementsByClassName('blog-list')[0].innerHTML += html;
}

LoadMoreButton.addEventListener('click', () => {
    currentLoad += 3;
    addElement(data.slice(currentLoad - 3, currentLoad));
    if (currentLoad >= data.length) {
        LoadMoreButton.style.display = 'none';
    }
})

const LoadReactionsComment = (reactions, comments) => {
    let xml = "";

    let user = localStorage.getItem('user');
    if (user != null && JSON.parse(user)._id in reactions) {
        xml += `<div class="reaction">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                    <span>${reactions.length}</span>
                </div>`
    } else {
        xml += `<div class="reaction">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                    <span>${reactions.length}</span>
                </div>`
    }

    xml += `<div class="comment">   
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path></svg>
                <span>${comments.length}</span>
            </div>`

    return xml;
}
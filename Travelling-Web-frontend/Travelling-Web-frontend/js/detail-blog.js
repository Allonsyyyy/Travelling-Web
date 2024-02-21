let data = null;

const fetchData = (jsonData) => {
    data = jsonData;
    LoadData();
}

fetch('../data/blog.json')
    .then((response) => response.json())
    .then((json) => { fetchData(json); });


function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramName = a[0];
            var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
            if (paramName.match(/\[(\d+)?\]$/)) {
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];
                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
    return obj;
}


const LoadData = () => {
    let url = window.location.href;
    let params = getAllUrlParams(url);
    if (params['id']) {
        let id = params['id'];
        console.log(id);
        let detail = data.find((element) => element.id == id);

        let html = `
                    <div class="card-top">
                       
                        <figure class="card-banner">
                            <img src="${detail.img}" loading="lazy" alt="Malé, Maldives" class="img-cover">
                        </figure>
            
                        <div class="card-content">
                            
                            <h3 class="h3 card-title">${detail.address}</h3>
                        </div>
                    </div>
                
                    <div class="card-bottom">
                        <div class="card-name"> ${detail.name} </div>
                    </div>

                    <div class="card-description">
                        <h4>${detail.description}</h4>
                    </div>
                `

        document.getElementsByClassName('detailContainer')[0].innerHTML = html;
        console.log(detail);
    }
}
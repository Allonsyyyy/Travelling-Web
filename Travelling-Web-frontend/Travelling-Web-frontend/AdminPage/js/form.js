let params = getParams(window.location.href);

const LoadDestinationForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Destination</h1>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="destination-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" id="destination-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" id="destination-price" class="form-control" />
            </div>
            <div id="near-hotel-container">
                <ul> 
                    <li> Hotel Id </li>
                    <li> Distance </li>
                    <li> <button class="btn-add-input" onclick="AddInputNearHotel()"> + </button> </li>
                </ul>
                <div id="list-near-hotel"> 
                    <ul id="tr-near-hotel-1">
                        <li> <input type="text" id="nearHotel" class="input-nearHotel" /> </li>
                        <li> <input type="text" id="nearHotel" class="input-nearHotel" /> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputNearHotel(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            <button class="btn-add" onclick="HandleAddDestination()"> ${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} </button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

let nearHotelCount = 1;
const AddInputNearHotel = () => {
    let data = [];
    let listNearHotel = document.getElementsByClassName("input-nearHotel");
    for(let i = 0; i < listNearHotel.length; i++) {
        data.push(listNearHotel[i].value);
    }

    nearHotelCount++;
    let x = `
        <ul id="tr-near-hotel-${nearHotelCount}">
            <li> <input type="text" class="input-nearHotel"/> </li>
            <li> <input type="text" class="input-nearHotel"/> </li>
            <li> <button class="btn-remove-input" onclick="RemoveInputNearHotel(${nearHotelCount})"> - </button> </li>
        </ul>
    `
    document.getElementById("list-near-hotel").innerHTML += x;

    for(let i = 0; i < data.length; i++) {
        listNearHotel[i].value = data[i];
    }
}

const RemoveInputNearHotel = (id) => {
    document.getElementById("tr-near-hotel-"+id).remove();
}

const HandleAddDestination = async () => {
    let name = document.getElementById("destination-name").value;
    let image = document.getElementById("destination-image").value;
    let price = document.getElementById("destination-price").value;

    if(name == "" || image == "" || price == "") {
        alert("Invalid data");
        return;
    }

    let listNearHotel = document.getElementsByClassName("input-nearHotel");

    let nearHotel = [];

    for(let i = 0; i < listNearHotel.length/2; i++) {
        if(listNearHotel[i].value == "" || listNearHotel[i+1].value == "") {
            alert("Invalid data near hotel at column " + i);
            return;
        }
        nearHotel.push({
            hotelId: Number(listNearHotel[i].value),
            distance: Number(listNearHotel[i+1].value)
        });
    }

    if(params.method=="add"){
        let data = {
            _id: new Date().getTime(),
            name: name,
            image: image,
            price: price,
            nearHotel: nearHotel
        } 

        try {
            let result = await postMethods("http://localhost:3000/destinations/create", data)
            if(result.status == 200) alert("Add success");
            else alert("Add fail");
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        let data = {
            name: name,
            image: image,
            price: price,
            nearHotel: nearHotel
        } 
        try {
            let result = await putMethods("http://localhost:3000/destinations/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert("Update fail");
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}   

// hotel

const LoadHotelForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Hotel</h1>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" id="hotel-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image"> Image </label>
                <input type="text" id="hotel-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="price"> Price </label>
                <input type="text" id="hotel-price" class="form-control" />
            </div>
            <div class="form-group">
                <label for="address"> Address </label>
                <input type="text" id="hotel-address" class="form-control" />
            </div>
            <div class="form-group">
                <label for="rating"> Rating </label>
                <input type="text" id="hotel-rating" class="form-control" />
            </div>
            
            <button class="btn-add" onclick="HandleAddHotel()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddHotel = async () => {
    let name = document.getElementById("hotel-name").value;
    let image = document.getElementById("hotel-image").value;
    let price = document.getElementById("hotel-price").value;
    let address = document.getElementById("hotel-address").value;
    let rating = document.getElementById("hotel-rating").value;

    if(name == "" || image == "" || price == "" || address == "" || rating == "") {
        alert("Invalid data");
        return;
    }

    if(params.method=="add"){
        let data = {
            _id: new Date().getTime(),
            name: name,
            image: image,
            price: price,
            address: address,
            rating: rating
        }
        try {
            let result = await postMethods("http://localhost:3000/hotels/create", data)
            if(result.status == 200) alert("Add success");
            else {
                alert(res.message)
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        let data = {
            name: name,
            image: image,
            price: price,
            address: address,
            rating: rating
        }
        try {
            let result = await putMethods("http://localhost:3000/hotels/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else{
                alert(result.message)
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  



// admin
const LoadAdminForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Admin</h1>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" id="admin-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email"> Email </label>
                <input type="text" id="admin-email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" id="admin-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password"> Password </label>
                <input type="text" id="admin-password" class="form-control" />
            </div>
            
            <button class="btn-add" onclick="HandleAddAdmin()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}
const HandleAddAdmin = async () => {
    let name = document.getElementById("admin-name").value;
    let email = document.getElementById("admin-email").value;
    let image = document.getElementById("admin-image").value;
    let password = document.getElementById("admin-password").value;

    if(name == "" || email == "" || password == "") {
        alert("Invalid data");
        return;
    }

    if(params.method=="add"){
        let data = {
            userName: name,
            email: email,
            image: image,
            password: password
        }

        try {
            let result = await postMethods("http://localhost:3000/admins/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        let data = {
            userName: name,
            email: email,
            image: image,
            password: password
        } 
        try {
            let result = await putMethods("http://localhost:3000/admins/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// client
const LoadClientForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Client</h1>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" id="admin-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email"> Email </label>
                <input type="text" id="admin-email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" id="admin-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password"> Password </label>
                <input type="text" id="admin-password" class="form-control" />
            </div>
            
            <button class="btn-add" onclick="HandleAddClient()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}
const HandleAddClient = async () => {
    let name = document.getElementById("admin-name").value;
    let email = document.getElementById("admin-email").value;
    let image = document.getElementById("admin-image").value;
    let password = document.getElementById("admin-password").value;

    if(name == "" || email == "" || password == "") {
        alert("Invalid data");
        return;
    }

    let data = {
        userName: name,
        email: email,
        image: image,
        password: password
    }

    if(params.method=="add"){
        try {
            let result = await postMethods("http://localhost:3000/clients/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        try {
            let result = await putMethods("http://localhost:3000/clients/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// blog

const LoadBlogForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Blog</h1>
            <div class="form-group">
                <label for="name"> Author Id </label>
                <input type="text" id="blog-authorId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Title </label>
                <input type="text" id="blog-title" class="form-control" />
            </div>

            <div class="form-group">
                <label for="content"> Content </label>
                <input type="text" id="blog-content" class="form-control" />
            </div>

            <div class="form-group">
                <label for="image"> Image </label>
                <input type="text" id="blog-image" class="form-control" />
            </div>

            <div id="reactions-container">
                <ul> 
                    <li> Reactions </li>
                    <li> <button class="btn-add-input" onclick="AddInputReactions()"> + </button> </li>
                </ul>
                <div id="list-reactions">
                    <ul id="tr-reactions-1">
                        <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputReactions(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            
            <button class="btn-add" onclick="HandleAddBlog()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

let reactionsCount = 1;
const AddInputReactions = () => {
    let data = [];
    let listReactions = document.getElementsByClassName("form-control");
    for(let i = 0; i < listReactions.length; i++) {
        data.push(listReactions[i].value);
    }

    reactionsCount++;
    let x = `
        <ul id="tr-reactions-${reactionsCount}">
            <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
            <li> <button class="btn-remove-input" onclick="RemoveInputReactions(${reactionsCount})"> - </button> </li>
        </ul>
    `
    document.getElementById("list-reactions").innerHTML += x;

    for(let i = 0; i < data.length; i++) {
        listReactions[i].value = data[i];
    }
}

const RemoveInputReactions = (id) => {
    document.getElementById("tr-reactions-"+id).remove();
}

const HandleAddBlog = async () => {
    let title = document.getElementById("blog-title").value;
    let content = document.getElementById("blog-content").value;
    let image = document.getElementById("blog-image").value;

    if(title == "" || content == "" || image == "") {
        alert("Invalid data");
        return;
    }

    let listReactions = document.getElementsByClassName("input-reactions"); 

    let reactions = [];
    for(let i = 0; i < listReactions.length; i++) {
        if(listReactions[i].value == "") {
            alert("Invalid data reactions at column " + i);
            return;
        }
        reactions.push(listReactions[i].value);
    }

    if(params.method=="add"){
        let authorId = document.getElementById("blog-authorId").value;
        if(authorId == "") {
            alert("Invalid data");
            return;
        }

        let data = {
            authorId: authorId,
            title: title,
            content: content,
            image: image,
            reactions: reactions
        }

        try {
            const res = await postMethods("http://localhost:3000/blogs/create", data);
            if(res.status == 200) {
                alert("Add success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
    else{

        let data = {
            title: title,
            content: content,
            image: image,
            reactions: reactions
        }

        try {
            const res = await putMethods("http://localhost:3000/blogs/update?id="+ params["id"], data);
            if(res.status == 200) {
                alert("Edit success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

}

// comment

const LoadCommentForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Comment</h1>
            <div class="form-group">
                <label for="name"> Author Id </label>
                <input type="text" id="comment-authorId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Blog Id </label>
                <input type="text" id="comment-blogId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Reply Id </label>
                <input type="text" id="comment-replyId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="content"> Content </label>
                <input type="text" id="comment-content" class="form-control" />
            </div>

            <div id="reactions-container">
                <ul> 
                    <li> Reactions </li>
                    <li> <button class="btn-add-input" onclick="AddInputReactions()"> + </button> </li>
                </ul>
                <div id="list-reactions">
                    <ul id="tr-reactions-1">
                        <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputReactions(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            
            <button class="btn-add" onclick="HandleAddComment()"> ${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} </button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddComment = async () => {
    let content = document.getElementById("comment-content").value;

    if(content == "") {
        alert("Invalid data");
        return;
    }

    let listReactions = document.getElementsByClassName("input-reactions"); 

    let reactions = [];
    for(let i = 0; i < listReactions.length; i++) {
        if(listReactions[i].value == "") {
            alert("Invalid data reactions at column " + i);
            return;
        }
        reactions.push(listReactions[i].value);
    }

    if(params.method=="add"){
        let authorId = document.getElementById("comment-authorId").value;
        let blogId = document.getElementById("comment-blogId").value;
        let replyId = document.getElementById("comment-replyId").value;
        if(authorId == "" || blogId == "" ) {
            alert("Invalid data");
            return;
        }

        let data = {
            authorId: authorId,
            blogId: blogId,
            replyId: replyId,
            content: content,
            reactions: reactions
        }

        try {
            const res = await postMethods("http://localhost:3000/comments/create", data);
            if(res.status == 200) {
                alert("Add success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
    else{

        let data = {
            content: content,
            reactions: reactions
        }

        try {
            const res = await putMethods("http://localhost:3000/comments/update?id="+ params["id"], data);
            if(res.status == 200) {
                alert("Edit success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

}


if(params.type == "destination") {
    LoadDestinationForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/destinations/getById?id="+params.id).then((res) => {
            document.getElementById("destination-name").value = res.name;
            document.getElementById("destination-image").value = res.image;
            document.getElementById("destination-price").value = res.price;
            for(let i = 1; i < res.nearHotel.length; i++)  AddInputNearHotel();
            res.nearHotel.forEach((hotel, index) => {
                document.getElementsByClassName("input-nearHotel")[index*2].value = hotel.hotelId;
                document.getElementsByClassName("input-nearHotel")[index*2+1].value = hotel.distance;
            });
        });
    }
}

if(params.type == "hotel") {
    LoadHotelForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/hotels/getById?id="+params["id"]).then((res) => {
            document.getElementById("hotel-name").value = res.name;
            document.getElementById("hotel-image").value = res.image;
            document.getElementById("hotel-price").value = res.price;
            document.getElementById("hotel-address").value = res.address;
            document.getElementById("hotel-rating").value = res.rating;
        });
    }
}

if(params.type == "admin") {
    LoadAdminForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/admins/getById?id="+params["id"]).then((res) => {
            document.getElementById("admin-name").value = res.userName;
            document.getElementById("admin-email").value = res.email;
            document.getElementById("admin-image").value = res.image;
            document.getElementById("admin-password").value = res.password;
        });
    }
}

if(params.type == "client") {
    LoadClientForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/clients/getById?id="+params["id"]).then((res) => {
            document.getElementById("admin-name").value = res.userName;
            document.getElementById("admin-email").value = res.email;
            document.getElementById("admin-image").value = res.image;
            document.getElementById("admin-password").value = res.password;
        });
    }
}

if(params.type == "blog") {
    LoadBlogForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/blogs/getById?id="+params["id"]).then((res) => {  
            document.getElementsByClassName("form-group")[0].style.display = "none";
            document.getElementById("blog-title").value = res.title;
            document.getElementById("blog-content").value = res.content;
            document.getElementById("blog-image").value = res.image;
            for(let i = 1; i < res.reactions.length; i++)  AddInputReactions();
            res.reactions.forEach((reaction, index) => {
                document.getElementsByClassName("input-reactions")[index].value = reaction;
            });
        });
    }
}

if(params.type == "comment") {
    LoadCommentForm();
    if(params.method == "edit") {
        getMethods("http://localhost:3000/comments/getById?id="+params["id"]).then((res) => {  
            document.getElementsByClassName("form-group")[0].style.display = "none";
            document.getElementsByClassName("form-group")[1].style.display = "none";
            document.getElementsByClassName("form-group")[2].style.display = "none";

            document.getElementById("comment-content").value = res.content;
            for(let i = 1; i < res.reactions.length; i++)  AddInputReactions();
            res.reactions.forEach((reaction, index) => {
                document.getElementsByClassName("input-reactions")[index].value = reaction;
            });
        });
    }
}   

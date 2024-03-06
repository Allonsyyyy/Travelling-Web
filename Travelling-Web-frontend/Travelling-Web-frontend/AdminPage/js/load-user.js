const userInfor = document.getElementsByClassName('user-infor')[0];
const logoutButton = document.getElementsByClassName('logout-button')[0];
const loginButton = document.getElementsByClassName('login-button')[0];
const signupButton = document.getElementsByClassName('signup-button')[0];

const LoadUser = () => {
    let user = localStorage.getItem('user');
    if (user!=null) {
        user = JSON.parse(user);
        checkToken(user.token).then(rs => {
            if(rs.status == 200){
                loginButton.style.display = 'none';
                signupButton.style.display = 'none';
                userInfor.style.display = 'flex';
                logoutButton.style.display = 'block';
                if(user.image != "") userInfor.innerHTML = "<img src="+ user.image +">" + user.userName;
                else userInfor.innerHTML = "<img src='../image/defaultAvata.jpg'>" + user.userName;
            }
            else{
                userInfor.style.display = 'none';
                logoutButton.style.display = 'none';
                localStorage.removeItem("user");
                window.location.href = "login.html"
            }
        });
    }   
    else{
        userInfor.style.display = 'none';
        logoutButton.style.display = 'none';
        window.location.href = "login.html"
    }
}

const checkToken = async (token) => {
    try {
        return await postMethods('http://localhost:3000/admins/loginByToken', {token: token})
    } 
    catch (error) {
        return { status: 500, message: "error"}
    }
}

LoadUser()
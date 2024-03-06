// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// validation form login

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống");
  } 
  else {
    user = {
      email: inputUsername.value,
      password: inputPassword.value
    }
    await Login(user).then(rs => {
      console.log(rs)
      if(rs.status == 200){
        saveToLocalStorage("user", rs.data);
        window.location.href = "index.html";
      }
      else alert(rs.message);
    });
  }
});

const Login = async (user) => {
  const response = await fetch(
    "http://localhost:3000/clients/login",
    {
      method: "post",
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    }
  );
  return await response.json();
}

// save to local storage

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

// check is already login

const LoadUser = () => {
  let user = localStorage.getItem('user');
  if (user!=null) {
    user = JSON.parse(user);
    checkToken(user.token).then(rs => {
        if(rs.status == 200) window.location.href = "index.html"
        
    });
  }  
}

const checkToken = async (token) => {
  try {
      return await postMethods('http://localhost:3000/clients/loginByToken', {token: token})
  } 
  catch (error) {
      return { status: 500, message: "error"}
  }
}

LoadUser()
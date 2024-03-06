// validation form register and register user local storage
const inputUsernameRegister = document.getElementsByClassName("input-signup-username")[0];
const inputEmailRegister = document.getElementsByClassName("input-signup-email")[0];
const inputPasswordRegister = document.getElementsByClassName("input-signup-password")[0];
const inputPassword2Register = document.getElementsByClassName("input-signup-password2")[0];
const btnRegister = document.getElementsByClassName("signup__signInButton")[0];

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        inputUsernameRegister.value === "" ||
        inputEmailRegister.value === "" ||
        inputPasswordRegister.value === "" ||
        inputPassword2Register.value === ""

    ) {
        alert("Vui lòng không để trống");
    }
    if (inputPassword2Register.value !== inputPasswordRegister.value) {
        alert("Mật khẩu không trùng khớp");
    } else {
        // array user
        const user = {
            userName: inputUsernameRegister.value,
            email: inputEmailRegister.value,
            password: inputPasswordRegister.value,
        };
        console.log(user)
        SignUp(user).then(rs => {
            if(rs.status == 200){
                alert("Đăng Ký Thành Công");
                window.location.href = "login.html";
            }
            else alert(rs.message);
        });
    }
});

const SignUp = async (user) => {
    const response = await fetch(
      "http://localhost:3000/clients/create",
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
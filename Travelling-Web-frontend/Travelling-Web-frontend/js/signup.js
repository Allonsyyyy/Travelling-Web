// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputPassword2Register = document.querySelector(".input-signup-password2");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        inputUsernameRegister.value === "" ||
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
            username: inputUsernameRegister.value,
            password: inputPasswordRegister.value,
        };
        let json = JSON.stringify(user);
        localStorage.setItem(inputUsernameRegister.value, json);
        alert("Đăng Ký Thành Công");
        window.location.href = "login.html";
    }
});
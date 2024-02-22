// xác thực đăng ký và đăng ký người dùng lưu trữ cục bộ
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputPassword2Register = document.querySelector(".input-signup-password2");
const btnRegister = document.querySelector(".signup__signInButton");

//xác thực đăng ký và đăng ký người dùng lưu trữ cục bộ

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    // tránh để trống chỗ nhập
    if (
        inputUsernameRegister.value === "" ||
        inputPasswordRegister.value === "" ||
        inputPassword2Register.value === ""

    ) {
        alert("Vui lòng không để trống");
    }
    // xác nhận mật khẩu
    if (inputPassword2Register.value !== inputPasswordRegister.value) {
        alert("Mật khẩu không trùng khớp");
    } else {
        const user = {
            username: inputUsernameRegister.value,
            password: inputPasswordRegister.value,
        };
        // chuyển thành  chuỗi json
        let json = JSON.stringify(user);
        localStorage.setItem(inputUsernameRegister.value, json);
        alert("Đăng Ký Thành Công");
        window.location.href = "login.html";
    }
});

// mẫu đăng nhập
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// mẫu đăng nhập

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống");
    
  } else {
    //xác nhận tài khoản mật khẩu đã được đăng ký chưa
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "index.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});

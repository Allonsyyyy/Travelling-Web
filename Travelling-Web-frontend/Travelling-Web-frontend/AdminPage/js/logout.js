const LogOut = () => {
    let user = localStorage.getItem('user');
    if (user!=null) {
        user = JSON.parse(user);
        postMethods("http://localhost:3000/admins/logout", {id:user._id})
        localStorage.removeItem("user");
    }
    window.location.href = "admin.html";
}

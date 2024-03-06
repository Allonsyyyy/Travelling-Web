const LogOut = () => {
    let user = localStorage.getItem('user');
    if (user!=null) {
        user = JSON.parse(user);
        checkLogout(user._id).then(rs => {
            if(rs.status == 200){
                localStorage.removeItem("user");
            }
        });
    }
    window.location.href = "index.html";
}

const checkLogout = async (id) => { 
    const response = await fetch(
        "http://localhost:3000/clients/logout",
        {
          method: "post",
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({id: id})
        }
    );
    return await response.json();    
}



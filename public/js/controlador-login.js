$("#login-button").click(function(){
    console.log($("#formulario-login").serialize());
    $.ajax({
        url:"/login",
        method:"POST",
        data:$("#formulario-login").serialize(),
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.length == 1)
                window.location.href = "/home.html";
            else 
                alert("Usuario o contraseña son incorrectos");
        },
        error:function(error){
            console.error(error);
        }
    });
});
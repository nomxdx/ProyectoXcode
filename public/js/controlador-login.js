$("#login-button").click(function(){
    console.log($("#formulario-login").serialize());
    $.ajax({
        url:"/login",
        method:"POST",
        data:$("#formulario-login").serialize(),
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.length == 1){
                window.location.href = "/home.html";
            }
            else 
                {document.getElementById("incorrecto").innerHTML="";
                                $("#incorrecto").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                Usuario y/o contraseña no son correctos <a href="login.html" class="alert-link">Volver a intentarlo</a>.
                                            </div>`);}
        },
        error:function(error){
            console.error(error);
        }
    });
});
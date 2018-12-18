// controlador-registro

$("#regisButton").click(function(){
	validar();
});

$(document).ready(function(){
	//Esta funcion se ejecuta cuando la página esta lista
	$.ajax({
		url:"/obtener-plan",
		method: "POST",
		dataType:"JSON",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
				$("#plan").append(`<option value="${respuesta[i].codigo_plan}">${respuesta[i].nombre_plan}</option>`);
				
			}
		}
	});
});


function validar(){
	document.getElementById("datos-faltantes").innerHTML="";

	if (document.getElementById("primer_nombre").value==""){
		$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                El campo <strong>Nombre</strong> esta vacío.
                            </div>`);}
	else{
		if (document.getElementById("apellidos").value==""){
			$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
	                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
	                               El campo <strong>Apellido</strong> esta vacío.
	                           </div>`);}
		else{
			if (document.getElementById("e_mail").value==""){
			$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
	                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
	                               El campo <strong>Correo</strong> esta vacío o es incorrecto.
	                           </div>`);}
			else{
				if (document.getElementById("contrasena_registro").value != document.getElementById("contrasena_registro2").value){
					$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
			                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			                               El campo <strong>Contraseñas</strong> no coinciden.
			                           </div>`);}
				else{
					if (document.getElementById("contrasena_registro").value == ""){
						$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
				                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				                               El campo <strong>Contraseña</strong> esta vacío.
				                           </div>`);}
					else{
						if (document.getElementById("plan").value == 0){
							$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
					                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					                               No ha seleccionado ningun <strong>Plan</strong> de almacenamiento.
					                           </div>`);}
						else{
							console.log($("#formulario_registrar").serialize());
							$.ajax({

							   url:"/registrar",
						       method:"POST",
						       data:$("#formulario_registrar").serialize(),
						       dataType:"JSON",
						       success:function(res){
						           console.log(res);
						           if (res.affectedRows == 1){
						               $("#datos-faltantes").append(`<div class="alert alert-success alert-dismissable" align="center">
					                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					                              Usuario registrado exitosamente. n_n
					                           </div>`);

						           }
						           else {
						           	$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
					                               <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					                               No ha podido registrar el usuario, verifique que el numero de telefono sea Numerico.
					                           </div>`);
						           }

						       },
						       error:function(error){
						           console.error(error);
						       }
						   });
						}

					}

				}
			}
		}
			
	}
}
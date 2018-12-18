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

	if (document.getElementById("primer_nombre").value==""){
		console.log("entre aqui man");
		$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                El campo <strong>Nombre</strong> esta vacio.
                            </div>`);
		if (document.getElementById("apellido").value==""){
			$("#datos-faltantes").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                El campo <strong>Apellido</strong> esta vacio.
                            </div>`);
		}
		}
		else{
			//statements de que todo es correcto
		}
	}
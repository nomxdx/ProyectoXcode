$(document).ready(function(){
	$.ajax({
		url:"/obtener-usuario",
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			console.log(respuesta);
			$("#nombre-usuario").append(`${respuesta[0].nombre_usuario}`);
		}
	});
});

function MouseIn(){
	document.getElementById("carpeta").style.borderRadius = "100";
	document.getElementById("carpeta").style.backgroundColor = "lightblue";

};

function MouseOut(){
	document.getElementById("carpeta").style.backgroundColor = "white";	

};

function alertas(){
	alert("Hello! Me diste click");
};

function MouseIn1(){
	document.getElementById("proyecto").style.backgroundColor = "lightblue";
};

function MouseOut1(){
	document.getElementById("proyecto").style.backgroundColor = "white";	
};
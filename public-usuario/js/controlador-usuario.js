$(document).ready(function(){
	//muestra el nombre de usaurio
	$.ajax({
		url:"/obtener-usuario",
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			console.log(respuesta);
			$("#nombre-usuario").append(`${respuesta[0].nombre_usuario}`);
		}
	});

	//muestra las carpetas creadas
	mostrarCarpetas();
	// mostrarArchivos();
});

function mostrarTodo(){

};

//funciones para simular seleccion de las carpetas
function MouseIn(idCarpeta){
	document.getElementById(idCarpeta).style.borderRadius = "100";
	document.getElementById(idCarpeta).style.backgroundColor = "lightblue";

};

function MouseOut(idCarpeta){
	document.getElementById(idCarpeta).style.backgroundColor = "white";	

};

var carpetaSeleccionada=2;

function verCarpeta(idCarpeta){
	carpetaSeleccionada=idCarpeta; //asigna la carpeta deleccionada a la variable

	$.ajax({
		url:"ver-carpetas",
		data:"idCarpeta="+ carpetaSeleccionada, //el idCarpeta es para saber la que se seleccionó
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			document.getElementById("carpeta-contenedora").innerHTML=" ";
			for(var i=0; i<respuesta.length; i++){
				$("#carpeta-contenedora").append(`<div  class="col-lg-2 col-md-6 col-12" align="center" >
						                            <img id="${respuesta[i].codigo_carpeta}" src="images/carpeta.png" alt="" width="100px" height="100px" 
						                            onclick='verCarpeta(${respuesta[i].codigo_carpeta});' 
						                            onmouseenter="MouseIn(${respuesta[i].codigo_carpeta});" 
						                            onmouseout="MouseOut(${respuesta[i].codigo_carpeta});">
						                            <p align="center">${respuesta[i].nombre_carpeta}</p>
						                        </div>`);
			}
		}
	});
};



function mostrarCarpetas(){
	$.ajax({
		url:"obtener-carpetas",
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			document.getElementById("carpeta-contenedora").innerHTML=" ";
			for(var i=0; i<respuesta.length; i++){
				$("#carpeta-contenedora").append(`<div  class="col-lg-2 col-md-6 col-12" align="center" >
						                            <img id="${respuesta[i].codigo_carpeta}" src="images/carpeta.png" alt="" width="100px" height="100px" 
						                            onclick='verCarpeta(${respuesta[i].codigo_carpeta}, ${respuesta[i].tbl_carpetas_codigo_carpeta});' 
						                            onmouseenter="MouseIn(${respuesta[i].codigo_carpeta});" 
						                            onmouseout="MouseOut(${respuesta[i].codigo_carpeta});">
						                            <p align="center">${respuesta[i].nombre_carpeta}</p>
						                        </div>`);
			}
		}
	});

	};

function validarCarpeta(){
	if (document.getElementById("nuevaCarpeta").value==""){
		document.getElementById("campoVacio").innerHTML = " ";
		$("#campoVacio").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                No ha introducido un <strong>Nombre</strong> a la carpeta.
                            </div>`);}
		else{
			$.ajax({
				url:"/crear-carpeta",
		        method:"POST",
		        data:$("#formulario-carpeta").serialize()+ "&" + 
					 "codPadre="+carpetaSeleccionada,
		        dataType:"json",
		        success:function(res){
		        	//cierra modal
					// document.getElementById("nuevaCarpeta").value=="";
					$("#modalCrearCarpeta").modal('hide');
					//refrezca las carpetas
					mostrarCarpetas();

		        }
			});
			
		}

};


/*function validarArchivo(){
	if (document.getElementById("nuevoArchivo").value==""){
		document.getElementById("campoVacio2").innerHTML = " ";
		$("#campoVacio2").append(`<div class="alert alert-danger alert-dismissable" align="center">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                No ha introducido un <strong>Nombre</strong> al archivo.
                            </div>`);}
		else{
			$.ajax({
				url:"/crear-archivo",
		        method:"POST",
		        data:$("#formulario-archivo").serialize()+ "&" + 
					 "codPadre="+carpetaSeleccionada,
		        dataType:"json",
		        success:function(res){
		        	//cierra modal
					
					$("#modalCrearArchivo").modal('hide');
					//refrezca los archivos
					mostrarArchivos();

		        }
			});
			
		}

};

function verArchivo(idCarpeta){
	carpetaSeleccionada=idCarpeta; //asigna la carpeta deleccionada a la variable

	$.ajax({
		url:"ver-archivo",
		data:"idCarpeta="+ carpetaSeleccionada, //el idCarpeta es para saber la que se seleccionó
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			document.getElementById("carpeta-contenedora").innerHTML=" ";
			for(var i=0; i<respuesta.length; i++){
				$("#carpeta-contenedora").append(`<div  class="col-lg-2 col-md-6 col-12" align="center" >
						                            <img id="${respuesta[i].codigo_archivo}" src="images/archivo.png" alt="" width="100px" height="100px" 
						                            onclick='verArchivo(${respuesta[i].codigo_archivo});' 
						                            onmouseenter="MouseIn(${respuesta[i].codigo_archivo});" 
						                            onmouseout="MouseOut(${respuesta[i].codigo_archivo});">
						                            <p align="center">${respuesta[i].nombre_archivo}</p>
						                        </div>`);
			}
		}
	});
};



function mostrarArchivos(){
	$.ajax({
		url:"obtener-archivo",
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			document.getElementById("carpeta-contenedora").innerHTML=" ";
			for(var i=0; i<respuesta.length; i++){
				$("#carpeta-contenedora").append(`<div  class="col-lg-2 col-md-6 col-12" align="center" >
						                            <img id="${respuesta[i].codigo_archivo}" src="images/archivo.png" alt="" width="100px" height="100px" 
						                            onclick='verCarpeta(${respuesta[i].codigo_archivo}, ${respuesta[i].tamanio});' 
						                            onmouseenter="MouseIn(${respuesta[i].codigo_archivo});" 
						                            onmouseout="MouseOut(${respuesta[i].codigo_archivo});">
						                            <p align="center">${respuesta[i].nombre_carpeta}</p>
						                        </div>`);
			}
		}
	});

	};
*/

function logout(){
	$.ajax({
		url:"/logout",
		method: "POST",
		success:function(respuesta){
		window.location.href="index.html";
		}
	});
};

$(document).ready(function(){

	$.ajax({
		url:"/obtener-miembros",
		method:"POST",
		datatype:"JSON",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){

			$("#tblMiembros").append(`<tr class="gradeU">
                                        <td>${respuesta[i].nombre_usuario}</td>
                                        <td>${respuesta[i].correo}</td>
                                        <td>${respuesta[i].usuario}</td>
                                        <td class="center"><button class="btn btn-success">Agregar</button></td>
                                    </tr>`);
			}
			$('#dataTables-example').DataTable({
            responsive: true
        });
			
		}
	});



	

});



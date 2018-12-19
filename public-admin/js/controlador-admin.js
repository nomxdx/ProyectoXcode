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
                                        <td class="center">${respuesta[i].telefono}</td>
                                        <td class="center">${respuesta[i].nombre_plan}</td>
                                    </tr>`);
			}
			$('#dataTables-example').DataTable({
            responsive: true
        });
			
		}
	});



	

});
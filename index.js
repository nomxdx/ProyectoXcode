// Sever CodeX
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

var credenciales ={
  user:"root",
  password:"",
  database:"db_codex",
  host:"localhost",
  port:"3306"  
};

 // exposicion de carpetas
app.use(express.static("public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({secret:"K$%JFDFRE#%", resave:true, saveUninitialized:true}));

//Verificar si existe una variable de sesion para poner publica la carpeta public admin
var publicAdmin = express.static("public-admin");
var publicUsuario = express.static("public-usuario");

app.use(
    function(req,res,next){
        if (req.session.correoUsuario){
            //Significa que el usuario si esta logueado
            if (req.session.codigoTipoUsuario == 1)
                publicAdmin(req,res,next);
            else if (req.session.codigoTipoUsuario == 2)
                publicUsuario(req,res,next);
        }
        else
            return next();
    }
);

///Para agregar seguridad a una ruta especifica:
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

app.post("/login",function(req, res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "SELECT codigo_usuario, correo, codigo_tipo_usuario FROM tbl_usuarios WHERE contrasenia = sha1(?) and correo=?",
        [req.body.contrasenia, req.body.correo],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                if (data.length==1){
                	// Creacion de variables de session
                    req.session.codigoUsuario = data[0].codigo_usuario;
                    req.session.correoUsuario = data[0].correo;
                    req.session.codigoTipoUsuario = data[0].codigo_tipo_usuario
                }
                res.send(data);
                res.end();
            }
        }
    )
});

//muestra los planes en combo box
app.post("/obtener-plan",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT codigo_plan, nombre_plan
		 FROM tbl_planes`,
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});

//obtener nombre de usuario
app.post("/obtener-usuario",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT concat(B.nombre, concat(" ", B.apellido)) as nombre_usuario 
			FROM tbl_usuarios A
			inner JOIN tbl_personas B
			ON B.codigo_persona = A.codigo_persona
			WHERE A.codigo_usuario = ?`, 
			[
			req.session.codigoUsuario
			],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});


//Registra a un usuario
app.post("/registrar",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `INSERT INTO tbl_personas(codigo_persona, nombre, apellido, telefono) 
			VALUES (null,?,?,?)`,
		 [
		 req.body.primer_nombre,
		 req.body.apellidos,
		 req.body.telefono
		 ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                //traigo id de persona para mandarlo a la segunda consulta
                conexion.query(
			        `SELECT MAX(codigo_persona) as codigo_persona FROM tbl_personas`,
			        function(error2, data2, fields2){
			            if (error){
			                res.send(error);
			                res.end();
			            }else{
			            	//inserto los demas datos de la consulta
			            	conexion.query(
						        `INSERT INTO tbl_usuarios(codigo_usuario, usuario, 
						        contrasenia, correo, codigo_persona, codigo_plan, 
						        codigo_tipo_usuario) VALUES (null,?,sha1(?),?,?,?,2)`,
								 [
								 req.body.primer_nombre,
								 req.body.contrasena_registro,
								 req.body.e_mail,
								 data2[0].codigo_persona, //codigo persona de la base de datos
								 req.body.plan
								 ],
						        function(error3, data3, fields3){
						            if (error){
						                res.send(error);
						                res.end();
						            }else{
						                res.send(data3);
						                res.end();
						            }
						        }
						    )
			            }
			        }
			    )

            }
        }
    )

    
});

//obtener las carpetas creadas
app.post("/obtener-carpetas",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT codigo_carpeta, nombre_carpeta, tbl_carpetas_codigo_carpeta FROM tbl_carpetas 
			WHERE tbl_carpetas_codigo_carpeta = 2 and codigo_usuario = ?`, [req.session.codigoUsuario],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});


//Crea una carpeta
app.post("/crear-carpeta",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `INSERT INTO tbl_carpetas(codigo_carpeta, nombre_carpeta, descripcion, fecha_creacion, tbl_carpetas_codigo_carpeta, codigo_usuario) 
			VALUES (null,?,?,sysdate(),?,?)`,
		 [
		 req.body.nuevaCarpeta,
		 req.body.descripcionCarpeta,
		 req.body.codPadre,
		 req.session.codigoUsuario
		 ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
            	res.send(data);
            	res.end();
            }
        }
    )

    
});

//ver Carpetas

app.post("/ver-archivo",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT codigo_carpeta, nombre_carpeta, tbl_carpetas_codigo_carpeta FROM tbl_carpetas 
			WHERE tbl_carpetas_codigo_carpeta = ? and codigo_usuario = ?`, 
			[
			req.body.idCarpeta, //codigo qde la carpeta seleecionado que ahora es padre
			req.session.codigoUsuario
			],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});

/*//obtener las archivos
app.post("/obtener-archivo",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT codigo_archivo, nombre_archivo, tamanio FROM tbl_archivos 
			WHERE tamanio = 2 and codigo_usuario = ?`, [req.session.codigoUsuario],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});


//Crea una archivos

app.post("/crear-archivo",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `INSERT INTO tbl_archivos(codigo_archivo, nombre_archivo, tipo_archivo, tamanio, fecha_creacion, codigo_usuario) 
			VALUES (null,?,?,?,sysdate(),?)`,
		 [
		 req.body.nuevoArchivo,
		 req.body.tipoArchivo,
		 req.body.codPadre,
		 req.session.codigoUsuario
		 ],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
            	res.send(data);
            	res.end();
            }
        }
    )

    
});

//ver archivos

app.post("/ver-archivo",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT codigo_archivo, nombre_archivo, tamanio FROM tbl_archivos 
			WHERE tamanio = ? and codigo_usuario = ?`, 
			[
			req.body.idCarpeta, //codigo qde la carpeta seleecionado que ahora es padre
			req.session.codigoUsuario
			],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});*/

app.post("/obtener-miembros",function(req, res){
	var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT concat(B.nombre, concat(" ", B.apellido)) as nombre_usuario, A.correo as correo, 
        A.usuario as usuario, b.telefono as telefono, c.nombre_plan as nombre_plan
			FROM tbl_usuarios A
			inner JOIN tbl_personas B
			ON B.codigo_persona = A.codigo_persona
            inner join tbl_planes C
            on c.codigo_plan = a.codigo_plan`,
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                res.send(data);
                res.end();
            }
        }
    )
    
});

// Destruir session
app.post("/logout",function(req,res){
    req.session.destroy();
    res.end();
});

app.use(function(req, res, next) {
        res.status(400).send('Pagina no encontrada... verifica la ruta a la qe estas accediendo');
});


app.listen(4000, function(){ console.log("Servidor iniciado");});
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
// app.use(express.static("public-usuario"));

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

//registrar un usuario
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

// Destruir session
app.get("/logout",function(req,res){
    req.session.destroy();
    res.end();
});


app.listen(4000, function(){ console.log("Servidor iniciado");});
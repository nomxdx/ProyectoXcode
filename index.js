var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

var credenciales = {
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database: "db_codex"
};

 // exposicion de carpetas
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

//Verificar si existe una variable de sesion para poner publica la carpeta public admin
var publicAdmin = express.static("public-admin");
var publicUsuario = express.static("public-usuario");
app.use(
    function(req,res,next){
        if (req.session.correoUsuario){
            //Significa que el usuario si esta logueado
            if (req.session.codigoTipoUsuario == 1)
                publicCajero(req,res,next);
            else if (req.session.codigoTipoUsuario == 2)
                publicAdmin(req,res,next);
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
        "SELECT codigo_usuario, correo, codigo_tipo_usuario FROM tbl_usuarios WHERE contrasena = sha1(?) and correo=?",
        [req.body.contrasena, req.body.usuario],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                if (data.length==1){
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


app.listen(8111, function(){ console.log("Servidor iniciado");});
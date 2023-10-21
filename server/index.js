const express = require("express");
const app = express();
const mysql = require("mysql");
const cors =require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sensor-choque"
});

app.post("/create",(req,res)=>{
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const correo = req.body.correo;
    const contrasena = req.body.contraseña;

    db.query('INSERT INTO usuario(cedula,nombre,edad,correo,contrasena) VALUES (?,?,?,?,?)',[cedula,nombre,edad,correo,contrasena], 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.get("/usuario",(req,res)=>{

    db.query('SELECT * FROM usuario', 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put("/update_usuario",(req,res)=>{

    const id = req.body.id;
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    db.query('UPDATE usuario SET cedula=?,nombre=?,edad=?,correo=?,contrasena=? WHERE id=? ',[id,cedula,nombre,edad,correo,contrasena], 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete("/deleteUsu/:id",(req,res)=>{

    const id = req.params.id;

    db.query('DELETE FROM usuarios WHERE id=?',id, 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("corriendo servidor");
})
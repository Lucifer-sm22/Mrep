const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"db4free.net",
    user:"estudiantesweb",
    password:'admin12345',
    database:'cursoweb',
    port:3306
})
connection.connect(err=>{
    if(err) throw err;
    console.log("conectado a Mysql")
});

const app = express()
app.use(cors())
app.use(express.json())

app.get("/ShowL",(req,res)=>{
    connection.query('SELECT * FROM osorio;', (err,result) =>{
        res.send(result)
    })

})

app.post("/craeteS",(req,res)=>{
    const {asignatura,nota} = req.body
    connection.query('insert into osorio(asignatura,nota)values(?,?)',[asignatura,nota],(err,result)=>{
        res.send({mensage:"estudiante agregado"})
    })

})

app.put("/updateS/:id", (req, res) => {
    const id = req.params.id;
    const { asignatura, nota } = req.body;
  
    connection.query(
      "UPDATE osorio SET asignatura = ?, nota = ? WHERE id = ?",
      [asignatura, nota, id],
      (err, result) => {
        if (err) {
          return res.json({ error: result });
        }
        res.json({ mensaje: `Registro ${id} actualizado ` });
      }
    );
  });

app.delete('/deleteS/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM osorio WHERE id=?', 
    [ id], (err) => {
        if (err) throw err;
        res.json({message: 'Estudiante eliminado'});
    });
});

app.get("/",(req,res) => {
    res.send("Servidor online")
})
app.listen(3000,() => {console.log("El servidor esta corriendo por el puerto 3000")
})
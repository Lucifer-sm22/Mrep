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
    if(err)throw err;
    console.log("conectado a Mysql")
});

const app = express()
app.use(cors())
app.use(express.json())

app.post("/person",(req,res)=>{
    const{name,last_name,identification,email,phone} = req.body;
       connection.query('insert into student(name,last_name,identification,email,phone)values(?,?,?,?,?)',
        [name,last_name,identification,email,phone],(err,result)=>{
        
            res.send({mensaje:"hola"})
    })
})

app.get("/student",(req,res)=>{
    connection.query('select * from student;',(err,result)=>{

        res.send(result)
    })

})

app.put("/studentU",(req,res)=>{
    const { id, email } = req.body;
    const query = "UPDATE student SET email = ? WHERE id = ?";
    
    connection.query(query, [email, id], (err, result) => {

        res.json({ message: "Estudiante actualizado correctamente" });

    
    })

})

app.get("/document",(req,res)=>{
    const { identification } = req.body;
  
   
    connection.query('select * from student where identification = ?',[identification], (err, result) => {
        res.send(result)
    
    })

})


app.get("/",(req,res) => {
    res.send("Servidor online")
})
app.listen(3001, () => {console.log("El servidor esta corriendo por el puerto 3000")
})
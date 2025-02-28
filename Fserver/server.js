const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())


let productos = [
    {id:1, nombre:"arroz", precio:50},
    {id:2, nombre:"huevo", precio:20},
    {id:3, nombre:"azucar", precio:10}

]

app.get("/productos/:id/:nombre/:precio",(req,res)=>{
    const { id, nombre, precio } = req.params;

    productos.push({
        id: parseInt(id), 
        nombre: nombre, 
        precio: parseFloat(precio)
    });

    res.json(productos);
})

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.put("/productos/:id",(req,res) =>{
    const{id} = req.params; 
    const{ nombre, precio } = req.body;
    const producto = productos.find(p => p.id == id);
    if (producto){
            if (nombre) producto.nombre = nombre;
            if (precio) producto.precio = precio;
    
    res.json({mensaje:"Producto actualizado",response:productos});
    } else { res.status(404).json({mensaje:"producto no encontrado"})};
});

app.delete("/productos/:id",(req,res)=>{
    const {id} = req.params
    productos = productos.filter(p=>p.id!= id)
    res.json({mensaje:"producto eliminado",data:productos})
})


app.get("/",(req,res) => {
    res.send("Servidor online")
})
app.listen(3000, () => {console.log("El servidor esta corriendo por el puerto 3000")
})



const express = require("express"); //IMPORTAR EXPRESS
const app = express(); //CREAR "APP" EXPRESS
const PORT = process.env.PORT|| 3000; //ASIGNAR UN PUERTO

app.use(express.json()); //para que Express pueda parsear JSON en el body de peticiones

//RUTA DE PRUEBA
app.get("/",(req,res) =>{
    res.json({message : "servidor funcionando"});
});


//arrancar el servidor y escuchar en el puerto
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})



let items = [];  // simulamos una "base de datos" en memoria

//POST 
app.post("/items", (req, res) => {
  const { nombre } = req.body;  //extraer el campo del body

  //Validación: ¿el nombre existe y es string?
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({
      error: 'El campo "nombre" es requerido y debe ser un texto',
    });
  }

  //Crear un nuevo objeto con id único
  const nuevoItem = {
    id: items.length + 1, //autoincremental
    nombre,
  };

  //Guardar en el array
  items.push(nuevoItem);

  //Responder con 201 Created y el objeto nuevo
  res.status(201).json(nuevoItem);
});

app.get("/items",(req,res)=>{
    res.json(items)
})
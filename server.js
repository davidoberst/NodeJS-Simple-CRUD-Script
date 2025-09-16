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


app.delete("/items/:id",(req,res) =>{
  const { id } = req.params;
    const idNum = parseInt(id, 10); // convertimos el string a número base 10
  if (isNaN(idNum)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  const index = items.findIndex(item => item.id === idNum);

  // Si no existe, devolvemos error 404
  if (index === -1) {
    return res.status(404).json({ error: "Item no encontrado" });
  }

  // Eliminamos el item
  const eliminado = items.splice(index, 1)[0]; // splice devuelve un array, por eso [0]

  // Respondemos con el item eliminado
  res.json({
    mensaje: "Item eliminado correctamente",
    eliminado
  });

// PUT - editar un item por id
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  // Validar ID
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  // Buscar item por id
  const item = items.find(item => item.id === idNum);
  if (!item) {
    return res.status(404).json({ error: "Item no encontrado" });
  }

  // Validar nombre
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({
      error: 'El campo "nombre" es requerido y debe ser un texto',
    });
  }

  // Actualizar item
  item.nombre = nombre;

  res.json({
    mensaje: "Item actualizado correctamente",
    actualizado: item
  });
});


})


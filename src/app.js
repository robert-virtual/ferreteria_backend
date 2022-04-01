const express = require("express");
const app = express();
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
const cors = require("cors");
const port = process.env.PORT || 3030;

// acceso a las imagenes
app.use(express.static("uploads"));

// middlewares
// importante el orden
// stripe debe estart antes de express.json
app.use(cors());
app.use("/", require("./routes/stripe"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middlewares

//rutas
app.use("/api/productos", require("./routes/productos"));
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/ventas", require("./routes/ventas"));

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

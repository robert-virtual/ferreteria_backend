const express = require("express");
const port = process.env.PORT || 3030;
const app = express();

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
// acceso a las imagenes
app.use(express.static("uploads"));

// middlewares
app.use(express.json());

//rutas
app.use("/api/productos", require("./routes/productos"));
app.use("/api/auth", require("./routes/usuarios"));

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

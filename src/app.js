const express = require("express");
const cors = require("cors");
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
app.use(cors());

//rutas
app.use("/api/productos", require("./routes/productos"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/ventas", require("./routes/ventas"));

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

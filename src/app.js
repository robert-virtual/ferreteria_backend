require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const port = process.env.PORT || 3030;
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

//rutas
app.use("/api/productos", require("./routes/productos"));

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

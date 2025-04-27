const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb = require('./db/Connect')
require("dotenv").config();
const todoRouter = require("./routers/todoRouter")
const productColorRouter = require("./routers/products/productColorRouter")
const productCategoryRouter = require("./routers/products/productCategoryRouter")
const productSizeRouter = require("./routers/products/productSizeRouter")
const productController = require("./routers/products/productRouter")
const PORT = process.env.PORT || 5000;

const app = express();
const Port = 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb()


app.use('/api/todos', todoRouter)
app.use('/api/products', productColorRouter)
app.use('/api/products', productCategoryRouter)
app.use('/api/products', productSizeRouter)
app.use('/api/products', productController);

app.post("/example", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.json({ message: `Hello, ${name}!` });
});


app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const connetDb = require("./db/Connect");
// const todoRouter = require("./routers/todoRouter");
// const productColorRouter = require("./routers/products/productColorRouter");
// const productCategoryRouter = require("./routers/products/productCategoryRouter");
// const productSizeRouter = require("./routers/products/productSizeRouter");
// const productController = require("./routers/products/productRouter");
// const app = express();

// const Port = 3000;

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// connetDb();

// app.use("/api/todos", todoRouter);
// app.use("/api/products", productColorRouter);
// app.use("/api/products", productCategoryRouter);
// app.use("/api/products", productSizeRouter);
// app.use("/api/products", productController);

// app.listen(Port, () => {
//   console.log("Server is running on port " + Port);
// });
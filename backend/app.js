import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";
import express from "express";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");

function dataPath(fileName) {
  return path.join(dataDir, fileName);
}

app.use(express.static("./images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("places.json"));
  const placesData = JSON.parse(fileContent);
  res.status(200).json({ places: placesData });
});
       
app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("user-places.json"));
  const places = JSON.parse(fileContent);
  res.status(200).json({ places });
});

app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("users.json"));
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});

app.get("/menu-items", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("menu-items.json"));
  const menuItems = JSON.parse(fileContent);
  res.status(200).json({ menuItems });
});

app.get("/orders", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("orders.json"));
  const orders = JSON.parse(fileContent);
  res.status(200).json({ orders });
});

app.put("/user-places", async (req, res) => {
  const places = req.body.places;
  await fs.writeFile(dataPath("user-places.json"), JSON.stringify(places));
  res.status(200).json({ message: "User places updated!" });
});

//rotas de users
//rota de registo
app.post("/signup", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("users.json"));
  const users = JSON.parse(fileContent);

  const newUser = req.body;
  users.push(newUser);

  await fs.writeFile(dataPath("users.json"), JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User Inserted!" });
});

//rota de login (verifica se há user e se sim gera um token)
app.post("/login", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("users.json"));
  const users = JSON.parse(fileContent);

  const email = req.body.email;
  const password = req.body.password;

  const login = users.find((u) => u.email === email && u.password === password);

  if (!login) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }


  const AuthUser = {
    name: login.name,
    type: login.type,
  };

  res.json(AuthUser);
});

app.post("/menu-items", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("menu-items.json"));
  const menuItems = JSON.parse(fileContent);

  const newMenuItem = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description || "",
    category: req.body.category,
    price: Number(req.body.price),
  };
  menuItems.push(newMenuItem);

  await fs.writeFile(dataPath("menu-items.json"), JSON.stringify(menuItems, null, 2));
  res.status(200).json({ message: "Menu item inserted." });
});

app.post("/orders", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("orders.json"));
  const orders = JSON.parse(fileContent);

  const newOrder = {
    id: Date.now(),
    ...req.body,
  };
  orders.push(newOrder);

  await fs.writeFile(dataPath("orders.json"), JSON.stringify(orders, null, 2));
  res.status(200).json({ message: "Order created successfully!" });
});

app.put("/orders/:id", async (req, res) => {
  const fileContent = await fs.readFile(dataPath("orders.json"));
  const orders = JSON.parse(fileContent);

  const orderId = Number(req.params.id);
  const newStatus = req.body.status;

  const orderIndex = orders.findIndex((order) => Number(order.id) === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Encomenda não encontrada." });
  }

  orders[orderIndex].status = newStatus;

  await fs.writeFile(dataPath("orders.json"), JSON.stringify(orders, null, 2));
  res.status(200).json({ message: "Estado da encomenda atualizado." });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);

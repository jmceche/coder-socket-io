const handlebars = require("express-handlebars");
let products = require("./data/products");
let messages = require("./data/messages");
const router = require("./routes");

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

const port = process.env.PORT || 3000;

// Set template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + "/views/layouts",
}))
app.set("view engine", "hbs")
app.set("views", "./views")


// static
app.use(express.static(__dirname + "/public"))

// routes
app.use("/", router);

// sockets
io.on('connection', socket => {
  io.sockets.emit('render_products', products);
  io.sockets.emit('render_messages', messages);

  socket.on('submit_product', data => {
    products.push(data);
    io.sockets.emit('render_products', products);
  });

  socket.on('send_message', data => {
    messages.push(data);
    io.sockets.emit('render_messages', messages);
  });
})

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
})


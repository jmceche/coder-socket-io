const socket = io();

socket.on('render_products', data => {
  renderProducts(data);
});
socket.on('render_messages', data => {
  renderMessages(data);
});

const submitProduct = (e) => {
  e.preventDefault()
  const prod = {
      title: document.querySelector('#title').value,
      price: document.querySelector('#price').value,
      thumbnail: document.querySelector('#thumbnail').value,
  }
  socket.emit('submit_product', prod);
}

const sendMsg = (e) => {
  e.preventDefault();
  const msg = {
    user: document.querySelector('#mail').value,
    msg: document.querySelector('#msg').value,
  }
  socket.emit('send_message', msg)
}

const renderMessages = (data) => {
  let date = new Date();
  let html = data.map(item => `
    <p><span class="user">${item.user}</span> <span class="timestamp">[${date.toLocaleString()}]</span>: <span class="user-msg">${item.msg}</span></p> 
  `
  );
  const body = document.querySelector('#chat-msgs')
  body.innerHTML = html.join("");
}

const renderProducts = (data) => {
  let html = data.map(item => `
  <tr>
    <td>${item.title}</td>
    <td>$${item.price}</td>
    <td><img class="icon" src="${item.thumbnail}" alt="test"></td>
  </tr>`
  )
  const body = document.querySelector('#table-body')
  body.innerHTML = html.join("");
}
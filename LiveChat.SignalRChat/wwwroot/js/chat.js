"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var currentUser = "";
//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    // Crear la estructura del chat con DaisyUI
    var chatDiv = document.createElement("div");

    // Verificar si el mensaje es del usuario actual
    if (user === currentUser) {
        // Mis mensajes (chat-end - derecha)
        chatDiv.className = "chat chat-end";
    } else {
        // Mensajes de otros (chat-start - izquierda)
        chatDiv.className = "chat chat-start";
    }

    // Crear avatar
    var avatarDiv = document.createElement("div");
    avatarDiv.className = "chat-image avatar";

    var avatarInner = document.createElement("div");
    avatarInner.className = "w-10 rounded-full";

    var avatarImg = document.createElement("img");
    avatarImg.alt = "Avatar";
    avatarImg.src = "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";

    avatarInner.appendChild(avatarImg);
    avatarDiv.appendChild(avatarInner);

    // Crear header con nombre de usuario
    var headerDiv = document.createElement("div");
    headerDiv.className = "chat-header";
    headerDiv.textContent = user;

    // Crear burbuja con mensaje
    var bubbleDiv = document.createElement("div");
    bubbleDiv.className = "chat-bubble";
    bubbleDiv.textContent = message;

    // Ensamblar todo
    chatDiv.appendChild(avatarDiv);
    chatDiv.appendChild(headerDiv);
    chatDiv.appendChild(bubbleDiv);

    // Agregar al contenedor de mensajes
    document.getElementById("messagesList").appendChild(chatDiv);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    if (currentUser === "") {
        currentUser = user;
    }

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
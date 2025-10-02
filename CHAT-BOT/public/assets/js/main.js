// const { json } = require("express");
document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.querySelector("#sendButton");
  const imputText = document.querySelector("#inputText");

  // Permitir envier con la tecla enter
  imputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendButton.click();
    }
  });
  sendButton.addEventListener("click", async () => {
    // Sacar el valor del imput, pregunta
    const myMenssage = imputText.value.trim();
    if (!myMenssage) return false;
    // Crear y mostrar el mensage del usuario
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message chat-message-user";
    userMessage.textContent = "Yo: " + myMenssage;

    const messageContainer = document.querySelector(".chat-messages");
    messageContainer.appendChild(userMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // Limpier imput
    imputText.value = "";
    imputText.focus();
    // Peticion al backen para que me responda la IA
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: myMenssage,
        }),
      });
      // Crear y mostrar el mensaje del bot
      const data = await response.json();

      const botMessage = document.createElement("div");
      botMessage.className = "chat-message chat-message-bot";
      botMessage.textContent = "Carmen: " + data.reply;

      messageContainer.appendChild(botMessage);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    } catch (error) {
      console.log("Error:", error);
    }
  });
});

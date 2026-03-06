const chatbotContainer = document.querySelector(".chatbot-container");
const chatToggle = document.getElementById("chatbot-toggle");
const closeButton = document.getElementById("close-chatbot");
const chatInput = document.getElementById("chatbot-input-field");
const sendButton = document.getElementById("send-message");
const messagesContainer = document.querySelector(".chatbot-messages");

chatToggle.addEventListener("click", () => {
  chatbotContainer.classList.remove("closing");
  chatbotContainer.classList.add("visible");
  chatToggle.classList.add("hiding");

  setTimeout(() => {
    chatToggle.style.visibility = "hidden";
    chatToggle.classList.remove("hiding");
  }, 400);
});

closeButton.addEventListener("click", () => {
  chatbotContainer.classList.add("closing");

  setTimeout(() => {
    chatbotContainer.classList.remove("visible", "closing");
    chatToggle.style.visibility = "visible";
    chatToggle.classList.add("showing");

    setTimeout(() => {
      chatToggle.classList.remove("showing");
    }, 400);
  }, 800);
});

sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  const loadingId = Date.now().toString();
  addMessage("Thinking...", "bot", loadingId);

  try {
    const response = await fetch("/api/grok-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      removeMessage(loadingId);
      addMessage("Error: Invalid response from AI service.", "bot");
      return;
    }

    removeMessage(loadingId);

    if (!response.ok) {
      let errorMsg =
        data && data.error ? data.error : "Unable to reach AI service.";
      if (data && data.details) errorMsg += ` Details: ${data.details}`;
      addMessage(`Error: ${errorMsg}`, "bot");
      return;
    }

    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      const responseText = data.candidates[0].content.parts[0].text;
      addMessage(responseText, "bot");
    } else {
      addMessage("Error: Unexpected response format from AI service.", "bot");
    }
  } catch (error) {
    removeMessage(loadingId);
    addMessage(
      "Error: Unable to reach AI service. Please try again later.",
      "bot",
    );
    console.error("Chatbot API Error:", error);
  }
}

function addMessage(content, sender, id = null) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  if (id) {
    messageDiv.id = id;
  }

  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-timestamp">${timestamp}</div>
    `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeMessage(id) {
  const message = document.getElementById(id);
  if (message) {
    message.remove();
  }
}

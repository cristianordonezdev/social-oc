import * as signalR from "@microsoft/signalr";

// Configurar la conexión al Hub de SignalR
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7194/chatHub", {
    accessTokenFactory: () => JSON.parse(localStorage.getItem("access_token") ?? ""),
    withCredentials: true, //Cookies and credentials
  })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const startSignalRConnection = async () => {
  if (connection.state !== signalR.HubConnectionState.Disconnected) {
    console.log("La conexión ya está iniciada o en proceso.");
    return null;
  }

  try {
    await connection.start();
  } catch (err) {
    console.error("Error al conectar con SignalR: ", err);
    setTimeout(startSignalRConnection, 5000); // Reintenta después de 5 segundos
  }

};

// Join to any conversation
export const joinConversation = async (conversationId: string, conversationToken: string) => {
  try {
    // Verifica si la conexión está en estado 'Connected'
    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("JoinConversation", conversationId, conversationToken);
      console.log(`Unido al grupo de conversación: ${conversationId}`);
    } else {
      console.error("La conexión no está establecida.");
    }
  } catch (err) {
    console.error("Error al unirse a la conversación: ", err);
  }
};

// Leave a conversation
export const leaveConversation = async (conversationId: string) => {
  try {
    await connection.invoke("LeaveConversation", conversationId);
    console.log(`Saliste del grupo de conversación: ${conversationId}`);
  } catch (err) {
    console.error("Error al salir de la conversación: ", err);
  }
};

// Send a Message
export const sendMessage = async (conversationId: string, message: string, conversation_token: string) => {
  try {
    console.log('tratando')
    await connection.invoke("SendMessage", conversationId, message, conversation_token);
    console.log("Mensaje enviado");
  } catch (err) {
    console.error("Error al enviar mensaje: ", err);
  }
};

// Listen to a messages
export const onReceiveMessage = (callback: (user: string, message: string) => void) => {
  console.log('user')
  connection.on("ReceiveMessage", callback);
};

// Init connection
// startSignalRConnection();

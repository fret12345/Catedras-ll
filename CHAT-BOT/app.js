// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración (de api key)
dotenv.config(); // Se cargan las variables de entorno

// Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir  el frontend (carpeta public)
app.use("/", express.static("public"));

// Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear instancia de openai y pasar la api key
const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

// Ruta / endpoint / url
app.post("/api/chatbot", async (req, res) => {
  const contexto = `
    Eres un asistente de soporte para el supermercado "Familiar".
    Informacion del negocio:
      -Ubiicacion: Rivas, Bo.juan bautista Rivera, Parroquia San pedro 7c al sur.
      -Horario: Lunes a Sabadosd de 08:00 am a 09:00 pm, Domingos de 09:00 am a 06:00 pm
      -Productos: Pan, Leche, Frutas, Verdurar, Carnes, Refrescos (Solo y exclusivamente tenemos estos productos).
      -Marcar: Bimbo, La perfecta, Parmalack, Coca cola, Pepsi Cola, Prix cola, Big cola.
      metodos de pago: efectivo y tambien tarjetas de credito o devito.
    Solo puedes responder preguntas sobre la tienda. Cualquier otra pregunta esta prohibida.
    Debes responder de la forma más corta y directa posible, usando los minimos tokens posibles.
  `;

  // recibir pregunta del usuario
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ error: "Has pasado un mensaje Vacio." });
  // Peticion al modelo de inteligencia artificial.
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: contexto },
        { role: "user", content: message },
      ],
      max_completion_tokens: 200,
    });

    // Devolver respuesta
    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({
      error: "Error al generar la respeusta.",
    });
  }
});

// Servir el backend
app.listen(PORT, () => {
  console.log("Servidor corriendo correctamente en http//localhost:" + PORT);
});

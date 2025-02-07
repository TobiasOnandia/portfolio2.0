import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { name, email, message } = await request.json();

  const apiKey = import.meta.env.BREVO_API_KEY; // Usa una variable de entorno
  const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";

  const emailData = {
    sender: { name: "Tu Nombre", email: "tuemail@gmail.com" },
    to: [{ email: "tuemail@gmail.com", name: "Destinatario" }],
    subject: "Nuevo mensaje de contacto",
    htmlContent: `<p><strong>Nombre:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Mensaje:</strong> ${message}</p>`,
  };

  try {
    const response = await fetch(brevoEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Correo enviado con éxito" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error al enviar el correo" }),
      { status: 500 }
    );
  }
};

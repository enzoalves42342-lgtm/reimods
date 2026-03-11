const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    console.log("Webhook recebido:", body);

    const paymentId = body?.data?.id;

    if (!paymentId) {
      console.log("Sem payment ID, ignorando.");
      return { statusCode: 200 };
    }

    const paymentResponse = await mercadopago.payment.findById(paymentId);

    if (!paymentResponse || !paymentResponse.body) {
      console.log("Pagamento não encontrado.");
      return { statusCode: 200 };
    }

    const data = paymentResponse.body;
    console.log("STATUS REAL DO PAGAMENTO:", data.status);

    if (data.status !== "approved") {
      console.log("Pagamento não aprovado:", data.status);
      return { statusCode: 200 };
    }

    const discordId = data.metadata?.discord_id || "Não identificado";
    const discordName = data.metadata?.discord_name || "Desconhecido";

    const total = data.transaction_amount || 0;

    const date = data.date_approved
      ? new Date(data.date_approved).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
      : "Data desconhecida";

    const productNames = data.additional_info?.items
      ?.map(i => `${i.title} (x${i.quantity})`)
      .join("\n") || "Não identificado";

    // DADOS DO COMPRADOR
    const cliente = `${data.payer?.first_name || ""} ${data.payer?.last_name || ""}`.trim() || "Não informado";
    const email = data.payer?.email || "Não informado";
    const celular = data.payer?.phone?.number || "Não informado";

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "💰 Compra Aprovada",
          color: 3066993,
          fields: [
            { name: "👤 Usuário Discord", value: `${discordName} (${discordId})` },
            { name: "📦 Produto", value: productNames },
            { name: "📅 Data", value: date },
            { name: "💵 Valor", value: `R$ ${total}` },

            { name: "👤 Cliente", value: cliente },
            { name: "📧 Email", value: email },
            { name: "📱 Celular", value: celular },

            { name: "💰 Total da compra", value: `R$ ${total}` }
          ]
        }]
      })
    });

    console.log("Discord status:", response.status);

    return { statusCode: 200 };

  } catch (err) {
    console.error("Erro webhook:", err);
    return { statusCode: 200 }; // IMPORTANTE: nunca retorne 500 pro Mercado Pago
  }
};

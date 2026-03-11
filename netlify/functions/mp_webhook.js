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

const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    embeds: [{
      title: "💰 Compra Aprovada",
      color: 3066993,
      fields: [
        { name: "👤 Usuário", value: `${discordName} (${discordId})` },
        { name: "📦 Produto", value: `${product?.name || "Produto"}` },
        { name: "📅 Data", value: `${new Date().toLocaleString("pt-BR")}` },
        { name: "👤 Cliente", value: `${payer?.first_name || ""} ${payer?.last_name || ""}` },
        { name: "📧 Email", value: `${payer?.email || "Não informado"}` },
        { name: "📱 Celular", value: `${payment?.metadata?.phone || "Não informado"}` },
		{ name: "💰 Valor", value: `R$ ${product?.price || payment.transaction_amount}` },
		{ name: "💳 Total da compra", value: `R$ ${payment.transaction_amount}` },
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

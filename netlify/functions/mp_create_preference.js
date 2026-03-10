const mercadopago = require("mercadopago");
const { verifySessionCookie, parseCookies } = require("./_session");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const PRODUCTS = [
  { id:"aimx_0", price:10.00, title:"AimX (1 dia)" },
  { id:"aimx_1", price:20.00, title:"AimX (3 dias)" },
  { id:"aimx_2", price:47.00, title:"AimX (7 dias)" },
  { id:"aimx_3", price:55.00, title:"AimX(15 dias)" },
  { id:"aimx_4", price:75.00, title:"AimX (30 dias)" },
  
  { id:"ninja_3", price:21.00, title:"Ninja (3 dias)" },
  { id:"ninja_7", price:37.00, title:"Ninja (7 dias)" },
  { id:"ninja_30", price:74.00, title:"Ninja (30 dias)" },

  { id:"aimx_5", price:57.90, title:"AimX (1 dia)" },
  { id:"aimx_6", price:87.90, title:"AimX (7 dias)" },
  { id:"aimx_7", price:127.90, title:"AimX (30 dias)" },

  { id:"wizzard_1", price:28.50, title:"Wizzard - SEM CERTIFICADO (1 dia)" },
  { id:"wizzard_7", price:80.00, title:"Wizzard - SEM CERTIFICADO (7 dias)" },
  { id:"wizzard_30", price:161.00, title:"Wizzard - SEM CERTIFICADO (30 dias)" },

  { id:"gbd_1", price:14.90, title:"Gbd (1 dia)" },
  { id:"gbd_7", price:39.90, title:"Gbd (7 dias)" },
  { id:"gbd_30", price:79.90, title:"Gbd (30 dias)" },
  
  { id:"fichas_1", price:19.00, title:"100M" },
  { id:"fichas_2", price:29.00, title:"200M" },
  { id:"fichas_3", price:39.00, title:"300M" },
  { id:"fichas_4", price:59.00, title:"500M" },
  { id:"fichas_5", price:99.00, title:"1B" },
  { id:"fichas_6", price:159.00, title:"2B" },
  { id:"fichas_7", price:349.00, title:"5B"},
  
  { id:"conta_premium", price:89.00, title:"Conta + 100M" },
  { id:"conta_premium", price:129.00, title:"Conta + 500M" },
  { id:"conta_premium", price:159.00, title:"Conta + 1B" },
  { id:"conta_premium", price:199.00, title:"Conta + 2B" },
  { id:"conta_premium", price:239.00, title:"Conta + 3B" },
  
  { id:"conta_simples", price:29.00, title:"Conta + 100M" },
  { id:"conta_simples", price:39.00, title:"Conta + 200M" },
  { id:"conta_simples", price:69.00, title:"Conta + 500M" },
  { id:"conta_simples", price:119.00, title:"Conta + 1B" },
  { id:"conta_simples", price:179.00, title:"Conta + 2B" },
  { id:"conta_simples", price:219.00, title:"Conta + 3B" },
  
  { id:"golden", price:34.90, title:"24 Golden" },
  { id:"golden", price:59.90, title:"48 Golden" },
  { id:"golden", price:89.90, title:"72 Golden" },
  { id:"golden", price:119.90, title:"96 Golden" },
  
  { id:"pontos", price:36.00, title:"VIP PRATA : 11,180 PTS" },
  { id:"pontos", price:36.00, title:"VIP OURO : 16,770 PTS" },
  { id:"pontos", price:36.00, title:"VIP ESMERALDA : 22,360 PTS" },
  { id:"pontos", price:36.00, title:"VIP DIAMANTE : 27,950 PTS" },
  { id:"pontos", price:36.00, title:"VIP DIAMANTE NEGRO : 33,540 PTS" },


];

exports.handler = async (event) => {
  try {

    const cookies = parseCookies(event.headers.cookie || "");
    const session = verifySessionCookie(cookies.discord_session, process.env.SESSION_SECRET);

    if (!session || !session.user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Usuário não autenticado." })
      };
    }

    const sessionUser = session.user.id;
    const sessionName = session.user.username;

    const body = JSON.parse(event.body || "{}");

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Carrinho vazio." })
      };
    }

    const mpItems = [];
    let total = 0;
    let productNames = [];

    for (const item of body.items) {

      const product = PRODUCTS.find(p => p.id === item.id);

      if (!product) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Produto inválido." })
        };
      }

      const quantity = parseInt(item.quantity);

      if (!quantity || quantity <= 0 || quantity > 10) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Quantidade inválida." })
        };
      }

      total += product.price * quantity;
      productNames.push(`${product.title} (x${quantity})`);

      mpItems.push({
        title: product.title,
        quantity: quantity,
        unit_price: product.price,
        currency_id: "BRL"
      });
    }

    const preference = {
    items: mpItems,
  auto_return: "approved",

  back_urls: {
    success: "https://maliburoleplay.com.br/#success",
    failure: "https://maliburoleplay.com.br/#checkout",
    pending: "https://maliburoleplay.com.br/#checkout"
  },

  metadata: {
    discord_id: sessionUser,
    discord_name: sessionName
  },

  notification_url: "https://maliburoleplay.com.br/.netlify/functions/mp_webhook"
};

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: response.body.init_point
      })
    };

  } catch (err) {
    console.error("Erro MP:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno." })
    };
  }
};

exports.handler = async () => {
  const products = [

    // MODS ANDROID
    { id:"aimx_0", category:"AIMX", name:"AimX (1 dia)", price:10.00, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
    { id:"aimx_1", category:"AIMX", name:"AimX (3 dias)", price:20.00, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
    { id:"aimx_2", category:"AIMX", name:"AimX (7 dias)", price:47.00, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
    { id:"aimx_3", category:"AIMX", name:"AimX (15 dias)", price:55.00, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
    { id:"aimx_4", category:"AIMX", name:"AimX (30 dias)", price:75.00, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
	{ id:"aimx_11", category:"AIMX", name:"AimX (10 dias)", price:0.10, tag:"ANDROID", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimx.webp" },
	
	
    { id:"ninja_3", category:"NINJA", name:"Ninja (3 dias)", price:21.00, tag:"ANDROID", desc:"Predictions break or Frist shot , Auto play, Auto Queue, Smart Auto Queue, 100% safe.", img:"/assets/products/ninja.webp" },
    { id:"ninja_7", category:"NINJA", name:"Ninja (7 dias)", price:37.00, tag:"ANDROID", desc:"Predictions break or Frist shot , Auto play, Auto Queue, Smart Auto Queue, 100% safe.", img:"/assets/products/ninja.webp" },
    { id:"ninja_30", category:"NINJA", name:"Ninja (30 dias)", price:74.00, tag:"ANDROID", desc:"Predictions break or Frist shot , Auto play, Auto Queue, Smart Auto Queue, 100% safe.", img:"/assets/products/ninja.webp" },
  
      // MODS iOS
    { id:"aimx_5", category:"AIMX iOS", name:"AimX (1 dia)", price:57.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimxx.webp" },
    { id:"aimx_6", category:"AIMX iOS", name:"AimX (7 dias)", price:87.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimxx.webp" },
    { id:"aimx_7", category:"AIMX iOS", name:"AimX (30 dias)", price:127.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/aimxx.webp" },

    { id:"wizzard_1", category:"WIZZARD iOS", name:"Wizzard - SEM CERTIFICADO(1 dia)", price:28.50, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/wizzard.webp" },
    { id:"wizzard_7", category:"WIZZARD iOS", name:"Wizzard - SEM CERTIFICADO (7 dias)", price:80.00, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/wizzard.webp" },
    { id:"wizzard_30", category:"WIZZARD iOS", name:"Wizzard - SEM CERTIFICADO(30 dias)", price:161.00, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/wizzard.webp" },
   
    { id:"gbd_1", category:"GBD iOS", name:"Gbd(1 dia)", price:14.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/gbd.webp" },
    { id:"gbd_7", category:"GBD iOS", name:"Gbd (7 dias)", price:39.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/gbd.webp" },
    { id:"gbd_30", category:"GBD iOS", name:"Gbd (30 dias)", price:79.90, tag:"iOS", desc:"Após a compra, abra um ticket.", img:"/assets/products/gbd.webp" },
   
   // Fichas
    { id:"fichas_1", category:"Fichas", name:"100M", price:19.00, tag:"Fichas", desc:"Torne-se um milionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_2", category:"Fichas", name:"200M", price:29.00, tag:"Fichas", desc:"Torne-se um milionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_3", category:"Fichas", name:"300M", price:39.00, tag:"Fichas", desc:"Torne-se um milionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_4", category:"Fichas", name:"500M", price:59.00, tag:"Fichas", desc:"Torne-se um milionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_5", category:"Fichas", name:"1B", price:99.00, tag:"Fichas", desc:"Torne-se um bilionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_6", category:"Fichas", name:"2B", price:159.00, tag:"Fichas", desc:"Torne-se um bilionário.", img:"/assets/products/fichas.webp" },
    { id:"fichas_7", category:"Fichas", name:"5B", price:349.00, tag:"Fichas", desc:"Torne-se um multi-bilionário.", img:"/assets/products/fichas.webp" },

    // Conta Premium
    { id:"conta_premium", category:"Contas Premium", name:"Conta + 100M", price:89.00, tag:"Premium", desc:"CONTA COM 7 A 8 LENDARIOS.", img:"/assets/products/conta.webp" },
    { id:"conta_premium", category:"Contas Premium", name:"Conta + 500M", price:129.00, tag:"Premium", desc:"CONTA COM 7 A 8 LENDARIOS.", img:"/assets/products/conta.webp" },
    { id:"conta_premium", category:"Contas Premium", name:"Conta + 1B", price:159.00, tag:"Premium", desc:"CONTA COM 7 A 8 LENDARIOS.", img:"/assets/products/conta.webp" },
    { id:"conta_premium", category:"Contas Premium", name:"Conta + 2B", price:199.00, tag:"Premium", desc:"CONTA COM 7 A 8 LENDARIOS.", img:"/assets/products/conta.webp" },
    { id:"conta_premium", category:"Contas Premium", name:"Conta + 3B", price:239.00, tag:"Premium", desc:"CONTA COM 7 A 8 LENDARIOS.", img:"/assets/products/conta.webp" },

    // Conta Simples
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 100M", price:29.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 200M", price:39.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 500M", price:69.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 1B", price:119.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 3B", price:179.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
    { id:"conta_simples", category:"Contas Simples", name:"Conta + 3B", price:219.00, tag:"Simples", desc:"CONTA LEVEL 40 A 70 E TACOS SIMPLES.", img:"/assets/products/conta.webp" },
	
	// Golden Shots
     { id:"golden", category:"Golden Shots", name:"24 Golden", price:34.90, tag:"Simples", desc:"Os Golden Shots são ideais para quem quer maximizar recompensas, acelerar o progresso e garantir prêmios especiais com muito mais eficiência.", img:"/assets/products/golden.webp" },
	 { id:"golden", category:"Golden Shots", name:"48 Golden", price:59.90, tag:"Simples", desc:"Os Golden Shots são ideais para quem quer maximizar recompensas, acelerar o progresso e garantir prêmios especiais com muito mais eficiência.", img:"/assets/products/golden.webp" },
	 { id:"golden", category:"Golden Shots", name:"72 Golden", price:89.90, tag:"Simples", desc:"Os Golden Shots são ideais para quem quer maximizar recompensas, acelerar o progresso e garantir prêmios especiais com muito mais eficiência.", img:"/assets/products/golden.webp" },
	 { id:"golden", category:"Golden Shots", name:"96 Golden", price:119.90, tag:"Simples", desc:"Os Golden Shots são ideais para quem quer maximizar recompensas, acelerar o progresso e garantir prêmios especiais com muito mais eficiência.", img:"/assets/products/golden.webp" },
	
	// Pontos vips
	{ id:"pontos", category:"Pontos Vips", name:"VIP PRATA : 11,180 PTS", price:36.00, tag:"Pontos", desc:"Os pontos são adicionados automaticamente de acordo com o seu VIP..", img:"/assets/products/pontos.webp" },
	{ id:"pontos", category:"Pontos Vips", name:"VIP OURO : 16,770 PTS", price:36.00, tag:"Pontos", desc:"Os pontos são adicionados automaticamente de acordo com o seu VIP..", img:"/assets/products/pontos.webp" },
	{ id:"pontos", category:"Pontos Vips", name:"VIP ESMERALDA : 22,360 PTS", price:36.00, tag:"Pontos", desc:"Os pontos são adicionados automaticamente de acordo com o seu VIP..", img:"/assets/products/pontos.webp" },
	{ id:"pontos", category:"Pontos Vips", name:"VIP DIAMANTE : 27,950 PTS", price:36.00, tag:"Pontos", desc:"Os pontos são adicionados automaticamente de acordo com o seu VIP..", img:"/assets/products/pontos.webp" },
	{ id:"pontos", category:"Pontos Vips", name:"VIP DIAMANTE NEGRO : 33,540 PTS", price:36.00, tag:"Pontos", desc:"Os pontos são adicionados automaticamente de acordo com o seu VIP..", img:"/assets/products/pontos.webp" },

  ];

  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};

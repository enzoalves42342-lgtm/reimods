// ===== VARIATION SYSTEM =====
function createVariationSelect(product){
 if(!product.variations) return ""
 let html='<select class="variationSelect">'
 product.variations.forEach(v=>{
  html+=`<option value="${v.price}" data-stock="${v.stock}">${v.name} - R$ ${v.price}</option>`
 })
 html+='</select>'
 return html
}

const DISCORD_INVITE_URL = "";
const CONNECT_CMD = "";

const pages = ["home", "store", "rules", "team", "checkout"];

const categories = ["AIMX", "NINJA", "AIMX iOS", "WIZZARD iOS", "GBD iOS", "Fichas", "Contas Premium", "Contas Simples", "Golden Shots", "Pontos Vips"];
let activeCategory = "AIMX";

let productsData = [];

const teamData = [
  { name:"REI", group:"FUNDADOR", role:"Fundador • REI MODS", bio:"Direção do projeto, decisões finais e visão do RP.", links:[["TikTok","https://www.tiktok.com/@aquilesrp"]] },
];

function renderTeam(){

  const wrap = document.getElementById("teamCards")
  if(!wrap) return

  wrap.innerHTML = ""

  teamData.forEach(m => {

    const el = document.createElement("div")
    el.className = "member"

    el.innerHTML = `
      <div class="avatar">${m.name[0]}</div>
      <div class="name">${m.name}</div>
      <div class="role">${m.role}</div>
      <div class="bio">${m.bio}</div>
      <div class="links">
        ${m.links.map(l=>`<a href="${l[1]}" target="_blank">${l[0]}</a>`).join("")}
      </div>
    `

    wrap.appendChild(el)

  })

}

const cart = new Map();
const fmtBRL = (v) => Number(v || 0).toLocaleString("pt-BR", { style:"currency", currency:"BRL" });

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const byId = (id) => document.getElementById(id);

function on(el, ev, fn, opts){
  if (!el) return;
  el.addEventListener(ev, fn, opts);
}

function safeText(el, text){
  if (!el) return;
  el.textContent = text;
}

function safeShow(el, show, displayStyle="block"){
  if (!el) return;
  el.style.display = show ? displayStyle : "none";
}

function setPage(page){
  pages.forEach(p => byId(`page-${p}`)?.classList.toggle("show", p === page));
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  window.location.hash = page;
  window.scrollTo({ top:0, behavior:"smooth" });
}

function cartCount(){
  let n = 0;
  for (const qty of cart.values()) n += qty;
  return n;
}

function cartTotal(){
  let total = 0;
  for (const [id, qty] of cart.entries()){
    const p = productsData.find(x => x.id === id);
    total += (p?.price || 0) * qty;
  }
  return total;
}

function renderCart(){
  safeText(byId("cartCount"), String(cartCount()));

  const box = byId("cartItems");
  const totalEl = byId("cartTotal");
  if (totalEl) totalEl.textContent = fmtBRL(cartTotal());
  if (!box) return;

  if (cartCount() === 0){
    box.innerHTML = `<div class="muted">Seu carrinho está vazio. Vá na Loja e adicione produtos.</div>`;
    return;
  }

  box.innerHTML = "";
  for (const [id, qty] of cart.entries()){
    const p = productsData.find(x => x.id === id);
    if (!p) continue;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="left">
        <div class="title">${p.name}</div>
        <div class="sub">${qty} × ${fmtBRL(p.price)}</div>
      </div>
      <div class="actions">
        <button data-act="dec" data-id="${id}" type="button">-</button>
        <strong>${qty}</strong>
        <button data-act="inc" data-id="${id}" type="button">+</button>
        <button data-act="del" data-id="${id}" type="button">Remover</button>
      </div>
    `;
    box.appendChild(row);
  }

  $$("button[data-act]", box).forEach(btn=>{
    on(btn, "click", ()=>{
      const id = btn.dataset.id;
      const act = btn.dataset.act;

      if (act === "inc") cart.set(id, (cart.get(id)||0) + 1);
      if (act === "dec") cart.set(id, Math.max(1, (cart.get(id)||1) - 1));
      if (act === "del") cart.delete(id);

      renderCart();
      renderProducts(byId("searchInput")?.value || "");
    });
  });
}

/* ===== PRODUTOS COM VARIAÇÃO ===== */

function renderProducts(filter=""){
  const wrap = byId("products");
  if (!wrap) return;

  wrap.innerHTML = "";
  const q = (filter || "").trim().toLowerCase();

  const items = productsData.filter(p => {
    const inCat = (activeCategory === "Todos") || (p.category === activeCategory);
    const inSearch = (!q) || p.name.toLowerCase().includes(q);
    return inCat && inSearch;
  });

  if (items.length === 0){
    wrap.innerHTML = `<div class="card"><div class="muted">Nenhum produto nessa aba.</div></div>`;
    return;
  }

  items.forEach(p=>{

    /* garante preço caso seja produto com variação */
    if(!p.price && p.variations && p.variations.length){
      p.price = p.variations[0].price;
    }

    const el = document.createElement("div");
    el.className = "prod";
    const qty = cart.get(p.id) || 0;

    let variationHTML = createVariationSelect(p);

    el.innerHTML = `
      <div class="prod-img"><img src="${p.img}" alt="${p.name}"></div>
      <span class="badge">${p.tag || ""}</span>
      <div class="name">${p.name}</div>

      ${variationHTML}

      <div class="muted small">${p.desc || ""}</div>

      <div class="row">
        <div>
          <div class="price">${fmtBRL(p.price)}</div>
          <div class="muted small">Entrega manual pela staff</div>
        </div>

        <div class="qty">
          <button data-act="dec" type="button">-</button>
          <span>${qty}</span>
          <button data-act="inc" type="button">+</button>
        </div>
      </div>
    `;

    const bDec = $("button[data-act='dec']", el);
    const bInc = $("button[data-act='inc']", el);
    const select = $(".variationSelect", el);
    const priceEl = $(".price", el);

    if(select){
      on(select,"change",()=>{
        const newPrice = parseFloat(select.value);
        priceEl.textContent = fmtBRL(newPrice);
        p.price = newPrice;
      });
    }

    on(bDec, "click", ()=>{
      if (!cart.has(p.id)) return;
      const n = cart.get(p.id);
      if (n <= 1) cart.delete(p.id);
      else cart.set(p.id, n - 1);

      renderProducts(byId("searchInput")?.value || "");
      renderCart();
    });

    on(bInc, "click", ()=>{
      if (!isUserLogged()) {
        toast("Faça login com Discord para comprar.");
        return;
      }

      cart.set(p.id, (cart.get(p.id)||0) + 1);
      renderProducts(byId("searchInput")?.value || "");
      renderCart();
    });

    wrap.appendChild(el);
  });
}

function renderCategoryTabs(){
  const wrap = byId("categoryTabs");
  if (!wrap) return;

  wrap.innerHTML = "";
  categories.forEach(cat=>{
    const b = document.createElement("button");
    b.className = "tab" + (cat === activeCategory ? " active" : "");
    b.type = "button";
    b.textContent = cat;

    on(b, "click", ()=>{
      activeCategory = cat;
      $$(".tab", wrap).forEach(t => t.classList.remove("active"));
      b.classList.add("active");
      renderProducts(byId("searchInput")?.value || "");
    });

    wrap.appendChild(b);
  });
}

async function loadProducts(){
  try{

    const res = await fetch("/.netlify/functions/get_products");
    const data = await res.json();

    productsData = [];

    data.forEach(p=>{

      // produto normal
      if(!p.variations){
        productsData.push(p);
        return;
      }

      // produto com variações
      p.variations.forEach(v=>{
        productsData.push({
          id: p.id + "_" + v.name.replace(/\s/g,"_"),
          category: p.category,
          name: v.name,
          price: v.price,
          stock: v.stock,
          tag: p.tag || "",
          desc: p.desc || "",
          img: p.img
        });
      });

    });

    renderCategoryTabs();
    renderProducts("");
    renderCart();

  }catch(err){
    console.error("Erro ao carregar produtos", err);
  }
}

function bindGlobalUI(){

  $$(".nav-btn").forEach(btn=>{
    on(btn,"click",()=>{
      const page = btn.dataset.page
      if(!page) return
      setPage(page)
      renderCart()
    })
  })

  on(byId("searchInput"),"input",(e)=>{
    renderProducts(e.target.value)
  })

}

function bindDiscordAuthUI(){
  const btnLogin = byId("btnLogin")
  const btnLogout = byId("btnLogout")

  if(btnLogin){
    on(btnLogin,"click",()=>{
      window.location.href="/.netlify/functions/discord-auth"
    })
  }

  if(btnLogout){
    on(btnLogout,"click",async ()=>{
      await fetch("/.netlify/functions/logout")
      window.location.reload()
    })
  }
}

async function refreshDiscordUserUI(){
  try{

    const res = await fetch("/.netlify/functions/me",{
      cache:"no-store",
      credentials:"include"
    })

    const data = await res.json()

    if(!data?.logged) return

    const username = byId("username")
    if(username) username.textContent = data.user.username

  }catch(e){
    console.log("auth error")
  }
}

function boot(){
  bindGlobalUI();
  renderTeam();
  renderCart();

  bindDiscordAuthUI();
  refreshDiscordUserUI();

  const hashPage = (window.location.hash || "").replace("#", "");
  if (hashPage && pages.includes(hashPage)) setPage(hashPage);
  
  loadProducts();
}

document.addEventListener("DOMContentLoaded", boot);

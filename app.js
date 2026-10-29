const categories=['Fountain','Whistle bomb / Crying cow','Kwitis','Luces','Aerial fireworks','Sawa','Firecrackers / TRANGULO'];
// Replace these samples with your real names, prices, images, and MP4 video paths.
const products=[{"id": "crackling-joy", "name": "Crackling Joy", "category": "Fountain", "price": 175, "image": "01-Fountain/Crackling Joy Fountain/crackling joy.png", "video": "01-Fountain/Crackling Joy Fountain/crackling-joy-fountain-by-phoenix-fireworks-new-year-s-eve-2026-diwali-vuurwerk-feuerwerk-1280-ytshorts.savetube.me.mp4"}, {"id": "jumbo-silver", "name": "Jumbo Silver", "category": "Fountain", "price": 110, "image": "", "video": ""}, {"id": "lucky-mayon", "name": "Lucky Mayon", "category": "Fountain", "price": 250, "image": "01-Fountain/Lucky mayon volcano fountain/bb70a678-4e3a-418a-9ca3-c0e8c436ca36.png", "video": "01-Fountain/Lucky mayon volcano fountain/lucky-mayon-volcano-super-jumbo-fountain-by-phoenix-fireworks-1920-ytshorts.savetube.me.mp4"}, {"id": "lucky-pagoda", "name": "Lucky Pagoda", "category": "Fountain", "price": 250, "image": "01-Fountain/lucky pagoda/6cd13058-25b2-4204-bfb4-4d326c2e9a8c.png", "video": "01-Fountain/lucky pagoda/lucky-pagoda-super-jumbo-fountain-by-phoenix-fireworks-fireworks-philippines-birthday-1920-ytshorts.savetube.me.mp4"}, {"id": "lucky-taal", "name": "Lucky Taal", "category": "Fountain", "price": 175, "image": "01-Fountain/Lucky Taal Volcano/38bcfa11-5ac8-4de5-b847-936a7e490d57.png", "video": "01-Fountain/Lucky Taal Volcano/lucky-taal-crackling-fountain-trending-fireworks-paputok-happynewyear-explosion-pyro-viral-1920-ytshorts.savetube.me.mp4"}, {"id": "mt-everest", "name": "Mt Everest", "category": "Fountain", "price": 190, "image": "01-Fountain/Mt. EVEREST/MT ERE Mountain Fireworks Fountain.png", "video": "01-Fountain/Mt. EVEREST/mt-everest-crackling-fountain-by-leegendary-fireworks-shorts-diwali-paputok-newyear2026-xmas-1920-ytshorts.savetube.me.mp4"}, {"id": "peacock", "name": "Peacock", "category": "Fountain", "price": 1350, "image": "01-Fountain/Peacock/f6506ecf-820f-472b-895b-64816b76827b.png", "video": "01-Fountain/Peacock/peacock-fountain-by-glk-philippines-new-years-eve-newyear2025-fireworks-diwali-1920-ytshorts.savetube.me.mp4"}, {"id": "super-jumbo-silver", "name": "Super Jumbo Silver", "category": "Fountain", "price": 130, "image": "", "video": ""}, {"id": "viva-crackling", "name": "Viva Crackling", "category": "Fountain", "price": 175, "image": "01-Fountain/Viva Crackling Fountain/viva crackling fountain.png", "video": "01-Fountain/Viva Crackling Fountain/viva-crackling-fountain-by-phoenix-1920-ytshorts.savetube.me.mp4"}];
const money=n=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key='nmd-estimate-cart-v1';let cart={};try{const saved=JSON.parse(localStorage.getItem(key)||'{}');for(const p of products){if(Number.isInteger(saved?.[p.id])&&saved[p.id]>0)cart[p.id]=Math.min(saved[p.id],999)}}catch{}let selected=categories[0];let noticeTimer;
const byId=id=>document.getElementById(id);
function renderProducts(){byId('category-title').textContent=selected;const list=products.filter(p=>p.category===selected);byId('product-count').textContent=list.length+' item'+(list.length===1?'':'s');byId('products').innerHTML=list.map(p=>`<article class="product"><div class="photo">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">` : `<div class="missing-photo">Photo coming soon</div>`}</div><div class="details"><h3>${esc(p.name)}</h3><div class="price">${money(p.price)}</div><div class="actions"><button class="watch" data-video="${p.id}">▷ Test fire</button><button class="add" data-add="${p.id}">+ Add to cart</button></div></div></article>`).join('') || '<p class="empty">Products coming soon.</p>'}
function renderCategories(){byId('categories').innerHTML=categories.map(c=>`<button class="category" aria-pressed="${c===selected}" data-category="${esc(c)}">${esc(c)}</button>`).join('')}
function rows(){return products.filter(p=>cart[p.id]).map(p=>({...p,quantity:cart[p.id]}))}
function save(){try{localStorage.setItem(key,JSON.stringify(cart))}catch{}}
function renderCart(){const items=rows(),count=items.reduce((s,p)=>s+p.quantity,0),total=items.reduce((s,p)=>s+p.quantity*p.price,0);byId('badge').textContent=count;byId('open-cart').setAttribute('aria-label',`View cart, ${count} items`);byId('total').textContent=money(total);byId('bar-total').textContent=money(total);byId('bar-label').textContent=count+' item'+(count===1?'':'s');byId('cart-bar').hidden=!count;byId('cart-items').innerHTML=items.length?items.map(p=>`<div class="cart-row"><div class="row-top"><div><h3>${esc(p.name)}</h3><div class="unit">${money(p.price)} each</div></div><strong>${money(p.quantity*p.price)}</strong></div><div class="row-controls"><div class="quantity"><button data-minus="${p.id}" aria-label="Decrease ${esc(p.name)} quantity">−</button><span aria-label="Quantity">${p.quantity}</span><button data-plus="${p.id}" aria-label="Increase ${esc(p.name)} quantity" ${p.quantity>=999?'disabled':''}>+</button></div><button class="remove" data-remove="${p.id}" aria-label="Remove ${esc(p.name)}">Remove</button></div></div>`).join(''):'<div class="empty">Your cart is empty.<br>Add items to see your total.</div>'}
function change(id,delta){if(!products.some(p=>p.id===id))return;cart[id]=Math.min(999,Math.max(0,(cart[id]||0)+delta));if(!cart[id])delete cart[id];save();renderCart()}
byId('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;selected=b.dataset.category;for(const button of byId('categories').children)button.setAttribute('aria-pressed',String(button===b));renderProducts()});
byId('products').addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){change(add.dataset.add,1);byId('notice').textContent='Added to cart';byId('notice').classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>byId('notice').classList.remove('show'),1500);return}const b=e.target.closest('[data-video]');if(b){const p=products.find(p=>p.id===b.dataset.video);byId('video-title').textContent=p.name+' · Test fire';const body=byId('video-body');body.replaceChildren();if(p.video){const video=document.createElement('video');video.src=p.video;video.controls=true;video.playsInline=true;video.preload='metadata';body.append(video)}else body.textContent='Test-fire video coming soon.';byId('video-modal').showModal()}});
byId('cart-items').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.plus||b.dataset.minus||b.dataset.remove;if(!id)return;const action=b.dataset.plus?'plus':b.dataset.minus?'minus':'remove';if(action==='remove'){delete cart[id];save();renderCart()}else change(id,action==='plus'?1:-1);const next=byId('cart-items').querySelector(`[data-${action}="${id}"]`);(next||byId('cart').querySelector('.continue')).focus()});
byId('open-cart').onclick=byId('cart-bar').onclick=()=>{renderCart();byId('cart').showModal()};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>byId(b.dataset.close).close());document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()})});byId('video-modal').addEventListener('close',()=>{const v=byId('video-body').querySelector('video');if(v)v.pause()});renderCategories();renderProducts();renderCart();// Use the original files inside your 01-Fountain folder.
const originalFiles = {
  "crackling-joy": [
    "Crackling Joy Fountain",
    "crackling joy.png",
    "crackling-joy-fountain-by-phoenix-fireworks-new-year-s-eve-2026-diwali-vuurwerk-feuerwerk-1280-ytshorts.savetube.me.mp4"
  ],
  "lucky-mayon": [
    "Lucky mayon volcano fountain",
    "bb70a678-4e3a-418a-9ca3-c0e8c436ca36.png",
    "lucky-mayon-volcano-super-jumbo-fountain-by-phoenix-fireworks-1920-ytshorts.savetube.me.mp4"
  ],
  "lucky-pagoda": [
    "lucky pagoda",
    "6cd13058-25b2-4204-bfb4-4d326c2e9a8c.png",
    "lucky-pagoda-super-jumbo-fountain-by-phoenix-fireworks-fireworks-philippines-birthday-1920-ytshorts.savetube.me.mp4"
  ],
  "lucky-taal": [
    "Lucky Taal Volcano",
    "38bcfa11-5ac8-4de5-b847-936a7e490d57.png",
    "lucky-taal-crackling-fountain-trending-fireworks-paputok-happynewyear-explosion-pyro-viral-1920-ytshorts.savetube.me.mp4"
  ],
  "mt-everest": [
    "Mt. EVEREST",
    "MT ERE Mountain Fireworks Fountain.png",
    "mt-everest-crackling-fountain-by-leegendary-fireworks-shorts-diwali-paputok-newyear2026-xmas-1920-ytshorts.savetube.me.mp4"
  ],
  "peacock": [
    "Peacock",
    "f6506ecf-820f-472b-895b-64816b76827b.png",
    "peacock-fountain-by-glk-philippines-new-years-eve-newyear2025-fireworks-diwali-1920-ytshorts.savetube.me.mp4"
  ],
  "viva-crackling": [
    "Viva Crackling Fountain",
    "viva crackling fountain.png",
    "viva-crackling-fountain-by-phoenix-1920-ytshorts.savetube.me.mp4"
  ]
};

products.forEach(product => {
  const files = originalFiles[product.id];
  if (files) {
    const folder = "01-Fountain/" + files[0] + "/";
    product.image = folder + files[1];
    product.video = folder + files[2];
  }
});

renderProducts();// AERIAL FIREWORKS — additional products
(() => {
  const aerials = [
    {
      folder: "arials/16 shots Heavenly Harmony",
      name: "16 shots Heavenly Harmony",
      price: 1700,
      image: "Heavenly_Harmony.png",
      video: "heavenly-harmony-16-shots-fireworks-paputok-diwali-feuerwerk-kembangapi-shorts-trend-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "arials/16 shots Dragon’s Eye of Osiris",
      name: "16 shots Dragon’s Eye of Osiris",
      price: 1700,
      image: "Dragons_Eye_of_Osiris.png",
      video: "16-shots-eye-of-osiris-by-dragon-fireworks-diwali-fireworks-feuerwerk-vuurwerk-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "24 shots Cloud Dragon",
      name: "24 shots Cloud Dragon",
      price: 1100,
      image: "Cloud_Dragon.png",
      video: "24-shots-cloud-dragon-by-golden-rooster-fireworks-diwali-feuerwerk-kembangapi-trendingshorts-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "49 shots Colour Cake",
      name: "49 shots Colour Cake",
      price: 2500,
      image: "Colour_Cake.png",
      video: "colour-cake-49s-by-tiger-fireworks-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "arials/16 shots Fat Cat",
      name: "16 shots Fat Cat",
      price: 900,
      image: "Fat_Cat.png",
      video: "fat-cat-16-shots-by-golden-rooster-shorts-fireworks-diwali-paputok-christmas2025-newyear-nye-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "25 shots Gaia",
      name: "25 shots Gaia",
      price: 1200,
      image: "Gaia.png",
      video: "gaia-25-s-by-lf-fireworks-fireworks-shorts-diwali-holiday-christmas-newyear-viral-trending-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "100 shots Harlequin",
      name: "100 shots Harlequin",
      price: 1000,
      image: "Harlequin.png",
      video: "harlequin-100-shots-by-legendary-fireworks-fireworks-harlequinfireworks-renzowww-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "30 shots Magician",
      name: "30 shots Magician",
      price: 1500,
      image: "Magician.png",
      video: "magician-30-shots-by-golden-rooster-fireworks-newyearphilippines-fireworks-newyear2026-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "16 shots Orbit Jet",
      name: "16 shots Orbit Jet",
      price: 1500,
      image: "Orbit_Jet.png",
      video: "orbit-jet-16-shots-by-lf-fireworks-shorts-fireworks-kwitis-paputok-nazareno-diwali-nye2026-1920-ytshorts.savetube.me.mp4"
    },
    {
      folder: "16 shots Pillar of Autumn",
      name: "16 shots Pillar of Autumn",
      price: 1700,
      image: "Pillar_of_Autumn.png",
      video: "pillar-of-autumn-16-shots-by-leegendary-fireworks-new-year-2026-1920-ytshorts.savetube.me.mp4"
    }
  ];

  if (!categories.includes("Aerial fireworks")) {
    categories.push("Aerial fireworks");
  }

  aerials.forEach(item => {
    const product = {
      id: item.name.toLowerCase().replace(/ /g, "-"),
      name: item.name,
      category: "Aerial fireworks",
      price: item.price,
      image: item.folder + "/" + item.image,
      video: item.folder + "/" + item.video
    };

    const existing = products.find(p => p.id === product.id);

    if (existing) {
      Object.assign(existing, product);
    } else {
      products.push(product);
    }
  });

  // Restore saved aerial cart quantities.
  try {
    const savedCart = JSON.parse(localStorage.getItem(key) || "{}");

    aerials.forEach(item => {
      const id = item.name.toLowerCase().replace(/ /g, "-");

      if (Number.isInteger(savedCart?.[id]) && savedCart[id] > 0) {
        cart[id] = Math.min(savedCart[id], 999);
      }
    });
  } catch {}

  renderCategories();
  renderProducts();
  renderCart();
})();// All aerial product folders are inside "arials".
(() => {
  products.forEach(product => {
    if (product.category !== "Aerial fireworks") return;

    const folder = "arials/" + product.name + "/";

    if (product.image) {
      const filename = product.image.split("/").pop();
      product.image = folder + filename;
    }

    if (product.video) {
      const filename = product.video.split("/").pop();
      product.video = folder + filename;
    }
  });

  renderProducts();
})();
// JUMBO SILVER
const jumboSilver = products.find(p => p.id === "jumbo-silver");
jumboSilver.image = "01-Fountain/jumbo silver/JUMBO_SILVER.png";

// SUPER JUMBO SILVER
const superJumboSilver = products.find(p => p.id === "super-jumbo-silver");
superJumboSilver.image = "01-Fountain/super jumbo silver/SUPER_JUMBO_SILVER.png";

// UPDATE PRODUCT DISPLAY
renderProducts();
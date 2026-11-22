const products = [
  {
    id: 1,
    name: 'Astra X1',
    category: 'phone',
    categoryName: '智能手机',
    price: 1299,
    badge: 'NEW',
    type: 'phone',
    glow: 'rgba(104, 245, 220, .48)',
    accent: '#68f5dc',
    description: '轻盈钛金属机身，搭载新一代影像系统与 Evelyn Neural Engine，把旗舰性能收进掌心。',
    features: ['6.7 英寸自适应高刷显示屏', '全天候智能续航', '三镜头计算摄影系统']
  },
  {
    id: 2,
    name: 'Evelyn Air 14',
    category: 'laptop',
    categoryName: '轻薄电脑',
    price: 1899,
    badge: 'BEST SELLER',
    type: 'laptop',
    glow: 'rgba(184, 255, 61, .45)',
    accent: '#b8ff3d',
    description: '为灵感而生的轻薄性能本。无论创作、协作还是娱乐，都能安静、流畅地完成。',
    features: ['14.2 英寸高亮显示屏', '最长 22 小时续航', '沉浸式六扬声器系统']
  },
  {
    id: 3,
    name: 'Aero Buds Pro',
    category: 'audio',
    categoryName: '无线音频',
    price: 329,
    badge: 'NEW',
    type: 'buds',
    glow: 'rgba(160, 205, 255, .58)',
    accent: '#78b7ff',
    description: '自适应降噪与空间音频随环境实时变化，带来更纯粹、更贴近现场的聆听体验。',
    features: ['自适应主动降噪', '沉浸式空间音频', '无线充电与 30 小时续航']
  },
  {
    id: 4,
    name: 'Pulse One',
    category: 'wearable',
    categoryName: '智能穿戴',
    price: 499,
    badge: 'FITNESS',
    type: 'watch',
    glow: 'rgba(240, 106, 53, .5)',
    accent: '#f06a35',
    description: '从日常活动到睡眠恢复，Pulse One 用清晰、克制的方式帮助你了解自己的状态。',
    features: ['全天候健康趋势追踪', '双频精准定位', '5 ATM 防水设计']
  },
  {
    id: 5,
    name: 'Studio Max',
    category: 'audio',
    categoryName: '头戴式耳机',
    price: 699,
    badge: 'STUDIO',
    type: 'headphones',
    glow: 'rgba(172, 141, 255, .5)',
    accent: '#a88dff',
    description: '为长时间聆听而设计，兼顾通透声场、细节还原与柔软舒适的佩戴感。',
    features: ['40 mm 定制声学单元', '录音室级通透模式', '记忆泡棉舒适耳罩']
  },
  {
    id: 6,
    name: 'Halo Mini',
    category: 'audio',
    categoryName: '智能音箱',
    price: 249,
    badge: 'HOME',
    type: 'speaker',
    glow: 'rgba(255, 195, 87, .48)',
    accent: '#ffc357',
    description: '360° 均衡音场与克制的家居造型，让音乐、播客与语音助理自然融入房间。',
    features: ['360° 计算音频', '多房间同步播放', '隐私优先麦克风开关']
  },
  {
    id: 7,
    name: 'Astra X1 Mini',
    category: 'phone',
    categoryName: '智能手机',
    price: 999,
    badge: 'COMPACT',
    type: 'phone',
    glow: 'rgba(255, 131, 174, .45)',
    accent: '#ff83ae',
    description: '旗舰体验的轻巧版本，舒适单手握持，同时保留出色影像、速度与续航。',
    features: ['6.1 英寸高刷显示屏', '双镜头智能影像', '轻至 158 克']
  },
  {
    id: 8,
    name: 'Evelyn Pro 16',
    category: 'laptop',
    categoryName: '专业电脑',
    price: 2699,
    badge: 'PRO',
    type: 'laptop',
    glow: 'rgba(99, 151, 255, .48)',
    accent: '#6397ff',
    description: '为高强度创作与工程任务打造的大屏性能工作站，性能强劲，依然保持简洁轻薄。',
    features: ['16 英寸专业级显示屏', '高性能多核处理器', '高速统一内存架构']
  }
];

const state = {
  filter: 'all',
  query: '',
  cart: [],
  activeProduct: null
};

const productGrid = document.querySelector('.product-grid');
const emptyState = document.querySelector('.empty-state');
const cartDrawer = document.querySelector('.cart-drawer');
const productModal = document.querySelector('.product-modal');
const overlay = document.querySelector('.overlay');
const toast = document.querySelector('.toast');

function deviceMarkup(product) {
  return `<div class="device device-${product.type}" style="--device-accent:${product.accent}" aria-hidden="true"></div>`;
}

function currency(value) {
  return `S$${value.toLocaleString('en-SG')}`;
}

function renderProducts() {
  const query = state.query.trim().toLowerCase();
  const visible = products.filter((product) => {
    const matchesFilter = state.filter === 'all' || product.category === state.filter;
    const matchesQuery = !query || `${product.name} ${product.categoryName}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  productGrid.innerHTML = visible.map((product) => `
    <article class="product-card" style="--glow:${product.glow}">
      <div class="product-art">
        <span class="product-badge">${product.badge}</span>
        <button class="quick-view" type="button" data-view="${product.id}" aria-label="查看 ${product.name} 详情">↗</button>
        ${deviceMarkup(product)}
      </div>
      <div class="product-info">
        <small>${product.categoryName}</small>
        <h3>${product.name}</h3>
        <strong>${currency(product.price)}</strong>
        <button class="add-button" type="button" data-add="${product.id}">加入购物车</button>
      </div>
    </article>
  `).join('');

  emptyState.hidden = visible.length > 0;
}

function renderCart() {
  const itemsContainer = document.querySelector('.cart-items');
  const empty = document.querySelector('.cart-empty');
  const summary = document.querySelector('.cart-summary');
  document.querySelector('.cart-count').textContent = state.cart.length;

  empty.hidden = state.cart.length > 0;
  summary.hidden = state.cart.length === 0;
  itemsContainer.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-art" style="--glow:${item.glow}">${deviceMarkup(item)}</div>
      <div class="cart-item-info"><strong>${item.name}</strong><small>${item.categoryName}</small><b>${currency(item.price)}</b></div>
      <button class="cart-item-remove" type="button" data-remove="${index}" aria-label="移除 ${item.name}">×</button>
    </div>
  `).join('');
  document.querySelector('.cart-total').textContent = currency(state.cart.reduce((sum, item) => sum + item.price, 0));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;
  state.cart.push(product);
  renderCart();
  showToast(`${product.name} 已加入购物车`);
}

function setLayer(type, isOpen) {
  const target = type === 'cart' ? cartDrawer : productModal;
  target.classList.toggle('active', isOpen);
  target.setAttribute('aria-hidden', String(!isOpen));
  overlay.classList.toggle('active', isOpen);
  overlay.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('no-scroll', isOpen);
  if (isOpen) setTimeout(() => target.querySelector('button')?.focus(), 100);
}

function closeLayers() {
  cartDrawer.classList.remove('active');
  productModal.classList.remove('active');
  cartDrawer.setAttribute('aria-hidden', 'true');
  productModal.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function openProduct(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;
  state.activeProduct = product;
  const modalArt = productModal.querySelector('.modal-art');
  modalArt.style.setProperty('--glow', product.glow);
  modalArt.innerHTML = deviceMarkup(product);
  productModal.querySelector('#modal-title').textContent = product.name;
  productModal.querySelector('.modal-description').textContent = product.description;
  productModal.querySelector('.modal-features').innerHTML = product.features.map((feature) => `<span>${feature}</span>`).join('');
  productModal.querySelector('.modal-price').textContent = currency(product.price);
  setLayer('modal', true);
}

document.querySelectorAll('.filter-tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    state.filter = button.dataset.filter;
    renderProducts();
  });
});

document.querySelector('.search-field input').addEventListener('input', (event) => {
  state.query = event.target.value;
  renderProducts();
});

productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add]');
  const viewButton = event.target.closest('[data-view]');
  if (addButton) addToCart(addButton.dataset.add);
  if (viewButton) openProduct(viewButton.dataset.view);
});

document.querySelector('.cart-button').addEventListener('click', () => setLayer('cart', true));
document.querySelector('.drawer-close').addEventListener('click', closeLayers);
document.querySelector('.modal-close').addEventListener('click', closeLayers);
document.querySelector('.close-and-shop').addEventListener('click', closeLayers);
overlay.addEventListener('click', closeLayers);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLayers(); });

document.querySelector('.cart-items').addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  const [removed] = state.cart.splice(Number(removeButton.dataset.remove), 1);
  renderCart();
  if (removed) showToast(`${removed.name} 已移除`);
});

document.querySelector('.modal-add').addEventListener('click', () => {
  if (state.activeProduct) addToCart(state.activeProduct.id);
});

document.querySelector('.checkout-button').addEventListener('click', () => {
  showToast('这是概念演示，结账功能尚未连接');
});

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('active');
  mobileNav.classList.toggle('active', isOpen);
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.classList.remove('active');
  mobileNav.classList.remove('active');
  mobileNav.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.theme-toggle').addEventListener('click', () => {
  const isLight = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  showToast(isLight ? '已切换至明亮模式' : '已切换至深色模式');
});

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.form-message');
  message.textContent = '订阅成功，下一封灵感邮件见。';
  form.reset();
});

document.querySelector('.hero-watch').addEventListener('click', () => {
  document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
  showToast('设计故事已为你展开');
});
document.querySelector('.ecosystem-button').addEventListener('click', () => {
  document.querySelector('.story-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

renderProducts();
renderCart();

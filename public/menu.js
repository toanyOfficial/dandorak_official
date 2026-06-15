const categoryFilters = document.querySelector('#menu-category-filters');
const minPriceInput = document.querySelector('#menu-min-price');
const maxPriceInput = document.querySelector('#menu-max-price');
const priceLabel = document.querySelector('#menu-price-label');
const results = document.querySelector('#menu-results');
const resultSummary = document.querySelector('#menu-result-summary');
const sortInputs = document.querySelectorAll('input[name="menu-sort"]');

const formatPrice = (value) => `${Number(value).toLocaleString('ko-KR')}원`;
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const categoryColorClasses = ['menu-card-warm', 'menu-card-gold', 'menu-card-cream', 'menu-card-sage', 'menu-card-rose', 'menu-card-clay', 'menu-card-honey', 'menu-card-mint', 'menu-card-latte'];

let categories = [];
let debounceTimer;

const getSelectedCategoryIds = () => [...document.querySelectorAll('input[name="menu-category"]:checked')].map((input) => input.value);
const getSelectedSort = () => document.querySelector('input[name="menu-sort"]:checked')?.value || 'price_asc';

const syncPriceInputs = () => {
  const minPrice = Math.min(Number(minPriceInput.value), Number(maxPriceInput.value));
  const maxPrice = Math.max(Number(minPriceInput.value), Number(maxPriceInput.value));
  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;
  priceLabel.textContent = `${formatPrice(minPrice)} ~ ${formatPrice(maxPrice)}`;
  return { minPrice, maxPrice };
};

const renderCategoryFilters = (nextCategories) => {
  categories = nextCategories;
  categoryFilters.innerHTML = categories.map((category) => `
    <label class="menu-checkbox-pill">
      <input type="checkbox" name="menu-category" value="${category.id}" checked />
      <span>${escapeHtml(category.name)}</span>
    </label>
  `).join('');
  categoryFilters.querySelectorAll('input').forEach((input) => input.addEventListener('change', loadMenu));
};

const groupItems = (items) => items.reduce((groups, item) => {
  const key = item.category_id;
  if (!groups.has(key)) groups.set(key, { categoryName: item.category_name, items: [] });
  groups.get(key).items.push(item);
  return groups;
}, new Map());

const renderItems = (items) => {
  if (!items.length) {
    results.innerHTML = '<p class="menu-empty">조건에 맞는 메뉴가 없습니다.</p>';
    return;
  }

  const groupedItems = groupItems(items);
  results.innerHTML = [...groupedItems.entries()].map(([categoryId, group]) => `
    <article class="menu-category-card ${categoryColorClasses[(Number(categoryId) - 1) % categoryColorClasses.length]}">
      <header class="menu-category-header">
        <h2>${escapeHtml(group.categoryName)}</h2>
        <span>${group.items.length}개 메뉴</span>
      </header>
      <div class="menu-item-list">
        ${group.items.map((item) => `
          <article class="menu-item-card">
            <div class="menu-photo-placeholder" aria-label="${escapeHtml(item.short_name)} 사진 예정">사진<br />준비중</div>
            <div class="menu-item-copy">
              <p class="menu-category-name">${escapeHtml(item.category_name)}</p>
              <h3>${escapeHtml(item.short_name)}</h3>
              <div class="menu-name-row">
                <strong>${escapeHtml(item.long_name)}</strong>
                <span>${escapeHtml(item.main_dish)}</span>
              </div>
              <p class="menu-price">${formatPrice(item.price)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </article>
  `).join('');
};

async function loadMenu() {
  const { minPrice, maxPrice } = syncPriceInputs();
  const params = new URLSearchParams({ minPrice, maxPrice, sort: getSelectedSort() });
  const selectedCategories = getSelectedCategoryIds();
  if (categories.length && !selectedCategories.length) {
    renderItems([]);
    resultSummary.textContent = '0개 메뉴가 조회되었습니다.';
    return;
  }
  if (selectedCategories.length) params.set('categories', selectedCategories.join(','));

  resultSummary.textContent = '메뉴 정보를 불러오는 중입니다.';

  try {
    const response = await fetch(`/api/menu?${params.toString()}`);
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.message || 'Menu query failed');

    if (!categories.length) renderCategoryFilters(data.categories);
    renderItems(data.items);
    resultSummary.textContent = `${data.items.length}개 메뉴가 조회되었습니다.`;
  } catch (error) {
    console.error(error);
    resultSummary.textContent = '메뉴 정보를 불러오지 못했습니다.';
    results.innerHTML = '<p class="menu-empty">DB 연결 또는 조회 중 문제가 발생했습니다.</p>';
  }
}

const scheduleLoadMenu = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(loadMenu, 180);
};

[minPriceInput, maxPriceInput].forEach((input) => input.addEventListener('input', scheduleLoadMenu));
sortInputs.forEach((input) => input.addEventListener('change', loadMenu));
syncPriceInputs();
loadMenu();

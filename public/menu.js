const categoryFilters = document.querySelector('#menu-category-filters');
const minPriceInput = document.querySelector('#menu-min-price');
const maxPriceInput = document.querySelector('#menu-max-price');
const minPriceLabel = document.querySelector('#menu-min-price-label');
const maxPriceLabel = document.querySelector('#menu-max-price-label');
const priceRangeControl = document.querySelector('.price-range-control');
const results = document.querySelector('#menu-results');
const floatingNav = document.querySelector('#menu-floating-nav');
const sortInputs = document.querySelectorAll('input[name="menu-sort"]');

const formatPrice = (value) => `${Number(value).toLocaleString('ko-KR')}원`;
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const categoryColorClasses = ['menu-card-warm', 'menu-card-gold', 'menu-card-cream', 'menu-card-sage', 'menu-card-rose', 'menu-card-clay', 'menu-card-honey', 'menu-card-mint', 'menu-card-latte'];
const getCategoryCardClass = (categoryId) => Number(categoryId) === 7
  ? 'menu-card-signature-gold'
  : categoryColorClasses[(Number(categoryId) - 1) % categoryColorClasses.length];

let categories = [];
let debounceTimer;

const getSelectedCategoryIds = () => [...document.querySelectorAll('input[name="menu-category"]:checked')].map((input) => input.value);
const getSelectedSort = () => document.querySelector('input[name="menu-sort"]:checked')?.value || 'price_asc';
const getCategoryInitial = (category) => String(category.name || '').trim().slice(0, 1) || String(category.id);
const getCategoryPriceRange = (category) => {
  if (category.min_price == null || category.max_price == null) return '가격 정보 없음';
  return `${formatPrice(category.min_price)} ~ ${formatPrice(category.max_price)}`;
};

const syncPriceInputs = () => {
  const minPrice = Math.min(Number(minPriceInput.value), Number(maxPriceInput.value));
  const maxPrice = Math.max(Number(minPriceInput.value), Number(maxPriceInput.value));
  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;
  minPriceLabel.textContent = formatPrice(minPrice);
  maxPriceLabel.textContent = formatPrice(maxPrice);

  const rangeMin = Number(minPriceInput.min);
  const rangeMax = Number(minPriceInput.max);
  const minPercent = ((minPrice - rangeMin) / (rangeMax - rangeMin)) * 100;
  const maxPercent = ((maxPrice - rangeMin) / (rangeMax - rangeMin)) * 100;
  priceRangeControl?.style.setProperty('--price-min-percent', `${minPercent}%`);
  priceRangeControl?.style.setProperty('--price-max-percent', `${maxPercent}%`);

  return { minPrice, maxPrice };
};

const renderFloatingNav = () => {
  if (!floatingNav) return;

  floatingNav.innerHTML = `
    <button class="menu-floating-bubble menu-floating-top" type="button" aria-label="최상단으로 이동">↑</button>
    ${categories.map((category) => `
      <button
        class="menu-floating-bubble ${getCategoryCardClass(category.id)}"
        type="button"
        data-menu-category-target="${category.id}"
        aria-label="${escapeHtml(category.name)} 카테고리로 이동"
      >${escapeHtml(getCategoryInitial(category))}</button>
    `).join('')}
  `;

  floatingNav.querySelector('.menu-floating-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  floatingNav.querySelectorAll('[data-menu-category-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(`#menu-category-${button.dataset.menuCategoryTarget}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

const renderCategoryFilters = (nextCategories) => {
  categories = nextCategories;
  categoryFilters.innerHTML = categories.map((category) => `
    <label class="menu-checkbox-pill">
      <input type="checkbox" name="menu-category" value="${category.id}" checked />
      <span class="menu-checkbox-copy">
        <strong>${escapeHtml(category.name)}</strong>
        <small>${escapeHtml(getCategoryPriceRange(category))}</small>
      </span>
    </label>
  `).join('');
  categoryFilters.querySelectorAll('input').forEach((input) => input.addEventListener('change', loadMenu));
  renderFloatingNav();
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
    <details id="menu-category-${categoryId}" class="menu-category-card ${getCategoryCardClass(categoryId)}" open>
      <summary class="menu-category-header">
        <span class="menu-folding-icon" aria-hidden="true"></span>
        <h2>${escapeHtml(group.categoryName)}</h2>
        <span class="menu-count-badge">${group.items.length}개 메뉴</span>
      </summary>
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
    </details>
  `).join('');
};

async function loadMenu() {
  const { minPrice, maxPrice } = syncPriceInputs();
  const params = new URLSearchParams({ minPrice, maxPrice, sort: getSelectedSort() });
  const selectedCategories = getSelectedCategoryIds();
  if (categories.length && !selectedCategories.length) {
    renderItems([]);
    return;
  }
  if (selectedCategories.length) params.set('categories', selectedCategories.join(','));


  try {
    const response = await fetch(`/api/menu?${params.toString()}`);
    const data = await response.json();
    if (!response.ok || !data.ok) {
      const detail = data.error?.sqlMessage || data.message || 'Menu query failed';
      throw new Error(detail);
    }

    if (!categories.length) renderCategoryFilters(data.categories);
    renderItems(data.items);
  } catch (error) {
    console.error(error);
    results.innerHTML = `<p class="menu-empty">DB 연결 또는 조회 중 문제가 발생했습니다.<br /><small>${escapeHtml(error.message)}</small></p>`;
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

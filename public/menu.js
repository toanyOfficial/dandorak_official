const categoryFilters = document.querySelector('#menu-category-filters');
const minPriceInput = document.querySelector('#menu-min-price');
const maxPriceInput = document.querySelector('#menu-max-price');
const minPriceNumberInput = document.querySelector('#menu-min-price-number');
const maxPriceNumberInput = document.querySelector('#menu-max-price-number');
const priceRangeControl = document.querySelector('.price-range-control');
const results = document.querySelector('#menu-results');
const floatingNav = document.querySelector('#menu-floating-nav');
const sortInputs = document.querySelectorAll('input[name="menu-sort"]');
const imageModal = document.querySelector('#menu-image-modal');
const imageModalImg = document.querySelector('#menu-image-modal-img');
const imageModalTitle = document.querySelector('#menu-image-modal-title');
const imageModalLongName = document.querySelector('#menu-image-modal-long-name');
const imageModalMainDish = document.querySelector('#menu-image-modal-main-dish');

const parseMenuPrice = (value) => Number(String(value ?? '').replaceAll(',', ''));
const formatPrice = (value) => `${Number(value).toLocaleString('ko-KR')}원`;
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const categoryColorClasses = ['menu-card-warm', 'menu-card-gold', 'menu-card-cream', 'menu-card-sage', 'menu-card-rose', 'menu-card-clay', 'menu-card-honey', 'menu-card-mint', 'menu-card-latte'];
const getCategoryCardClass = (categoryId) => Number(categoryId) === 7
  ? 'menu-card-signature-gold'
  : categoryColorClasses[(Number(categoryId) - 1) % categoryColorClasses.length];

let categories = [];
let debounceTimer;

const getSelectedCategoryIds = () => [...document.querySelectorAll('input[name="menu-category"]:checked')].map((input) => input.value);
const getSelectedSort = () => document.querySelector('input[name="menu-sort"]:checked')?.value || 'category';
const getCategoryInitial = (category) => String(category.name || '').trim().slice(0, 1) || String(category.id);
const getMenuItemImageSrc = (item) => `./assets/images/goods/${encodeURIComponent(item.id)}.png`;
const getMenuItemImageAlt = (item) => `${item.short_name} 상품 사진`;
const renderMenuItemPhoto = (item) => `
  <button
    class="menu-photo-placeholder"
    type="button"
    data-menu-image-src="${escapeHtml(getMenuItemImageSrc(item))}"
    data-menu-image-alt="${escapeHtml(getMenuItemImageAlt(item))}"
    data-menu-image-title="${escapeHtml(item.short_name)}"
    data-menu-image-long-name="${escapeHtml(item.long_name)}"
    data-menu-image-main-dish="${escapeHtml(item.main_dish)}"
    aria-label="${escapeHtml(item.short_name)} 큰 사진 보기"
  >
    <img
      class="menu-item-photo"
      src="${escapeHtml(getMenuItemImageSrc(item))}"
      alt="${escapeHtml(getMenuItemImageAlt(item))}"
      loading="lazy"
      decoding="async"
      width="150"
      height="120"
      onerror="this.remove(); this.parentElement.classList.remove('has-menu-photo'); this.parentElement.disabled = true;"
      onload="this.parentElement.classList.add('has-menu-photo');"
    />
    <span class="menu-photo-fallback">사진<br />준비중</span>
    <span class="menu-photo-zoom-hint" aria-hidden="true">확대보기</span>
  </button>
`;


const openMenuImageModal = ({ src, alt, title, longName, mainDish }) => {
  if (!imageModal || !imageModalImg || !imageModalTitle || !src) return;

  imageModalImg.src = src;
  imageModalImg.alt = alt || title || '메뉴 상품 사진';
  imageModalTitle.textContent = title || alt || '메뉴 상품 사진';
  if (imageModalLongName) imageModalLongName.textContent = longName || '';
  if (imageModalMainDish) imageModalMainDish.textContent = mainDish || '';
  imageModal.classList.add('is-open');
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-image-modal-open');
  imageModal.querySelector('.menu-image-modal-close')?.focus();
};

const closeMenuImageModal = () => {
  if (!imageModal || !imageModalImg) return;

  imageModal.classList.remove('is-open');
  imageModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-image-modal-open');
  imageModalImg.removeAttribute('src');
  imageModalImg.alt = '';
  if (imageModalLongName) imageModalLongName.textContent = '';
  if (imageModalMainDish) imageModalMainDish.textContent = '';
};

const getCategoryPriceRange = (category) => {
  if (category.min_price == null || category.max_price == null) return '가격 정보 없음';
  return `${formatPrice(category.min_price)} ~ ${formatPrice(category.max_price)}`;
};

const clampPrice = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Number(minPriceInput.max), Math.max(Number(minPriceInput.min), Math.round(parsed / 1000) * 1000));
};

const syncPriceInputs = ({ source = 'range' } = {}) => {
  const fallbackMin = Number(minPriceInput.min);
  const fallbackMax = Number(maxPriceInput.value);
  const rawMinPrice = source === 'number' ? minPriceNumberInput.value : minPriceInput.value;
  const rawMaxPrice = source === 'number' ? maxPriceNumberInput.value : maxPriceInput.value;
  const nextMinPrice = clampPrice(rawMinPrice, fallbackMin);
  const nextMaxPrice = clampPrice(rawMaxPrice, fallbackMax);
  const minPrice = Math.min(nextMinPrice, nextMaxPrice);
  const maxPrice = Math.max(nextMinPrice, nextMaxPrice);

  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;
  minPriceNumberInput.value = minPrice;
  maxPriceNumberInput.value = maxPrice;

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
    <label class="menu-category-filter-row">
      <span class="menu-category-filter-check"><input type="checkbox" name="menu-category" value="${category.id}" checked /></span>
      <strong>${escapeHtml(category.name)}</strong>
      <small>${escapeHtml(getCategoryPriceRange(category))}</small>
    </label>
  `).join('');
  categoryFilters.querySelectorAll('input').forEach((input) => input.addEventListener('change', loadMenu));
  renderFloatingNav();
};

const getGroupPriceRange = (items) => {
  const prices = items.map((item) => parseMenuPrice(item.price)).filter(Number.isFinite);
  if (!prices.length) return '가격 정보 없음';

  return `${formatPrice(Math.min(...prices))} ~ ${formatPrice(Math.max(...prices))}`;
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
        <span class="menu-category-title-copy">
          <h2>${escapeHtml(group.categoryName)}</h2>
          <small>${escapeHtml(getGroupPriceRange(group.items))}</small>
        </span>
        <span class="menu-count-badge">${group.items.length}개 메뉴</span>
      </summary>
      <div class="menu-item-list">
        ${group.items.map((item) => `
          <article class="menu-item-card">
            ${renderMenuItemPhoto(item)}
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
[minPriceNumberInput, maxPriceNumberInput].forEach((input) => {
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      syncPriceInputs({ source: 'number' });
      loadMenu();
    }, 220);
  });
  input.addEventListener('change', () => {
    syncPriceInputs({ source: 'number' });
    loadMenu();
  });
});
sortInputs.forEach((input) => input.addEventListener('change', loadMenu));
results?.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-menu-image-src]');
  if (!trigger || trigger.disabled) return;

  openMenuImageModal({
    src: trigger.dataset.menuImageSrc,
    alt: trigger.dataset.menuImageAlt,
    title: trigger.dataset.menuImageTitle,
    longName: trigger.dataset.menuImageLongName,
    mainDish: trigger.dataset.menuImageMainDish,
  });
});
imageModal?.addEventListener('click', (event) => {
  if (event.target.closest('[data-menu-modal-close]')) closeMenuImageModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageModal?.classList.contains('is-open')) closeMenuImageModal();
});
syncPriceInputs();
loadMenu();

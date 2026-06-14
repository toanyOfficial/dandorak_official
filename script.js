const landingImages = {
  heroMainImage: {
    label: 'Hero 대표 이미지',
    alt: '학회 세미나 기업행사 단체도시락 대표 이미지',
    guide: '[Hero 대표 이미지 가이드] 보양도시락 또는 가장 고급스러운 도시락 대표컷 1장 필요. 음식 전체 구성이 보이고, 밝고 깔끔한 배경이며, 기업행사 랜딩페이지 첫 화면에 사용할 수 있을 만큼 신뢰감 있는 사진. 과도한 감성컷보다 실제 납품 가능한 상품처럼 보여야 함.',
    src: './assets/images/landing/hero-main.webp',
  },
  boyangLunchboxImage: {
    label: '보양도시락 대표 이미지',
    alt: '보양도시락 대표 사진',
    guide: '[보양도시락 이미지 가이드] 보양도시락 대표사진 필요. 고급스럽고 든든한 한식 도시락 느낌. 메인 반찬과 전체 구성이 잘 보여야 하며, 랜딩페이지에서 가장 신뢰감 있게 보일 사진을 사용.',
    src: './assets/images/landing/product-boyang.webp',
  },
  premiumLunchboxImage: {
    label: '프리미엄 도시락 대표 이미지',
    alt: '프리미엄 도시락 대표 사진',
    guide: '[프리미엄 도시락 이미지 가이드] 프리미엄 도시락 대표사진 필요. 기업행사와 세미나에 어울리는 깔끔하고 균형 잡힌 구성. 너무 화려하기보다 정돈되고 믿음직한 느낌.',
    src: './assets/images/landing/product-premium.webp',
  },
  hansangLunchboxImage: {
    label: '한상도시락 대표 이미지',
    alt: '한상도시락 대표 사진',
    guide: '[한상도시락 이미지 가이드] 한상도시락 대표사진 필요. 실속 있지만 빈약해 보이지 않아야 함. 단체 주문용으로 안정적인 구성이 보이는 사진 사용.',
    src: './assets/images/landing/product-hansang.webp',
  },
  specialCustomLunchboxImage: {
    label: '특수맞춤도시락 대표 이미지',
    alt: '특수맞춤도시락 대표 사진',
    guide: '[특수맞춤도시락 이미지 가이드] 특수경조사, 고위임원, 연예인 대상 맞춤형 고급 도시락 대표사진 필요. 고급스러운 식재료와 정갈한 구성이 잘 보이고 특별한 대접에 어울리는 사진 사용.',
    src: './assets/images/landing/product-special-custom.webp',
  },
  exhibitionHallDeliveryImage: {
    label: '박람회장 납품 이미지',
    alt: '박람회장 도시락 납품 사진',
    guide: '[박람회장 납품 사진 가이드] 박람회장, 전시장, 행사 부스 또는 대량 도시락 납품 정렬 사진 필요. 행사 규모감과 현장 납품 신뢰가 느껴지는 사진.',
    src: './assets/images/landing/case-exhibition-hall.webp',
  },
  churchLunchboxImage: {
    label: '교회 도시락 이미지',
    alt: '교회 행사 도시락 납품 사진',
    guide: '[교회 도시락 사진 가이드] 교회 행사, 예배 후 식사, 수련회, 단체 모임 도시락 납품 분위기가 보이는 사진 필요. 따뜻하고 정돈된 단체 배식 느낌이 좋음.',
    src: './assets/images/landing/case-church-lunchbox.webp',
  },
  seminarLunchboxImage: {
    label: '세미나 도시락 이미지',
    alt: '세미나 행사 도시락 납품 사진',
    guide: '[세미나 도시락 사진 가이드] 세미나, 학회, 기업 교육 현장에 어울리는 도시락 납품 사진 필요. 책상, 강의장, 컨퍼런스 분위기와 깔끔한 도시락 구성이 보이면 좋음.',
    src: './assets/images/landing/case-seminar-lunchbox.webp',
  },
  rentalSpaceLunchboxImage: {
    label: '공간대여 도시락 이미지',
    alt: '공간대여 행사 도시락 납품 사진',
    guide: '[공간대여 도시락 사진 가이드] 대관 공간, 회의실, 스튜디오, 소규모 행사장에서 도시락이 준비된 사진 필요. 깔끔한 공간과 도시락 배치가 함께 보이면 좋음.',
    src: './assets/images/landing/case-rental-space-lunchbox.webp',
  },
  picnicLunchboxImage: {
    label: '야유회 도시락 이미지',
    alt: '야유회 단체 도시락 납품 사진',
    guide: '[야유회 도시락 사진 가이드] 야외 행사, 워크숍, 체육대회, 야유회에 어울리는 단체 도시락 사진 필요. 이동성과 실속 있는 구성이 보이면 좋음.',
    src: './assets/images/landing/case-picnic-lunchbox.webp',
  },
  weddingHallDeliveryImage: {
    label: '예식장 납품 이미지',
    alt: '예식장 도시락 납품 사진',
    guide: '[예식장 납품 사진 가이드] 예식장, 피로연, 가족 행사, 특수 경조사 도시락 납품 사진 필요. 격식 있고 깔끔한 고급 행사 분위기가 느껴지는 사진.',
    src: './assets/images/landing/case-wedding-hall.webp',
  },
  storeDashboardImage: {
    label: '매장 대시보드 이미지',
    alt: '주방 홀 제조 공정 관리 매장 대시보드 화면',
    guide: '[매장 대시보드 이미지 가이드] 주방-홀 대시보드를 통해 주문 상태, 제조 공정, 준비 현황이 체계적으로 관리되는 화면 필요. 실제 관리 시스템의 신뢰감이 느껴지도록 정돈된 UI 화면이나 현장 사용 장면이 좋음.',
    src: '',
  },
  deliveryDashboardImage: {
    label: '배달 대시보드 이미지',
    alt: '도시락 배달 현황 관리 대시보드 화면',
    guide: '[배달 대시보드 이미지 가이드] 배달 대시보드를 통해 배송 현황, 기사 배정, 도착 상태를 확인할 수 있는 화면 필요. 신뢰도 높은 배달 관리 시스템처럼 보이는 UI 또는 운영 장면이 좋음.',
    src: '',
  },
  orderLookupSiteImage: {
    label: '주문조회 사이트 이미지',
    alt: '고객 주문내역 견적서 배송기사 조회 사이트 화면',
    guide: '[주문조회 사이트 이미지 가이드] 고객이 주문내역, 견적서, 배송기사 정보를 직접 확인할 수 있는 웹사이트 화면 필요. 모바일 또는 PC 화면에서 주문 조회 기능이 직관적으로 보이면 좋음.',
    src: '',
  },
  deliveryFeeGuideImage: {
    label: '배송비 안내 이미지',
    alt: '단도락 지역별 배송비 안내 이미지',
    guide: '[배송비 안내 이미지 가이드] 지역별 배송 가능 구역을 한눈에 보여주는 지도형 이미지 필요. 남동쪽, 남서쪽, 북서쪽, 북동쪽, 장거리 구역이 구분되어 보이면 좋음.',
    src: '',
  },
};

const productItems = [
  {
    title: '보양도시락',
    body: '중요한 학회, 병원 세미나, VIP 행사에 어울리는 든든한 프리미엄 구성입니다.',
    price: '25,000원~',
    recommend: '학회 · 병원 세미나 · VIP 행사',
    imageClass: 'product-wellness',
    image: landingImages.boyangLunchboxImage,
  },
  {
    title: '프리미엄 도시락',
    body: '기업교육, 컨퍼런스, 간담회 등 격식을 갖춘 행사에 적합한 균형 잡힌 구성입니다.',
    price: '15,000원~20,000원대',
    recommend: '기업교육 · 컨퍼런스 · 간담회',
    imageClass: 'product-premium',
    image: landingImages.premiumLunchboxImage,
  },
  {
    title: '한상도시락',
    body: '학교 행사, 워크숍, 설명회 등 실속 있는 단체 주문에 적합한 구성입니다.',
    price: '10,000원~15,000원대',
    recommend: '학교행사 · 워크숍 · 설명회',
    imageClass: 'product-table',
    image: landingImages.hansangLunchboxImage,
  },
  {
    title: '특수맞춤도시락',
    body: '아주 특별한 분들께 대접해야 하는 맞춤형 고급 도시락입니다.',
    price: '50,000원 ~',
    recommend: '특수경조사 · 고위임원 · 연예인대상',
    imageClass: 'product-special',
    image: landingImages.specialCustomLunchboxImage,
  },
];

const orderInfoItems = [
  ['가격대', '10,000원대부터 25,000원대 이상까지 행사 목적에 따라 선택 가능'],
  ['최소 주문 수량', '행사 규모와 지역에 따라 상담 후 안내'],
  ['배송 가능 지역', '서울 전 지역 및 경기 일부 지역'],
  ['주문 마감 시간', '행사 일정과 수량에 따라 사전 상담 필요'],
  ['결제 방식', '계좌이체, 현장 카드결제, 카드번호 결제'],
  ['세금계산서 발행', '가능'],
];

const deliveryCases = [
  { title: '박람회장', image: landingImages.exhibitionHallDeliveryImage },
  { title: '교회 도시락', image: landingImages.churchLunchboxImage },
  { title: '세미나 도시락', image: landingImages.seminarLunchboxImage },
  { title: '공간대여 도시락', image: landingImages.rentalSpaceLunchboxImage },
  { title: '야유회 도시락', image: landingImages.picnicLunchboxImage },
  { title: '예식장', image: landingImages.weddingHallDeliveryImage },
];

const trustItems = [
  {
    title: '매장 대시보드',
    body: '주방-홀 대시보드를 통해 제조 공정을 체계적으로 관리합니다.',
    image: landingImages.storeDashboardImage,
  },
  {
    title: '배달 대시보드',
    body: '배달 대시보드를 통해 신뢰도 높은 배달 서비스를 제공합니다.',
    image: landingImages.deliveryDashboardImage,
  },
  {
    title: '주문조회 사이트',
    body: '고객이 나의 주문내역/견적서/배송기사를 직접 확인 할 수 있는 웹사이트를 제공합니다..',
    image: landingImages.orderLookupSiteImage,
  },
];

const faqItems = [
  ['몇 개부터 주문 가능한가요?', '행사 규모와 배송 지역에 따라 상담 후 안내드립니다.'],
  ['서울 전 지역 배송 가능한가요?', '서울 전 지역 및 경기 일부 지역 배송이 가능합니다.'],
  ['배송비용이 어떻게 되나요?', '지역별 최소주문금액과 배송비 기준이 다르며, 자세한 기준은 아래 버튼을 통해 확인하실 수 있습니다.', 'deliveryFee'],
  ['행사 로고 라벨 가능한가요?', '행사 규모와 일정에 따라 로고 라벨 부착이 가능합니다. 상담 시 문의해주세요.'],
  ['세금계산서 발행 가능한가요?', '네, 세금계산서 발행 가능합니다.'],
  ['메뉴 변경 가능한가요?', '행사 성격과 수량에 따라 일부 메뉴 조정이 가능합니다.'],
  ['주문은 며칠 전까지 해야 하나요?', '수량과 일정에 따라 달라질 수 있어 가능한 한 사전 문의를 권장드립니다.'],
  ['당일 배송 진행 상황을 확인할 수 있나요?', '네, 당일 배송 진행 상황을 안내해드립니다.'],
];

const escapeAttr = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const makeImageSlot = ({ className, image, title = '' }) => {
  const hasImage = Boolean(image.src);
  return `
    <button class="image-placeholder ${className}${hasImage ? ' has-image' : ''}" type="button" data-guide="${escapeAttr(image.guide)}" aria-label="${escapeAttr(image.label)} 가이드 콘솔 출력">
      ${hasImage ? `<img class="placeholder-photo" src="${escapeAttr(image.src)}" alt="${escapeAttr(image.alt)}" loading="lazy" />` : ''}
      ${hasImage ? '' : `<span class="placeholder-label">${image.label}</span>`}
      ${!hasImage && title ? `<span class="placeholder-title">${title}</span>` : ''}
      ${hasImage ? '' : '<span class="placeholder-hint">클릭 시 사진 가이드 확인</span>'}
    </button>
  `;
};

const heroImageSlot = document.querySelector('#hero-image-slot');
if (heroImageSlot) {
  heroImageSlot.innerHTML = makeImageSlot({
    className: 'hero-image',
    image: landingImages.heroMainImage,
    title: '고급 한식 단체도시락 대표컷',
  });
}

const productList = document.querySelector('#product-list');
if (productList) {
  productList.innerHTML = productItems.map((item) => `
    <article class="product-card">
      ${makeImageSlot({ className: `product-image ${item.imageClass}`, image: item.image })}
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      <strong>${item.price}</strong>
      <span class="recommend">${item.recommend}</span>
    </article>
  `).join('');
}

const orderInfoList = document.querySelector('#order-info-list');
if (orderInfoList) {
  orderInfoList.innerHTML = orderInfoItems.map(([title, body]) => `<div><span>${title}</span><p>${body}</p></div>`).join('');
}

const deliveryCaseList = document.querySelector('#delivery-case-list');
if (deliveryCaseList) {
  deliveryCaseList.innerHTML = deliveryCases.map((item) => `
    <article class="case-card">
      ${makeImageSlot({ className: 'case-image', image: item.image })}
      <h3>${item.title}</h3>
    </article>
  `).join('');
}

const trustList = document.querySelector('#trust-list');
if (trustList) {
  trustList.innerHTML = trustItems.map((item) => `
    <article class="trust-card">
      ${makeImageSlot({ className: 'trust-image', image: item.image })}
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `).join('');
}

const faqList = document.querySelector('#faq-list');
if (faqList) {
  faqList.innerHTML = faqItems.map(([question, answer, action], index) => `
    <details ${index === 0 ? 'open' : ''}>
      <summary>${question}</summary>
      <p>${answer}</p>
      ${action === 'deliveryFee' ? '<button class="faq-modal-button" type="button" data-open-delivery-fee-modal>배송비 기준 자세히 보기</button>' : ''}
    </details>
  `).join('');
}

const deliveryFeeModalMarkup = `
  <div class="modal-backdrop" id="delivery-fee-modal" aria-hidden="true">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="delivery-fee-modal-title">
      <div class="modal-header">
        <h3 id="delivery-fee-modal-title">지역별 배송비 안내</h3>
        <button class="modal-close" type="button" data-close-delivery-fee-modal aria-label="배송비 안내 모달 닫기">닫기</button>
      </div>
      ${makeImageSlot({ className: 'modal-delivery-image', image: landingImages.deliveryFeeGuideImage })}
      <div class="delivery-fee-copy">
        <section>
          <h4>[ 남동쪽 ]</h4>
          <p>최소주문금액 : 35만원<br>배송비 : 35,000원<br>대상지역 : 하남시,성남시,과천시,의왕시,용인시(일부지역제외)</p>
        </section>
        <section>
          <h4>[ 남서쪽 ]</h4>
          <p>최소주문금액 : 35만원<br>배송비 : 40,000원<br>대상지역 : 안양시,군포시,광명시,부천시</p>
        </section>
        <section>
          <h4>[ 북서쪽 ]</h4>
          <p>최소주문금액 : 40만원<br>배송비 : 40,000원<br>대상지역 : 고양시</p>
        </section>
        <section>
          <h4>[ 북동쪽 ]</h4>
          <p>최소주문금액 : 35만원<br>배송비 : 35,000원<br>대상지역 : 구리시,의정부시,남양주시</p>
        </section>
        <section>
          <h4>[ 장거리 ]</h4>
          <p>최소주문금액 : 50만원<br>배송비 : 50,000원<br>대상지역 : 인천, 강화, 안산, 시흥, 수원, 광주, 양주, 파주, 김포, 동두천</p>
        </section>
        <ul>
          <li>그 외 지역은 별도 상담 필요</li>
          <li>평균적으로 택시비의 2배 부과</li>
          <li>[ 성수기/평수기/비수기 ] x [ 원활/혼잡/마감 ] 상황에 따라 달라질 수 있습니다.</li>
        </ul>
      </div>
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', deliveryFeeModalMarkup);

const deliveryFeeModal = document.querySelector('#delivery-fee-modal');
const openDeliveryFeeModalButtons = document.querySelectorAll('[data-open-delivery-fee-modal]');
const closeDeliveryFeeModalButtons = document.querySelectorAll('[data-close-delivery-fee-modal]');

const closeDeliveryFeeModal = () => {
  if (!deliveryFeeModal) return;
  deliveryFeeModal.classList.remove('is-open');
  deliveryFeeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

const openDeliveryFeeModal = () => {
  if (!deliveryFeeModal) return;
  deliveryFeeModal.classList.add('is-open');
  deliveryFeeModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  deliveryFeeModal.querySelector('[data-close-delivery-fee-modal]')?.focus();
};

openDeliveryFeeModalButtons.forEach((button) => {
  button.addEventListener('click', openDeliveryFeeModal);
});

closeDeliveryFeeModalButtons.forEach((button) => {
  button.addEventListener('click', closeDeliveryFeeModal);
});

deliveryFeeModal?.addEventListener('click', (event) => {
  if (event.target === deliveryFeeModal) closeDeliveryFeeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && deliveryFeeModal?.classList.contains('is-open')) closeDeliveryFeeModal();
});

document.querySelectorAll('.image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    console.log(placeholder.dataset.guide);
  });
});

document.querySelectorAll('.kakao-link').forEach((link) => {
  link.addEventListener('click', () => {
    console.log('카카오톡 채널로 이동합니다.');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const header = document.querySelector('.floating-nav');
const scrollContainer = document.querySelector('.landing-scroll-container');
const sections = document.querySelectorAll('[data-observe-section]');

const usesSnapCorrection = () => window.matchMedia('(max-width: 767px)').matches;
const isSnapViewport = () => usesSnapCorrection();

const syncHeaderHeight = () => {
  if (!header) return;
  const height = Math.ceil(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--nav-height', `${height}px`);
};

syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight);
if ('ResizeObserver' in window && header) {
  new ResizeObserver(syncHeaderHeight).observe(header);
}

const getSectionSnapTop = (section) => Math.max(0, section.offsetTop);

const moveToSection = (section, behavior = 'smooth') => {
  if (!section) return;

  if (isSnapViewport() && scrollContainer) {
    isAutoSnapping = true;
    scrollContainer.scrollTo({
      top: getSectionSnapTop(section),
      behavior,
    });
    window.setTimeout(() => {
      isAutoSnapping = false;
    }, behavior === 'smooth' ? 520 : 0);
    return;
  }

  section.scrollIntoView({ behavior, block: 'start' });
};

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    event.preventDefault();
    closeMobileMenu();
    moveToSection(target);
    history.pushState(null, '', `#${targetId}`);
  });
});

const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

const setActiveSection = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.section === sectionId);
  });
};

let snapTimer;
let isAutoSnapping = false;
let bounceTimer;

const getInternalScrollableSection = () => {
  if (!scrollContainer || !sections.length) return null;
  const currentTop = scrollContainer.scrollTop;
  const viewportHeight = scrollContainer.clientHeight;

  return Array.from(sections).find((section) => {
    const sectionTop = getSectionSnapTop(section);
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    return sectionHeight > viewportHeight + 2
      && currentTop >= sectionTop - 2
      && currentTop <= sectionBottom - viewportHeight + 2;
  }) ?? null;
};

const showSectionBounce = (section, direction) => {
  if (!section) return;
  window.clearTimeout(bounceTimer);
  section.classList.remove('is-bounce-start', 'is-bounce-end');
  void section.offsetWidth;
  section.classList.add(direction === 'up' ? 'is-bounce-start' : 'is-bounce-end');
  bounceTimer = window.setTimeout(() => {
    section.classList.remove('is-bounce-start', 'is-bounce-end');
  }, 280);
};

const findNearestSection = () => {
  if (!scrollContainer || !sections.length) return null;
  const currentTop = scrollContainer.scrollTop;
  const viewportHeight = scrollContainer.clientHeight;
  const internalScrollSection = Array.from(sections).find((section) => {
    const sectionTop = getSectionSnapTop(section);
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const hasInternalScroll = sectionHeight > viewportHeight + 2;
    if (!hasInternalScroll) return false;

    const internalTopLimit = sectionTop + 8;
    const internalBottomLimit = sectionBottom - viewportHeight - 8;
    return currentTop > internalTopLimit && currentTop < internalBottomLimit;
  });

  if (internalScrollSection) return null;

  return Array.from(sections).reduce((nearest, section) => {
    const distance = Math.abs(getSectionSnapTop(section) - currentTop);
    return !nearest || distance < nearest.distance ? { section, distance } : nearest;
  }, null)?.section ?? null;
};

const snapToNearestSection = () => {
  if (!usesSnapCorrection() || !scrollContainer || isAutoSnapping) return;
  const nearestSection = findNearestSection();
  if (!nearestSection) return;

  const targetTop = getSectionSnapTop(nearestSection);
  if (Math.abs(scrollContainer.scrollTop - targetTop) < 2) return;

  isAutoSnapping = true;
  scrollContainer.scrollTo({ top: targetTop, behavior: 'smooth' });
  window.setTimeout(() => {
    isAutoSnapping = false;
  }, 380);
};

if (scrollContainer) {
  scrollContainer.addEventListener('wheel', (event) => {
    if (!usesSnapCorrection()) return;
    const currentSection = getInternalScrollableSection();
    if (!currentSection) return;

    const currentTop = scrollContainer.scrollTop;
    const sectionTop = getSectionSnapTop(currentSection);
    const sectionBottom = sectionTop + currentSection.offsetHeight;
    const viewportHeight = scrollContainer.clientHeight;
    const atSectionStart = currentTop <= sectionTop + 2;
    const atSectionEnd = currentTop >= sectionBottom - viewportHeight - 2;

    if (event.deltaY < 0 && atSectionStart) showSectionBounce(currentSection, 'up');
    if (event.deltaY > 0 && atSectionEnd) showSectionBounce(currentSection, 'down');
  }, { passive: true });

  scrollContainer.addEventListener('scroll', () => {
    if (!usesSnapCorrection()) return;
    window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(snapToNearestSection, 140);
  }, { passive: true });
}

if ('IntersectionObserver' in window && sections.length) {
  const getObserverRoot = () => scrollContainer;
  let observer;

  const createObserver = () => {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visibleEntry) setActiveSection(visibleEntry.target.id);
    }, {
      root: getObserverRoot(),
      threshold: [0.35, 0.55, 0.75],
    });
    sections.forEach((section) => observer.observe(section));
  };

  createObserver();
  window.addEventListener('resize', createObserver);
}

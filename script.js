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
  seniorWomenMedicalSeminarImage: {
    label: '대한노인여성의학회 납품 이미지',
    alt: '대한노인여성의학회 춘계 세미나 납품 사진',
    guide: '[학회 납품 사진 가이드] 대한노인여성의학회 춘계 세미나 관련 납품 사진 또는 행사장 납품 사진 필요. 학회/세미나 납품 신뢰를 보여줄 수 있는 사진.',
    src: '',
  },
  konkukHospitalImage: {
    label: '건국대학교병원 납품 이미지',
    alt: '건국대학교병원 납품 사례 사진',
    guide: '[병원 납품 사진 가이드] 건국대학교병원 또는 병원 세미나 납품 사례 사진 필요. 병원 행사에 납품 가능한 신뢰감이 느껴지는 사진.',
    src: '',
  },
  coexDeliveryImage: {
    label: '코엑스 납품 이미지',
    alt: '코엑스 행사 납품 사례 사진',
    guide: '[코엑스 납품 사진 가이드] 코엑스 행사장, 전시장, 대량 납품 전 정렬 사진 등 전시회 납품 경험을 보여줄 수 있는 사진.',
    src: '',
  },
  setecDeliveryImage: {
    label: '세텍 납품 이미지',
    alt: '세텍 행사 납품 사례 사진',
    guide: '[세텍 납품 사진 가이드] 세텍 행사 또는 전시장 납품 사례 사진 필요. 행사장 납품 분위기가 느껴지는 사진.',
    src: '',
  },
  kintexDeliveryImage: {
    label: '킨텍스 납품 이미지',
    alt: '킨텍스 행사 납품 사례 사진',
    guide: '[킨텍스 납품 사진 가이드] 킨텍스 행사 또는 대규모 전시장 납품 사례 사진 필요. 규모감이 느껴지는 사진.',
    src: '',
  },
  generalCorporateDeliveryImage: {
    label: '기타 납품 사례 이미지',
    alt: '기업행사 학회 병원 학교 납품 사례 사진',
    guide: '[기타 납품 사례 사진 가이드] 기업행사, 학교, 병원, 학회 등 다양한 납품 경험을 보여줄 수 있는 사진. 실제 납품 박스, 진열, 행사장 입구 사진 가능.',
    src: '',
  },
  punctualDeliveryImage: {
    label: '정시납품 이미지',
    alt: '행사 시간에 맞춘 정시납품 사진',
    guide: '[정시납품 이미지 가이드] 배송 차량, 납품 현장, 행사장 도착 사진 등 시간 맞춤 배송을 보여줄 수 있는 사진 필요.',
    src: '',
  },
  inspectionSystemImage: {
    label: '검수 시스템 이미지',
    alt: '도시락 출고 전 검수 시스템 사진',
    guide: '[검수 시스템 이미지 가이드] 도시락 수량 확인, 구성품 확인, 포장 완료 전 검수하는 장면 필요. 작업자가 나와도 되지만 깔끔하고 신뢰감 있어야 함.',
    src: '',
  },
  bulkDeliveryImage: {
    label: '대량납품 이미지',
    alt: '대량 도시락 납품 준비 사진',
    guide: '[대량 납품 이미지 가이드] 20개, 50개, 100개 이상 도시락이 정렬된 사진 필요. 규모감과 정돈된 느낌이 중요함.',
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
  { title: '대한노인여성의학회 춘계 세미나', image: landingImages.seniorWomenMedicalSeminarImage },
  { title: '건국대학교병원 납품', image: landingImages.konkukHospitalImage },
  { title: '코엑스 행사 납품', image: landingImages.coexDeliveryImage },
  { title: '세텍 행사 납품', image: landingImages.setecDeliveryImage },
  { title: '킨텍스 행사 납품', image: landingImages.kintexDeliveryImage },
  { title: '기업행사·학회·병원·학교 납품 사례', image: landingImages.generalCorporateDeliveryImage },
];

const trustItems = [
  {
    title: '정시납품 관리',
    body: '행사 시작 시간에 맞춰 사전 배송 일정을 계획하고, 현장 도착 시간을 기준으로 납품을 준비합니다.',
    image: landingImages.punctualDeliveryImage,
  },
  {
    title: '출고 전 검수',
    body: '출고 전 수량과 구성품을 확인하여 누락과 오배송을 줄이는 검수 과정을 거칩니다.',
    image: landingImages.inspectionSystemImage,
  },
  {
    title: '대량 납품 대응',
    body: '소규모 세미나부터 수백 명 규모 행사까지 수량과 일정에 맞춰 준비할 수 있습니다.',
    image: landingImages.bulkDeliveryImage,
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

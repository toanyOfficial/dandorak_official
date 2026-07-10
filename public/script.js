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
    src: './assets/images/landing/trust-store-dashboard.webp',
  },
  deliveryDashboardImage: {
    label: '배달 대시보드 이미지',
    alt: '도시락 배달 현황 관리 대시보드 화면',
    guide: '[배달 대시보드 이미지 가이드] 배달 대시보드를 통해 배송 현황, 기사 배정, 도착 상태를 확인할 수 있는 화면 필요. 신뢰도 높은 배달 관리 시스템처럼 보이는 UI 또는 운영 장면이 좋음.',
    src: './assets/images/landing/trust-delivery-dashboard.webp',
  },
  orderLookupSiteImage: {
    label: '주문조회 사이트 이미지',
    alt: '고객 주문내역 견적서 배송기사 조회 사이트 화면',
    guide: '[주문조회 사이트 이미지 가이드] 고객이 주문내역, 견적서, 배송기사 정보를 직접 확인할 수 있는 웹사이트 화면 필요. 모바일 또는 PC 화면에서 주문 조회 기능이 직관적으로 보이면 좋음.',
    src: './assets/images/landing/trust-order-lookup-site.webp',
  },
  deliveryFeeGuideImage: {
    label: '배송비 안내 이미지',
    alt: '단도락 지역별 배송비 안내 이미지',
    guide: '[배송비 안내 이미지 가이드] 지역별 배송 가능 구역을 한눈에 보여주는 지도형 이미지 필요. 남동쪽, 남서쪽, 북서쪽, 북동쪽, 장거리 구역이 구분되어 보이면 좋음.',
    src: './assets/images/landing/delivery-fee-map.webp',
  },
  sizeInformationImage: {
    label: '도시락 사이즈 안내 이미지',
    alt: '단도락 도시락 사이즈 안내 이미지',
    guide: '[도시락 사이즈 안내 이미지 가이드] 도시락 종류별 가로 세로 사이즈를 한눈에 확인할 수 있는 안내 이미지.',
    src: './assets/images/landing/size-information.webp',
  },
};

const productItems = [
  {
    title: '보양도시락',
    body: '중요한 학회, 병원 세미나, VIP 행사에 어울리는 든든한 프리미엄 구성입니다.',
    price: '25,000원 ~ 50,000원 대',
    recommend: '학회 · 병원 세미나 · VIP 행사',
    imageClass: 'product-wellness',
    image: landingImages.boyangLunchboxImage,
  },
  {
    title: '프리미엄 도시락',
    body: '기업교육, 컨퍼런스, 간담회 등 격식을 갖춘 행사에 적합한 균형 잡힌 구성입니다.',
    price: '15,000원 ~ 20,000원 대',
    recommend: '기업교육 · 컨퍼런스 · 간담회',
    imageClass: 'product-premium',
    image: landingImages.premiumLunchboxImage,
  },
  {
    title: '한상도시락',
    body: '학교 행사, 워크숍, 설명회 등 실속 있는 단체 주문에 적합한 구성입니다.',
    price: '10,000원 ~ 15,000원 대',
    recommend: '학교행사 · 워크숍 · 설명회',
    imageClass: 'product-table',
    image: landingImages.hansangLunchboxImage,
  },
  {
    title: '특수맞춤도시락',
    body: '아주 특별한 분들께 대접해야 하는 맞춤형 고급 도시락입니다.',
    price: '50,000원 ~ 100,000원 대',
    recommend: '특수경조사 · 고위임원 · 연예인대상',
    imageClass: 'product-special',
    image: landingImages.specialCustomLunchboxImage,
  },
];

const orderInfoItems = [
  ['가격대', '1만원대 ~ 10만원대 까지 행사 목적에 따라 선택 가능'],
  ['최소 주문 수량', '서초·강남구 20만원 / 서울 및 수도권 남동부 30만원 / 수도권 북서부 50만원'],
  ['수거서비스 가능', '평균, 개당 700원'],
  ['주문 마감 시간', 'D-1 15:00 / 100개 이상은 D-3'],
  ['결제 방식', '현장 카드결제, 카드번호 결제, 세금계산서, 현금영수증'],
  ['메뉴 통일', '단체전문이라서 화구 갯수가 적고 화력이 셉니다. 메뉴 종류는 2가지 이하로 통일 부탁드립니다.'],
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
    body: '고객님이 나의 주문내역/견적서/배송기사를 직접 확인 할 수 있는 웹사이트를 제공합니다.',
    image: landingImages.orderLookupSiteImage,
  },
];

const faqItems = [
  ['주문 <span class="faq-highlight">최소 금액</span>이 어떻게 되나요?', '서초·강남구 20만원 / 서울 및 수도권 남동부 30만원 / 수도권 북서부 50만원 입니다.'],
  ['배송은 <span class="faq-highlight">어디까지</span> 되나요?', '네 서울 뿐 아니라 전국 모든지역 배송 가능합니다.'],
  ['<span class="faq-highlight">배송비용</span>이 어떻게 되나요?', '지역별 최소주문금액과 배송비 기준이 다르며, 자세한 기준은 아래 버튼을 통해 확인하실 수 있습니다.', 'deliveryFee'],
  ['<span class="faq-highlight">수거 비용</span>은 어떻게 되나요?', '네 수거서비스는 거리와 주문금액에 따라 조금씩 다르지만 평균적으로 1개당 700원의 비용이 부과됩니다. 점심식사는 대략 3시부터 하여 동선에 따라 순차적으로 진행되며 저녁식사는 다음날 오전에 수거됩니다.'],
  ['<span class="faq-highlight">수거는 어떻게</span> 진행되나요?', '배달 갈 때 큰 박스에 담아 보내드립니다. 박스에서 도시락을 꺼내어 드시고 그 박스에 다시 차곡차곡 담아서 편하신 곳에 내어두고 사진찍어 저희에게 사진과 함께 설명해주시면 됩니다. 잔반은 처리하실 필요 없습니다.'],
  ['<span class="faq-highlight">밥,국</span>이 포함되어있나요?', '네 모든 도시락에 밥,국이 포함되어있습니다. 야외에서 식사하실 경우 국 대신 식혜로 변경 가능합니다.(비건2호는 밥 미포함)'],
  ['<span class="faq-highlight">계산은 어떻게</span> 하나요?', '현장카드결제와 카드번호 비대면 결제 모두 가능하고 현금결제 시 세금계산서, 현금영수증 모두 가능합니다.'],
  ['주문은 <span class="faq-highlight">며칠 전</span>까지 해야 하나요?', '보통의 경우 전날 오후3시까지만 알려주셔도 되지만 주문이 마감되는 경우가 있으니 일찍 연락 주시는게 좋습니다. 주문 접수 후 상세 조율 및 수정 가능하십니다.'],
  ['<span class="faq-highlight">어떤 반찬</span>이 나오나요? 매일 달라지나요? 커스텀 가능한가요?', '정해진 카테고리에 대해 세부 메뉴는 매일 달라집니다. 주문 규모에 따라 커스텀 가능합니다. 김치류(볶음김치)/나물(브로콜리,애호박)/계란류(스크램블,계란말이,계란찜,계란장)/새콤무침(미역오이무침,오이양배추무침,미나리무생채,도라지무침)/마른반찬(우엉조림,멸치볶음,견과류조림)/보조메인(비엔나,꽃맛살)'],
  ['도시락 종류를 <span class="faq-highlight">통일</span>해야 하나요?', '네 저희는 단체도시락 전문점이라서 화구 갯수가 적고 화력이 세기 때문에 여러개의 메뉴를 동시에 조리하기가 어렵습니다. 2가지 이하 메뉴로 통일 부탁드립니다.'],
  ['<span class="faq-highlight">보온</span> 배달 되나요?', "네, 전국 어디에서 드시든 취식 시간에 가장 알맞게 드실 수 있도록 배송해드립니다. 단순히 '보온'이 아닙니다. 그냥 보온박스에 담아버리면 샐러드의 숨이 죽고 나물의 맛이 변하는 문제가 있습니다. 저희는 '수제 단체도시락 전문점'으로서, 저희만의 오래된 노하우를 통해 가장 맛있게 드실 수 있도록 잘 가져다 드리겠습니다."],
  ['<span class="faq-highlight">보관</span>해뒀다 먹어도 되나요?', "저희는 공장에서 조리된 완제품을 쓰지 않고 직접 원물을 가공해 사용하는 '수제 도시락'입니다. 그렇기 때문에 가급적 수령 직후, 아무리 늦어도 3~4시간 이내에는 취식하시길 권장드리며 특히 여름에는 반나절 이상은 보관하지 않는 것을 추천드립니다."],
  ['도시락 <span class="faq-highlight">사이즈</span>가 어떻게 되나요?', '보양 : 30x30 / 프리미엄 : 28x24 / 정찬 : 22x22 / 단도락 : 22x19 / 한상 : 28x26 / 푸드박스 : 30x30 (가로x세로 / 단위:cm)', 'sizeInformation'],
  ['글루텐프리, 슈가프리, <span class="faq-highlight">비건</span> 등 커스텀은 어디까지 가능한가요?', '튀김류를 제외하고는 밀가루를 사용하지 않습니다. 콩고기와 슈거프리등의 커스텀이 가능하긴 하지만 주문 규모에 따라 적용 여부가 달라지기 때문에 별도 문의 부탁드립니다. 비건 도시락이 있지만, 조미료나 식자재 보관 방식까지 철저하게 비건으로 운영하지는 않고 있으니 참고 부탁드립니다.'],
  ['<span class="faq-highlight">배달 시 연락</span> 주시나요?', '연락을 따로 드리지는 않지만 주문조회 사이트를 안내 해드립니다. 해당 사이트를 통해, 당일 배정된 배송기사님에게 직접 연락을 취할 수 있습니다.'],
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
      ${action === 'sizeInformation' ? '<button class="faq-modal-button" type="button" data-open-size-information-modal>이미지보기</button>' : ''}
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
          <p>최소주문금액 : 35만원<br>배송비 : 35,000원<br>대상지역 : 구리시,의정부시</p>
        </section>
        <section>
          <h4>[ 장거리 ]</h4>
          <p>최소주문금액 : 50만원<br>배송비 : 50,000원<br>대상지역 : 인천, 강화, 안산, 시흥, 수원, 광주, 양주, 파주, 김포, 동두천, 남양주시</p>
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

const sizeInformationModalMarkup = `
  <div class="modal-backdrop" id="size-information-modal" aria-hidden="true">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="size-information-modal-title">
      <div class="modal-header">
        <h3 id="size-information-modal-title">도시락 사이즈 안내</h3>
        <button class="modal-close" type="button" data-close-size-information-modal aria-label="도시락 사이즈 안내 모달 닫기">닫기</button>
      </div>
      ${makeImageSlot({ className: 'modal-size-information-image', image: landingImages.sizeInformationImage })}
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', deliveryFeeModalMarkup);
document.body.insertAdjacentHTML('beforeend', sizeInformationModalMarkup);

const deliveryFeeModal = document.querySelector('#delivery-fee-modal');
const openDeliveryFeeModalButtons = document.querySelectorAll('[data-open-delivery-fee-modal]');
const closeDeliveryFeeModalButtons = document.querySelectorAll('[data-close-delivery-fee-modal]');
const sizeInformationModal = document.querySelector('#size-information-modal');
const openSizeInformationModalButtons = document.querySelectorAll('[data-open-size-information-modal]');
const closeSizeInformationModalButtons = document.querySelectorAll('[data-close-size-information-modal]');

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

const closeSizeInformationModal = () => {
  if (!sizeInformationModal) return;
  sizeInformationModal.classList.remove('is-open');
  sizeInformationModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

const openSizeInformationModal = () => {
  if (!sizeInformationModal) return;
  sizeInformationModal.classList.add('is-open');
  sizeInformationModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  sizeInformationModal.querySelector('[data-close-size-information-modal]')?.focus();
};

openDeliveryFeeModalButtons.forEach((button) => {
  button.addEventListener('click', openDeliveryFeeModal);
});

closeDeliveryFeeModalButtons.forEach((button) => {
  button.addEventListener('click', closeDeliveryFeeModal);
});

openSizeInformationModalButtons.forEach((button) => {
  button.addEventListener('click', openSizeInformationModal);
});

closeSizeInformationModalButtons.forEach((button) => {
  button.addEventListener('click', closeSizeInformationModal);
});

deliveryFeeModal?.addEventListener('click', (event) => {
  if (event.target === deliveryFeeModal) closeDeliveryFeeModal();
});

sizeInformationModal?.addEventListener('click', (event) => {
  if (event.target === sizeInformationModal) closeSizeInformationModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && deliveryFeeModal?.classList.contains('is-open')) closeDeliveryFeeModal();
  if (event.key === 'Escape' && sizeInformationModal?.classList.contains('is-open')) closeSizeInformationModal();
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


const floatingMenuAction = document.querySelector('.floating-action-menu');
const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let floatingMenuBounceTimer;

const randomBetween = (min, max) => min + Math.random() * (max - min);

const playFloatingMenuBounce = () => {
  if (!floatingMenuAction || prefersReducedMotionQuery.matches) return;

  const duration = Math.round(randomBetween(760, 980));
  const lift = Math.round(randomBetween(8, 14));
  const squash = randomBetween(1.012, 1.034).toFixed(3);
  const stretch = randomBetween(0.966, 0.986).toFixed(3);
  const settle = randomBetween(1.2, 2.8).toFixed(1);
  const tilt = randomBetween(-0.85, 0.85).toFixed(2);

  floatingMenuAction.style.setProperty('--bounce-duration', `${duration}ms`);
  floatingMenuAction.style.setProperty('--bounce-lift', `-${lift}px`);
  floatingMenuAction.style.setProperty('--bounce-squash-x', squash);
  floatingMenuAction.style.setProperty('--bounce-squash-y', stretch);
  floatingMenuAction.style.setProperty('--bounce-settle', `${settle}px`);
  floatingMenuAction.style.setProperty('--bounce-tilt', `${tilt}deg`);

  floatingMenuAction.classList.remove('is-bouncing');
  void floatingMenuAction.offsetWidth;
  floatingMenuAction.classList.add('is-bouncing');
};

const scheduleFloatingMenuBounce = () => {
  window.clearTimeout(floatingMenuBounceTimer);
  if (!floatingMenuAction || prefersReducedMotionQuery.matches) return;

  floatingMenuBounceTimer = window.setTimeout(() => {
    playFloatingMenuBounce();
    scheduleFloatingMenuBounce();
  }, Math.round(randomBetween(3000, 5000)));
};

floatingMenuAction?.addEventListener('animationend', () => {
  floatingMenuAction.classList.remove('is-bouncing');
});

prefersReducedMotionQuery.addEventListener?.('change', scheduleFloatingMenuBounce);
scheduleFloatingMenuBounce();

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

const moveToSection = (section, behavior = 'smooth') => {
  if (!section) return;

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

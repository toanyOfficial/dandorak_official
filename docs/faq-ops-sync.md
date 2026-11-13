# FAQ 게시 알림

main push와 workflow_dispatch에서 .github/workflows/notify-ops-faq.yml이 public/script.js의 실제 FAQ와 안내 모달 텍스트를 추출한다. 홈페이지 편집 위치/동작은 바꾸지 않는다. 미병합 PR 승인만으로 알리지 않는다. JS를 실행/eval하지 않고 문자열·배열 리터럴을 파싱한다. FAQ 선언 형태를 바꾸면 추출 테스트도 함께 확인한다.

Actions secrets OPS_FAQ_SYNC_URL(관제의 /api/integrations/official-faq), OPS_FAQ_SYNC_SECRET(관제 설정과 같은 32자 이상 키)가 필요하다. secret이 없으면 발송을 생략한다. 서명에는 원문·커밋·main 참조·워크플로 run 번호·전송 시각이 포함된다. 키나 본문은 로그에 출력하지 않는다. 권한은 contents:read이며 PR 코드를 특권 문맥에서 실행하지 않는다.

관제는 매뉴얼 FAQ 구역만 업데이트하고 운영자가 정한 규칙·승인 상태를 보존한다. FAQ가 같으면 매뉴얼 버전을 바꾸지 않는다. 이전 알림·중복 알림·잘못된 서명은 반영하지 않는다. 관제 수신 기능과 설정을 준비한 뒤 최초 Run workflow(main)를 실행하고 관제의 최근 반영 커밋을 확인한다. 실제 서버 설정/secret 등록은 이 PR이 수행하지 않는다.

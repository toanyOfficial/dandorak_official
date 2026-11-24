# FAQ 게시 알림

main push와 workflow_dispatch에서 .github/workflows/notify-ops-faq.yml이 public/script.js의 실제 FAQ와 안내 모달 텍스트를 추출한다. 홈페이지 편집 위치/동작은 바꾸지 않는다. 미병합 PR 승인만으로 알리지 않는다. JS를 실행/eval하지 않고 문자열·배열 리터럴을 파싱한다. FAQ 선언 형태를 바꾸면 추출 테스트도 함께 확인한다.

Actions secrets OPS_FAQ_SYNC_URL(관제의 /api/integrations/official-faq), OPS_FAQ_SYNC_SECRET(관제 설정과 같은 32자 이상 키)가 필요하다. secret이 없으면 발송을 생략한다. 서명에는 원문·커밋·main 참조·워크플로 run 번호·전송 시각이 포함된다. 키나 본문은 로그에 출력하지 않는다. 권한은 contents:read이며 PR 코드를 특권 문맥에서 실행하지 않는다.

관제는 매뉴얼 FAQ 구역만 업데이트하고 운영자가 정한 규칙·승인 상태를 보존한다. FAQ가 같으면 매뉴얼 버전을 바꾸지 않는다. 이전 알림·중복 알림·잘못된 서명은 반영하지 않는다. 관제 수신 기능과 설정을 준비한 뒤 최초 Run workflow(main)를 실행하고 관제의 최근 반영 커밋을 확인한다. 실제 서버 설정/secret 등록은 이 PR이 수행하지 않는다.

## Actions 알림 실패 진단

`Notify operations of published FAQ`가 실패하면 로그의 `[FAQ_SYNC_...]` 코드로 원인을 구분한다. 실패 시 종료 코드는 1이다. URL이나 키가 없거나 공백뿐이면 기존처럼 전송을 생략하고, 값 대신 누락된 환경 변수 이름만 기록한다.

| 로그 코드 | 확인할 항목 |
| --- | --- |
| `FAQ_SYNC_URL_CONFIG` | `OPS_FAQ_SYNC_URL`이 절대 HTTP(S) 주소인지, 사용자명·비밀번호를 포함하지 않는지 확인한다. |
| `FAQ_SYNC_SECRET_CONFIG` | `OPS_FAQ_SYNC_SECRET`이 앞뒤 공백 제거 후 32자 이상인지, 관제에 등록한 키와 같은지 확인한다. |
| `FAQ_SYNC_PUBLICATION_CONTEXT` | main의 push 또는 workflow_dispatch인지, 커밋과 run 번호가 유효한지 확인한다. 키 오류와 별개로 표시된다. |
| `FAQ_SYNC_NETWORK` | Actions 실행기에서 수신 서버까지 DNS·TLS·연결을 확인한다. 알려진 오류 코드(예: `ENOTFOUND`, `ECONNREFUSED`)만 기록한다. |
| `FAQ_SYNC_TIMEOUT` | 요청 및 응답 본문 수신의 20초 제한이나 하위 연결 타임아웃을 확인한다. |
| `FAQ_SYNC_HTTP` | 실제 HTTP 상태 코드를 확인한다. 401/403은 키 일치 여부와 접근 권한을, 404는 수신 경로를, 5xx는 수신 서버 상태를 확인한다. 3xx는 최종 수신 주소로 URL을 설정한다. 리다이렉트는 따라가지 않는다. |
| `FAQ_SYNC_RESPONSE_FORMAT` | 2xx 응답이어도 본문이 4096바이트 이내의 JSON이고 `accepted: true`를 포함해야 한다. 본문 누락·잘못된 JSON·크기 초과·승인 필드 오류를 구분하며 HTTP 상태도 기록한다. |
| `FAQ_SYNC_EXTRACTION` / `FAQ_SYNC_UNEXPECTED` | 추출 테스트 및 스크립트의 내부 오류를 확인한다. 원본 예외는 출력하지 않는다. |

연결 실패·타임아웃은 HTTP 응답 전인지 응답 본문 수신 중인지도 표시한다. URL 전체(경로·쿼리 포함), 인증 키, 서명, 요청·응답 본문, 원본 예외 메시지·스택은 기록하지 않는다. 수신 서버가 민감한 값을 오류에 포함하더라도 그대로 출력하지 않는다. 키가 형식상 유효하지만 수신 서버의 키와 다른지는 로컬에서 판별할 수 없으므로 HTTP 인증 실패를 확인한다.

로컬 검증: `node --test scripts/consultation-faq.test.mjs`. 실제 수신 서버에 알림을 보내지 않고 설정·통신·HTTP·응답 형식 및 CLI 로그의 민감 정보 비노출을 검증한다.

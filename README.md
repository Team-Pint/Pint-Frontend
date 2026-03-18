# 📸 PINT (핀트)
> **"내 취향에 핀트가 딱 맞는 출사지 공유소"**
유저들이 사진의 본질에만 집중할 수 있도록 돕는 **Content-First** 사진 및 필터 정보 공유 플랫폼입니다.

<br />

## 🔍 Overview
**핀트(Pint)**는 사진 촬영 시 피사체를 선명하게 맞추는 초점(Focus)을 의미하는 사진계의 오랜 은어에서 착안했습니다.
우리는 "이 사진 어디서 찍었지?", "어떻게 보정했지?"라는 사용자의 근본적인 궁금증을 해결하고자 합니다.

* **주요 타겟**: 감성이 풍부한 일반인, 사진을 더 니치(Niche)하게 찍고 싶은 아마추어, 영감을 얻고 싶은 사진작가
* **디자인 철학**: 미니멀리즘 컨셉을 바탕으로 모든 유저가 핵심 기능을 한 번에 알아볼 수 있는 UX
* **핵심 기능**: 사진 속 장소 및 필터 정보 공유, XMP 메타데이터 표준을 활용한 카메라 정보 자동 추출

<br />

## 🛠 Tech Stack

### Frontend
* **Core**: React, TypeScript
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Animation**: GSAP
* **Networking**: Axios

### Backend
* **Core**: Java Spring Boot
* **Security**: Spring Security (Session & CSRF)
* **Database**: PostgreSQL, JPA/Hibernate
* **Caching**: Redis

### Infrastructure & DevOps
* **Deployment**: AWS EC2, Vercel
* **Storage**: Amazon S3
* **CI/CD**: GitHub Actions
* **Server**: Nginx, Docker

<br />

## ✨ Key Features & Technical Challenges

### 1. 이미지 로딩 성능 최적화 (Redis Caching)
* **문제 상황**: S3 Private 버킷 보안 정책상 매번 Pre-signed URL을 생성해야 하므로 네트워크 I/O 과부하 발생.
* **해결 방법**: 생성된 Pre-signed URL을 Redis에 캐싱(TTL 55분)하여 유효 시간 동안 재사용하도록 구현.
* **결과**: 게시글 목록 조회 성능이 **약 6배 향상**(279ms → 41ms)되었습니다.

### 2. 보안 강화 (Session & CSRF)
* **JWT 대신 세션을 선택한 이유**: 모널리식 구조에서 상태 유지가 용이하며, Refresh Token 관리 시 발생하는 Stateless 위배 문제를 방지하기 위함.
* **CSRF 방어**: Spring Security 6의 마스킹된 토큰 해석 문제를 해결하기 위해 `CsrfTokenRequestAttributeHandler`를 커스텀 설정하여 SPA 환경에서의 보안을 강화했습니다.

### 3. 무한 스크롤 페이지네이션 (Intersection Observer)
* **구현**: `Intersection Observer API`를 활용해 사용자가 화면 하단 도달 시 `page` 상태를 변경하고 추가 데이터를 페칭합니다.
* **최적화**: `useCallback`과 `Set`을 활용해 데이터 중복 결합을 방지하고 불필요한 리렌더링을 최소화했습니다.

### 4. 마이크로 인터랙션 및 UX
* **로그인 애니메이션**: CSS Keyframes를 이용해 사진들이 끊임없이 흐르는 무한 루프 스크롤 구현.
* **낙관적 업데이트**: 좋아요(Like) 클릭 시 서버 응답을 기다리지 않고 UI를 즉각 업데이트하여 사용자 체감 속도를 높였습니다.

<br />

## Vercel
https://pint-frontend-three.vercel.app/login

<br />

## Presentation
https://www.canva.com/design/DAHEKSCKbUA/o8SECI8vNXv_zIGzlzHQDw/edit?utm_content=DAHEKSCKbUA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

<br />

## Demo
https://drive.google.com/file/d/1XNfFHuV3prxDul5s8yuP_z-fmJ1zi8cw/view

<br />

## 👥 Contributors (현대오토에버 SW 스쿨 3기 1조)
* **김준성 (Backend)**
* **윤영선 (Backend)**
* **최소영 (Frontend)**
* **한진우 (Frontend)**

<br />
<br />

Copyright © 2026 Team PINT. All rights reserved.
# 베이스 이미지 선택
FROM node:16

# 앱 디렉토리 생성
WORKDIR /app/main

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 5050

# 앱 실행
CMD ["npm", "start"]

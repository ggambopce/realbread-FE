# Dockerfile
FROM nginx:alpine

# 빌드된 정적 파일 복사
COPY ./dist /usr/share/nginx/html

# 커스텀 nginx 설정이 있다면 추가
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

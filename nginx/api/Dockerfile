FROM nginx

# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d
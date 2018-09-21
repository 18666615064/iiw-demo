FROM nginx:latest

RUN rm /usr/share/nginx/html/50x.html

COPY ./dist /usr/share/nginx/html/
COPY ./build/nginx/conf.d/default.conf /etc/nginx/conf.d

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
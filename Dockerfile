FROM nginx:alpine 
COPY  /dist/CodeHB /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

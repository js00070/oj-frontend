FROM nginx

COPY default /etc/nginx/conf.d/default.conf
ADD JAVAHOMEWORK /usr/share/nginx/html
ADD build /usr/share/nginx/html

CMD nginx -g "daemon off;"

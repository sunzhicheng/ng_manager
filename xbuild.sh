#!/bin/bash

# 发布完成访问地址： http://h5test.idorp.com
./node_modules/node-sass/bin/node-sass --watch src/client/scss/main.scss src/client/css/main.css && \
npm run build.prod.aot && \
cp src/client/home.html dist/prod/ && \
rsync -ravz --progress dist/prod/* vmuser@139.196.153.191:/data/www/server/h5/h5test/



#!/bin/bash

# 发布完成访问地址： http://h5test.idorp.com
npm run build.prod.aot && \
./node_modules/node-sass/bin/node-sass src/client/**/*.scss dist/prod/css/main.css && \
cp src/client/home.html dist/prod/ && \
rsync -ravz --progress dist/prod/* vmuser@139.196.153.191:/data/www/server/h5/h5test/



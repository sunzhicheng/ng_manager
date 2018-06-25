#!/bin/bash

# 启用 scss 模式开发中， 通过 main.scss 更新 main.css 文件 
./node_modules/node-sass/bin/node-sass src/client/scss/main.scss src/client/css/main.css   
# ./node_modules/node-sass/bin/node-sass src/client/scss/main.scss src/client/css/main.css --source-map-root src/client/css/map --source-map-embed true
# ./node_modules/node-sass/bin/node-sass src/client/scss/main.scss src/client/css/main.css --source-map-root src/client/css/map --source-map-embed false



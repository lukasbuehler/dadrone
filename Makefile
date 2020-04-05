
.PHONY: all
all: install start

.PHONY: install
install: ./view/index.html ./node_modules/ar-drone server.js

.PHONY: start
start: install
	npm run start

.PHONY: clean
clean: 
	rm -r ./node_modules
	rm -r ./view/*
	rm -r ./frontend/dadrone-web-frontend/dist
	rm -r ./frontend/dadrone-web-frontend/node_modules

./node_modules/ar-drone: 
	npm i

./view/index.html: ./view frontend/dadrone-web-frontend/dist/index.html
	cp -r ./frontend/dadrone-web-frontend/dist/* ./view/

./view:
	mkdir view

./frontend/dadrone-web-frontend/dist/index.html: ./frontend/dadrone-web-frontend/node_modules/vue-material
	cd ./frontend/dadrone-web-frontend/ && npm run build

./frontend/dadrone-web-frontend/node_modules/vue-material:
	cd ./frontend/dadrone-web-frontend/ && npm i


.PHONY: all
all: view/index.html

view/index.html: frontend/dist/build.js
	cp frontend/index.html view
	cp frontend/dist/build.js view
	cp frontend/dist/build.css view

frontend/dist/build.js: 
	cd frontend && npm run build

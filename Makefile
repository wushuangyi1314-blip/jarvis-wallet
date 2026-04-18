.PHONY: build deploy

build:
	cd projects/aitoolreviewr && hugo --gc --minify

deploy: build
	rm -rf public/*
	cp -r projects/aitoolreviewr/public/* public/

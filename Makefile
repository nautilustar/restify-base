PATH        := ./node_modules/.bin:${PATH}

help:
	echo "make help  - Print this help"
	echo "make lint  - Lint sources with JSHint"
	echo "make test  - Lint sources and run all tests"
	echo "make doc   - Build API docs"
	echo "make fixme - Find and list all FIXME"
	echo "make todo  - Find and list all TODOs"

lint:
	eslint src/

test: lint
	mocha

fixme:
	grep --color=always 'FIXME' -n -r ./src ./test 2>/dev/null || test true

todo:
	grep --color=always 'TODO' -n -r ./src ./test 2>/dev/null || test true

.PHONY: publish lint test doc fixme todo
.SILENT: help lint test doc fixme todo

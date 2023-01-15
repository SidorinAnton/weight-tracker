params := $(wordlist 2,100,$(MAKECMDGOALS))
pwd := $(shell pwd)

# =============== BACKEND ===============

# Styles
isort:
	isort backend/

black:
	black backend/

fix-style: isort black

isort-check:
	isort --check-only --diff backend/

flake8-check:
	flake8 backend/

check-style: flake8-check isort-check


# Start databases
start-db:
	docker-compose up -d


# Run tests
runtests:
	PYTHONPATH=. pytest backend/tests $(params)


# Start local project
runserver:
	PYTHONPATH=./backend ./backend/manage.py runserver 127.0.0.1:5000


# Manage project
manage:
	PYTHONPATH=./backend ./backend/manage.py $(params)


# Generate documentation
generate-schema:
	PYTHONPATH=./backend ./backend/manage.py spectacular --file ./backend/schema.yml


# =============== Frontend ===============
front-start:
	npm start --prefix $(pwd)/frontend


%:
	@:

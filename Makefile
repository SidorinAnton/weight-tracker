params := $(wordlist 2,100,$(MAKECMDGOALS))

# Styles
check-isort:
	isort --check-only --diff backend/

check-flake8:
	flake8 backend/

check-style: check-flake8 check-isort


# Start databases
start-db:
	docker-compose up -d


# Start local project
runserver:
	PYTHONPATH=./backend ./backend/manage.py runserver


# Manage project
manage:
	PYTHONPATH=./backend ./backend/manage.py $(params)


# Generate documentation
generate-schema:
	PYTHONPATH=./backend ./backend/manage.py spectacular --file ./backend/schema.yml


%:
	@:

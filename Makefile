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
	docker-compose -f docker-compose.dev.yml up -d


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


# =============== FRONTEND ===============
front-start:
	npm start --prefix $(pwd)/frontend


# =============== CERTBOT ===============
certbot-certonly-dry:
	docker-compose run --rm certbot certonly -m antonsidorin@list.ru --webroot --webroot-path /var/www/certbot/ --dry-run -d antonsvm.karpovdns.net -d www.antonsvm.karpovdns.net

certbot-certonly:
	docker-compose run --rm certbot certonly -m antonsidorin@list.ru --webroot --webroot-path /var/www/certbot/ -d antonsvm.karpovdns.net -d www.antonsvm.karpovdns.net

certbot-renew:
	docker-compose run --rm certbot renew


# =============== ANSIBLE ===============
play:
	env/bin/ansible-playbook playbool.yml --ask-become-pass

encrypt:
	env/bin/ansible-vault encrypt docker-compose.yml inventory configs/weight-tracker.yaml

decrypt:
	env/bin/ansible-vault decrypt docker-compose.yml inventory configs/weight-tracker.yaml


%:
	@:

include .env
VENV = . unit-testing/test/bin/activate

install-docker:
	sudo apt update
	sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	echo "deb [arch=$$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt update
	sudo apt install -y docker-ce
	sudo usermod -aG docker ${USER}

setup-venv:
	# sudo apt-get update -y
	sudo apt-get install -y python3-pip
	sudo apt-get install -y virtualenv
	sudo apt-get update -y
	pip install virtualenv
	virtualenv -p python3 ./unit-testing/test
	$(VENV) \
	pip install pytest requests python-dotenv psycopg2-binary \
	deactivate

setup-db:
	docker run postgres:12-apline --name ht-db -p 5432 -e POSTGRES_DB=${POSTGRES_DB} -e POSTGRES_HOST=${POSTGRES_HOST} -e POSTGRES_USER=${POSTGRES_USER} -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

setup-web-server:
	npm install
	npm run dev

setup:
	setup-venv setup-db setup-web-server

clean-up:
	docker stop ht-db
	docker rm ht-db

run-test:
	setup \
	$(VENV) && pytest \
	clean-up
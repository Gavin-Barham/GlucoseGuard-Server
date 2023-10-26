VENV = . unit-testing/test/bin/activate

install-docker:
	sudo apt update
	sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	echo "deb [arch=$$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt update
	sudo apt install -y docker-ce
	sudo usermod -aG docker ${USER}

# prereq: must have python3 installed
setup-venv:
	# sudo apt-get update -y
	sudo apt-get install -y python3-pip
	sudo apt-get install -y virtualenv
	sudo apt-get update -y
	pip install virtualenv
	virtualenv -p python3 ./unit-testing/test
	$(VENV) && \
	pip install pytest requests python-dotenv psycopg2-binary && \
	deactivate

setup-db:
	docker run --name ht-db -d -p 5432:5432 \
	-e POSTGRES_DB=TESTING -e POSTGRES_HOST=localhost \
	-e POSTGRES_USER=TESTING -e POSTGRES_PASSWORD=TESTING \
	postgres:latest
	docker stop ht-db

setup: setup-venv setup-db 
	npm install

start:
	docker start ht-db
	npm run dev

# prereq: must start the web server before using this command
run-test:
	$(VENV) && \
	cd ./unit-testing && \
	pytest && \
	deactivate
	# docker stop ht-db
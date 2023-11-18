UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
	VENV = . unit-testing/test/bin/activate
endif
ifeq ($(UNAME_S),Darwin)
	VENV = source ./unit-testing/test/bin/activate
endif

setup: setup-venv setup-db

start:
	rm -rf ./dist
	docker start ht-db
	npm run testing

# prereq: must run start target before using this target
run-test:
	$(VENV) && \
	cd ./unit-testing && \
	pytest && \
	deactivate

# prereq: python3 installed
setup-venv:
ifeq ($(UNAME_S),Linux)
    # Ubuntu
	sudo apt-get install python3-venv
endif
	python3 -m venv ./unit-testing/test
	${VENV} && \
	pip install pytest requests python-dotenv psycopg2-binary && \
	deactivate

setup-db:
	docker run --name ht-db -d -p 5432:5432 -e POSTGRES_HOST=localhost \
	-e POSTGRES_DB=TESTING -e POSTGRES_USER=TESTING -e POSTGRES_PASSWORD=TESTING \
	postgres:latest
	docker stop ht-db

clean-up-db:
	docker stop ht-db
	docker rm ht-db

# after running this target restart machine
install-docker-ubuntu:
	sudo apt update
	sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	echo "deb [arch=$$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt update
	sudo apt install -y docker-ce
	sudo usermod -aG docker ${USER}
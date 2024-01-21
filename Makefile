UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
	VENV = . testing/venv/bin/activate
endif
ifeq ($(UNAME_S),Darwin)
	VENV = source ./testing/venv/bin/activate
endif

# instructions:
# on first time setup execute the 'make setup' command in the root project directory
# after the initial setup, open two terminal windows in the root project directory and 
# on either one of them execute the 'make start' command then 'make run-test' on the other terminal window 
# note: you must run 'make start' before 'make run-test'

# one time command used for setup
setup: setup-venv setup-db

# starts the testing environment
start:
	rm -rf ./dist
	docker start ht-db
	npm run testing

# prereq: must run start target before using this target
# executes all of the test cases
run-test:
	$(VENV) && \
	cd ./testing && \
	coverage run -m pytest && \
	coverage report && \
	deactivate

# prereq: python3 installed
# creates a virtual environment with all the necessary libraries
setup-venv:
ifeq ($(UNAME_S),Linux)
    # Ubuntu
	sudo apt-get install python3-venv
endif
	python3 -m venv ./testing/venv
	${VENV} && \
	pip install pytest requests psycopg2-binary coverage && \
	deactivate

# prerequisite: docker installed
# creates a database docker container
setup-db:
	docker run --name ht-db -d -p 5432:5432 -e POSTGRES_HOST=localhost \
	-e POSTGRES_DB=TESTING -e POSTGRES_USER=TESTING -e POSTGRES_PASSWORD=TESTING \
	postgres:latest
	docker stop ht-db

# prerequisite: docker installed
clean-up-db:
	docker stop ht-db
	docker rm ht-db
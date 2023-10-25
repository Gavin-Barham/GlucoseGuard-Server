import os

import psycopg2

from api_client import APIClient

from dotenv import load_dotenv

client = APIClient()


def test_register():
    # empty fields
    response = client.post('/authn/register', {"email": "", "password": ""})
    assert response.status_code == 400
    assert response.json()["message"] == "Please enter all fields"

    response = client.post('/authn/register', {"email": "a", "password": ""})
    assert response.status_code == 400
    assert response.json()["message"] == "Please enter all fields"

    response = client.post('/authn/register', {"email": "", "password": "a"})
    assert response.status_code == 400
    assert response.json()["message"] == "Please enter all fields"

    # password not 8+ characters
    response = client.post('/authn/register', {"email": "unitTESTING1287981", "password": "1"})
    assert response.status_code == 400
    assert response.json()["message"] == "Password must be at least 8 characters"

    # existing email
    response = client.post('/authn/register', {"email": "unitTESTING1287981", "password": "12345678"})
    assert response.status_code == 403
    assert response.json()["message"] == "Email already exists"

    # setting variables and connecting to db
    load_dotenv()
    db_name = os.environ.get("POSTGRES_DB")
    db_host = os.environ.get("POSTGRES_HOST")
    db_user = os.environ.get("POSTGRES_USER")
    db_pass = os.environ.get("POSTGRES_PASSWORD")

    conn = psycopg2.connect(host = db_host, dbname = db_name, user = db_user, password = db_pass, port = 5432)
    cur = conn.cursor()

    # if the account already exists then delete it
    cur.execute("SELECT * FROM USERs WHERE email == \'unitTESTING1287981\';")

    if cur.fetchone() is not None:
        cur.execute("DELETE FROM USERs WHERE email == \'unitTESTING1287981\';")
    
    conn.commit()
    
    # register new account
    response = client.post('/authn/register', {"email": "unitTESTING1287981", "password": "12345678"})
    assert response.status_code == 201
    assert response.json()["message"] == "User created successfully"
    cur.execute("SELECT * FROM USERs WHERE email == \'unitTESTING1287981\';")
    assert cur.fetchone() is not None
    
    cur.close()
    conn.close()
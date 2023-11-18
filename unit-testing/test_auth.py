import requests
from connect_db import connect_db

testing_email = "unitTESTING@1287981"
testing_password = "12345678"

def test_register():
    base_url = "http://localhost:3000"
    endpoint = '/authn/register'

    with requests.Session() as session:
        # fields
        response = session.post(f'{base_url}{endpoint}', {"email": "", "password": ""})
        assert response.status_code == 400
        assert response.json()["message"] == "Please enter all fields"

        response = session.post(f'{base_url}{endpoint}', {"email": "a", "password": ""})
        assert response.status_code == 400
        assert response.json()["message"] == "Please enter all fields"

        response = session.post(f'{base_url}{endpoint}', {"email": "", "password": "a"})
        assert response.status_code == 400
        assert response.json()["message"] == "Please enter all fields"

        # password not 8+ characters
        response = session.post(f'{base_url}{endpoint}', {"email": testing_email, "password": "1"})
        assert response.status_code == 400
        assert response.json()["message"] == "Password must be at least 8 characters"

        conn = connect_db()
        cur = conn.cursor()

        # if the account already exists then delete it
        cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})

        if cur.fetchone() is not None:
            cur.execute("""DELETE FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})
            conn.commit()

        # register new account
        response = session.post(f'{base_url}{endpoint}', {"email": testing_email, "password": testing_password})
        assert response.status_code == 201
        assert response.json()["message"] == "User created successfully"

        # verify account is created in db
        cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})
        assert cur.fetchone() is not None
        
        # register account with existing email
        response = session.post(f'{base_url}{endpoint}', {"email": testing_email, "password": testing_password})
        assert response.status_code == 403
        assert response.json()["message"] == "Email already exists"
        
        cur.close()
        conn.close()

def test_login():
    base_url = "http://localhost:3000"
    endpoint = "/authn/login"

    with requests.Session() as session:

        # fields
        response = session.post(f'{base_url}{endpoint}', {"email": "", "password": ""})
        assert response.status_code == 400
        assert response.json()["message"] == "Invalid email"

        response = session.post(f'{base_url}{endpoint}', {"email": "a", "password": ""})
        assert response.status_code == 400
        assert response.json()["message"] == "Invalid email"

        response = session.post(f'{base_url}{endpoint}', {"email": "test@ing", "password": ""})
        assert response.status_code == 403
        assert response.json()["message"] == "Invalid password"

        response = session.post(f'{base_url}{endpoint}', {"email": "test@ing", "password": "a"})
        assert response.status_code == 403
        assert response.json()["message"] == "Invalid password"

        # login using non-registered account
        response = session.post(f'{base_url}{endpoint}', {"email": "test@ing", "password": testing_password})
        assert response.status_code == 400
        assert response.json()["message"] == "Credentials are incorrect"

        # login using incorrect password
        response = session.post(f'{base_url}{endpoint}', {"email": testing_email, "password": "abc12345678"})
        assert response.status_code == 400
        assert response.json()["message"] == "Credentials are incorrect"

        # successful login
        response = session.post(f'{base_url}{endpoint}', {"email": testing_email, "password": testing_password})
        assert response.status_code == 200
        assert response.json()["message"] == "Success"
        assert response.json()["accessToken"] is not None
        assert response.json()["userId"] is not None
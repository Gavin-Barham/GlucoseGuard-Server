import psycopg2

from psycopg2.extras import RealDictCursor

from api_client import APIClient

client = APIClient()

testing_email = "unitTESTING@1287981"
testing_password = "12345678"

def test_register():
    # fields
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
    response = client.post('/authn/register', {"email": testing_email, "password": "1"})
    assert response.status_code == 400
    assert response.json()["message"] == "Password must be at least 8 characters"

    # connect to local db
    conn = psycopg2.connect(host = "127.0.0.1", dbname = "TESTING", user = "TESTING", password = "TESTING", port = 5432, cursor_factory = RealDictCursor)
    cur = conn.cursor()

    # if the account already exists then delete it
    cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})

    if cur.fetchone() is not None:
        cur.execute("""DELETE FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})
        conn.commit()

    # register new account
    response = client.post('/authn/register', {"email": testing_email, "password": testing_password})
    assert response.status_code == 201
    assert response.json()["message"] == "User created successfully"

    # verify account is created in db
    cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})
    assert cur.fetchone() is not None
    
    # register account with existing email
    response = client.post('/authn/register', {"email": testing_email, "password": testing_password})
    assert response.status_code == 403
    assert response.json()["message"] == "Email already exists"
    
    cur.close()
    conn.close()

def test_login():
    # fields
    response = client.post('/authn/login', {"email": "", "password": ""})
    assert response.status_code == 400
    assert response.json()["message"] == "Invalid email"

    response = client.post('/authn/login', {"email": "a", "password": ""})
    assert response.status_code == 400
    assert response.json()["message"] == "Invalid email"

    response = client.post('/authn/login', {"email": "test@ing", "password": ""})
    assert response.status_code == 403
    assert response.json()["message"] == "Invalid password"

    response = client.post('/authn/login', {"email": "test@ing", "password": "a"})
    assert response.status_code == 403
    assert response.json()["message"] == "Invalid password"

    # login using non-registered account
    response = client.post('/authn/login', {"email": "test@ing", "password": testing_password})
    assert response.status_code == 400
    assert response.json()["message"] == "Credentials are incorrect"

    # login using incorrect password
    response = client.post('/authn/login', {"email": testing_email, "password": "abc12345678"})
    assert response.status_code == 400
    assert response.json()["message"] == "Credentials are incorrect"

    # successful login
    response = client.post('/authn/login', {"email": testing_email, "password": testing_password})
    assert response.status_code == 200
    assert response.json()["message"] == "Success"
    assert response.json()["accessToken"] is not None
    assert response.json()["userId"] is not None
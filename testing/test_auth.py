import pytest
import requests
from connect_db import connect_db


@pytest.fixture
def setup():
    session = requests.Session()

    try:
        conn = connect_db()
        cur = conn.cursor()

        cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": "TESTING@1234"})

        # delete existing account for fresh start
        if cur.fetchone() is not None:
            cur.execute("""DELETE FROM "USERs" WHERE email = %(value)s""", {"value": "TESTING@1234"})
            conn.commit()

        data = {
            "session": session,
            "connection": conn,
            "cursor": cur
        }

        yield data
    finally:
        session.close()
        cur.close()
        conn.close()

def test_valid_register_and_login_and_register_with_existing_email(setup):
    email = "TESTING@1234"
    password = "12345678"
    cur = setup["cursor"]

    # register account
    response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert response.status_code == 201
    assert response.json()["message"] == "User created successfully"

    # verify account is created in db
    cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": email})
    
    assert cur.fetchone() is not None

    # existing email
    response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert response.status_code == 403
    assert response.json()["message"] == "Email already exists"

    # existing account with invalid password
    response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": "123456789"})
    
    assert response.status_code == 400
    assert response.json()["message"] == "Credentials are incorrect"

    # valid login
    response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": password})
    
    assert response.status_code == 200
    assert response.json()["message"] == "Success"
    assert "accessToken" in response.json() and response.json()["accessToken"] is not None
    assert "userId" in response.json() and response.json()["userId"] is not None

@pytest.mark.parametrize("email, password, expected_status_code, expected_message", [
    ("", "", 400, "Please enter all fields"), # empty fields
    ("a", "", 400, "Please enter all fields"), # empty fields
    ("", "a", 400, "Please enter all fields"), # empty fields
    ("1234@1234", "1", 400, "Password must be at least 8 characters"), # invalid password
    # TODO: invalid username
])
def test_invalid_register(email, password, expected_status_code, expected_message, setup):
    response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert response.status_code == expected_status_code
    assert response.json()["message"] == expected_message

@pytest.mark.parametrize("email, password, expected_status_code, expected_message", [
    ("", "", 400, "Credentials are incorrect"), # empty fields
    ("a", "", 400, "Credentials are incorrect"), # empty fields
    ("a@", "", 403, "Credentials are incorrect"), # empty fields
    ("a@", "1", 403, "Credentials are incorrect"), # invalid password
    ("a@", "12345678", 400, "Credentials are incorrect"), # non-registered account
])
def test_invalid_login(email, password, expected_status_code, expected_message, setup):
    response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": password})
    
    assert response.status_code == expected_status_code
    assert response.json()["message"] == expected_message
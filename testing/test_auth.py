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
        user_account = cur.fetchone()
        
        if user_account is not None:
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

def test_registration_and_login_with_existing_email(setup):
    email = "TESTING@1234"
    password = "12345678"
    cur = setup["cursor"]

    register_response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert register_response.status_code == 201
    assert register_response.json()["message"] == "User created successfully"

    cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": email})
    user_account = cur.fetchone()
    assert user_account is not None

    register_same_email_response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert register_same_email_response.status_code == 403
    assert register_same_email_response.json()["message"] == "Email already exists"

    login_invalid_password_response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": "123456789"})
    
    assert login_invalid_password_response.status_code == 400
    assert login_invalid_password_response.json()["message"] == "Credentials are incorrect"

    login_response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": password})
    
    assert login_response.status_code == 200
    assert login_response.json()["message"] == "Success"
    assert "accessToken" in login_response.json() and login_response.json()["accessToken"] is not None
    assert "userId" in login_response.json() and login_response.json()["userId"] is not None

@pytest.mark.parametrize("email, password, expected_status_code, expected_message", [
    ("", "", 400, "Please enter all fields"), # empty fields
    ("a", "", 400, "Please enter all fields"), # empty fields
    ("", "a", 400, "Please enter all fields"), # empty fields
    ("1234@1234", "1", 400, "Password must be at least 8 characters"), # invalid password
])
def test_invalid_registrations(email, password, expected_status_code, expected_message, setup):
    register_response = setup["session"].post("http://localhost:3000/authn/register", {"email": email, "password": password})
    
    assert register_response.status_code == expected_status_code
    assert register_response.json()["message"] == expected_message

@pytest.mark.parametrize("email, password, expected_status_code", [
    ("", "", 400), # empty fields
    ("a", "", 400), # empty fields
    ("a@", "", 403), # empty fields
    ("a@", "1", 403), # invalid password
    ("a@", "12345678", 400), # non-registered account
])
def test_invalid_logins(email, password, expected_status_code, setup):
    login_response = setup["session"].post("http://localhost:3000/authn/login", {"email": email, "password": password})
    
    assert login_response.status_code == expected_status_code
    assert login_response.json()["message"] == "Credentials are incorrect"
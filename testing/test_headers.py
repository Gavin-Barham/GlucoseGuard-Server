import pytest
import requests
from connect_db import connect_db


@pytest.fixture
def session():
    session = requests.Session()

    try:
        yield session
    finally:
        session.close()

@pytest.mark.parametrize("header, expected_status_code, expected_message", [
    ({"Authorization": ""}, 403, "Unauthorized: token is invalid or empty"), # no Bearer
    ({"Authorization": "Bearer testing"}, 403, "Unauthorized: token does not match"), # invalid token
    ({}, 403, "Unauthorized: token is invalid or empty"), # empty header
    # missing: using expired token
])
def test_invalid_headers(header, expected_status_code, expected_message, session):
    response = session.get(f"http://localhost:3000/users/1", headers = header)
    
    assert response.status_code == expected_status_code
    assert response.text == expected_message

def test_valid_header(session):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": "TESTING@1234"})
    user_account = cur.fetchone()

    if user_account is None:
        response = session.post("http://localhost:3000/authn/register", {"email": "TESTING@1234", "password": "12345678"})

    response = session.post("http://localhost:3000/authn/login", {"email": "TESTING@1234", "password": "12345678"})
    valid_header = {"Authorization": f'Bearer {response.json()["accessToken"]}'}
    response = session.get(f"http://localhost:3000/users/{response.json()['userId']}", headers = valid_header)
    
    assert response.status_code == 200
    assert response.json()["message"] == "Success"

    cur.close()
    conn.close()
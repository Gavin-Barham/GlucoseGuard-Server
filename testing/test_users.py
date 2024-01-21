import pytest
import requests
from connect_db import connect_db


email = "TESTING@1234"
password = "12345678"

@pytest.fixture
def setup():
    session = requests.Session()

    try:
        conn = connect_db()
        cur = conn.cursor()

        cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": "TESTING@1234"})
        user_account = cur.fetchone()
        
        if user_account is None:
            session.post("http://localhost:3000/authn/register", {"email": email, "password": password})

        login_response = session.post("http://localhost:3000/authn/login", {"email": email, "password": password})

        data = {
            "session": session,
            "connection": conn,
            "cursor": cur,
            "user_id": str(login_response.json()["userId"]),
            "valid_header": {"Authorization": f'Bearer {login_response.json()["accessToken"]}'}
        }

        yield data
    finally:
        session.close()
        cur.close()
        conn.close()

@pytest.mark.parametrize("user_id, expected_status_code", [
    ("abc", 500), # server error
    ("10ab1c", 500), # server error
    ("0.32", 500), # server error
    ("-1.6", 500), # server error
    ("-500", 404), # invalid user id
    ("100", 404), # invalid user id
    ("", 404), # empty fields
])
def test_get_invalid_user(user_id, expected_status_code, setup):
    get_user_response = setup["session"].get(f"http://localhost:3000/users/{user_id}", headers = setup["valid_header"])
    assert get_user_response.status_code == expected_status_code

@pytest.mark.parametrize("user_id, expected_status_code", [
    ("abc", 500), # server error
    ("10ab1c", 500), # server error
    ("0.32", 500), # server error
    ("-1.6", 500), # server error
    ("-500", 404), # invalid user id
    ("100", 404), # invalid user id
    ("", 404), # empty fields
])
def test_update_invalid_user(user_id, expected_status_code, setup):
    data = {
        "fname": "test1",
        "lname": "test2",
        "height": 52,
        "targetCal": 2300
    }
    update_user_response = setup["session"].put(f"http://localhost:3000/users/{user_id}", headers = setup["valid_header"], json = data)
    assert update_user_response.status_code == expected_status_code

@pytest.mark.parametrize("user_id, expected_status_code", [
    ("abc", 500), # server error
    ("10ab1c", 500), # server error
    ("0.32", 500), # server error
    ("-1.6", 500), # server error
    ("-500", 404), # invalid user id
    ("100", 404), # invalid user id
    ("", 404), # empty fields
])
def test_delete_invalid_user(user_id, expected_status_code, setup):
    update_user_response = setup["session"].delete(f"http://localhost:3000/users/{user_id}", headers = setup["valid_header"])
    assert update_user_response.status_code == expected_status_code

def test_get_valid_user(setup):
    get_user_response = setup["session"].get(f"http://localhost:3000/users/{setup['user_id']}", headers = setup["valid_header"])
    assert get_user_response.status_code == 200
    assert get_user_response.json()["message"] == "Success"
    assert "user" in get_user_response.json() and get_user_response.json()["user"] is not None

def test_update_valid_user(setup):
    data = {
        "fname": "test1",
        "lname": "test2",
        "height": 52,
        "targetCal": 2300
    }
    update_user_response = setup["session"].put(f"http://localhost:3000/users/{setup['user_id']}", headers = setup["valid_header"], json = data)
    assert update_user_response.status_code == 200
    assert update_user_response.json()["message"] == "user updated successfully"

def test_delete_valid_user(setup):
    delete_user_response = setup["session"].delete(f"http://localhost:3000/users/{setup['user_id']}", headers = setup["valid_header"])
    assert delete_user_response.status_code == 200
    assert delete_user_response.json()["message"] == "user deleted successfully"
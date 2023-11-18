import requests
from time import sleep

testing_email = "unitTESTING@1287981"
testing_password = "12345678"

def test_access_token():
    base_url = "http://localhost:3000"

    with requests.Session() as session:
        response = session.post(f'{base_url}/authn/login', {"email": testing_email, "password": testing_password})
        user_id = response.json()["userId"]
        valid_access_token = response.json()["accessToken"]
        endpoint = f"/users/{user_id}"

        # empty header
        headers = {}
        response = session.get(f'{base_url}{endpoint}', headers = headers)
        assert response.status_code == 403
        assert response.text == "Unauthorized: token is invalid or empty"

        # header contains no Bearer
        headers = {
            "Authorization": "",
        }
        response = session.get(f'{base_url}{endpoint}', headers = headers)
        assert response.status_code == 403
        assert response.text == "Unauthorized: token is invalid or empty"

        # using invalid access token
        invalid_access_token = "testing"
        headers = {
            "Authorization": f"Bearer {invalid_access_token}",
        }
        response = session.get(f'{base_url}{endpoint}', headers = headers)
        assert response.status_code == 403
        assert response.text == "Unauthorized: token does not match"

        # using valid access token
        headers = {
            "Authorization": f"Bearer {valid_access_token}",
        }
        response = session.get(f'{base_url}{endpoint}', headers = headers)
        assert response.status_code == 200
        assert response.json()["message"] == "Success"

        # using expired token
        sleep(10)
        headers = {
            "Authorization": f"Bearer {valid_access_token}",
        }
        response = session.get(f'{base_url}{endpoint}', headers = headers)
        print(response.status_code)
        print(response.text)
        assert response.status_code == 403
        assert response.text == "Unauthorized: token has expired"

test_access_token()
import requests
from connect_db import connect_db

testing_email = "unitTESTING@1287981"
testing_password = "12345678"

def test_user_id():
    # conn = connect_db()
    # cur = conn.cursor()

    # cur.execute("""SELECT * FROM "USERs" WHERE email = %(value)s""", {"value": testing_email})
    # user = cur.fetchone()
    # user_id = user["id"]
    # user_refresh = user["refreshToken"]

    with requests.Session() as session:
        response = session.post('http://localhost:3000/authn/login', {"email": testing_email, "password": testing_password})
        user_id = response.json()["userId"]
        access_token = response.json()["accessToken"]
        endpoint = f'/users/{user_id}'
        headers = {
            "Authorization": f"Bearer {access_token}",
        }
        response = session.get(f'{endpoint}', headers = headers)
        print(response.status_code)
        print(response.json())

test_user_id()
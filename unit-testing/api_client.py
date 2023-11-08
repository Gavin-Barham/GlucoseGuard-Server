import json

import requests


class APIClient():
    def __init__(self):
        self.baseURL = "http://127.0.0.1:3000"

    def post(self, endpoint, body_data):
        body_json = json.dumps(body_data)
        headers = {'Content-type': 'application/json'}
        url = self.baseURL + endpoint

        return requests.post(url = url, data = body_json, headers = headers)

    def get(self, endpoint, cookies = None):
        url = self.baseURL + endpoint

        return requests.get(url = url, cookies = cookies)
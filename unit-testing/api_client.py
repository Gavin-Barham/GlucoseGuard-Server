from dotenv import load_dotenv

import os

import json

import requests


class APIClient():
    def __init__(self):
        load_dotenv()
        port = os.environ.get("PORT")
        self.baseURL = f"http://127.0.0.1:{port}"

    def post(self, endpoint, body_data):
        body_json = json.dumps(body_data)
        headers = {'Content-type': 'application/json'}
        url = self.baseURL + endpoint

        return requests.post(url = url, data = body_json, headers = headers)
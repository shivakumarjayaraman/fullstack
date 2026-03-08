#!/usr/bin/env python

import requests
r = requests.get('http://localhost:8080/api/users')
print (r)

r = requests.post('http://localhost:8080/api/auth/login', json={'username': 'user', 'password': 'password'});
token = r.json()['token']
authHeader = {'Authorization' : f"Bearer {token}"}

r = requests.get('http://localhost:8080/api/users', headers=authHeader)
print (r.json())



#!/usr/bin/env python

import requests

r = requests.post(
    'http://localhost:8080/gcd', 
    json={'a': 20, 'b': 15});
print (r.content)



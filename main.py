#! /usr/bin/env python
# -*- coding: utf8 -*-

from bottle import run
from pdi_web_apps import app
from pdi_web_apps.resource import Resource

app.api_proxy = Resource('http://pdi.pti.org.br')

run(app=app, host='0.0.0.0', port=8888, debug=True, reloader=True)

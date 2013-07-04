#! /usr/bin/env python
# -*- coding: utf8 -*-

import os
from bottle import run
from pdi_web_apps import app
from pdi_web_apps.resource import Resource

app.api_proxy = Resource('http://pdi.pti.org.br')

application = app

if __name__ == '__main__':
    run(app=application, host='localhost', port=8888, reloader=True)

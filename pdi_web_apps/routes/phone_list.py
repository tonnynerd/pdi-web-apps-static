#! /usr/bin/env python
# -*- coding: utf8 -*-

from bottle import request, static_file
from pdi_web_apps import app


@app.route('/habitantes/telefones', method='GET')
def telefones():
    payload = {key: value for key, value in request.query.items()}
    return app.api_proxy.habitantes.telefones.get(**payload).json()


@app.route('/telefones', method='GET')
def telefones_page():
    return static_file('phone_list.html', root='pdi_web_apps/assets/html')

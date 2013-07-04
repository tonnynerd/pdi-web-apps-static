#! /usr/bin/env python
# -*- coding: utf8 -*-

from bottle import static_file
from pdi_web_apps import app


# static assets:
@app.route('/assets/js/<filename>')
def js_static(filename):
    return static_file(filename, root='pdi_web_apps/assets/js')


@app.route('/assets/img/<filename>')
def img_static(filename):
    return static_file(filename, root='pdi_web_apps/assets/img')


@app.route('/assets/css/<filename>')
def css_static(filename):
    return static_file(filename, root='pdi_web_apps/assets/css')

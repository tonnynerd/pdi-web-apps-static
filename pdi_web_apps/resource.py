#! /usr/bin/env python
# -*- coding: utf8 -*-

import requests


class Resource:
    """URL"""
    def __init__(self, name):
        self.name = name

    def __getattr__(self, name):
        return self.__class__('/'.join((self.name, name)))

    def get(self, **kwargs):
        return requests.get(self.name, params=kwargs)

    def __str__(self):
        return 'Url(' + self.name + ')'


if __name__ == '__main__':
    pdi_api = Resource('http://pdi.pti.org.br')
    print(pdi_api.habitantes.telefones)
    print(pdi_api.habitantes.telefones.get(
        empresa='inovatic',
        funcao='analista'
    ).json())

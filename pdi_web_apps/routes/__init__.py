import os

# find all python files in all subdirectories:
__all = [
    [
        os.path.join(path.replace(os.path.dirname(__file__), '')[1:], f)[:-3]
        for f in files
        if f[-3:] == '.py'
    ]
    for path, subdirs, files in os.walk(os.path.dirname(__file__))
]

# export them all:
__all__ = []
for dirs in __all:
    __all__.extend(dirs)

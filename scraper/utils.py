import os
from pathlib import Path

def get_sorted_dirs(dirpath):
    try:
        # Would need to sort by creation date
        sorted_dirs = [d for d in os.listdir(dirpath) if os.path.isdir(os.path.join(dirpath, d))]
        sorted_dirs.sort(key=lambda x: os.path.getmtime(os.path.join(dirpath, x)))
        sorted_dates = [os.path.getmtime(os.path.join(dirpath, d)) for d in sorted_dirs]
        zipped = list(zip(sorted_dirs, sorted_dates))
        return zipped
    except Exception as err:
        print('   Exception: {}'.format(err))
        raise
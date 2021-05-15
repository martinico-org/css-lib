from stat import S_ISREG, ST_CTIME, ST_MODE
import os
from stat import S_ISREG, ST_CTIME, ST_MODE
from pathlib import Path

def get_sorted_dirs(dirpath):
    try:
        sorted_dirs = [d for d in os.listdir(dirpath) if os.path.isdir(os.path.join(dirpath, d))]
        sorted_dirs.sort(key=lambda x: os.path.getmtime(os.path.join(dirpath, x)))
        return sorted_dirs
    except Exception as err:
        print('   Exception: {}'.format(err))
        raise
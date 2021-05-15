import os
from pathlib import Path
import json

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

def get_data(cssfiles_dir, project):
    try:
        f_data = open('{}/{}/{}'.format(cssfiles_dir, project, 'data.json'))
        data = json.load(f_data)
        f_data.close()
        return data
    except Exception as err:
        print('   Exception: {}'.format(err))
        raise

def get_html(cssfiles_dir, project):
    try:
        f_html = open('{}/{}/{}'.format(cssfiles_dir, project, 'index.html'))
        html = f_html.read()
        f_html.close()
        return html
    except Exception as err:
        print('   Exception: {}'.format(err))
        raise

def get_css(cssfiles_dir, project):
    try:
        f_css = open('{}/{}/{}'.format(cssfiles_dir, project, 'index.css'))
        css = f_css.read()
        f_css.close()
        return css
    except Exception as err:
        print('   Exception: {}'.format(err))
        raise
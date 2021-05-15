from utils import get_sorted_dirs
import pathlib
import json

current_dir = pathlib.Path(__file__).parent.absolute()
cssfiles_dir = '{}/{}'.format(current_dir, '../cssfiles')

print('Getting all folders of folder cssfiles')
projects = get_sorted_dirs(cssfiles_dir)

print('Getting current master.json')
current = {}
try:
    f_current = open('{}{}'.format(current_dir, '/../src/master.json'))
    current = json.load(f_current)
    f_current.close()
except Exception as err:
    pass

dict = {}
dicts = current

for i, project in enumerate(projects):
    if project[0] not in dicts:
        f_data = open('{}/{}/{}'.format(cssfiles_dir, project[0], 'data.json'))
        data = json.load(f_data)
        f_data.close()

        f_html = open('{}/{}/{}'.format(cssfiles_dir, project[0], 'index.html'))
        html = f_html.read()
        f_html.close()

        f_css = open('{}/{}/{}'.format(cssfiles_dir, project[0], 'index.css'))
        css = f_css.read()
        f_css.close()

        print('Adding data for {}'.format(project[0]))

        dict = {
            "id": project[0],
            "name": data['name'],
            "author": data['author'],
            "update_date": project[1],
            "category": data['category'],
            "tags": data['tags'],
            "html": html,
            "css": css,
        }
        dicts[project[0]] = dict
    else:
        print('Data already added for {}'.format(project[0]))

f = open('{}{}'.format(current_dir, '/../src/master.json'), 'w')
j = json.dump(dicts, f, indent=2)
f.close()




from utils import get_sorted_dirs
import pathlib

current_dir = pathlib.Path(__file__).parent.absolute()
cssfiles_dir = '{}/{}'.format(current_dir, '../cssfiles')

print('Listing all folders of folder cssfiles')
projects = get_sorted_dirs(cssfiles_dir)

dict = {}
dicts = []
for project in projects:
    print(project)



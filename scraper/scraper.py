from os import listdir
from os.path import isfile, isdir, join
import pathlib

current_dir = pathlib.Path(__file__).parent.absolute()
cssfiles_dir = '{}/{}'.format(current_dir, '../cssfiles')
print('Listing all folders of folder cssfiles')
projects = [d for d in listdir(cssfiles_dir) if isdir(join(cssfiles_dir, d))]

print(projects)
import os
BASE_PATH = '/Users/shomil/Documents/GitHub/organizations/mdb/react-native-training-program/projects/orbit/orbit-functions'
API = 'https://us-central1-orbit-000.cloudfunctions.net/updateAllCells/'
x = input("""\nChoose an option:\n
c = commit to github
f = deploy to firebase
r = run POST request
a = all of the above\n
""")
print()
if (x == 'c'):
    message = input("Commit Message: ")
    os.system(
        f'cd {BASE_PATH} && git add . && git commit -m "{message}" && git push origin master')
if (x == 'f'):
    os.system(f'cd {BASE_PATH} && firebase deploy --only functions')
if (x == 'r'):
    print(os.system(f'curl {API}'))

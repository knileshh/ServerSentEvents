# Main files are:
- index.js (the one in the parent directory) /
- App.js (the one in the SSE/src/ directory) 
## Tips to remove the directory with the white arrow on GH
- Reason: It happens when you have nested git repos.
- Just remove the nested .git and then reload the cache

* Step 1: If you're using windows then don't use the command use the File explorer and then remove the .git in the nested dir.
* Step 2: git rm --cache client_folder <"name of the directory containing the nested directory">

git fetch origin "+refs/heads/*:refs/remotes/origin/*"
# updating the HOME to point to root as HOME is pointing to GIT and the extension is loaded at root directory
export HOME=/root
sfdx sgd:source:delta -a 54 --to HEAD --from origin/$BASE_BRANCH --output . -i manifest/mdapi/.sgdignore

echo "--- package.xml generated with added and modified metadata since $LAST_DEPLOYED_COMMIT in $BASE_BRANCH ---"
cat package/package.xml
echo
echo "--- destructiveChanges.xml generated with deleted metadata since $LAST_DEPLOYED_COMMIT in $BASE_BRANCH ---"
cat destructiveChanges/destructiveChanges.xml
echo
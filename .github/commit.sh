#!/bin/sh -l

set -e  # if a command fails exit the script
set -u  # script fails if trying to access an undefined variable

echo
echo "##### Starting #####"
SOURCE_FILES="dist/."
DESTINATION_REPOSITORY="nienow/randombits"
DESTINATION_BRANCH="main"
DESTINATION_DIRECTORY="content/print-schedule"
COMMIT_USERNAME="system"
COMMIT_EMAIL="system@randombits.dev"

CLONE_DIRECTORY=$(mktemp -d)

echo
echo "##### Cloning source git repository #####"
# Setup git
git config --global user.email "$COMMIT_EMAIL"
git config --global user.name "$COMMIT_USERNAME"

echo
echo "##### Cloning destination git repository #####"

git clone --single-branch --branch "$DESTINATION_BRANCH" "https://$API_TOKEN_GITHUB@github.com/$DESTINATION_REPOSITORY.git" "$CLONE_DIRECTORY"
ls -la "$CLONE_DIRECTORY"

echo
echo "##### Copying contents to git repo #####"
rm -rvf "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
mkdir -p "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
cp -rvf $SOURCE_FILES "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
cd "$CLONE_DIRECTORY"

echo
echo "##### Adding git commit #####"

git add .
git status

# don't commit if no changes were made
git diff-index --quiet HEAD || git commit --message "Update from $GITHUB_REPOSITORY - $GITHUB_SHA"

echo
echo "##### Pushing git commit #####"
# --set-upstream: sets the branch when pushing to a branch that does not exist
git push origin --set-upstream "$DESTINATION_BRANCH"

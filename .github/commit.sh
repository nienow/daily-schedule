#!/bin/sh -l

set -e  # if a command fails exit the script
set -u  # script fails if trying to access an undefined variable

echo
echo "##### Starting #####"
SOURCE_FILES="dist/"
DESTINATION_USERNAME="nienow"
DESTINATION_REPOSITORY="randombits"
DESTINATION_BRANCH="main"
DESTINATION_DIRECTORY="content/print-schedule"
COMMIT_USERNAME="nienow"
COMMIT_EMAIL="system@randombits.dev"
COMMIT_MESSAGE="Updating content from jari"

if [ -z "$COMMIT_USERNAME" ]
then
  COMMIT_USERNAME="$DESTINATION_USERNAME"
fi

CLONE_DIRECTORY=$(mktemp -d)

echo
echo "##### Cloning source git repository #####"
# Setup git
git config --global user.email "$COMMIT_EMAIL"
git config --global user.name "$DESTINATION_USERNAME"

# Remove git directory if it exists to prevent errors
#rm -rf .git

#git clone "https://github.com/$GITHUB_REPOSITORY.git" repo

#cd repo
#ls -la

echo
echo "##### Cloning destination git repository #####"

git clone --single-branch --branch "$DESTINATION_BRANCH" "https://$API_TOKEN_GITHUB@github.com/$DESTINATION_USERNAME/$DESTINATION_REPOSITORY.git" "$CLONE_DIRECTORY"
ls -la "$CLONE_DIRECTORY"

echo
echo "##### Copying contents to git repo #####"
mkdir -p "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
cp -rvf $SOURCE_FILES "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
cd "$CLONE_DIRECTORY"

echo
echo "##### Adding git commit #####"

ORIGIN_COMMIT="https://github.com/$GITHUB_REPOSITORY/commit/$GITHUB_SHA"
COMMIT_MESSAGE="${COMMIT_MESSAGE/ORIGIN_COMMIT/$ORIGIN_COMMIT}"

git add .
git status

# don't commit if no changes were made
git diff-index --quiet HEAD || git commit --message "$COMMIT_MESSAGE"

echo
echo "##### Pushing git commit #####"
# --set-upstream: sets the branch when pushing to a branch that does not exist
git push origin --set-upstream "$DESTINATION_BRANCH"

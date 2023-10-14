#!/bin/sh

# on windows, run anaconda as administrator, then "bash deploy.sh"

# run using: ./deploy.sh "optional commit message"

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Build the project.
hugo -t even_modified # if using a theme, replace with `hugo -t <YOURTHEME>`  

# Go To Public folder
cd public

# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# note: If I don't enter password correctly and the command stops,
# just 'cd public' and then run "git push origin master" and it'll work again.

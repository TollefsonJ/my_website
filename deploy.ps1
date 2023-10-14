#put "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" into powershell ot let me run commands

#build site
hugo -t even

# add files to git
cd public
git add -A

#set up commit message
$msg="rebuilding site " + (Get-Date)
If ($args[0]) {$msg = $args[0]}

#commit and push public repo
git commit -m $msg
git push origin master

#and back out and commit and push source repo
cd ..
git add -A
git commit -m $msg
git push origin master
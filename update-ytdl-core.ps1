Param([ValidateSet('patch', 'minor', 'major')][parameter(Mandatory=$true)][string]$Type)

npm i ytdl-core@latest

$ytdlVersion = (npm list | Select-String ytdl-core | ForEach-Object { Write-Output ([string]$_).Split('@')[1] })

git add .
git commit -m "updated: ytdl-core v$ytdlVersion"
git push origin master

$version = (npm version $Type)
git push origin master
git push origin "tags/v$version"
npm publish ./

Param(
    [ValidateSet('patch', 'minor', 'major')][parameter(Mandatory=$true)][string]$Type,
    [string]$Message
)

if ($Message -eq '') {
    mkdir -p ./tmp 2>&1 > $null
    Write-Output 'updated: ' > ./tmp/message
    vim ./tmp/message
    $Message = Get-Content ./tmp/message
    Remove-Item -Recurse -Force ./tmp 2>&1 > $null
}

npm i ytdl-core@latest

npm list | Select-String ytdl-core | ForEach-Object { Write-Output ([string]$_).Split('@')[1] }

git add .
git commit -m $Message
git push origin master

$version = (npm version $Type)
git push origin master
git push origin "tags/v$version"
npm publish ./

$ErrorActionPreference = 'Stop'
$staging = "temp_staging\gramsetu-panchayat-demo"

if (Test-Path 'temp_staging') {
    Remove-Item -Recurse -Force 'temp_staging'
}

New-Item -ItemType Directory -Path $staging -Force | Out-Null

Copy-Item -Recurse -Path 'src' -Destination "$staging\src"
if (Test-Path 'public') {
    Copy-Item -Recurse -Path 'public' -Destination "$staging\public"
}
Copy-Item 'index.html' -Destination $staging
Copy-Item 'package.json' -Destination $staging
Copy-Item 'package-lock.json' -Destination $staging
Copy-Item 'tsconfig.json' -Destination $staging
if (Test-Path 'tsconfig.app.json') {
    Copy-Item 'tsconfig.app.json' -Destination $staging
}
if (Test-Path 'tsconfig.node.json') {
    Copy-Item 'tsconfig.node.json' -Destination $staging
}
Copy-Item 'vite.config.ts' -Destination $staging
Copy-Item 'tailwind.config.js' -Destination $staging
Copy-Item 'postcss.config.js' -Destination $staging
Copy-Item 'README.md' -Destination $staging
if (Test-Path '.gitignore') {
    Copy-Item '.gitignore' -Destination $staging
}
if (Test-Path '.env.example') {
    Copy-Item '.env.example' -Destination $staging
}

if (Test-Path 'gramsetu-panchayat-demo.zip') {
    Remove-Item -Force 'gramsetu-panchayat-demo.zip'
}

Compress-Archive -Path $staging -DestinationPath 'gramsetu-panchayat-demo.zip' -Force
Remove-Item -Recurse -Force 'temp_staging'

$file = Get-Item 'gramsetu-panchayat-demo.zip'
Write-Host "ZIP created successfully: $($file.Name) ($([math]::Round($file.Length / 1MB, 2)) MB)"


# Start the Next.js Development Server
Write-Host "Starting the KeretaXpress Next.js App..."
Write-Host "API URL: $env:NEXT_PUBLIC_API_URL"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server"

# Change to the web_version directory and start the Next.js dev server
Set-Location -Path $PSScriptRoot
npm run dev

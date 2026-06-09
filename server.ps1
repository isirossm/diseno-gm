# Evitar problemas de codificación de caracteres en la consola
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Cambiar al directorio del script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
if ($scriptPath) {
    Set-Location $scriptPath
}

# Buscar un puerto libre a partir del 8000
function Get-FreePort {
    param([int]$startPort = 8000)
    $properties = [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties()
    $activeListeners = $properties.GetActiveTcpListeners()
    $port = $startPort
    while ($true) {
        $inUse = $false
        foreach ($listener in $activeListeners) {
            if ($listener.Port -eq $port) {
                $inUse = $true
                break
            }
        }
        if (-not $inUse) {
            return $port
        }
        $port++
    }
}

$port = Get-FreePort 8000
$localIp = "127.0.0.1"
$url = "http://${localIp}:${port}/"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "      SERVIDOR LOCAL - WALMART CHILE DISEÑO GM" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Iniciando servidor en: $url" -ForegroundColor Yellow
Write-Host "Directorio raíz:       $(Get-Location)" -ForegroundColor Gray
Write-Host "Presiona Ctrl+C para detener el servidor." -ForegroundColor Yellow
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    
    # Abrir el navegador automáticamente en Flujo.html
    Write-Host "Abriendo el navegador en: ${url}Flujo.html..." -ForegroundColor Green
    Start-Process "${url}Flujo.html"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        # Redirigir la raíz a Flujo.html
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/Flujo.html"
        }
        
        # Descodificar la URL para soportar espacios y caracteres especiales
        $urlPathDecoded = [uri]::UnescapeDataString($urlPath)

        # Convertir a ruta del sistema de archivos local
        $cleanUrlPath = $urlPathDecoded.TrimStart('/')
        $filePath = Join-Path (Get-Location) $cleanUrlPath
        
        # Servir el archivo si existe
        if (Test-Path $filePath -PathType Leaf) {
            Write-Host "[200 OK] $urlPathDecoded" -ForegroundColor Green
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Detectar Content-Type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                ".json" { "application/json; charset=utf-8" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            Write-Host "[404 Not Found] $urlPathDecoded" -ForegroundColor Red
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: El archivo '$urlPathDecoded' no existe.")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.OutputStream.Close()
    }
}
catch {
    Write-Host "Error en el servidor: $_" -ForegroundColor Red
}
finally {
    if ($listener) {
        $listener.Close()
    }
}

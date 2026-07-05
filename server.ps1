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

# Iniciar servidor HTTP local de Node en segundo plano
Write-Host "Iniciando servidor estático en segundo plano..." -ForegroundColor Gray
$serverJob = Start-Job -ScriptBlock {
    param($path, $p)
    Set-Location $path
    node server.js $p
} -ArgumentList (Get-Location).Path, $port

try {
    # Iniciar túnel de Cloudflare de fondo
    Write-Host "Generando link público temporal..." -ForegroundColor Cyan
    
    $exePath = Join-Path (Get-Location) "node_modules\cloudflared\bin\cloudflared.exe"
    
    if (Test-Path $exePath -PathType Leaf) {
        Write-Host "Usando ejecutador local de Cloudflare..." -ForegroundColor Gray
        $tunnelJob = Start-Job -ScriptBlock {
            param($path, $p)
            & $path tunnel --url "http://127.0.0.1:$p" 2>&1
        } -ArgumentList $exePath, $port
    } else {
        Write-Host "Ejecutador local no encontrado, usando fallback npx..." -ForegroundColor Gray
        $tunnelJob = Start-Job -ScriptBlock {
            param($p)
            $env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
            $env:NODE_NO_WARNINGS = "1"
            cmd /c "npx --yes cloudflared tunnel --url http://127.0.0.1:$p 2>&1"
        } -ArgumentList $port
    }

    # Esperar y extraer el link
    $tunnelUrl = $null
    $attempts = 0
    while ($attempts -lt 25 -and -not $tunnelUrl) {
        Start-Sleep -Seconds 1
        $output = Receive-Job -Job $tunnelJob -Keep
        foreach ($line in $output) {
            $lineStr = [string]$line
            if ($lineStr -match "(https://[a-zA-Z0-9\-]+\.trycloudflare\.com)") {
                $tunnelUrl = $Matches[1]
                break
            }
        }
        $attempts++
    }

    if ($tunnelUrl) {
        $publicUrl = "${tunnelUrl}/Flujo.html"
        Write-Host ""
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host "         LINK DE COMPARTIR GENERADO" -ForegroundColor Green
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host "Usa este link en cualquier dispositivo (celular, etc.):" -ForegroundColor Yellow
        Write-Host "-> $publicUrl" -ForegroundColor Cyan
        Write-Host ""
        try {
            Set-Clipboard -Value $publicUrl
            Write-Host "(¡Copiado automáticamente al portapapeles!)" -ForegroundColor Gray
        } catch {}
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "No se pudo generar el link público automáticamente." -ForegroundColor Red
        Write-Host "Detalles del log de Cloudflare:" -ForegroundColor Yellow
        $errOutput = Receive-Job -Job $tunnelJob
        foreach ($line in $errOutput) {
            Write-Host $line -ForegroundColor DarkGray
        }
        Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
    }

    # Abrir el navegador automáticamente en Flujo.html
    Write-Host "Abriendo el navegador en: ${url}Flujo.html..." -ForegroundColor Green
    Start-Process "${url}Flujo.html"

    # Mantener el script activo mientras los jobs de segundo plano estén corriendo
    while ($serverJob.State -eq "Running" -and ($tunnelJob -eq $null -or $tunnelJob.State -eq "Running")) {
        Start-Sleep -Seconds 2
    }
}
catch {
    Write-Host "Error en el servidor: $_" -ForegroundColor Red
}
finally {
    if ($serverJob) {
        Stop-Job -Job $serverJob
        Remove-Job -Job $serverJob
    }
    if ($tunnelJob) {
        Stop-Job -Job $tunnelJob
        Remove-Job -Job $tunnelJob
    }
}

# Test Create Unjumble API

$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = @(
    "--$boundary",
    "Content-Disposition: form-data; name=`"name`"$LF",
    "Test Unjumble Game",
    "--$boundary",
    "Content-Disposition: form-data; name=`"description`"$LF",
    "Test description",
    "--$boundary",
    "Content-Disposition: form-data; name=`"is_publish_immediately`"$LF",
    "true",
    "--$boundary",
    "Content-Disposition: form-data; name=`"is_randomized`"$LF",
    "true",
    "--$boundary",
    "Content-Disposition: form-data; name=`"score_per_sentence`"$LF",
    "10",
    "--$boundary",
    "Content-Disposition: form-data; name=`"sentences`"$LF",
    '[{"sentence_text":"Hello world","sentence_image_array_index":null}]',
    "--$boundary",
    "Content-Disposition: form-data; name=`"thumbnail_image`"; filename=`"test.jpg`"",
    "Content-Type: image/jpeg$LF",
    "fake-image-data",
    "--$boundary--"
)

$body = $bodyLines -join $LF

try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/game/game-type/unjumble" `
        -Method POST `
        -ContentType "multipart/form-data; boundary=$boundary" `
        -Body $body
    
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "ERROR!" -ForegroundColor Red
    Write-Host "Status Code:" $_.Exception.Response.StatusCode.value__
    Write-Host "Error Message:" $_.Exception.Message
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
}

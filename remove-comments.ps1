# Script to remove filepath comments from EJS and CSS files

# Define paths
$projectPath = "c:\Users\deepa\OneDrive\Desktop\BE-PROJECT"

# Remove filepath comments from EJS files
$ejsFiles = Get-ChildItem -Path $projectPath -Filter "*.ejs" -Recurse
foreach ($file in $ejsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match "<!-- filepath:.*? -->") {
        Write-Host "Removing filepath comment from $($file.Name)"
        $content = $content -replace "<!-- filepath:.*? -->\r?\n?", ""
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

# Remove filepath comments from CSS files
$cssFiles = Get-ChildItem -Path $projectPath -Filter "*.css" -Recurse
foreach ($file in $cssFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match "/\* filepath:.*? \*/") {
        Write-Host "Removing filepath comment from $($file.Name)"
        $content = $content -replace "/\* filepath:.*? \*/\r?\n?", ""
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

# Remove section comments from EJS files
$ejsFiles = Get-ChildItem -Path $projectPath -Filter "*.ejs" -Recurse
foreach ($file in $ejsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove common section comments
    $commentPatterns = @(
        "<!-- Hero Section.*?-->",
        "<!-- First Carousel Item.*?-->",
        "<!-- Second Carousel Item.*?-->",
        "<!-- Third Carousel Item.*?-->",
        "<!-- Mobile caption.*?-->",
        "<!-- Desktop/tablet caption.*?-->",
        "<!-- Carousel Controls.*?-->",
        "<!-- Preview Section.*?-->",
        "<!-- First Feature.*?-->",
        "<!-- Second Feature.*?-->",
        "<!-- Third Feature.*?-->", 
        "<!-- Login prompt section.*?-->",
        "<!-- About Section.*?-->",
        "<!-- Courses Section.*?-->",
        "<!-- Features Section.*?-->",
        "<!-- Blog Section.*?-->",
        "<!-- Stream Guidance Section.*?-->",
        "<!-- Course & University Information Section.*?-->",
        "<!-- Remaining FAQ sections.*?-->",
        "<!--.*?accordion items for.*?-->"
    )
    
    $modified = $false
    foreach ($pattern in $commentPatterns) {
        if ($content -match $pattern) {
            Write-Host "Removing $pattern comment from $($file.Name)"
            $content = $content -replace $pattern, ""
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "All filepath comments and section comments have been removed."

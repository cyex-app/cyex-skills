# Builds one zip per skill for upload to claude.ai (Settings > Capabilities > Skills).
# Only skills that work without Claude Code's agents and local files are packaged.
# Manual-only skills are made auto-invocable in the zipped copy, since claude.ai chats have no slash commands.
# Run again after editing a skill, then re-upload the changed zips.

$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root 'dist\claude-ai'
$stage = Join-Path $env:TEMP 'cyex-skill-stage'

$sources = @('cyex-design', 'cyex-web', 'cyex-app', 'web-design-toolkit' | ForEach-Object { Join-Path $root $_ })
$vendor = Join-Path $root 'vendor'
if (Test-Path $vendor) {
  $sources += Get-ChildItem -Directory -Recurse $vendor | Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') } | ForEach-Object { $_.FullName }
}

Remove-Item -Recurse -Force $stage, $out -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $stage, $out | Out-Null

foreach ($src in $sources) {
  $name = Split-Path $src -Leaf
  Copy-Item -Recurse $src (Join-Path $stage $name)
  $skill = Join-Path $stage "$name\SKILL.md"
  $text = [IO.File]::ReadAllText($skill) -replace '(?m)^disable-model-invocation:.*\r?\n', ''
  [IO.File]::WriteAllText($skill, $text, (New-Object Text.UTF8Encoding $false))
  # The vendored skills are MIT; ship the licence inside each one.
  $licence = Join-Path (Split-Path $src -Parent) 'LICENSE'
  if ($src -like "$vendor*" -and (Test-Path $licence) -and -not (Test-Path (Join-Path $stage "$name\LICENSE"))) { Copy-Item $licence (Join-Path $stage "$name\LICENSE") }
  # Windows tar writes zip entries with forward slashes, which every unzipper reads.
  & "$env:SystemRoot\System32\tar.exe" -a -c -f (Join-Path $out "$name.zip") -C $stage $name
}

Remove-Item -Recurse -Force $stage
Get-ChildItem $out | Select-Object Name, Length

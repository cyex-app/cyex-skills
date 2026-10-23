# Installs these skills for Claude Code on Windows.
# - Links each skill folder into ~/.claude/skills (junctions: no admin rights needed; edits here apply at once).
# - Writes ~/.claude/CLAUDE.md from session/CLAUDE.md plus session/personal.md if you have one (personal.md is git-ignored).
# Re-run after editing either CLAUDE.md part; existing skill links are left alone.

$root = Split-Path $PSScriptRoot -Parent
$claude = Join-Path $env:USERPROFILE '.claude'
$skills = Join-Path $claude 'skills'
New-Item -ItemType Directory -Force $skills | Out-Null

$dirs = Get-ChildItem -Directory $root | Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') }
$vendor = Join-Path $root 'vendor'
if (Test-Path $vendor) { $dirs += Get-ChildItem -Directory -Recurse $vendor | Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') } }

foreach ($d in $dirs) {
  $link = Join-Path $skills $d.Name
  if (Test-Path $link) { "kept   $($d.Name)" }
  else { New-Item -ItemType Junction -Path $link -Target $d.FullName | Out-Null; "linked $($d.Name)" }
}

$text = [IO.File]::ReadAllText((Join-Path $root 'session\CLAUDE.md'))
$personal = Join-Path $root 'session\personal.md'
if (Test-Path $personal) { $text = $text.TrimEnd() + "`n" + [IO.File]::ReadAllText($personal) }
[IO.File]::WriteAllText((Join-Path $claude 'CLAUDE.md'), $text, (New-Object Text.UTF8Encoding $false))
"wrote  $(Join-Path $claude 'CLAUDE.md')$(if (Test-Path $personal) { ' (with personal.md)' })"

# Builds cyex-docs/assets/starter.html from its template, the cyex-app tokens,
# cyex-docs/references/docs.css and cyex-docs/references/behaviour.js, so the starter
# never drifts from the reference files. Run after editing any of them.

$root = Split-Path $PSScriptRoot -Parent
$read = { param($p) [IO.File]::ReadAllText((Join-Path $root $p)).TrimEnd() }

$html = & $read 'cyex-docs\assets\starter.template.html'
$html = $html.Replace('/*@@TOKENS@@*/', (& $read 'cyex-app\references\tokens.css'))
$html = $html.Replace('/*@@DOCS_CSS@@*/', (& $read 'cyex-docs\references\docs.css'))
# The module's export becomes a plain function inside the page's own module script.
$html = $html.Replace('/*@@BEHAVIOUR@@*/', ((& $read 'cyex-docs\references\behaviour.js') -replace '(?m)^export function', 'function'))

[IO.File]::WriteAllText((Join-Path $root 'cyex-docs\assets\starter.html'), $html + "`n", (New-Object Text.UTF8Encoding $false))
"built cyex-docs\assets\starter.html"

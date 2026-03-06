const fs = require('fs');
let css = fs.readFileSync('c:/Users/ManhPhongg/Downloads/Compressed/womens-day/style.css', 'utf8');

// 1. Fix main-page hardcoded dark gradient
css = css.replace(
    /background: linear-gradient\(135deg, #0a0612 0%, #1a0a2e 50%, #0a0612 100%\);/g,
    'background: linear-gradient(135deg, var(--bg-grad-1) 0%, var(--bg-grad-2) 50%, var(--bg-grad-1) 100%);'
);

// 2. Fix cards and borders to use theme variables
css = css.replace(/background: rgba\(255, 255, 255, 0\.03\);/g, 'background: var(--card-bg);');
css = css.replace(/background: rgba\(255, 255, 255, 0\.04\);/g, 'background: var(--card-bg);');
css = css.replace(/background: rgba\(255, 255, 255, 0\.05\);/g, 'background: var(--card-bg);');
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.06\);/g, 'border: 1px solid var(--card-border);');
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--card-border);');
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.1\);/g, 'border: 1px solid var(--card-border);');

// 3. Fix text colors to use theme variables
css = css.replace(/color: rgba\(255, 255, 255, 0\.4\);/g, 'color: var(--text-muted);');
css = css.replace(/color: rgba\(255, 255, 255, 0\.45\);/g, 'color: var(--text-muted);');
css = css.replace(/color: rgba\(255, 255, 255, 0\.5\);/g, 'color: var(--text-muted);');
css = css.replace(/color: rgba\(255, 255, 255, 0\.7\);/g, 'color: var(--text-muted);');
css = css.replace(/color: rgba\(255, 255, 255, 0\.85\);/g, 'color: var(--text-main);');
css = css.replace(/color: rgba\(255, 255, 255, 0\.92\);/g, 'color: var(--text-main);');

// 4. Input text color
css = css.replace(/\.input-group input {\n([\s\S]*?)color: white;/g, '.input-group input {\n$1color: var(--text-main);');

// 5. girl-card h3 color
css = css.replace(/\.girl-card h3 {\n\s*color: white;/g, '.girl-card h3 {\n    color: var(--text-main);');

// 6. Enter button color (should be main until hovered if needed, but white is ok if bg is dark, wait, bg is gradient. Let's make it --text-main except hover)
css = css.replace(/\.enter-btn {\n([\s\S]*?)color: white;/g, '.enter-btn {\n$1color: var(--text-main);');
// Actually, enter-btn has background: linear-gradient(135deg, rgba(255,255,255,0.1)...) which is light. In light mode this is white transparent. Text should be --text-main.
// On hover, it turns pink-dark so color: white is fine. I'll inject color: white in hover.
if (css.includes('.enter-btn:hover {') && !css.includes('color: white;', css.indexOf('.enter-btn:hover {'))) {
    css = css.replace(/\.enter-btn:hover {\n/g, '.enter-btn:hover {\n    color: white;\n');
}

fs.writeFileSync('c:/Users/ManhPhongg/Downloads/Compressed/womens-day/style.css', css);
console.log('Fixed style.css for light mode and dark mode compatibility');

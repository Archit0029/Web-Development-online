const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const previewWindow = document.getElementById('preview-window');
const autoRunCheckbox = document.getElementById('autoRun');

// Initial default content
const defaultHTML = `
<div class="container">
    <h1>Welcome User!</h1>
    <p>This is your personal playground.</p>
    <button id="clickMe">Click Me</button>
</div>`;

const defaultCSS = `
body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f0fdf4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.container {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
h1 { color: #166534; margin-bottom: 0.5rem; }
button {
    background: #166534;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    transition: transform 0.1s;
}
button:active { transform: scale(0.95); }
`;

const defaultJS = `
document.getElementById('clickMe').addEventListener('click', () => {
    alert('Great job! Your JavaScript is working.');
});
`;

// Set default values if empty
if(!htmlCode.value) htmlCode.value = defaultHTML;
if(!cssCode.value) cssCode.value = defaultCSS;
if(!jsCode.value) jsCode.value = defaultJS;

function runCode() {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    const js = `<script>${jsCode.value}<\/script>`; // Escape the closing script tag
    
    const source = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${css}
        </head>
        <body>
            ${html}
            ${js}
        </body>
        </html>
    `;
    
    previewWindow.srcdoc = source;
}

// Live preview listeners
const inputs = [htmlCode, cssCode, jsCode];
inputs.forEach(input => {
    input.addEventListener('keyup', () => {
        if(autoRunCheckbox.checked) {
            runCode();
        }
    });
});

// Run once on load
runCode();

// Mobile Tab Switching Logic
function switchTab(tab) {
    // Only applies on mobile (when lg:hidden is active)
    if (window.innerWidth >= 1024) return;

    const containers = {
        html: document.getElementById('container-html'),
        css: document.getElementById('container-css'),
        js: document.getElementById('container-js')
    };
    const buttons = {
        html: document.getElementById('tab-html'),
        css: document.getElementById('tab-css'),
        js: document.getElementById('tab-js')
    };

    // Hide all
    Object.values(containers).forEach(el => el.classList.add('hidden'));
    Object.values(buttons).forEach(btn => {
        btn.classList.remove('bg-gray-700', 'text-white');
        btn.classList.add('text-gray-400');
    });

    // Show selected
    containers[tab].classList.remove('hidden');
    containers[tab].classList.add('flex');
    
    buttons[tab].classList.add('bg-gray-700', 'text-white');
    buttons[tab].classList.remove('text-gray-400');
}

// Handle window resize to reset display properties if moving from mobile to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        document.getElementById('container-html').classList.remove('hidden');
        document.getElementById('container-css').classList.remove('hidden');
        document.getElementById('container-js').classList.remove('hidden');
    } else {
        // Reset to just HTML view on shrink
        switchTab('html');
    }
});

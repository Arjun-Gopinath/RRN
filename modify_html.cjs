const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, 'dist/index.html');

function modifyHtmlFile() {
    try {
        let html = fs.readFileSync(indexPath, 'utf-8');

        const metaTag = '    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />';
        html = html.replace(/(<head>)/i, `$1\n${metaTag}`);

        html = html.replace(/(src|href)="\/assets\//g, `$1="assets/`);

        fs.writeFileSync(indexPath, html, 'utf-8');

        console.log('index.html modified successfully.');
    } catch (error) {
        console.error('Error modifying index.html:', error);
    }
}

modifyHtmlFile();

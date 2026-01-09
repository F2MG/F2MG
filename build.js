const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATES_DIR = path.join(SRC_DIR, 'templates');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');
const DATA_DIR = path.join(SRC_DIR, 'data');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Configure Nunjucks
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader([TEMPLATES_DIR, PARTIALS_DIR, SRC_DIR], {
        noCache: process.argv.includes('--watch') ? false : true
    }),
    {
        autoescape: false,
        trimBlocks: true,
        lstripBlocks: true
    }
);

// Load menu data
const menuData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'menu.json'), 'utf8')
);

// Helper function to get all template files
function getTemplateFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getTemplateFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Build function
function build() {
    console.log('Building templates...');
    
    // Get all template files
    const templateFiles = getTemplateFiles(TEMPLATES_DIR);
    
    if (templateFiles.length === 0) {
        console.log('No template files found. Creating example template...');
        return;
    }
    
    // Process each template
    templateFiles.forEach(templatePath => {
        const relativePath = path.relative(TEMPLATES_DIR, templatePath);
        const outputPath = path.join(DIST_DIR, relativePath);
        const outputDir = path.dirname(outputPath);
        
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Get page-specific data if exists
        const pageData = {
            menu: menuData,
            currentPath: '/' + relativePath.replace(/\\/g, '/').replace('.html', ''),
            ...getPageData(relativePath)
        };
        
        // Render template
        try {
            const html = env.render(relativePath.replace(/\\/g, '/'), pageData);
            
            // Write to dist
            fs.writeFileSync(outputPath, html, 'utf8');
            console.log(`✓ Built: ${relativePath}`);
        } catch (error) {
            console.error(`✗ Error building ${relativePath}:`, error.message);
        }
    });
    
    // Copy assets directory
    const assetsSrc = path.join(__dirname, 'html', 'assets');
    const assetsDist = path.join(DIST_DIR, 'assets');
    
    if (fs.existsSync(assetsSrc)) {
        if (fs.existsSync(assetsDist)) {
            fs.rmSync(assetsDist, { recursive: true, force: true });
        }
        copyDirectory(assetsSrc, assetsDist);
        console.log('✓ Copied assets directory');
    }
    
    console.log('Build complete!');
}

// Get page-specific data
function getPageData(relativePath) {
    const dataFile = path.join(DATA_DIR, 'pages', relativePath.replace('.html', '.json'));
    
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    }
    
    return {};
}

// Copy directory recursively
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Watch mode
if (process.argv.includes('--watch')) {
    const chokidar = require('chokidar');
    
    console.log('Watching for changes...');
    
    const watcher = chokidar.watch([
        path.join(SRC_DIR, '**/*.html'),
        path.join(SRC_DIR, '**/*.json')
    ], {
        ignored: /node_modules/,
        persistent: true
    });
    
    watcher.on('change', (filePath) => {
        console.log(`\nFile changed: ${filePath}`);
        build();
    });
    
    watcher.on('add', (filePath) => {
        console.log(`\nFile added: ${filePath}`);
        build();
    });
    
    // Initial build
    build();
} else {
    // Single build
    build();
}


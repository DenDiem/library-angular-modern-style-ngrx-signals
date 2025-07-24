#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Performance monitoring script for Angular application
 * Analyzes build output and provides performance insights
 */

const DIST_PATH = path.join(__dirname, '../dist/test/browser');
const STATS_PATH = path.join(__dirname, '../dist/test/stats.json');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('🔍 Angular Bundle Performance Analysis\n');
  
  if (!fs.existsSync(DIST_PATH)) {
    console.error('❌ Build output not found. Run "npm run build:prod" first.');
    process.exit(1);
  }

  const files = fs.readdirSync(DIST_PATH);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;

  console.log('📦 JavaScript Bundles:');
  jsFiles.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;
    jsSize += size;
    
    const type = file.includes('main') ? '[MAIN]' : 
                 file.includes('polyfills') ? '[POLY]' : 
                 file.includes('chunk') ? '[CHUNK]' : '[OTHER]';
    
    console.log(`  ${type} ${file}: ${formatBytes(size)}`);
  });

  console.log('\n🎨 CSS Bundles:');
  cssFiles.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;
    cssSize += size;
    console.log(`  [STYLES] ${file}: ${formatBytes(size)}`);
  });

  console.log('\n📊 Summary:');
  console.log(`  Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`  JavaScript: ${formatBytes(jsSize)} (${((jsSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`  CSS: ${formatBytes(cssSize)} (${((cssSize/totalSize)*100).toFixed(1)}%)`);
  
  // Performance recommendations
  console.log('\n💡 Recommendations:');
  
  if (totalSize > 1024 * 1024) { // > 1MB
    console.log('  ⚠️  Bundle size is large (>1MB). Consider code splitting.');
  }
  
  if (jsSize > 800 * 1024) { // > 800KB
    console.log('  ⚠️  JavaScript bundle is large. Review dependencies.');
  }
  
  if (cssSize > 100 * 1024) { // > 100KB
    console.log('  ⚠️  CSS bundle is large. Consider purging unused styles.');
  }
  
  const largestJS = jsFiles.reduce((largest, file) => {
    const size = fs.statSync(path.join(DIST_PATH, file)).size;
    return size > largest.size ? { file, size } : largest;
  }, { file: '', size: 0 });
  
  if (largestJS.size > 300 * 1024) { // > 300KB
    console.log(`  ⚠️  Largest chunk (${largestJS.file}) is ${formatBytes(largestJS.size)}. Consider splitting.`);
  }
  
  console.log('\n✅ Analysis complete!');
}

function checkBudgets() {
  console.log('\n📏 Budget Analysis:');
  
  const budgets = {
    initial: 800 * 1024, // 800KB
    anyComponentStyle: 4 * 1024 // 4KB
  };
  
  const files = fs.readdirSync(DIST_PATH);
  const initialFiles = files.filter(file => 
    file.endsWith('.js') && !file.includes('chunk-')
  );
  
  let initialSize = 0;
  initialFiles.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const stats = fs.statSync(filePath);
    initialSize += stats.size;
  });
  
  console.log(`  Initial Bundle: ${formatBytes(initialSize)} / ${formatBytes(budgets.initial)}`);
  
  if (initialSize > budgets.initial) {
    console.log(`  ❌ Exceeds budget by ${formatBytes(initialSize - budgets.initial)}`);
  } else {
    console.log(`  ✅ Within budget (${formatBytes(budgets.initial - initialSize)} remaining)`);
  }
}

// Run analysis
analyzeBundle();
checkBudgets();

console.log('\n🚀 To run bundle analyzer: npm run build:analyze');
console.log('📈 To monitor performance: node scripts/performance-check.js');
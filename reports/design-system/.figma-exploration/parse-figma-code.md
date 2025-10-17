```javascript
#!/usr/bin/env node

/**
 * Utility to parse and extract values from Figma MCP get_code responses
 *
 * Usage:
 *   node parse-figma-code.js <code-file.tsx>
 *
 * Or pipe directly:
 *   cat component.tsx | node parse-figma-code.js
 */

import fs from 'fs';

// Read input from file or stdin
const input = process.argv[2]
  ? fs.readFileSync(process.argv[2], 'utf8')
  : fs.readFileSync(0, 'utf8');

console.log('\n=== FIGMA CODE ANALYSIS ===\n');

// Extract all className attributes
const classNameRegex = /className="([^"]+)"/g;
const classNames = [];
let match;

while ((match = classNameRegex.exec(input)) !== null) {
  classNames.push(match[1]);
}

console.log(`Found ${classNames.length} className declarations\n`);

// Parse Tailwind classes by category
const categories = {
  layout: [],
  spacing: [],
  sizing: [],
  colors: [],
  borders: [],
  typography: [],
  effects: [],
  other: []
};

const classifiers = {
  layout: /^(flex|grid|inline|block|hidden|relative|absolute|fixed|sticky)/,
  spacing: /^(p[xytblr]?-|m[xytblr]?-|gap-|space-)/,
  sizing: /^(w-|h-|min-|max-|size-)/,
  colors: /^(bg-\[#|border-\[#|text-(white|black|transparent|current)$)/,
  borders: /^(border|rounded)/,
  typography: /^(text-\[|font-|leading|tracking|whitespace)/,
  effects: /^(shadow|opacity|backdrop|blur)/,
};

classNames.forEach((className, index) => {
  const classes = className.split(' ');

  console.log(`\n--- Element ${index + 1} ---`);
  console.log(`Full className: "${className}"\n`);

  const categorized = {
    layout: [],
    spacing: [],
    sizing: [],
    colors: [],
    borders: [],
    typography: [],
    effects: [],
    other: []
  };

  classes.forEach(cls => {
    let matched = false;
    for (const [category, pattern] of Object.entries(classifiers)) {
      if (pattern.test(cls)) {
        categorized[category].push(cls);
        matched = true;
        break;
      }
    }
    if (!matched && cls.trim()) {
      categorized.other.push(cls);
    }
  });

  // Print categorized
  for (const [category, classes] of Object.entries(categorized)) {
    if (classes.length > 0) {
      console.log(`  ${category.toUpperCase()}:`);
      classes.forEach(cls => console.log(`    - ${cls}`));
    }
  }
});

// Extract design tokens from comments
console.log('\n\n=== DESIGN TOKENS (from comments) ===\n');
const tokenRegex = /These variables are contained in the design: ([^.]+)\./;
const tokenMatch = input.match(tokenRegex);

if (tokenMatch) {
  const tokens = tokenMatch[1].split(',').map(t => t.trim());
  tokens.forEach(token => {
    console.log(`  ${token}`);
  });
} else {
  console.log('  No design tokens found in comments');
}

// Extract exact color values
console.log('\n\n=== COLOR VALUES ===\n');
const colorRegex = /\[#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\]/g;
const colors = new Set();

while ((match = colorRegex.exec(input)) !== null) {
  colors.add(`#${match[1]}`);
}

if (colors.size > 0) {
  colors.forEach(color => console.log(`  ${color}`));
} else {
  console.log('  No exact hex colors found');
}

// Extract custom values (px, rem, etc.)
console.log('\n\n=== CUSTOM VALUES (px, rem, etc.) ===\n');
const customValueRegex = /\[(-?\d+\.?\d*)(px|rem|em|%)\]/g;
const customValues = new Map();

while ((match = customValueRegex.exec(input)) !== null) {
  const value = `${match[1]}${match[2]}`;
  customValues.set(value, (customValues.get(value) || 0) + 1);
}

if (customValues.size > 0) {
  Array.from(customValues.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([value, count]) => {
      console.log(`  ${value} (used ${count}x)`);
    });
} else {
  console.log('  No custom values found');
}

// Extract data-name attributes (Figma layer names)
console.log('\n\n=== FIGMA LAYER NAMES ===\n');
const dataNameRegex = /data-name="([^"]+)"/g;
const layerNames = [];

while ((match = dataNameRegex.exec(input)) !== null) {
  layerNames.push(match[1]);
}

if (layerNames.length > 0) {
  layerNames.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));
} else {
  console.log('  No layer names found');
}

// Extract node IDs
console.log('\n\n=== FIGMA NODE IDs ===\n');
const nodeIdRegex = /data-node-id="([^"]+)"/g;
const nodeIds = [];

while ((match = nodeIdRegex.exec(input)) !== null) {
  nodeIds.push(match[1]);
}

if (nodeIds.length > 0) {
  nodeIds.forEach((id, i) => console.log(`  ${i + 1}. ${id}`));
} else {
  console.log('  No node IDs found');
}

console.log('\n=== END ANALYSIS ===\n');
```

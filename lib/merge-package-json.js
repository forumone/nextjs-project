const fs = require('node:fs');
const basePackage = require('../package.json');
const drupalPackage = require('../starterkits/drupal/package-drupal.json');
const path = require('node:path');

const mergedPackage = {
  ...basePackage,
  dependencies: {
    ...drupalPackage?.dependencies,
    ...basePackage.dependencies,
  },
  devDependencies: {
    ...drupalPackage?.devDependencies,
    ...basePackage.devDependencies,
  }
}

fs.writeFileSync(path.resolve(__dirname, "../package.json"), JSON.stringify(mergedPackage, null, 2));

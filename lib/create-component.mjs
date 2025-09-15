/* eslint-disable no-console */
import { confirm, input, select } from '@inquirer/prompts';
import { lstat } from 'fs/promises';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import mustache from './mustache/mustache.mjs';

/**
 * Creates the machine name from a human-readable name.
 * @param {string} name - The human-readable name
 * @return {string} - The machine name
 */
function machineName(name) {
  return name
    .split(/[\s-_]/)
    .map(piece => `${piece.charAt(0).toUpperCase()}${piece.slice(1)}`)
    .join('');
}

/**
 * Creates a human name from a machine name.
 * @param {string} name - The machine name
 * @return {string} - The human-readable name
 */
function humanName(name) {
  const words = name
    .split(/[\s-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}

/**
 * Creates the cascade layer name from the directory name.
 * @param {string} directoryName - The directory name
 * @return {string}
 */
function cascadeLayer(directoryName) {
  const parts = directoryName.split('-');
  return parts[parts.length - 1];
}

/**
 * Checks whether the source directory is an accessible directory.
 * @param {node:fs.PathLike} source - Source path
 * @return {Promise<boolean>} - True if source is an accessible directory
 */
async function isDirectory(source) {
  const stats = await lstat(source);
  return stats.isDirectory();
}

/**
 * Get available component directories.
 * @param {node:fs.PathLike} source - Source path
 * @return {Promise<string[]>} - Array of component directory paths
 */
async function getDirectories(source) {
  /** @type {string[]} */
  const directoryFiles = await readdir(source);
  /** @type {string[]} */
  const directoryPaths = directoryFiles
    .filter(
      dirName => !['00-config', '05-pages', '06-utility'].includes(dirName),
    )
    .map(name => path.join(source, name));
  /** @type {Awaited<boolean>[]} */
  const isDirectoryResults = await Promise.all(directoryPaths.map(isDirectory));
  return directoryPaths.filter((value, index) => isDirectoryResults[index]);
}

/**
 * Get the machine name from user input.
 * @return {Promise<string>} - Machine name of new component
 */
async function getMachineName() {
  const question = {
    message: 'What is the name of your component?',
    transformer: machineName,
    required: true,
  };
  const componentName = await input(question);
  return machineName(componentName).trim();
}

/**
 * Get the human-readable name from user input.
 * @param {string} componentName - Machine name of new component
 * @returns {Promise<string>} - Human-readable name of new component
 */
async function getComponentTitle(componentName) {
  // TODO: kebab-case
  const defaultComponentTitle = humanName(componentName);
  const question = {
    message: 'What is the human-readable title of your component?',
    default: defaultComponentTitle,
    transformer: humanName,
    required: true,
  };
  const componentTitle = await input(question);
  return componentTitle.trim();
}

/**
 * Select the component folder from available directories.
 * @returns {Promise<string>} - Name of selected folder
 */
async function getComponentFolder() {
  const patternSrc = path.join(process.cwd(), 'source');
  const patternDir = await getDirectories(patternSrc);
  const question = {
    message: 'Choose the component location:',
    choices: patternDir.map(item => path.basename(item)),
  };
  return select(question);
}

/**
 * Gets the name of the optional subdirectory.
 * @returns {Promise<string>} - Subdirectory or empty string if no directory entered
 */
async function getComponentFolderSub() {
  const question = {
    message: 'Include subfolder or leave blank',
  };
  const componentFolderSub = await input(question);
  return componentFolderSub.trim();
}

/**
 * Gets whether or not to generate a Storybook story.
 * @returns {Promise<boolean>}
 */
async function getUseStorybook() {
  const question = {
    message: 'Create a Storybook story?',
    default: true,
  };
  return confirm(question);
}

async function createFile(fileName, templatePath, mustacheData) {
  const filePath = mustache(fileName, mustacheData);
  const templateContents = await readFile(path.resolve(templatePath), {
    encoding: 'utf-8',
  });
  const newFileContents = mustache(templateContents, mustacheData);
  await writeFile(filePath, newFileContents, { encoding: 'utf-8' });
}

async function generator() {
  const componentName = await getMachineName();
  const componentTitle = await getComponentTitle(componentName);
  const componentFolder = await getComponentFolder();
  const componentFolderSub = await getComponentFolderSub();
  const componentLocation = path.join(
    componentFolder,
    machineName(componentFolderSub),
  );
  const useStorybook = await getUseStorybook();

  const mustacheData = {
    // Sections
    machineName,
    humanName,
    cascadeLayer,
    // Partials
    propsName: '{{componentName}}Props',
    componentAlias: '{{componentName}}Component',
    argsName: '{{#camelCase}}{{componentName}}{{/camelCase}}Args',
    // Variables
    componentName,
    componentTitle,
    componentLocation,
    useStorybook,
  };
  const output = mustache(
    `---
Component Name: {{componentName}}
Component Title: {{componentTitle}}
Component Location: {{componentLocation}}
Include Story?: {{useStorybook}}
---
`,
    mustacheData,
  );
  console.log(output);
  // await createFile(
  //   './source/{{ componentLocation }}/{{ componentName }}/{{ componentName }}.tsx',
  //   './lib/plop-templates/Component.hbs',
  //   mustacheData,
  // );
}

generator();

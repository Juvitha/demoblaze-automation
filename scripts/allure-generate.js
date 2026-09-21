const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const libDir = path.join(projectRoot, 'node_modules', 'allure-commandline', 'dist', 'lib');

if (!fs.existsSync(libDir)) {
  console.error('Allure library directory not found:', libDir);
  process.exit(1);
}

const jars = fs
  .readdirSync(libDir)
  .filter((file) => file.endsWith('.jar'))
  .map((file) => path.join(libDir, file));

if (jars.length === 0) {
  console.error('No JAR files found in Allure library directory:', libDir);
  process.exit(1);
}

const javaCommand = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', 'java.exe') : 'java';
const classpath = jars.join(path.delimiter);
const args = [
  '-classpath',
  classpath,
  'io.qameta.allure.CommandLine',
  'generate',
  'allure-results',
  '--clean',
  '-o',
  'allure-report',
];

const result = spawnSync(javaCommand, args, {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);

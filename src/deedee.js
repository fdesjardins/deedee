import fs from 'fs'
import path from 'path'
import walk from 'walk'
import _ from 'lodash'
import Promise from 'bluebird'

function extractComposerJson (json, fieldName) {
  return _.map(json[fieldName], (version, name) => {
    return {
      name: name,
      version: version
    }
  })
}

function extractNodeOrBower (json, fieldName) {
  return _.map(json[fieldName], (version, name) => {
    return {
      name: name,
      version: version
    }
  })
}

function detectComposer (root) {
  let configPath = path.join(root, 'composer.json')
  let composerJson = JSON.parse(fs.readFileSync(configPath))

  return {
    type: 'PHP/Composer',
    projectName: composerJson.name,
    path: path.normalize(root),
    require: extractComposerJson(composerJson, 'require'),
    'require-dev': extractComposerJson(composerJson, 'require-dev')
  }
}

function detectNode (root) {
  let configPath = path.join(root, 'package.json')
  let packageJson = JSON.parse(fs.readFileSync(configPath))

  return {
    type: 'Node.js',
    projectName: packageJson.name,
    path: path.normalize(root),
    dependencies: extractNodeOrBower(packageJson, 'dependencies'),
    devDependencies: extractNodeOrBower(packageJson, 'devDependencies')
  }
}

function detectBower (root) {
  let configPath = path.join(root, 'bower.json')
  let bowerJson = JSON.parse(fs.readFileSync(configPath))

  return {
    type: 'Bower',
    projectName: bowerJson.name,
    path: path.normalize(root),
    dependencies: extractNodeOrBower(bowerJson, 'dependencies'),
    devDependencies: extractNodeOrBower(bowerJson, 'devDependencies')
  }
}

export default function (options) {
  let deps = []

  if (options.recursive) {
    const walker = walk.walk(options.path, {
      followLinks: false,
      filters: [ 'node_modules', 'bower_components', '.git' ]
    })

    walker.on('file', (root, fstat, next) => {
      if (fstat.name === 'package.json') {
        deps.push(detectNode(root))
      }

      if (fstat.name === 'bower.json') {
        deps.push(detectBower(root))
      }

      if (fstat.name === 'composer.json') {
        deps.push(detectComposer(root))
      }
      next()
    })

    return new Promise(resolve => {
      walker.on('end', () => resolve(deps))
    })
  }

  const packageJsonPath = path.join(options.path, 'package.json')
  const bowerJsonPath = path.join(options.path, 'bower.json')
  const composerJsonPath = path.join(options.path, 'composer.json')

  if (fs.existsSync(packageJsonPath)) {
    deps.push(detectNode(options.path))
  }

  if (fs.existsSync(bowerJsonPath)) {
    deps.push(detectBower(options.path))
  }

  if (fs.existsSync(composerJsonPath)) {
    deps.push(detectComposer(options.path))
  }

  return Promise.resolve(deps)
}

import path from 'path'
import deedee from '../lib/deedee.js'

deedee({
  path: path.resolve('..'),
  recursive: false
}).then(deps => {
  console.log(JSON.stringify(deps, null, 2))
})

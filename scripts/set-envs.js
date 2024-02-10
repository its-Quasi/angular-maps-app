require('dotenv').config()
const { mkdirSync, writeFileSync } = require('fs')

const path = './src/envs/environments.ts'

const VARS = {
  MAPBOX_KEY: process.env['MAPBOX_KEY']
}

const envContent = `
  export const environment = {
    mapbox_key : '${VARS.MAPBOX_KEY}'
  }
`

mkdirSync('./src/envs', { recursive: true })
writeFileSync(path, envContent)

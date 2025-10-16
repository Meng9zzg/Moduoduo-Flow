const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '../dist/enterprise/emails')

if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log(`Removed: ${dir}`)
} else {
    console.log(`Directory not found: ${dir}`)
}

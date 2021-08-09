# Overview

- This is a sandbox file search tool
- Scan directory for files by the following: type, extension, size, or query

## Libraries

- **File Systems**: [fs](https://nodejs.org/api/fs.html)
- **File Paths**: [path](https://nodejs.dev/learn/nodejs-file-paths/)
- **CLI**: [commander](https://tj.github.io/commander.js/)

##### CLI Options

- **Directory (Required)**: `node index.js -p ~/Directory`
- **File Type**: `node index.js -p ~/Directory -t image`
- **File Extension**: `node index.js -p ~/Directory -e mp4`
- **File Name Query**: `node index.js -p ~/Directory -q "Query"`
- **Minimum Size**: `node index.js -p ~/Directory -min "4 MB"`
- **Maximum Size**: `node index.js -p ~/Directory -max "4 MB"`

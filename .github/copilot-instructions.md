# Sit/Stand Tool
Sit/Stand Tool is a simple JavaScript web application that helps users with sit/stand reminders throughout the workday. It's built with vanilla JavaScript (ES6), HTML, and uses Babel for transpilation and Browserify for bundling into a static web application.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- Bootstrap and build the repository:
  - `npm install` -- takes ~2-15 seconds. Downloads and installs 349 packages.
  - `npm run build` -- takes <1 second. Transpiles ES6 to compatible JS and bundles for browser.
- No automated tests available: `npm test` will fail with "Error: no test specified".
- Security vulnerabilities present: Run `npm audit fix` to address 6 vulnerabilities (1 low, 2 moderate, 2 high, 1 critical). This fixes them automatically.
- Run the web application:
  - ALWAYS run the build steps first: `npm install && npm run build`
  - Serve locally: `python3 -m http.server 8000` or `npx serve . -p 8001`
  - Access at: `http://localhost:8000` (or port 8001 for npx serve)
- No linting or formatting tools are configured in this project.

## Validation
- ALWAYS manually validate functionality after making changes by serving the application locally.
- Test the complete sit/stand workflow:
  1. Open the application in a browser
  2. Optionally enable notifications (requires user permission)
  3. Configure stand duration (default 15 minutes) and timing (start/middle/end of hour)
  4. Click "Start" - should show "SIT" status
  5. Click "Pause" - timer pauses but status remains
  6. Click "Stop" - clears status and resets timer
- Check browser console for JavaScript errors during testing.
- The application works by setting timers based on the current minute of the hour.

## File Structure and Navigation
- **Source files** (make changes here):
  - `src/timer.js` - Core Timer class that manages hourly intervals
  - `src/browser.js` - Browser-specific functionality, UI logic, and notification handling
  - `index.html` - Main HTML page and UI structure
- **Build output** (generated, commit changes):
  - `lib/browser.js` - Transpiled browser.js
  - `lib/timer.js` - Transpiled timer.js  
  - `lib/helpers.js` - Babel external helpers for UMD format
  - `lib/browser_bundle.js` - Browserified bundle used by index.html
- **Configuration**:
  - `package.json` - Dependencies and build scripts
  - `.babelrc` - Babel configuration for ES6 transpilation

## Build Process Details
The build command runs three steps sequentially:
1. `babel src -d lib` - Transpiles ES6 source to lib/ directory
2. `babel-external-helpers -t umd -l classCallCheck,createClass > lib/helpers.js` - Creates UMD helpers
3. `browserify lib/browser.js -o lib/browser_bundle.js` - Bundles for browser consumption

## Common Tasks

### Making Code Changes
1. Edit source files in `src/` directory
2. Run `npm run build` to regenerate `lib/` files
3. Serve application locally to test changes
4. Commit both `src/` and generated `lib/` files

### Adding New Functionality
- Timer logic: Edit `src/timer.js`
- UI behavior: Edit `src/browser.js`
- HTML structure: Edit `index.html`
- Always test notification permissions and browser compatibility

### Debugging Issues
- Check browser console for JavaScript errors
- Verify timer intervals are working (check every 30 seconds)
- Test different "when" settings (start/middle/end of hour)
- Verify notification permissions if notifications not working

## Repository Root Contents
```
.
├── .babelrc              # Babel transpilation config
├── .gitignore           # Git ignore patterns
├── LICENSE              # MIT license
├── README.md            # Basic project description
├── index.html           # Main application HTML
├── lib/                 # Build output (commit these)
│   ├── browser.js       # Transpiled browser.js
│   ├── browser_bundle.js # Browserify bundle
│   ├── helpers.js       # Babel UMD helpers
│   └── timer.js         # Transpiled timer.js
├── package-lock.json    # npm dependency lock
├── package.json         # Project config and scripts
└── src/                 # Source files (edit these)
    ├── browser.js       # UI and browser functionality
    └── timer.js         # Core timer logic
```

## Known Issues and Limitations
- No automated test infrastructure - manual testing required
- 6 npm security vulnerabilities (run `npm audit fix` to address)
- No linting or code formatting tools configured
- Application requires browser notification permissions for alerts
- Timer precision limited to 30-second intervals for performance
- No CI/CD pipeline configured
// const chalk = require('chalk'); // Removed: unused variable

// This string is now properly formatted and within line length limits
const properlyNamedVariable = 'This line follows Airbnb style guide';

function myFunction (used, _nonUsed) {
  if (used) {
    // console.log is not recommended in production code
    // console.log(used);
    return `${properlyNamedVariable}: ${used}`;
  }
  return null;
}

// Export the function instead of undefined variable
module.exports = myFunction;

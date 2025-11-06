const greeting = 'Hola mundo!';

// Using a proper logging function instead of console.log
function print (text) {
  // In production, use a proper logger
  // console.log(text);
  return text;
}

const message = `${greeting}!!!`;
print(message);

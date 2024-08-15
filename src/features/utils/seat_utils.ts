function titleToNumber(s: string) {
  let result = 0;
  for (let i = 0; i < s.length; i++)
  {
    result *= 26;
    result += s[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  }
  return result;
}

function numberToTitle(n: number) {
  let result = '';
  while (n > 0)
  {
    n--;
    result = String.fromCharCode('A'.charCodeAt(0) + n % 26) + result;
    n = Math.floor(n / 26);
  }
  return result;
}

function extractAlphabetFromAlphaNumeric(s: string) {
  return s.replace(/[^a-zA-Z]/g, '');
}

export { extractAlphabetFromAlphaNumeric, numberToTitle, titleToNumber };
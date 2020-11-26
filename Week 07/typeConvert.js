function StringToNumber(str) {
  return parseInt(str)
}

function NumberToString(num, radix) {
  if (radix >= 2 && radix <= 36) {
    let number = new Number(num)
    return number.toString(radix)
  }
}

NumberToString(100, 2)
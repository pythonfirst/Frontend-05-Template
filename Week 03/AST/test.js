function*  gen() {
  yield 1
  yield 2
  yield 3
}

let g = gen()
console.log('g', g)
for (const item of g) {
  console.log('item', item)
  if (item === 2) break
}

for (const item of g) {
  console.log('item', item)
}
const bcrypt = require('bcryptjs')

let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("1234", salt);
console.log(hash)

console.log(bcrypt.compareSync("abcde", hash)); // true
console.log(bcrypt.compareSync("1234", hash)); // false
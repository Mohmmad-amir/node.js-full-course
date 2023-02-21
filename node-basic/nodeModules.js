//chapter 3 node modules
// how to instal,uninstall and use node packages
// console.log("testing!");
// console.log("testing!");
// console.log("testing! 3rd");

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));
console.log(uuid());



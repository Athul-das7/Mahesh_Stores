import db from '../../fireconfig';

async function test (){

const t = await db.doc('products/water sensor').get()
console.log(t.data());
}

test()
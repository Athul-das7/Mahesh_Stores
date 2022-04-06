const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'mahesh-stores',
  keyFilename: './maheshstores.json',
});

// const test = async() =>{
//   const document = db.doc('users/1602-19-735-071')
//   await document.update({
//     test:'hello'
//   })
//   console.log('hopefully working');
//   const trying = await db.doc('admins/*').docs;
//   // const trydata = trying.docs
//   console.log(trying)
// }

// test()

// db.collection('users').get('1602-19-735-071').then(q=>{
//   q.forEach(doc=>{
//     console.log(doc.data())
//     db.doc(`users/${doc.id}`).update({
//     'number':986696234,
//     'test':'helloooo'
//     })
//   })
// })

// const batch = writeBatch(db);
// const sref = doc(db,'name','Athul*');
// batch.update({
//   'test':200
// })

module.exports = db;

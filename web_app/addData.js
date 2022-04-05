const db = require('./firebase')// require('../database')

// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

db.collection("transactions").doc().set({
    cartComponents: ['en-nm','en-au'],
    components: null,
    endDate: new Date(2022,4,15),
    startDate: new Date(2022,4,2),
    returnDate: null,
    user: {
        name: "John",
        rollNo: "1602-19-735-002",
        phone: 9998811111,
        email: "john@example.com"
    },
    status: 0
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
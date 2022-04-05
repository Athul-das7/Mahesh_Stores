const db = require('./firebase')// require('../database')

// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

db.collection("transactions").doc().set({
    cartComponents: ['en-nm','en-au'],
    components: ['en-nm-001','en-au-001'],
    endDate: new Date(2022,4,15),
    startDate: new Date(2022,4,2),
    returnDate: null,
    user: {
        name: "bond",
        rollNo: "1602-19-735-007",
        phone: 9998811111,
        email: "bond@example.com"
    },
    status: 1
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
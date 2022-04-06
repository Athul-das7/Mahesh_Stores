const db = require('./firebase')// require('../database')

console.log('firebase.database');
db.collection("transactions").doc().set({
    cartComponents: ['en-nm','en-au'],
    components: ['en-nm-001','en-au-001'],
    endDate: new Date(2022,4,15),
    startDate: new Date(2022,4,2),
    returnDate: null,
    user: {
        name: "james",
        rollNo: "1602-19-735-001",
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
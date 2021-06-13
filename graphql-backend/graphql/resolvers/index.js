const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
};

module.exports = rootResolver;
// mutation{
//   createEvent(eventInput:{ title: "after refactoring", description:"description", price:10.00, date:"2021-05-07T07:34:05.014Z"}){
//     title
//     creator{
//       email
//     }
//   }
// }

// {
//   events {
//     title
//     creator {
//       email
//       createdEvents {
//         _id
//       }
//     }
//   }
// }

// mutation{
//   bookEvent(eventId: "6094ed98bd860947982e2f1c"){
//     event{
//       title
//     }
//     user{
//       email
//     }
//   }
// }

// query{
//   bookings{
//     _id
//     event{
//       title
//     }
//   }
// }

// mutation{
//   cencelBooking(bookingId: "6094ee98beeeb526a83dd0a0"){
//     title
//     creator{
//       email
//     }
//   }
// }

// mutation {
//   cencelBooking(bookingId: "6094ee98beeeb526a83dd0a0") {
//     title
//     creator {
//       email
//     }
//   }
// }

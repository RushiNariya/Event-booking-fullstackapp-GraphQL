const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToStrong } = require('../../helpers/date');

const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToStrong(event._doc.date),
    creator: userFetch.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: userFetch.bind(this, booking.user),
    event: singleEvent.bind(this, booking.event),
    createdAt: dateToStrong(booking._doc.createdAt),
    updatedAt: dateToStrong(booking._doc.updatedAt),
  };
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

const userFetch = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

exports.userFetch = userFetch;
exports.events = events;
exports.singleEvent = singleEvent;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

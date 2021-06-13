const Event = require('../../models/event');
const Booking = require('../../models/booking');

// const { dateToStrong } = require('../../helpers/date');
const { singleEvent, userFetch, events, transformBooking } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!!!');
    }
    try {
      const bookings = await Booking.find({});
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!!!');
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: '6092c51bbcc4142ac03d3b0a',
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cencelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!!!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};

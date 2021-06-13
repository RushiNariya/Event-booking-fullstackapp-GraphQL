// const { dateToStrong } = require('../../helpers/date');
const Event = require('../../models/event');
const User = require('../../models/user');

const { singleEvent, userFetch, events, transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find({});
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!!!');
    }

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '6092c51bbcc4142ac03d3b0a',
    });

    try {
      let createdEvent;

      const result = await event.save();

      createdEvent = transformEvent(result);

      const user = await user.findById('6092c51bbcc4142ac03d3b0a');
      if (!user) {
        throw new Error('User exists already.');
      }

      user.createdEvents.push(event);
      const userUpdated = await user.save();

      return createdEvent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

const { google } = require('googleapis');
const authorize = require('../index');

const calendarId = 'primary'; // current using primary calendar
const eventsApi = auth => google.calendar({ version: 'v3', auth }).events;

/**
 * Lists the next 10 incoming events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {Function} callback Response callback, including error.
 */
function listEvents(auth, callback) {
    eventsApi(auth).list({
        calendarId,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, callback);
}

/**
 * Insert a calendar event.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {Function} callback Response callback, including error.
 * @param {Object} event An object represent google calendar event.
 */
function insertEvent(auth, callback, event) {
    eventsApi(auth).insert({
        calendarId,
        resource: event
    }, callback);
}

/**
 * Delete a calendar event.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {Function} callback Response callback, including error.
 * @param {string} eventId Calendar event ID.
 */
function deleteEvent(auth, callback, eventId) {
     eventsApi(auth).delete({
        calendarId,
        eventId
    }, callback);
}

module.exports = {
    listEvents: callback => authorize(auth => listEvents(auth, callback)),
    insertEvent: (event, callback) => authorize(auth => insertEvent(auth, callback, event)),
    deleteEvent: (eventId, callback) => authorize(auth => deleteEvent(auth, callback, eventId))
};
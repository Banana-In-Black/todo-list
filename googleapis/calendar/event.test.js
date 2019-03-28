const { listEvents, insertEvent, updateEvent, deleteEvent } = require('./event');

const dateISOStringRegex = () => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/;
const dateRegex = () => /\d{4}-\d{2}-\d{2}/;
const event = {
    summary: 'create event',
    description: 'create event by jest',
    start: { date: '2019-03-30' },
    end: { date: '2019-03-30' }
};

let lastCreatedEvent;
const insertEventUntil = done => {
    insertEvent(event, (err, res) => {
        if (!err) {
            expect(res.data).toMatchObject({
                ...event,
                id: expect.any(String),
                created: expect.stringMatching(dateISOStringRegex())
            });
            lastCreatedEvent = res.data;
            done();
        }
    });
};
const deleteEventUntil = done => {
    deleteEvent(lastCreatedEvent.id, (err, res) => {
        if (!err) {
            expect(res.status).toBe(204);
            expect(res.data).toBeFalsy();
            done();
        }
    });
};

describe('Google Calendar API: Create & Delete an event', () => {
    test('Create an event', done => insertEventUntil(done));
    test('Delete an event', done => deleteEventUntil(done));

    test('Create an event without start date', done => {
        insertEvent({ ...event, start: null }, (err) => {
            if (err) {
                expect(err.response.status).toBe(400);
                done();
            }
        });
    });
});

test('Google Calendar API: List all events of primary calendar', done => {
    listEvents((err, res) => {
        if (!err) {
            expect(res.data.items).toBeInstanceOf(Array);
            res.data.items.forEach(item => {
                expect(item).toMatchObject({
                    id: expect.any(String),
                    created: expect.stringMatching(dateISOStringRegex()),
                    summary: expect.any(String),
                    description: expect.any(String),
                    start: { date: expect.stringMatching(dateRegex()) },
                    end: { date: expect.stringMatching(dateRegex()) }
                });
            });
            done();
        }
    });
});

describe('Google Calendar API: Update an event', () => {
    beforeEach(done => insertEventUntil(done));
    afterEach(done => deleteEventUntil(done));

    test('Update an event', done => {
        const newEvent = {
            ...event,
            id: lastCreatedEvent.id,
            description: 'Was updated by another request. woo!'
        };
        updateEvent(newEvent,
            (err, res) => {
                if (!err) {
                    expect(res.data).toMatchObject(newEvent);
                    done();
                }
            });
    });
});
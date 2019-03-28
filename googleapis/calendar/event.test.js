const { listEvents, insertEvent, deleteEvent } = require('./event');

const dateISOStringRegex = () => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/;
const dateRegex = () => /\d{4}-\d{2}-\d{2}/;

describe('Google Calendar API: Create & Delete an event', () => {
    const event = {
        summary: 'create event',
        description: 'create event by jest',
        start: { date: '2019-03-30' },
        end: { date: '2019-03-30' }
    };

    let createdEvent;
    test('Create an event', done => {
        insertEvent(event, (err, res) => {
            if (!err) {
                expect(res.data).toMatchObject({
                    ...event,
                    id: expect.any(String),
                    created: expect.stringMatching(dateISOStringRegex())
                });
                createdEvent = res.data;
                done();
            }
        });
    });

    test('Delete an event', done => {
        deleteEvent(createdEvent.id, (err, res) => {
            if (!err) {
                expect(res.status).toBe(204);
                expect(res.data).toBeFalsy();
                done();
            }
        });
    });

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

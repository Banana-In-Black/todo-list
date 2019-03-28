const { list, add, get, update, remove, setBase } = require('./todo');

const dateISOStringRegex = () => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/;
const dateRegex = () => /\d{4}-\d{2}-\d{2}/;
const todo = {
    summary: 'create todo',
    desc: 'create todo by jest',
    start: '2019-03-30',
    end: '2019-03-30'
};

let lastUpdatedTodo;
const insertTodoUntil = done => {
    add(todo).then(resTodo => {
        expect(resTodo).toMatchObject({
            ...todo,
            id: expect.any(String),
            created: expect.stringMatching(dateISOStringRegex())
        });
        lastUpdatedTodo = resTodo;
        done();
    });
};
const removeTodoUntil = done => {
    remove(lastUpdatedTodo.id).then(resTodo => {
        expect(resTodo).toMatchObject(lastUpdatedTodo);
        done();
    });
};

beforeAll(() => setBase('http://localhost:3000'));
afterAll(() => setBase(''));

describe('Express Todo API: Create & Remove a todo', () => {
    test('Create a todo', done => insertTodoUntil(done));
    test('Remove a todo', done => removeTodoUntil(done));

    test('Create a todo without start date', done => {
        add({ ...todo, start: null }).catch(err => {
            expect(err.status).toBe(500);
            done();
        });
    });
});

test('Express Todo API: List all todos', done => {
    list().then(todos => {
        expect(todos).toBeInstanceOf(Array);
        todos.forEach(todo => {
            expect(todo).toMatchObject({
                id: expect.any(String),
                summary: expect.any(String),
                start: expect.stringMatching(dateRegex()),
                end: expect.stringMatching(dateRegex())
            });
        });
        done();
    });
});

describe('Express Todo API: Get & Update a todo', () => {
    beforeEach(done => insertTodoUntil(done));
    afterEach(done => removeTodoUntil(done));

    test('Get an todo', done => {
        get(lastUpdatedTodo.id).then(resTodo => {
            expect(resTodo).toMatchObject(lastUpdatedTodo);
            done();
        });
    });

    test('Update an todo', done => {
        const newTodo = {
            ...todo,
            id: lastUpdatedTodo.id,
            desc: 'Was updated by another request. woo!'
        };
        update(newTodo).then(resTodo => {
            expect(resTodo).toMatchObject(newTodo);
            lastUpdatedTodo = resTodo;
            done();
        });
    });
});
import mut from "./module.js"; // module under test

// example test:
test("testing sum -- success", () => {
    const expected = 30;
    const result = mut.sum(12, 18);
    expect(result).toBe(expected);
});

// my tests
test("testing div -- success", () => {
    const expected = 50;
    const result = mut.div(100, 2);
    expect(result).toBe(expected);
});

test("testing div -- success", () => {
    const expected = 1;
    const result = mut.div(10, 10);
    expect(result).toBe(expected);
});

test("testing div -- success", () => {
    expect(() => mut.div(100, 0).toThrow());
});

test("testing containsNumbers -- success", () => {
    const result = mut.containsNumbers("zero");
    expect(result).toBeFalsy();
});

test("testing containsNumbers -- success", () => {
    const result = mut.containsNumbers("0");
    expect(result).toBeTruthy();
});

test("testing containsNumbers -- success", () => {
    const result = mut.containsNumbers("!@#$%^&*()_-+={[}]|\:;?/>.<,~`");
    expect(result).toBeFalsy();
});

// BUG FOUND ! containsNumbers, as written, evaluates a space (" ") as a number!
// the expected output here is "false" given that " " is not a number, but the function returns true, so this is a bug. 
test("testing containsNumbers -- success", () => {
    const result = mut.containsNumbers(" ");
    expect(result).toBeFalsy();
});
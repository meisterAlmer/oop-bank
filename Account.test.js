const Account = require("./Account.js");

// Starting with only this test, take out .only once it is working
// Add .only to the next test to do one at a time
test("Account.js should export something", () => {
  expect(Account).not.toBeNull();
});

test("Account should be a constructor, (you can use it with the new keyword)", () => {
  const accountInstance = new Account();

  expect(accountInstance instanceof Account).toBe(true);
});

test("A new Account can be created with and should store: a name, balance & creditLimit", () => {
  const name = "Rein";
  const balance = 1000;
  const creditLimit = 500;

  const accountInstance = new Account(name, balance, creditLimit);

  expect(accountInstance.name).toBe("Rein");
  expect(accountInstance.balance).toBe(1000);
  expect(accountInstance.creditLimit).toBe(500);
});

test("An account instance should have a 'makeDeposit' method", () => {
  const accountInstance = new Account();

  expect(accountInstance.makeDeposit).toBeDefined();
  expect(accountInstance.makeDeposit instanceof Function).toBe(true);
});

test("A number passed to makeDeposit should be added to the balance of the account", () => {
  const accountInstance = new Account("Rein", 1000, 500);

  accountInstance.makeDeposit(100);

  expect(accountInstance.balance).toBe(1100);
});

test("makeDeposit should ignore negative numbers", () => {
  const accountInstance = new Account("Rein", 1000, 500);

  accountInstance.makeDeposit(-1000);

  expect(accountInstance.balance).toBe(1000);
});

test("An account instance should have a 'makeWithdrawal' method", () => {
  const accountInstance = new Account();

  expect(accountInstance.makeWithdrawal).toBeDefined();
  expect(accountInstance.makeWithdrawal instanceof Function).toBe(true);
});

test("A number passed to makeWithdrawal should be subtracted from the balance of the account", () => {
  const accountInstance = new Account("Rein", 1000, 500);

  accountInstance.makeWithdrawal(100);

  expect(accountInstance.balance).toBe(900);
});

test("A number passed to makeWithdrawal which is greater than the balance + the creditLimit is ignored", () => {
  const balance = 1000;
  const creditLimit = 500;
  const accountInstance = new Account("Rein", balance, creditLimit);

  // balance + limit = 1500, so 2000 is 500 too much!
  accountInstance.makeWithdrawal(2000);

  expect(accountInstance.balance).toBe(1000);
});

test("The daily limit for a withdrawal should be 5000, amounts over 5000 should be ignored", () => {
  const balance = 10000;
  const creditLimit = 500;
  const accountInstance = new Account("Rein", balance, creditLimit);

  accountInstance.makeWithdrawal(6000);

  expect(accountInstance.balance).toBe(10000);
});

const BusinessAccount = require("./BusinessAccount.js");

// Starting with only this test, take out .only once it is working
// Add .only to the next test to do one at a time
test("BusinessAccount.js should export something", () => {
  expect(BusinessAccount).not.toBeNull();
});

test("BusinessAccount should be a constructor, (you can use it with the new keyword)", () => {
  const businessAccountInstance = new BusinessAccount();

  expect(businessAccountInstance instanceof BusinessAccount).toBe(true);
});

test("A new Business Account can be created with and should store: a name, balance, creditLimit, sepaPermission", () => {
  const name = "ACME.CO";
  const balance = 1000;
  const creditLimit = 500;
  const sepaPermission = true;

  const businessAccountInstance = new BusinessAccount(
    name,
    balance,
    creditLimit,
    sepaPermission
  );

  expect(businessAccountInstance.name).toBe("ACME.CO");
  expect(businessAccountInstance.balance).toBe(1000);
  expect(businessAccountInstance.creditLimit).toBe(500);
  expect(businessAccountInstance.sepaPermission).toBe(true);
});

test("A Business Account instance should have a 'makeDeposit' method", () => {
  const businessAccountInstance = new BusinessAccount();

  expect(businessAccountInstance.makeDeposit).toBeDefined();
  expect(businessAccountInstance.makeDeposit instanceof Function).toBe(true);
});

test("A number passed to makeDeposit should be added to the balance of the account", () => {
  const businessAccountInstance = new BusinessAccount("ACME.CO", 1000, 500);

  businessAccountInstance.makeDeposit(100);

  expect(businessAccountInstance.balance).toBe(1100);
});

test("makeDeposit should ignore negative numbers", () => {
  const businessAccountInstance = new BusinessAccount("ACME.CO", 1000, 500);

  businessAccountInstance.makeDeposit(-1000);

  expect(businessAccountInstance.balance).toBe(1000);
});

test("A Business Account instance should have a 'makeWithdrawal' method", () => {
  const businessAccountInstance = new BusinessAccount();

  expect(businessAccountInstance.makeWithdrawal).toBeDefined();
  expect(businessAccountInstance.makeWithdrawal instanceof Function).toBe(true);
});

test("A number passed to makeWithdrawal should be subtracted from the balance of the account", () => {
  const balance = 50000;
  const creditLimit = 500;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit
  );

  businessAccountInstance.makeWithdrawal(6000);

  expect(businessAccountInstance.balance).toBe(44000);
});

test("A number passed to makeWithdrawal which is greater than the balance + the creditLimit is ignored", () => {
  const balance = 1000;
  const creditLimit = 500;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit
  );

  // balance + limit = 1500, so 2000 is 500 too much!
  businessAccountInstance.makeWithdrawal(2000);

  expect(businessAccountInstance.balance).toBe(1000);
});

test("The daily limit for a withdrawal should be 20000, amounts over 20000 should be ignored", () => {
  const balance = 50000;
  const creditLimit = 500;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit
  );

  businessAccountInstance.makeWithdrawal(30000);

  expect(businessAccountInstance.balance).toBe(50000);
});

test("A BusinessAccount have the sepaInvoice method", () => {
  const businessAccountInstance = new BusinessAccount();

  expect(businessAccountInstance.sepaInvoice).toBeDefined();
  expect(businessAccountInstance.sepaInvoice instanceof Function).toBe(true);
});

test("Amount passed to sepaInvoice should be added to balance minus 1% transaction cost", () => {
  const balance = 1000;
  const creditLimit = 500;
  const sepaPermission = true;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit,
    sepaPermission
  );
  const invoiceAmount = 1000;

  businessAccountInstance.sepaInvoice(invoiceAmount);

  expect(businessAccountInstance.balance).toBe(1990);
});

test("Amounts passed to sepaInvoice should be ignored if the business does not have sepaPermission", () => {
  const balance = 1000;
  const creditLimit = 500;
  const sepaPermission = false;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit,
    sepaPermission
  );

  businessAccountInstance.sepaInvoice(1000);

  expect(businessAccountInstance.balance).toBe(1000);
});

test("Negative amounts passed to sepaInvoice should be ignored", () => {
  const balance = 1000;
  const creditLimit = 500;
  const sepaPermission = true;
  const businessAccountInstance = new BusinessAccount(
    "ACME.CO",
    balance,
    creditLimit,
    sepaPermission
  );

  businessAccountInstance.sepaInvoice(-1000);

  expect(businessAccountInstance.balance).toBe(1000);
});

const Account = require("./Account.js");

class BusinessAccount extends Account {
  constructor(name, balance, creditLimit, sepaPermission) {
    super(name, balance, creditLimit);
    this.sepaPermission = sepaPermission;
    this.withdrawalLimit = 20000;
  }
  sepaInvoice(value) {
    if (this.sepaPermission && value > 0) this.balance += value * 0.99;
  }
}

// Export your class here as module.exports = MyClass
module.exports = BusinessAccount;

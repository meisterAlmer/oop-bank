class Account {
  constructor(name, balance, creditLimit) {
    this.name = name;
    this.balance = balance;
    this.creditLimit = creditLimit;
    this.withdrawalLimit = 5000;
  }
  makeDeposit(deposit) {
    if (deposit > 0) this.balance += deposit;
  }
  makeWithdrawal(withDrawal) {
    if (
      this.balance + this.creditLimit > withDrawal &&
      withDrawal < this.withdrawalLimit
    )
      this.balance -= withDrawal;
  }
}

// Export your class here as module.exports = MyClass
module.exports = Account;

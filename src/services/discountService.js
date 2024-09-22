// src/services/discountService.js
const { UserTypes } = require('../models/userModel');

const calculateDiscount = (bill, user) => {
  let discount = 0;

  // Calculate $5 discount for every $100
  discount += Math.floor(bill.totalAmount / 100) * 5;

  // Percentage-based discounts (only one applicable)
  let percentageDiscount = 0;

  if (user.userType === UserTypes.EMPLOYEE) {
    percentageDiscount = 0.3;
  } else if (user.userType === UserTypes.AFFILIATE) {
    percentageDiscount = 0.1;
  } else if (user.userType === UserTypes.CUSTOMER && user.tenure > 2) {
    percentageDiscount = 0.05;
  }

  if (percentageDiscount > 0) {
    // Calculate discount only on non-grocery items
    const nonGroceryTotal = bill.items
      .filter((item) => item.category !== 'groceries')
      .reduce((sum, item) => sum + item.price, 0);
    discount += nonGroceryTotal * percentageDiscount;
  }

  return discount;
};

module.exports = { calculateDiscount };

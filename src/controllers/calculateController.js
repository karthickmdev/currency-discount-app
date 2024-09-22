const { getExchangeRates } = require('../services/currencyService');
const { calculateDiscount } = require('../services/discountService');

const calculatePayableAmount = async (req, res) => {
  try {
    const { items, originalCurrency, targetCurrency } = req.body;
    const { userType, tenure } = req.user;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid items data' });
    }

    if (!originalCurrency || !targetCurrency) {
      return res.status(400).json({ message: 'Currencies must be specified' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const bill = {
      items,
      totalAmount,
    };

    const user = {
      userType,
      tenure,
    };

    // Calculate discount
    const discount = calculateDiscount(bill, user);
    const amountAfterDiscount = totalAmount - discount;

    // Fetch exchange rates
    const rates = await getExchangeRates(originalCurrency.toUpperCase());

    if (!rates || !rates[targetCurrency.toUpperCase()]) {
      return res.status(400).json({ message: 'Invalid target currency' });
    }

    const exchangeRate = rates[targetCurrency.toUpperCase()];
    const payableAmount = amountAfterDiscount * exchangeRate;

    res.json({
      originalAmount: totalAmount,
      discountApplied: discount,
      amountAfterDiscount,
      targetCurrency: targetCurrency.toUpperCase(),
      payableAmount: payableAmount.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { calculatePayableAmount };

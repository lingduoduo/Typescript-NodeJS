"use strict";
class CreditCardPaymentStrategy {
    processPayment(amount) {
        console.log(`Credit card payment processed for $${amount}`);
    }
}
class PaypalPaymentStrategy {
    processPayment(amount) {
        console.log(`Paypal payment processed for $${amount}`);
    }
}
class PaymentContext {
    checkout(paymentStrategy, amount) {
        let payment;
        if (paymentStrategy === "creditCard") {
            payment = new CreditCardPaymentStrategy();
        }
        else if (paymentStrategy === "paypal") {
            payment = new PaypalPaymentStrategy();
        }
        else {
            throw new Error("Invalid payment method");
        }
        payment.processPayment(amount);
    }
}
let checkoutFlow = new PaymentContext();
checkoutFlow.checkout("creditCard", 100);
checkoutFlow.checkout("paypal", 100);

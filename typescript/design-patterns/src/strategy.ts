interface PaymentStrategy {
    processPayment(amount: number): void;
}

class CreditCardPaymentStrategy implements PaymentStrategy {
    processPayment(amount: number) {
        console.log(`Credit card payment processed for $${amount}`);
    }
}

class PaypalPaymentStrategy implements PaymentStrategy {
    processPayment(amount: number) {
        console.log(`Paypal payment processed for $${amount}`);
    }
}

class PaymentContext {
    checkout(paymentStrategy: "creditCard" | "paypal", amount: number) {
        let payment: PaymentStrategy;
        if (paymentStrategy === "creditCard") {
            payment = new CreditCardPaymentStrategy();
        } else if (paymentStrategy === "paypal") {
            payment = new PaypalPaymentStrategy();
        } else {
            throw new Error("Invalid payment method");
        }
        payment.processPayment(amount);
    }
}

let checkoutFlow = new PaymentContext();
checkoutFlow.checkout("creditCard", 100);
checkoutFlow.checkout("paypal", 100);

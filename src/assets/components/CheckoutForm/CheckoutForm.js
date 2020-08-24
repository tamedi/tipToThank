import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import "./checkoutForm.css";
import { Form, Button, Container } from "react-bootstrap";
export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const response = await fetch(
        "http://localhost:8080/serveur/addtowallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: props.serveurId,
            amount: amount,
          }),
        }
      );
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      alert("Merci pour le pourboire ! ");
      //this.props.history.push("/Home");
    }
  };

  const createPaymentIntent = (e) => {
    e.preventDefault();
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:8080/client/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "tips" }], amount: amount }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      });
  };
  const displayForm = () => {
    //pour swicher vers le payement CB quand le montant est validé
    if (!showPayment) {
      return (
        <Container className="blocprincipal">
          <Form onSubmit={createPaymentIntent}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Montant du pourboire en € :</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01" // le minum entre deux montant
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </Form.Group>
            <Button variant="outline-warning" size="sm" type="submit">
              Donner
            </Button>
          </Form>
        </Container>
      );
    }
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Envoyer le tips"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p
          className={succeeded ? "result-message" : "result-message hidden"}
        ></p>
      </form>
    );
  };

  return <div>{displayForm()}</div>;
}

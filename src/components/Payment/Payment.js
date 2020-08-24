import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(
  "pk_test_51HB1h7BOgY8YXSrNpdYnU4BaQSHEnD5FVzxoSsRAJwCL22oNSBeog2fCLK8UmmVYEVNTMFsX7CG3Of0kAYSfVecP00zEdRuCGV"
);

class Payment extends Component {
  componentDidMount() {
    if (!this.props.location.state.serveurId) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div>
        <Elements stripe={promise}>
          <CheckoutForm serveurId={this.props.location.state.serveurId} />
        </Elements>
      </div>
    );
  }
}

export default Payment;

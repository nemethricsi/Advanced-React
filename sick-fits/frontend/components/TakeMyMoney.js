import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";
import CartItem from "./CartItem";

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = (res) => {
    console.log("On Token Called");
    console.log(res.id);
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name='Sick Fits'
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey='pk_test_51HvMRdILlGaDQZHebzf3HXC3O0T8sA9SiVDyD3kwXdnK8MfofXn0jWqEQij6OxFI3INxHF5Z0Bfe74Kx9jv7Fhjk00LBN23s9e'
            currency='USD'
            email={me.email}
            locale='auto'
            token={(res) => this.onToken(res)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;

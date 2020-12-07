import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import Router from "next/router";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";
import CartItem from "./CartItem";
import { TOGGLE_CART_MUTATION } from "./Cart";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder, toggleCart) => {
    NProgress.start();
    console.log("On Token Called");
    console.log(res.id);

    // manually call the mutation once we have the Stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch((err) => alert(err.message));
    toggleCart();
    Router.push({
      pathname: "/order",
      query: { id: order.data.createOrder.id },
    });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart) => (
              <Mutation
                mutation={CREATE_ORDER_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {(createOrder) => (
                  <StripeCheckout
                    amount={calcTotalPrice(me.cart)}
                    name='Sick Fits'
                    description={`Order of ${totalItems(me.cart)} items!`}
                    image={
                      me.cart.length && me.cart[0].item && me.cart[0].item.image
                    }
                    stripeKey='pk_test_51HvMRdILlGaDQZHebzf3HXC3O0T8sA9SiVDyD3kwXdnK8MfofXn0jWqEQij6OxFI3INxHF5Z0Bfe74Kx9jv7Fhjk00LBN23s9e'
                    currency='USD'
                    email={me.email}
                    locale='auto'
                    token={(res) => this.onToken(res, createOrder, toggleCart)}
                  >
                    {this.props.children}
                  </StripeCheckout>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;

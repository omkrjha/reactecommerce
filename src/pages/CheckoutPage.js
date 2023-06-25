import React from 'react';
import styled from 'styled-components';
import { PageHero} from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
const CheckoutPage = () => {
  const { myUser } = useUserContext();
  console.log(myUser);
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  return (
    <main>
      <PageHero title={'Checkout'} />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <article>
            <h4>Hello, {myUser && myUser.nickname}</h4>

            <p>Your total is {formatPrice(total_amount)}</p>
            <p>Test Card Number: 4242 4242 4242 4242</p>
            <Link
              to='/'
            >
              <button className='btn'>Pay</button>
            </Link>
          </article>
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;

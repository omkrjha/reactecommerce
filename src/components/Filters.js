import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      category,
      text,
      company,
      min_price,
      color,
      shipping,
      max_price,
      price,
    },
    all_products,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const colors = getUniqueValues(all_products, 'colors');
  const companies = getUniqueValues(all_products, 'company');
  //  console.log(categories);
  //  console.log(colors);
  //  console.log(companies);
  return (
    <Wrapper>
      <div className='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* search bar */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              // name of input has be same exact value like we have in state i.e line 11 text we get from filtercontext
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search bar */}

          {/* categories */}
          <div className='form-control'>
            <h5>Categories</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    type='button'
                    key={index}
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                    name='category'
                    // name of button has be same exact value like we have in state above i.e 'category' we get from filtercontext
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}

          {/* companies */}
          <div className='form-control'>
            <h5>companies</h5>
            <select
              name='company'
              value={company}
              onChange={updateFilters}
              className='company'
            >
              {companies.map((c, index) => {
                const capitalized = c.charAt(0).toUpperCase() + c.slice(1);
                return (
                  <option key={index} value={c}>
                    {capitalized}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      onClick={updateFilters}
                      data-color='all'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn' //this color is state value
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn' //this color is state value
                    }`}
                    data-color={c} //passing value in dataset which update value in filter_context
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}

          {/* price */}
          <div className='form-control'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              onChange={updateFilters}
              value={price}
            />
          </div>
          {/* price end */}

          {/* shipping */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          {/* shipping end */}

          {/* clear filters */}
          <button type='button' className='clear-btn' onClick={clearFilters}>
            clear filters
          </button>
          {/* clear filters end */}
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;

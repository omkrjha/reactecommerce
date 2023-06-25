import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    // console.log("filtering product");
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters; //see filter_context

    let tempProducts = [...all_products];

    //filtering
    // text
    if (text) { //if text is true means it is anything but empty or null
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().includes(text); 
        // returning those products only which contains "text" which user write in search bar
      });
    }

    // category filter
     if (category !== 'all') {
       tempProducts = tempProducts.filter(
         (product) => product.category === category
       );
     }

     // company filter
     if (company !== 'all') {
       tempProducts = tempProducts.filter(
         (product) => product.company === company
       );
     }

     //color filter
     if (color !== 'all') {
       tempProducts = tempProducts.filter((product) => {
         return product.colors.find((c) => c === color);
       });
     }

     //shipping filter
     if (shipping) {
       tempProducts = tempProducts.filter(
         (product) => product.shipping === true
       );
     }

     //preice filter
     tempProducts = tempProducts.filter((product) => product.price <= price);

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',

        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

// in actions.js we set actions then came to filter_context and  declare intial state and extract form which data we have to perofrm operations acc. to each "action" then pass as payload(argument) so it can be use at filter reducer page, from here we go respective page where these functions can be used and extract and show data according to action

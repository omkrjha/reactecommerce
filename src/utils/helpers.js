export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(number / 10);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  // console.log(unique);
  if (type === 'colors') { //colors is of array type so it has be handled differently
    unique = unique.flat(); //it returns unique values from array of colors not array of array
  }

  return ['all', ...new Set(unique)];
};

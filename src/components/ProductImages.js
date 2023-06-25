import React, { useState } from 'react';
import styled from 'styled-components';

const ProductImages = ({ images = [{ url: '' }] }) => {
  const [main, setMain] = useState(images[0]);
  //initially at time of loading, images will be indefiend so images[0] show error that's why we set images =[], means if images is not defiend then set it as empty error, this error also show when we access "url"
  // console.log(main); // image link is set in url
  return (
    <Wrapper>
      <img src={main.url} className='main' alt='main imagz' />
      {/* see console.log of main where link of image is stored */}
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image.url}
              alt={image.filename}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? 'active' : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;

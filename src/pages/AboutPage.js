import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/about.jpeg';

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='about image' />
        <article>
          <div className='title'>
            <h2>Our Story</h2>
            <div className="underline"></div>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti aut quasi illo harum delectus dolor recusandae, incidunt ad totam, repellendus quod molestias magni possimus temporibus! Facilis veniam possimus quo accusamus cum libero, temporibus autem ea, praesentium architecto numquam voluptatibus.</p>
        </article>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage

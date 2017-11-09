import React from 'react'

import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout>
    <div className="o-container IndexPage">
      <h1>{'<∞>'}</h1>
      <br />
      <h2>ETHEREUM CHAINTOOLS</h2>
    </div>
    <style jsx>{`
      .IndexPage {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .IndexPage__logo img {
        box-shadow: 1px 3px 7px 0px rgba(0, 0, 0, 0.25);
      }
    `}</style>
  </Layout>
)

export default IndexPage

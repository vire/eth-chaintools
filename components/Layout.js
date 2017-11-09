import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const Layout = ({ children }) => (
  <div className="c-text">
    <Head>
      <title>Ethereum Chaintools 🛠</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto+Mono|Source+Sans+Pro" />
      <link rel="stylesheet" href="/static/blaze.min.css" />
      {/* favicon stuff */}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{children}</main>
    <style jsx global>
      {`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          color: #d8d8d8;
        }
      `}
    </style>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

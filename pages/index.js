import React from 'react'
import * as Web3 from 'web3'

import { GETH_URL } from '../config/api'
import Layout from '../components/Layout'

const getLatestNBlocks = web3 => (defaultBlock, count) => {
  const promises = []
  for (let i = 0; i < count; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        web3.eth.getBlock(defaultBlock - i, (err, res) => {
          if (err) {
            reject({ message: `Could not fetch block: ${defaultBlock - i}` })
          } else {
            resolve(res)
          }
        })
      }),
    )
  }

  return Promise.all(promises)
}

class IndexPage extends React.Component {
  state = {
    blocks: [],
    defaultBlock: '',
  }

  async componentDidMount() {
    const web3 = new Web3.default(new Web3.providers.HttpProvider(GETH_URL))
    const defaultBlock = web3.eth.blockNumber
    const FETCH_BLOCK_COUNT = 10
    const blocks = await getLatestNBlocks(web3)(defaultBlock, FETCH_BLOCK_COUNT)

    this.setState({
      blocks,
      defaultBlock,
    })
  }

  render() {
    const { defaultBlock, blocks } = this.state

    return (
      <Layout>
        <div className="o-container o-container--large IndexPage">
          <h2>{'<∞> '} ETHEREUM CHAINTOOLS</h2>
          {defaultBlock && (
            <div>
              Default block: <b>{defaultBlock}</b>
            </div>
          )}
          <div className="IndexPage__content">
            {blocks &&
              blocks.map(block => {
                return <pre key={block.hash}>{JSON.stringify(block, null, 2)}</pre>
              })}
          </div>
        </div>
        <style jsx>{`
          .IndexPage {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          .IndexPage__content {
            width: 100%;
          }

          .IndexPage__content pre {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .IndexPage__content pre:nth-child(odd) {
            background: #e4e4e4;
          }
        `}</style>
      </Layout>
    )
  }
}

export default IndexPage

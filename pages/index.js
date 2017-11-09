import React from 'react'
import * as Web3 from 'web3'

import { GETH_URL } from '../config/api'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import TxDetails from '../components/TxDetails'

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
    blockDetails: undefined,
    txDetails: undefined,
  }

  constructor(props) {
    super(props)
    this.web3 = new Web3.default(new Web3.providers.HttpProvider(GETH_URL))
  }

  async componentDidMount() {
    const { web3 } = this
    const defaultBlock = web3.eth.blockNumber
    const FETCH_BLOCK_COUNT = 10
    const blocks = await getLatestNBlocks(web3)(defaultBlock, FETCH_BLOCK_COUNT)

    this.setState({
      blocks,
      defaultBlock,
    })
  }

  handleSearch = ({ block, tx }) => {
    if (tx) {
      this.web3.eth.getTransaction(tx, (err, txDetails) => {
        this.setState({
          txDetails,
        })
      })
    } else if (block) {
      this.web3.eth.getBlock(block, true, (err, blockDetails) => {
        this.setState({
          blockDetails,
        })
      })
    }
  }

  render() {
    const { defaultBlock, blocks, blockDetails, txDetails } = this.state

    return (
      <Layout>
        <div className="o-container o-container--medium IndexPage">
          <h2 className="u-centered">{'<∞> '} ETHEREUM CHAINTOOLS</h2>
          {defaultBlock && (
            <div>
              Latest block: <b>{defaultBlock}</b>
            </div>
          )}

          <SearchForm onSearch={this.handleSearch} />

          <div className="IndexPage__content">
            {txDetails && <TxDetails details={txDetails} />}
            {blockDetails && (
              <div style={{ border: '1px dotted #e2e2e2', margin: '1em 0' }}>
                <h3 className="u-centered">Details for block: {blockDetails.number}</h3>
                <pre>{JSON.stringify(blockDetails, null, 2)}</pre>
              </div>
            )}
            {blocks.length !== 0 && (
              <div>
                <h3 className="u-centered">Blocks</h3>
                {blocks.map(block => {
                  return <pre key={block.hash}>{JSON.stringify(block, null, 2)}</pre>
                })}
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .IndexPage {
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

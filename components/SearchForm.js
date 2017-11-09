import React from 'react'
import PropTypes from 'prop-types'

const TX_REGEX = /[0-9a-zA-Z]{64}?/
const BLOCK_REGEX = /[0-9]{1,7}?/

class SearchForm extends React.Component {
  state = {
    inputStr: '',
  }

  handleChange = ev => {
    this.setState({
      inputStr: ev.target.value && ev.target.value.split('0x').join(''),
    })
  }

  handleSubmit = () => {
    const { inputStr } = this.state

    if (inputStr.length === 40) {
      this.props.onSearch({
        address: inputStr,
      })
    } else if (inputStr.length === 64 && TX_REGEX.test(inputStr)) {
      this.props.onSearch({
        tx: `0x${inputStr}`,
      })
    } else if (BLOCK_REGEX.test(inputStr)) {
      this.props.onSearch({
        block: parseInt(inputStr),
      })
    } else {
      this.props.onSearch({
        error: 'Unknown input',
      })
    }
  }
  render() {
    return (
      <div>
        <div className="c-input-group">
          <div className="o-field">
            <input
              className="c-field"
              placeholder="Search for Block, Address, Tx"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <button
            className="c-button c-button--brand"
            onClick={this.handleSubmit}
            onSubmit={this.handleSubmit}>
            Search
          </button>
        </div>
      </div>
    )
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
}

export default SearchForm

import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'ink'

/// Add an arbitrary amount of numbers
const add = ({inputArgs}) => (
  <Text>
    {inputArgs
      .map((arg) => Number.parseFloat(arg))
      .filter((n) => !Number.isNaN(n))
      .reduce((sum, n) => sum + n, 0)}
  </Text>
)

add.propTypes = {
  /// The numbers you want to add
  inputArgs: PropTypes.array.isRequired,
}

export default add

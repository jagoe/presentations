import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'ink'

/// The hello command
const hello = ({firstName, lastName}) => (
  <Text>
    Hello, {firstName} {lastName}
  </Text>
)

hello.propTypes = {
  /// The first name
  firstName: PropTypes.string.isRequired,
  /// The last name
  lastName: PropTypes.string,
}

hello.positionalArgs = ['firstName']

hello.defaultProps = {
  lastName: 'Doe',
}

hello.shortFlags = {
  lastName: 'n',
}

hello.aliases = {
  lastName: ['familyName', 'surname'],
}

export default hello

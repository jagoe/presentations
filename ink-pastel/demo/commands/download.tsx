import * as React from 'react'
import {useState, useEffect} from 'react'
import * as PropTypes from 'prop-types'
import {Text} from 'ink'

/// Download an arbitrary amount of URLs
const download = ({urls}: {urls: string[]}) => {
  if (!urls?.length) {
    return <Text color="yellow">No URLs to download.</Text>
  }

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((old) => {
        if (percentage >= 100) {
          clearInterval(timer)

          return old
        }

        return old + 1
      })
    }, 25)

    return () => {
      clearInterval(timer)
    }
  })

  return (
    <Text>
      Downloading {urls.length} URLs... <Text color="blue">{percentage}%</Text>
    </Text>
  )
}

download.propTypes = {
  /// The URLs you want to download
  urls: PropTypes.array,
}

download.positionalArgs = ['urls']

export default download

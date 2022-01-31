Ever tried building a CLI using NodeJS?
<p class="fragment">Want it to look nice?</p>
<p class="fragment">You're familiar with React?</p>

---

![Ink](./assets/ink-logo.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Pastel](assets/pastel-logo.png)

### React-powered NodeJS CLI

---

## Demo

Note:
`cli --help`
Somewhat complex CLI; the executable accepts command-less arguments, there are two sub-commands; everything is documented
Let's take a look at the `download` command
`cli download https://google.com https://trtl.dev`
Updating percentage display

---

## ![Ink](./assets/ink-logo.png)

Ink provides React for NodeJS.

----

## Ink

```javascript
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
```

Note:
A command is a React component thanks to `Ink`
Some limitations as to which components and hooks are available: https://github.com/vadimdemedes/ink#contents
Special metadata can be supplied by setting special properties (used by Pastel)

----

## Ink

```typescript
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
```

Note:
Effects can be used as usual

---

## ![Pastel](assets/pastel-logo.png)

We used `Ink`, `PropTypes` and `mixed JS/TS` to write the commands.
<p class="fragment">But <code>Pastel</code> builds the actual software using some conventions.</p>

----

## Pastel

* Looks for commands in the `commands` directory
* Uses comments for descriptions
* Uses metadata (`propTypes`, `positionalArgs`, etc.) to define and validate arguments

----

## Pastel

```javascript
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
```

Note:
More metadata options
Comments for descriptions

----

## Pastel

```bash
yarn pastel dev
```

* Provides a globally accessible command to execute your CLI
* Provides hot reload

----

## Pastel

```bash
yarn pastel build
```

* Compiles everything to JS
* Generated output can be used to provide the CLI as NPM package

---

## Links

* [Ink](https://github.com/vadimdemedes/ink)
* [Pastel](https://github.com/vadimdemedes/pastel)

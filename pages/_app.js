import '../styles/globals.css'

import jss from 'jss'
import preset from 'jss-preset-default'

// One time setup with default plugins and settings.
jss.setup(preset())

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

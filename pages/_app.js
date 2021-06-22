import '../styles/globals.css'

import jss from 'jss'
import preset from 'jss-preset-default'
import { AppWrapper } from '../context/state'

// One time setup with default plugins and settings.
jss.setup(preset())

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>)
}

export default MyApp

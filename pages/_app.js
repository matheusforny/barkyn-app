import styles from '../styles/globals.css'
import { AppWrapper } from '../context/state'
import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Component className={styles.component} {...pageProps}/>
      </Layout>
    </AppWrapper>
  )
}

export default MyApp

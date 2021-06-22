import styles from '../styles/Home.module.css'
import { CheckoutPage } from './components/CheckoutPage'

export default function Home() {
  return (
    <div className={styles.container}>
      <CheckoutPage/>
    </div>
  )
}

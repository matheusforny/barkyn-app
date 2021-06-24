import React from 'react';
import { useAppContext } from '../../context/state';
import Link from 'next/link';
import { AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import styles from '../../styles/Layout.module.scss'

const Layout = ({children}) => {
  const {isModalOpen, setModalOpen, arrayOfSelectedProducts, removeItemFromSelectedProducts} = useAppContext();

  const handleClickOpen = () => {
    setModalOpen(false);
  }

  return (
    <div className={styles.layout}>
      <AppBar className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <div>CLOTHING STORE</div>
          <div className={styles.toolbarButtonsRow}>
            <div className={styles.itemsComponent} onClick={() => setModalOpen(true)}>
              ITEMS: &nbsp;<p>{arrayOfSelectedProducts.length}</p>
            </div>
            <Link href="/checkout">CHECKOUT</Link>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog
        open={isModalOpen}
        onClose={handleClickOpen}>
        <DialogTitle id="alert-dialog-slide-title">Your Cart</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {arrayOfSelectedProducts.length > 0 ?
            arrayOfSelectedProducts.map((product, index) =>
              <div className={styles.productEntry}>
                <div>A {product.name.toLowerCase()}, size {product.sizeSelected} and color {product.colorSelected.toLowerCase()}
                &nbsp;
                <Button color="secondary" onClick={() => removeItemFromSelectedProducts(index)}>X</Button></div>
              </div>
          ) : 'Your cart is empty!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
            Close
          </Button>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Checkout
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      {children}
    </div>
  );
}

export default Layout;
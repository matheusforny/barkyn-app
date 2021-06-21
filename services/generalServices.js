export const fetchProduct = () => {
    fetch('/api/product', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
    .then(res => res.json());
}
import mockProductsData from '../../mockData/products.json';

export default function handler(req, res) {
    res.status(200).json(mockProductsData)
  }
  
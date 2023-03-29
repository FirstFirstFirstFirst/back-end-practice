import { useCallback } from 'react';
import ShippingForm from '../components/ShippingForm';

interface Props { 
    productId: number, 
    referrer: string, 
    theme: string,
}

export default function ProductPage({ productId, referrer, theme } : Props) {
  const handleSubmit = useCallback((orderDetails: string) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url: string, data: {
    referrer: string,
    orderDetails: string,
  }) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
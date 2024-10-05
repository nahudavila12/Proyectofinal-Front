import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number; 
  onSuccess: (orderId: string) => void; 
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error('PayPal client ID is missing');
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD' }}>
      <PayPalButtons
        createOrder={async () => {
          try {
            const response = await fetch('/api/createOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount }), 
            });

            const orderData = await response.json();
            if (!response.ok) {
              throw new Error(orderData.message || 'Error creating order');
            }

            return orderData.id; 
          } catch (error) {
            console.error('Error creating order:', error);
            return ''; 
          }
        }}
        onApprove={async (data: { orderID: string }) => {
         
          try {
            const response = await fetch('/api/captureOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderID: data.orderID }),
            });

            const captureData = await response.json();
            if (!response.ok) {
              throw new Error(captureData.message || 'Error capturing order');
            }

            onSuccess(data.orderID); 
          } catch (error) {
            console.error('Error capturing order:', error);
          }
        }}
        onError={(err) => {
          console.error('PayPal Buttons error:', err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

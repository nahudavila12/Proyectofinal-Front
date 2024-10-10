import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number; 
  paymentUuid: string; // Agrega paymentUuid como propiedad
  onSuccess: (orderId: string) => void; 
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, paymentUuid, onSuccess }) => {
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
            const response = await fetch(`http://localhost:3000/payments/create-order/${paymentUuid}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ currency: 'USD', amount }), // Envía la cantidad y la moneda
            });

            const orderData = await response.json();
            if (!response.ok) {
              throw new Error(orderData.message || 'Error creating order');
            }

            return orderData.id; // Retorna el ID del pedido
          } catch (error) {
            console.error('Error creating order:', error);
            return ''; // Retorna una cadena vacía en caso de error
          }
        }}
        onApprove={async (data: { orderID: string }) => {
          try {
            const response = await fetch(`http://localhost:3000/payments/capture-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderID: data.orderID, paymentUuid }), // Envia el ID del pedido y el UUID del pago
            });

            const captureData = await response.json();
            if (!response.ok) {
              throw new Error(captureData.message || 'Error capturing order');
            }

            onSuccess(data.orderID); // Llama a la función de éxito
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
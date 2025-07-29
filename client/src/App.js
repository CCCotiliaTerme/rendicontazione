import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = "http://localhost:3001";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(API + "/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Lista Ordini</h1>
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order.id} className="p-4 border rounded bg-white shadow">
            <div><strong>ID:</strong> {order.id}</div>
            <div><strong>Totale:</strong> € {order.total}</div>
            <a
              href={`${API}/orders/${order.id}/print`}
              target="_blank"
              className="text-blue-600 underline mt-2 inline-block"
              rel="noreferrer"
            >
              Stampa PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

'use client'

import { useEffect, useState } from 'react';

export default function Message() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Hello from Next.js!</h1>
      <p>{message}</p>
    </div>
  );
}
import React, { useState } from 'react';

function FaceIDLogin({ onLogin }) {
  const [message, setMessage] = useState('');

  const handleFaceID = async () => {
    if (!window.PublicKeyCredential) {
      setMessage('Face ID/WebAuthn not supported on this browser.');
      return;
    }
    try {
      // This is a placeholder for actual WebAuthn registration/authentication
      // In production, you need to implement server-side WebAuthn challenge/response
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([/* random bytes */]),
          timeout: 60000,
          userVerification: 'required',
        }
      });
      if (credential) {
        setMessage('Face ID authentication successful!');
        onLogin && onLogin();
      } else {
        setMessage('Face ID authentication failed.');
      }
    } catch (err) {
      setMessage('Face ID error: ' + err.message);
    }
  };

  return (
    <div>
      <button onClick={handleFaceID}>Login with Face ID</button>
      <div>{message}</div>
    </div>
  );
}

export default FaceIDLogin;

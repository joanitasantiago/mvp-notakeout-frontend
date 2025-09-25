import { useState } from 'react';
import Alert from '../components/Alert';

function useAlert(defaultDuration = 3000) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');

  const showAlert = (msg, alertType = 'info') => {
    setMessage(msg);
    setType(alertType);
  };

  const alert = message ? (
    <Alert
      message={message}
      type={type}
      duration={defaultDuration}
      onClose={() => setMessage('')}
    />
  ) : null;

  return { alert, showAlert };
}

export default useAlert;
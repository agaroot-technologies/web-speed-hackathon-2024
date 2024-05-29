import ReactDOM from 'react-dom/client';

import { AdminApp } from '@wsh-2024/admin/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();

  ReactDOM.createRoot(document.getElementById('root')!).render(<AdminApp />);
};

main().catch(console.error);

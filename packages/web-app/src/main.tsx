import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@styles/global.less';
import App from '@App';
import 'virtual:uno.css';
import { AppProvider } from '@providers/app.providers';

// eslint-disable-next-line react-refresh/only-export-components
const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(<Main />);

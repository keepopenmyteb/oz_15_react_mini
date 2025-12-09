import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.scss';
import App from './App.jsx';
import { SupabaseProvider } from './supabase'; // 추가

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider>  {/* 여기서 Provider로 감싸기 */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SupabaseProvider>
  </StrictMode>,
);


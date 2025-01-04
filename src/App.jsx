import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import { Toaster } from 'sonner'
import { forceChakraDarkTheme } from './utils/utils';

import Nav from './components/navs/DocsNavs/Nav';
import Sidebar from './components/navs/DocsNavs/Sidebar';
import LandingPage from './pages/LandingPage'
import CategoryPage from './pages/CategoryPage'

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/:category/:subcategory" element={
          <div className='app-container'>
            <Nav />

            <div className='category-wrapper'>
              <Sidebar />
              <CategoryPage />
            </div>

            <Toaster toastOptions={{ style: { fontSize: '12px', borderRadius: '0.75rem', border: '1px solid #222', color: '#fff', backgroundColor: '#060606' } }} position='bottom-right' visibleToasts={1} />
          </div>
        } />
      </Routes>
    </Router>
  )
}
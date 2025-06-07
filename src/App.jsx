import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { SearchProvider } from './components/context/SearchContext/SearchContext';
import { LanguageProvider } from './components/context/LanguageContext/LanguageContext'
import { useEffect } from 'react';
import { Toaster } from 'sonner'
import { forceChakraDarkTheme } from './utils/utils';
import { toastStyles } from './utils/customTheme';

import DisplayHeader from './components/landing/DisplayHeader/DisplayHeader';
import Header from './components/navs/Header';
import Sidebar from './components/navs/Sidebar';
import LandingPage from './pages/LandingPage'
import CategoryPage from './pages/CategoryPage'
import ShowcasePage from './pages/ShowcasePage';

function AppContent() {
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/showcase') return 'showcase';
    return null; // For category pages or other routes
  };

  const isCategoryPage = location.pathname.match(/^\/[^/]+\/[^/]+$/);

  return (
    <>
      {!isCategoryPage && <DisplayHeader activeItem={getActiveItem()} />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/showcase" element={<ShowcasePage />} />
        <Route path="/:category/:subcategory" element={
          <SearchProvider>
            <LanguageProvider>
              <main className='app-container'>
                <Header />
                <section className='category-wrapper'>
                  <Sidebar />
                  <CategoryPage />
                </section>
                <Toaster
                  toastOptions={toastStyles}
                  position='bottom-right'
                  visibleToasts={1}
                />
              </main>
            </LanguageProvider>
          </SearchProvider>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

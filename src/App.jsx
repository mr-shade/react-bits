import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { SearchProvider } from './components/context/SearchContext/SearchContext';
import { OptionsProvider } from './components/context/OptionsContext/OptionsContext';
import { TransitionProvider } from './components/context/TransitionContext/TransitionContext';
import { useEffect } from 'react';
import { ActiveRouteProvider } from './components/context/ActiveRouteContext/ActiveRouteContext';
import { InstallationProvider } from './components/context/InstallationContext/InstallationContext';
import { Toaster } from 'sonner';
import { forceChakraDarkTheme } from './utils/utils';
import { toastStyles } from './utils/customTheme';

import DisplayHeader from './components/landing/DisplayHeader/DisplayHeader';
import Header from './components/navs/Header';
import Sidebar from './components/navs/Sidebar';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import Announcement from './components/common/Misc/Announcement';

function AppContent() {
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/showcase') return 'showcase';
    return null;
  };

  const isCategoryPage = location.pathname.match(/^\/[^/]+\/[^/]+$/);

  return (
    <>
      {!isCategoryPage && <DisplayHeader activeItem={getActiveItem()} />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/showcase" element={<ShowcasePage />} />
        <Route
          path="/:category/:subcategory"
          element={
            <SearchProvider>
              <OptionsProvider>
                <TransitionProvider>
                  <InstallationProvider>
                    <main className="app-container">
                      <Announcement />
                      <Header />
                      <section className="category-wrapper">
                        <Sidebar />
                        <CategoryPage />
                      </section>
                      <Toaster toastOptions={toastStyles} position="bottom-right" visibleToasts={1} />
                    </main>
                  </InstallationProvider>
                </TransitionProvider>
              </OptionsProvider>
            </SearchProvider>
          }
        />
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
      <ActiveRouteProvider>
        <AppContent />
      </ActiveRouteProvider>
    </Router>
  );
}

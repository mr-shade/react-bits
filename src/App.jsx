import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CategoryPage from './pages/CategoryPage'
import LandingPage from './pages/LandingPage'
import { useEffect } from 'react';
import { forceChakraDarkTheme } from './utils/utils';
import Nav from './components/navs/DocsNavs/Nav';
import Sidebar from './components/navs/DocsNavs/Sidebar';

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
          </div>
        } />
      </Routes>
    </Router>
  )
}
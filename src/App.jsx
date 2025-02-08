import { Route, Routes, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import Layout from './Layout';
import Home from './pages/Home';
import LibraryCatigory from './pages/LibraryCatigory';
import Login from './pages/Login';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import ShablonManba from './pages/Shablon';
import Shablon from './pages/Shablon';
import LibraryCategoryDetail from './pages/LibraryCatigoryDeteyl';
import CardDeteil from './pages/CardDeteil';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollTutop';
import NewsDetail from './pages/NewsDetail';
import Search from './pages/Search';
import './App.css';
import './style/index.scss';

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const parsedToken = JSON.parse(token);
      if (parsedToken.expiry > new Date().getTime()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Agar autentifikatsiya bo'lgan bo'lsa, foydalanuvchini "/" ga yo'naltiradi */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/news" Component={News} />
          <Route path="/news/:id" Component={News} />
          <Route path="/library-categories/" Component={LibraryCatigory} />
          <Route path="/libraryDetail/:id" Component={LibraryCategoryDetail} />
          <Route path="/cardDetail/:id" Component={CardDeteil} />
          <Route path="/sources/:type/:id" Component={Shablon} />
          <Route path="/news/newsDetail/:id" Component={NewsDetail} />
          <Route path="/aboutus" Component={AboutUs} />
          <Route path="/search" Component={Search} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;

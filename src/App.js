import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Results from './components/Results';
import Tools from './components/Tools';
import Contact from './components/Contact';
import SimpleLogin from './admin/SimpleLogin';
import SimpleProtectedRoute from './admin/SimpleProtectedRoute';
import { AuthProvider } from './contexts/SimpleAuthContext';
import AdminLayout from './admin/AdminLayout';
import AdminServicesPage from './admin/components/AdminServicesPage';
import AdminHomeContentPage from './admin/components/AdminHomeContentPage';
import AdminAboutContentPage from './admin/components/AdminAboutContentPage';
import AdminProjectsPage from './admin/components/AdminProjectsPage';
import AdminResultsPage from './admin/components/AdminResultsPage';
import AdminToolsPage from './admin/components/AdminToolsPage';


const theme = createTheme({
  typography: {
    fontFamily: '"SAFIRA MARCH", "Didact Gothic"',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

// Portfolio Component (your main website)
const Portfolio = () => (
  <div className="App">
    <Navbar />
    <main>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="results">
        <Results />
      </section>
      <section id="tools">
        <Tools />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Main Portfolio Route */}
            <Route path="/" element={<Portfolio />} />
            
            {/* Admin Authentication Routes */}
            <Route path="/admin/login" element={<SimpleLogin />} />
            
            {/* Protected Admin Dashboard Routes */}
            <Route 
              path="/admin"
              element={
                <SimpleProtectedRoute>
                  <AdminLayout />
                </SimpleProtectedRoute>
              }
            >
              <Route index element={<AdminHomeContentPage />} />
              <Route path="home-content" element={<AdminHomeContentPage />} />
              <Route path="about-content" element={<AdminAboutContentPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="results" element={<AdminResultsPage />} />
              <Route path="tools" element={<AdminToolsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

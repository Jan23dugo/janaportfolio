import React from 'react';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;

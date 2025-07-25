import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import AdminHeader from './components/AdminHeader';
import HomeContentEditor from './components/HomeContentEditor';
import AboutContentEditor from './components/AboutContentEditor';
import ServicesEditor from './components/ServicesEditor';
import { createClient } from '@supabase/supabase-js';

const AdminDashboard = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const initializeSupabase = () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase configuration missing');
        return;
      }
      
      const client = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(client);
    };

    initializeSupabase();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!supabase) return;

      try {
        // Fetch home content
        const { data: homeData, error: homeError } = await supabase
          .from('home_content')
          .select('*')
          .single();

        if (homeError) throw homeError;
        setHomeContent(homeData);

        // Fetch about content
        const { data: aboutData, error: aboutError } = await supabase
          .from('about_content')
          .select('*')
          .single();

        if (aboutError) throw aboutError;
        setAboutContent(aboutData);

      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [supabase]);

  const handleHomeUpdate = async (updatedContent) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };

    try {
      const { data, error } = await supabase
        .from('home_content')
        .update(updatedContent)
        .eq('id', 1)
        .select()
        .single();

      if (error) throw error;

      setHomeContent(data);
      return { success: true };
    } catch (error) {
      console.error('Error updating home content:', error);
      return { success: false, error: error.message };
    }
  };

  const handleAboutUpdate = async (updatedContent) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };

    try {
      const { data, error } = await supabase
        .from('about_content')
        .update(updatedContent)
        .eq('id', 1)
        .select()
        .single();

      if (error) throw error;

      setAboutContent(data);
      return { success: true };
    } catch (error) {
      console.error('Error updating about content:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <AdminHeader />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <HomeContentEditor
              content={homeContent}
              onUpdate={handleHomeUpdate}
            />
          </Grid>
          
          <Grid item xs={12}>
            <AboutContentEditor
              content={aboutContent}
              onUpdate={handleAboutUpdate}
            />
          </Grid>

          <Grid item xs={12}>
            <ServicesEditor />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 
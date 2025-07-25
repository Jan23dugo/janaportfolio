// This component is responsible for: Connecitng to Supabase, Fetching data from the Supabase, and Passing the 
// fetched data to the HomeContentEditor component.

import React, { useState, useEffect } from 'react';
import HomeContentEditor from './HomeContentEditor';
import { createClient } from '@supabase/supabase-js';

const AdminHomeContentPage = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing');
      return;
    }
    setSupabase(createClient(supabaseUrl, supabaseAnonKey));
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('*')
          .single();
        if (error) throw error;
        setHomeContent(data);
      } catch (error) {
        console.error('Error fetching home content:', error);
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

  return (
    <HomeContentEditor
      content={homeContent}
      onUpdate={handleHomeUpdate}
    />
  );
};

export default AdminHomeContentPage; 
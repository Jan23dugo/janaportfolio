// This component is responsible for: Connecting to Supabase, Fetching data from Supabase, and Passing the 
// fetched data to the ServicesEditor component.

import React, { useState, useEffect } from 'react';
import ServicesEditor from './ServicesEditor';
import { createClient } from '@supabase/supabase-js';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing');
      return;
    }
    const client = createClient(supabaseUrl, supabaseAnonKey);
    setSupabase(client);
  }, []);

  const fetchServices = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [supabase]);

  const handleServicesUpdate = async () => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      await fetchServices();
      return { success: true };
    } catch (error) {
      console.error('Error updating services:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <ServicesEditor
      services={services}
      supabase={supabase}
      onUpdate={handleServicesUpdate}
    />
  );
};

export default AdminServicesPage; 
import React, { useState, useEffect } from 'react';
import ResultsEditor from './ResultsEditor';
import { createClient } from '@supabase/supabase-js';

const AdminResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (!supabase) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('results')
          .select('*')
          .order('display_order', { ascending: true });
        if (error) throw error;
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [supabase]);

  // CRUD Handlers
  const handleCreateResult = async (resultData) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { data, error } = await supabase
        .from('results')
        .insert([resultData])
        .select();
      if (error) throw error;
      setResults((prev) => [...prev, data[0]]);
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleUpdateResult = async (id, resultData) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { data, error } = await supabase
        .from('results')
        .update({ ...resultData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      if (error) throw error;
      setResults((prev) => prev.map((r) => (r.id === id ? data[0] : r)));
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleDeleteResult = async (id) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { error } = await supabase
        .from('results')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setResults((prev) => prev.filter((r) => r.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleReorderResults = async (resultsOrder) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const updates = resultsOrder.map((r) => ({ id: r.id, display_order: r.display_order }));
      const { error } = await supabase
        .from('results')
        .upsert(updates, { onConflict: 'id' });
      if (error) throw error;
      // Refetch results
      const { data } = await supabase
        .from('results')
        .select('*')
        .order('display_order', { ascending: true });
      setResults(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Image upload handler
  const handleImageUpload = async (file) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error } = await supabase.storage
        .from('results-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      if (error) throw error;
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/results-images/${fileName}`;
      return { success: true, fileName, publicUrl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ResultsEditor
      results={results}
      onCreate={handleCreateResult}
      onUpdate={handleUpdateResult}
      onDelete={handleDeleteResult}
      onReorder={handleReorderResults}
      onImageUpload={handleImageUpload}
    />
  );
};

export default AdminResultsPage; 
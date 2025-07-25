//This file is for the connection for supabase for the Tools Editor.js 
import React, { useState, useEffect } from 'react';
import ToolsEditor from './ToolsEditor';
import { createClient } from '@supabase/supabase-js';

const AdminToolsPage = () => {
  const [tools, setTools] = useState([]);
  const [supabase, setSupabase] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchTools = async () => {
      if (!supabase) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tools')
          .select('*')
          .order('sort_order', { ascending: true });
        if (error) throw error;
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
      setLoading(false);
    };
    fetchTools();
  }, [supabase]);

  const handleAdd = async (tool) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { data, error } = await supabase
        .from('tools')
        .insert([tool])
        .select();
      if (error) throw error;
      setTools([...tools, data[0]]);
      return { success: true };
    } catch (error) {
      console.error('Error adding tool:', error);
      return { success: false, error: error.message };
    }
  };

  const handleUpdate = async (id, tool) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { data, error } = await supabase
        .from('tools')
        .update(tool)
        .eq('id', id)
        .select();
      if (error) throw error;
      setTools(tools.map(t => t.id === id ? data[0] : t));
      return { success: true };
    } catch (error) {
      console.error('Error updating tool:', error);
      return { success: false, error: error.message };
    }
  };

  const handleDelete = async (id) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    if (!window.confirm('Delete this tool?')) return { success: false };
    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setTools(tools.filter(t => t.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting tool:', error);
      return { success: false, error: error.message };
    }
  };

  const handleUploadIcon = async (file) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('tool-icons')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      if (error) throw error;
      return { success: true, fileName };
    } catch (error) {
      console.error('Error uploading icon:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <ToolsEditor
      tools={tools}
      loading={loading}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onUploadIcon={handleUploadIcon}
    />
  );
};

export default AdminToolsPage; 
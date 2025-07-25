//This file is for the connection for supabase for the About Content Editor.js 
import React, { useState, useEffect } from 'react';
import AboutContentEditor from './AboutContentEditor';
import { createClient } from '@supabase/supabase-js';

const AdminAboutContentPage = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [supabase, setSupabase] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
        const singleRow = await supabase
          .from('about_content')
          .select('*')
          .eq('id', 1)
          .single();
        if (singleRow.error) throw singleRow.error;
        setAboutContent(singleRow.data);
        // Set preview if profile_image exists
        if (singleRow.data && singleRow.data.profile_image) {
          const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
          setImagePreview(`${supabaseUrl}/storage/v1/object/public/about-images/${singleRow.data.profile_image}`);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };
    fetchContent();
  }, [supabase]);

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
      // Update preview if profile_image changed
      if (data && data.profile_image) {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        setImagePreview(`${supabaseUrl}/storage/v1/object/public/about-images/${data.profile_image}`);
      }
      return { success: true };
    } catch (error) {
      console.error('Error updating about content:', error);
      return { success: false, error: error.message };
    }
  };

  // Image upload handler for AboutContentEditor
  const handleImageUpload = async (file) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('about-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      if (error) throw error;
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/about-images/${fileName}`;
      setImagePreview(publicUrl);
      return { success: true, fileName, publicUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error.message };
    }
  };

  if (!aboutContent) return <div>Loading...</div>;

  return (
    <AboutContentEditor
      content={aboutContent}
      onUpdate={handleAboutUpdate}
      onImageUpload={handleImageUpload}
      imagePreview={imagePreview}
    />
  );
};

export default AdminAboutContentPage; 
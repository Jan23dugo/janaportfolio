import React, { useState, useEffect } from 'react';
import ProjectsEditor from './ProjectsEditor';
import { createClient } from '@supabase/supabase-js';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
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
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        if (projectsError) throw projectsError;
        
        console.log('Fetched projects data:', projectsData);
        setProjects(projectsData);

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('project_categories')
          .select('*')
          .eq('is_active', true)
          .order('name', { ascending: true });
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching projects/categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [supabase]);

  // CRUD Handlers
  const handleCreateProject = async (projectData) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      console.log('Creating project with data:', projectData);
      
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select();
      
      if (error) throw error;
      
      console.log('Create result:', data);
      
      if (!data || data.length === 0) {
        throw new Error('No data returned from create operation');
      }
      
      const newProject = data[0];
      setProjects((prev) => [...prev, newProject]);
      return { success: true, data: newProject };
    } catch (error) {
      console.error('Create error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleUpdateProject = async (id, projectData) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      console.log('Updating project with id:', id, 'data:', projectData);
      console.log('ID type:', typeof id, 'ID value:', id);
      
      // Check authentication state
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      console.log('User authenticated:', !!user);
      
      // First, let's check if the project exists
      const { data: existingProject, error: checkError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id);
      
      console.log('Existing project check:', existingProject);
      if (checkError) {
        console.error('Error checking existing project:', checkError);
        throw checkError;
      }
      
      if (!existingProject || existingProject.length === 0) {
        throw new Error(`No project found with id ${id}. Available projects: ${projects.map(p => p.id).join(', ')}`);
      }
      
      // Now perform the update
      console.log('About to update project with:', projectData);
      
      // Add updated_at timestamp
      const updateData = {
        ...projectData,
        updated_at: new Date().toISOString()
      };
      
      console.log('Final update data:', updateData);
      
      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Update result:', data);
      
      // Check if we got data back
      if (!data || data.length === 0) {
        throw new Error(`Update operation returned no data for id ${id}`);
      }
      
      if (data.length > 1) {
        throw new Error(`Multiple projects found with id ${id}`);
      }
      
      const updatedProject = data[0];
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
      return { success: true, data: updatedProject };
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleDeleteProject = async (id) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleReorderProjects = async (projectsOrder) => {
    if (!supabase) return { success: false, error: 'Supabase client not initialized' };
    try {
      // projectsOrder: [{id, display_order}]
      const updates = projectsOrder.map((p) => ({ id: p.id, display_order: p.display_order }));
      const { error } = await supabase
        .from('projects')
        .upsert(updates, { onConflict: 'id' });
      if (error) throw error;
      // Refetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      setProjects(projectsData);
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
        .from('project-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      if (error) throw error;
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/project-images/${fileName}`;
      return { success: true, fileName, publicUrl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProjectsEditor
      projects={projects}
      categories={categories}
      onCreate={handleCreateProject}
      onUpdate={handleUpdateProject}
      onDelete={handleDeleteProject}
      onReorder={handleReorderProjects}
      onImageUpload={handleImageUpload}
    />
  );
};

export default AdminProjectsPage; 
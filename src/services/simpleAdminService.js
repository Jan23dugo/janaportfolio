import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

class SimpleAdminService {
  constructor() {
    this.isLoggedIn = false;
    this.adminData = null;
    this.init();
  }

  // Initialize admin session from localStorage
  init() {
    const savedSession = localStorage.getItem('admin_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (this.isValidSession(session)) {
          this.isLoggedIn = true;
          this.adminData = session;
        } else {
          this.clearSession();
        }
      } catch (error) {
        console.error('Invalid admin session data');
        this.clearSession();
      }
    }
  }

  // Check if session is valid (not expired)
  isValidSession(session) {
    if (!session || !session.loginTime) return false;
    
    const now = new Date().getTime();
    const loginTime = new Date(session.loginTime).getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    return (now - loginTime) < sessionDuration;
  }

  // Simple login with username and password
  async login(username, password) {
    if (!supabase) {
      throw new Error('Database not configured');
    }

    try {
      // Get admin user from database
      const { data: adminUser, error } = await supabase
        .from('admin_auth')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !adminUser) {
        return { success: false, error: 'Invalid username or password' };
      }

      // For now, we'll do simple password comparison
      // In production, you should hash the password and compare hashes
      const isValidPassword = await this.verifyPassword(password, adminUser.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Create session
      const sessionData = {
        username: adminUser.username,
        loginTime: new Date().toISOString(),
        id: adminUser.id
      };

      // Save session
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
      this.isLoggedIn = true;
      this.adminData = sessionData;

      // Update last login in database
      await supabase.rpc('update_admin_last_login', { 
        admin_username: username 
      });

      return { success: true, user: sessionData };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  // Verify password (for now, simple comparison - in production use bcrypt on server)
  async verifyPassword(plainPassword, hashedPassword) {
    // For development, if hash starts with 'plain:', it's a plain text password
    if (hashedPassword.startsWith('plain:')) {
      return plainPassword === hashedPassword.replace('plain:', '');
    }
    
    // For production with bcrypt, this would need to be verified on the server side
    // For now, we'll return false for bcrypt hashes since we can't verify them in the browser
    if (hashedPassword.startsWith('$2b$') || hashedPassword.startsWith('$2a$')) {
      console.warn('Bcrypt password detected - verification should be done on server side');
      return false;
    }
    
    // Direct comparison for other cases
    return plainPassword === hashedPassword;
  }

  // Logout
  logout() {
    this.clearSession();
    return { success: true };
  }

  // Clear session
  clearSession() {
    localStorage.removeItem('admin_session');
    this.isLoggedIn = false;
    this.adminData = null;
  }

  // Check if user is currently logged in
  isAuthenticated() {
    return this.isLoggedIn && this.adminData && this.isValidSession(this.adminData);
  }

  // Get current admin data
  getCurrentAdmin() {
    return this.isAuthenticated() ? this.adminData : null;
  }

  // Home content management
  async getHomeContent() {
    if (!supabase) {
      throw new Error('Database not configured');
    }

    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('home_content')
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching home content:', error);
      throw error;
    }
  }

  async updateHomeContent(updates) {
    if (!supabase) {
      throw new Error('Database not configured');
    }

    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('home_content')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1) // Assuming single row with id 1
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating home content:', error);
      throw error;
    }
  }

  // Analytics management
  async getAnalytics() {
    if (!supabase) {
      throw new Error('Database not configured');
    }

    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('home_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(30); // Last 30 days

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  async recordVisit() {
    if (!supabase) {
      return; // Silently fail if database not configured
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      await supabase.rpc('increment_visit_count', { 
        visit_date: today 
      });

    } catch (error) {
      console.error('Error recording visit:', error);
      // Don't throw as this shouldn't break the user experience
    }
  }

  // Change admin password
  async changePassword(currentPassword, newPassword) {
    if (!supabase) {
      throw new Error('Database not configured');
    }

    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      // Get current admin user
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_auth')
        .select('*')
        .eq('username', this.adminData.username)
        .single();

      if (fetchError || !adminUser) {
        throw new Error('Admin user not found');
      }

      // Verify current password
      const isValidPassword = await this.verifyPassword(currentPassword, adminUser.password_hash);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // For development, use plain text format
      // In production, you would hash this on the server side
      const hashedNewPassword = `plain:${newPassword}`;

      // Update password
      const { error: updateError } = await supabase
        .from('admin_auth')
        .update({ 
          password_hash: hashedNewPassword,
          updated_at: new Date().toISOString()
        })
        .eq('username', this.adminData.username);

      if (updateError) {
        throw updateError;
      }

      return { success: true };

    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}

const simpleAdminService = new SimpleAdminService();
export default simpleAdminService; 
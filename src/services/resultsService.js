const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ResultsService {
  // Get all active results (public)
  async getResults() {
    try {
      const response = await fetch(`${API_BASE_URL}/results`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  }

  // Get all results (admin - including inactive)
  async getAdminResults() {
    try {
      const response = await fetch(`${API_BASE_URL}/results/admin`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching admin results:', error);
      throw error;
    }
  }

  // Create new result
  async createResult(resultData) {
    try {
      const response = await fetch(`${API_BASE_URL}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating result:', error);
      throw error;
    }
  }

  // Update result
  async updateResult(id, resultData) {
    try {
      const response = await fetch(`${API_BASE_URL}/results/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating result:', error);
      throw error;
    }
  }

  // Delete result
  async deleteResult(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/results/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting result:', error);
      throw error;
    }
  }

  // Reorder results
  async reorderResults(results) {
    try {
      const response = await fetch(`${API_BASE_URL}/results/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error reordering results:', error);
      throw error;
    }
  }

  // Upload result image
  async uploadImage(file) {
    try {
      // Convert file to base64
      const base64 = await this.fileToBase64(file);
      
      const response = await fetch(`${API_BASE_URL}/results/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileData: base64.split(',')[1], // Remove data:image/...;base64, prefix
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Delete result image
  async deleteImage(fileName) {
    try {
      const response = await fetch(`${API_BASE_URL}/results/image/${fileName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Helper method to convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

export default new ResultsService(); 
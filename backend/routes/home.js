const express = require('express')
const router = express.Router()
const supabase = require('../supabaseClient')
const { authenticateToken } = require('../middleware/auth')

// GET home page data
router.get('/', async (req, res) => {
  try {
    console.log('Fetching home content from Supabase...')
    
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }
    
    console.log('Home content fetched successfully:', data)
    res.json(data)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// UPDATE home page data (for future content management)
router.put('/', async (req, res) => {
  try {
    const { quote, name, title, background_image } = req.body
    
    const { data, error } = await supabase
      .from('home_content')
      .update({
        quote,
        name,
        title,
        background_image,
        updated_at: new Date()
      })
      .eq('id', 1)
      .select()
    
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    res.json(data[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET visitor analytics (for future use)
router.get('/analytics', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('home_analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)
    
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST visitor count (track page visits)
router.post('/visit', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    // Check if entry exists for today
    const { data: existingData, error: selectError } = await supabase
      .from('home_analytics')
      .select('*')
      .eq('date', today)
      .single()
    
    if (selectError && selectError.code !== 'PGRST116') {
      return res.status(500).json({ error: selectError.message })
    }
    
    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from('home_analytics')
        .update({ visit_count: existingData.visit_count + 1 })
        .eq('date', today)
        .select()
      
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      
      res.json(data[0])
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('home_analytics')
        .insert({ date: today, visit_count: 1 })
        .select()
      
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      
      res.json(data[0])
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get about content
router.get('/about-content', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
});

// Update about content
router.put('/about-content', authenticateToken, async (req, res) => {
  try {
    const {
      headline,
      subheadline,
      profile_image,
      honest_title,
      honest_text_1,
      honest_text_2,
      honest_text_3
    } = req.body;

    const { data, error } = await supabase
      .from('about_content')
      .update({
        headline,
        subheadline,
        profile_image,
        honest_title,
        honest_text_1,
        honest_text_2,
        honest_text_3,
        updated_at: new Date()
      })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Failed to update about content' });
  }
});

module.exports = router 
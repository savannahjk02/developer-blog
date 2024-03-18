const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogId = req.params.id; // Retrieve the blog ID from request parameters
    const blogData = await Blog.destroy({
      where: {
        id: blogId,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: blogId,
          user_id: req.session.user_id,
        },
      },
    );

    if (!updatedBlog[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
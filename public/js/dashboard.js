document.addEventListener('DOMContentLoaded', () => {
  const newBlogForm = document.querySelector('.new-blog-form');

  // Event listener for submitting the new blog form
  if (newBlogForm) {
    newBlogForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.querySelector('#blog-title').value.trim();
      const content = document.querySelector('#blog-content').value.trim();

      if (title && content) {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create new blog');
        }
      }
    });
  }

  // Event listener for deleting a blog post
  const deleteButtons = document.querySelectorAll('.btn-danger');
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete blog');
        }
      });
    });
  }
});
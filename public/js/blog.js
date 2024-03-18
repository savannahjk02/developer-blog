// Select the comment form
const commentForm = document.getElementById('comment-form');

// Add event listener to the comment form
commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(commentForm);
  const commentText = formData.get('comment');

  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text: commentText }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }

    // Reload the page to see the newly added comment
    location.reload();
  } catch (error) {
    console.error(error);
    // Handle error here
  }
});

// Select all update comment forms
const updateCommentForms = document.querySelectorAll('.update-comment-form');

// Add event listener to each update comment form
updateCommentForms.forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentId = form.dataset.commentId;
    const commentText = form.querySelector('.update-comment-textarea').value;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ text: commentText }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      // Reload the page to see the updated comment
      location.reload();
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  });
});
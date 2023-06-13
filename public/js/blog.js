const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("create form");
  const postHeader = document.querySelector('#postHeader').value.trim();
  const postText = document.querySelector('#postText').value.trim();

  if (postHeader && postText) {
    const response = await fetch('/newPost', {
      method: 'POST',
      body: JSON.stringify({ postHeader, postText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const newPostForm = document.querySelector('.new-post-form');
  newPostForm.addEventListener('submit', newFormHandler);
});

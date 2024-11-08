import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const postsContainer = document.getElementById('postsContainer');

    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
    });

    submitPostBtn.addEventListener('click', async () => {
        const title = document.getElementById('postTitle').value;
        const author = document.getElementById('postAuthor').value;
        const body = quill.root.innerHTML;

        if (title && author && body) {
            await backend.addPost(title, author, body);
            loadPosts();
            newPostForm.style.display = 'none';
        } else {
            alert('Please fill in all fields');
        }
    });

    async function loadPosts() {
        postsContainer.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
        const posts = await backend.getPosts();
        postsContainer.innerHTML = posts.map(post => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by ${post.author}</h6>
                    <p class="card-text">${post.body}</p>
                </div>
            </div>
        `).join('');
    }

    loadPosts();
});

const API_URL = '/api/listings'; // adjust if using Thymeleaf: th:src="@{/api/listings}"
const listingsContainer = document.getElementById('listingsContainer');
const loadingElem = document.getElementById('loading');
const emptyStateElem = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

let allListings = [];

// Fetch data on load
window.addEventListener('DOMContentLoaded', () => {
  fetchListings();
  searchInput.addEventListener('input', filterListings);
});

async function fetchListings() {
  showLoading(true);
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error('Network response was not ok');
    allListings = await resp.json();
    renderListings(allListings);
  } catch (err) {
    console.error('Fetch error:', err);
    listingsContainer.innerHTML = `<div class="col-12 alert alert-danger">Failed to load listings.</div>`;
  } finally {
    showLoading(false);
  }
}

function renderListings(listings) {
  listingsContainer.innerHTML = '';

  if (listings.length === 0) {
    emptyStateElem.classList.remove('d-none');
    return;
  }
  emptyStateElem.classList.add('d-none');

  listings.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.company}</h6>
          <p class="card-text flex-grow-1">${item.description || ''}</p>
          <a href="${item.applyUrl}" class="btn btn-primary mt-auto" target="_blank">
            Apply Now
          </a>
        </div>
      </div>
    `;
    listingsContainer.appendChild(col);
  });
}

function filterListings() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allListings.filter((item) =>
    item.company.toLowerCase().includes(query)
  );
  renderListings(filtered);
}

function showLoading(show) {
  loadingElem.style.display = show ? 'block' : 'none';
}

// Search Functionality - Jarvis' Wallet
// Simple client-side search for static site

(function() {
  'use strict';

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchContainer = document.getElementById('search-container');
  let selectedIndex = -1;

  // Show search container when typing
  searchInput?.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      performSearch(searchInput.value.trim());
    }
  });

  // Search on input
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length >= 2) {
      performSearch(query);
    } else {
      hideResults();
    }
  });

  // Keyboard navigation
  searchInput?.addEventListener('keydown', (e) => {
    const items = searchResults?.querySelectorAll('.search-result-item');
    if (!items || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(items);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      items[selectedIndex]?.click();
    } else if (e.key === 'Escape') {
      hideResults();
      searchInput.blur();
    }
  });

  // Hide results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchContainer?.contains(e.target)) {
      hideResults();
    }
  });

  function performSearch(query) {
    if (!searchResults || !searchIndex) return;

    const results = searchIndex.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = item.category.toLowerCase().includes(query.toLowerCase());
      const excerptMatch = item.excerpt.toLowerCase().includes(query.toLowerCase());
      return titleMatch || categoryMatch || excerptMatch;
    });

    displayResults(results);
  }

  function displayResults(results) {
    if (!searchResults) return;

    searchResults.innerHTML = '';
    selectedIndex = -1;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No articles found for your search.</p>
          <p class="search-tip">Try different keywords or browse our categories.</p>
        </div>
      `;
      searchResults.style.display = 'block';
      return;
    }

    results.forEach((item, index) => {
      const resultItem = document.createElement('a');
      resultItem.href = item.url;
      resultItem.className = 'search-result-item';
      resultItem.innerHTML = `
        <div class="search-result-title">${highlightMatch(item.title, searchInput.value)}</div>
        <div class="search-result-category">${item.category}</div>
        <div class="search-result-excerpt">${truncate(item.excerpt, 80)}</div>
      `;
      resultItem.addEventListener('click', () => {
        hideResults();
        searchInput.value = '';
      });
      searchResults.appendChild(resultItem);
    });

    searchResults.style.display = 'block';
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function truncate(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function updateSelection(items) {
    items.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
    if (selectedIndex >= 0) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function hideResults() {
    searchResults && (searchResults.style.display = 'none');
    selectedIndex = -1;
  }
})();

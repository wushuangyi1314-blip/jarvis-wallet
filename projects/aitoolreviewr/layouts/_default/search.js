// Search Functionality - AI ToolSpot
// Uses Hugo's JSON index for search

(function() {
  'use strict';

  var searchData = null;

  // Load search data from Hugo's JSON index
  async function loadSearchData() {
    if (searchData) return searchData;
    try {
      var resp = await fetch('/index.json');
      if (!resp.ok) return null;
      searchData = await resp.json();
      return searchData;
    } catch (e) {
      return null;
    }
  }

  // DOM Elements
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var heroInput = document.getElementById('hero-search-input');
  var pageInput = document.getElementById('search-page-input');
  var selectedIndex = -1;
  var activeResults = null;

  // Perform search
  function performSearch(query) {
    if (!searchData) return [];
    query = query.toLowerCase();
    return searchData.filter(function(item) {
      return (item.title && item.title.toLowerCase().indexOf(query) !== -1) ||
             (item.description && item.description.toLowerCase().indexOf(query) !== -1) ||
             (item.categories && item.categories.some(function(c){ return c.toLowerCase().indexOf(query) !== -1; }));
    }).slice(0, 8);
  }

  // Display results
  function displayResults(results, container) {
    if (!container) return;
    container.innerHTML = '';
    selectedIndex = -1;
    activeResults = results;

    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results"><p>No results found.</p></div>';
      container.style.display = 'block';
      return;
    }

    results.forEach(function(item, index) {
      var a = document.createElement('a');
      a.href = item.permalink || item.url;
      a.className = 'search-result-item' + (index === 0 ? ' selected' : '');
      a.innerHTML = '<div class="search-result-title">' + item.title + '</div>' +
        '<div class="search-result-category">' + (item.categories && item.categories[0] || '') + '</div>' +
        '<div class="search-result-excerpt">' + (item.description || '') + '</div>';
      a.addEventListener('click', function() {
        container.style.display = 'none';
        if (searchInput) searchInput.value = '';
      });
      container.appendChild(a);
    });

    container.style.display = 'block';
  }

  // Main search input (header)
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      if (searchInput.value.trim()) {
        loadSearchData().then(function() {
          displayResults(performSearch(searchInput.value.trim()), searchResults);
        });
      }
    });

    searchInput.addEventListener('input', function(e) {
      var q = e.target.value.trim();
      if (q.length >= 2) {
        loadSearchData().then(function() {
          displayResults(performSearch(q), searchResults);
        });
      } else {
        if (searchResults) searchResults.style.display = 'none';
      }
    });

    searchInput.addEventListener('keydown', function(e) {
      var items = searchResults ? searchResults.querySelectorAll('.search-result-item') : [];
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        items.forEach(function(it, i){ it.classList.toggle('selected', i === selectedIndex); });
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        items.forEach(function(it, i){ it.classList.toggle('selected', i === selectedIndex); });
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        items[selectedIndex].click();
      } else if (e.key === 'Escape') {
        searchResults && (searchResults.style.display = 'none');
        searchInput.blur();
      }
    });
  }

  // Hero search input
  if (heroInput) {
    heroInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var q = heroInput.value.trim();
        if (q && searchInput) {
          searchInput.value = q;
          searchInput.focus();
        }
      }
    });
  }

  // Page search input
  if (pageInput) {
    pageInput.addEventListener('input', function(e) {
      var q = e.target.value.trim();
      var container = document.getElementById('search-results-container');
      if (q.length < 2) {
        if (container) container.innerHTML = '<p style="text-align:center;color:var(--text-light);">Start typing to search…</p>';
        return;
      }
      loadSearchData().then(function() {
        var results = performSearch(q);
        if (!container) return;
        if (results.length === 0) {
          container.innerHTML = '<p style="text-align:center;color:var(--text-light);">No results found.</p>';
          return;
        }
        var html = '<div style="display:grid;gap:1rem;max-width:800px;margin:0 auto;">';
        results.forEach(function(r) {
          html += '<a href="' + (r.permalink || r.url) + '" style="display:block;padding:1rem;border:1px solid var(--border);border-radius:8px;text-decoration:none;color:inherit;">';
          html += '<h3 style="margin:0 0 0.5rem;">' + r.title + '</h3>';
          html += '<p style="margin:0;color:var(--text-light);font-size:14px;">' + (r.description || '') + '</p>';
          html += '</a>';
        });
        html += '</div>';
        container.innerHTML = html;
      });
    });
  }

  // Hide on outside click
  document.addEventListener('click', function(e) {
    if (searchInput && !searchInput.contains(e.target) && searchResults && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });

  // Pre-load search data on page load
  loadSearchData();
})();

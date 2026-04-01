// Sync like button across header and bottom
(function() {
    var likeBtn = document.getElementById('likeBtn');
    var bottomLikeBtn = document.getElementById('bottomLikeBtn');
    if (likeBtn && bottomLikeBtn) {
        likeBtn.addEventListener('click', function() {
            bottomLikeBtn.classList.toggle('liked', likeBtn.classList.contains('liked'));
        });
        bottomLikeBtn.addEventListener('click', function() {
            likeBtn.classList.toggle('liked', bottomLikeBtn.classList.contains('liked'));
        });
    }

    // TOC scroll highlighting
    var tocLinks = document.querySelectorAll('.toc-item');
    if (tocLinks.length) {
        function highlightTOC() {
            var scrollY = window.scrollY + 120;
            var current = null;
            tocLinks.forEach(function(link) {
                var id = link.getAttribute('data-id') || link.getAttribute('href').replace('#', '');
                var el = document.getElementById(id);
                if (el && el.offsetTop <= scrollY) current = link;
            });
            tocLinks.forEach(function(l) { l.classList.remove('active'); });
            if (current) current.classList.add('active');
        }
        window.addEventListener('scroll', highlightTOC);
        highlightTOC();
    }

    // Auto-style pros/cons headings
    var headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4');
    headings.forEach(function(h) {
        var text = h.textContent || '';
        if (text.match(/^✅|^\u2714/i) || text.match(/pros|strength|good|right|correct/i)) {
            h.classList.add('pros-heading');
        } else if (text.match(/^❌|^\u2718/i) || text.match(/cons|limitations?|wrong|fall.*short/i)) {
            h.classList.add('cons-heading');
        }
    });
})();

// Search functionality for SNOMED International redirection page

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const docsSearchForm = document.getElementById('docs-search-form');
    const docsSearchInput = document.getElementById('docs-search-input');
    const confluenceSearchForm = document.getElementById('confluence-search-form');
    const confluenceSearchInput = document.getElementById('confluence-search-input');

    // Base URLs for the search services
    const DOCS_SEARCH_BASE_URL = 'https://docs.snomed.org/?q=';
    const CONFLUENCE_SEARCH_BASE_URL = 'https://snomed.atlassian.net/wiki/search?text=';

    /**
     * Encode search query for URL parameters
     * @param {string} query - The search query to encode
     * @returns {string} - URL encoded query
     */
    function encodeSearchQuery(query) {
        return encodeURIComponent(query.trim());
    }

    /**
     * Show loading state on button
     * @param {HTMLButtonElement} button - The button element
     * @param {boolean} isLoading - Whether to show loading state
     */
    function setButtonLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                </svg>
                Redirecting...
            `;
        } else {
            button.disabled = false;
            // Reset to original content - this will be called if there's an error
            const isDocsButton = button.closest('#docs-search-form');
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="21 21l-4.35-4.35"></path>
                </svg>
                ${isDocsButton ? 'Search Documentation' : 'Search Confluence'}
            `;
        }
    }

    /**
     * Handle search form submission
     * @param {Event} event - The form submit event
     * @param {string} baseUrl - The base URL for the search
     * @param {HTMLInputElement} input - The search input element
     */
    function handleSearchSubmit(event, baseUrl, input) {
        event.preventDefault();
        
        const query = input.value.trim();
        
        // Validate search query
        if (!query) {
            input.focus();
            return;
        }

        // Get the submit button
        const submitButton = event.target.querySelector('button[type="submit"]');
        
        // Show loading state
        setButtonLoadingState(submitButton, true);
        
        // Construct the search URL
        const searchUrl = baseUrl + encodeSearchQuery(query);
        
        // Add a small delay to show the loading state, then redirect
        setTimeout(() => {
            try {
                window.open(searchUrl, '_blank', 'noopener,noreferrer');
                
                // Reset the loading state after a short delay
                setTimeout(() => {
                    setButtonLoadingState(submitButton, false);
                }, 500);
                
            } catch (error) {
                console.error('Error opening search URL:', error);
                setButtonLoadingState(submitButton, false);
                alert('Sorry, there was an error opening the search. Please try again.');
            }
        }, 300);
    }

    // Add event listeners for the search forms
    if (docsSearchForm && docsSearchInput) {
        docsSearchForm.addEventListener('submit', function(event) {
            handleSearchSubmit(event, DOCS_SEARCH_BASE_URL, docsSearchInput);
        });

        // Add Enter key support for better UX
        docsSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                docsSearchForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    if (confluenceSearchForm && confluenceSearchInput) {
        confluenceSearchForm.addEventListener('submit', function(event) {
            handleSearchSubmit(event, CONFLUENCE_SEARCH_BASE_URL, confluenceSearchInput);
        });

        // Add Enter key support for better UX
        confluenceSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                confluenceSearchForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Add CSS animation for the loading spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);

    // Focus on the first search input when page loads
    if (docsSearchInput) {
        docsSearchInput.focus();
    }

    // Add analytics/tracking if needed (placeholder for future use)
    function trackSearchEvent(searchType, query) {
        // This could be expanded to include analytics tracking
        console.log(`Search performed: ${searchType} - Query: ${query}`);
        
        // Example: Google Analytics event tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'search', {
        //         search_term: query,
        //         search_type: searchType
        //     });
        // }
    }

    // Update the search handlers to include tracking
    const originalHandleSearchSubmit = handleSearchSubmit;
    handleSearchSubmit = function(event, baseUrl, input) {
        const query = input.value.trim();
        const searchType = baseUrl.includes('docs.snomed.org') ? 'documentation' : 'confluence';
        
        if (query) {
            trackSearchEvent(searchType, query);
        }
        
        return originalHandleSearchSubmit(event, baseUrl, input);
    };

    // Error handling for missing elements
    if (!docsSearchForm) {
        console.warn('Documentation search form not found');
    }
    if (!confluenceSearchForm) {
        console.warn('Confluence search form not found');
    }
});

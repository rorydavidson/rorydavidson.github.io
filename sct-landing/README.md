# SNOMED International - Confluence Migration Landing Page

This is a static HTML landing page designed to redirect users from the old Confluence site (https://confluence.ihtsdotools.org) to new services after migration.

## Features

- **SNOMED International Branding**: Official logo and color scheme
- **Dual Search Functionality**:
  - SNOMED CT Documentation search (redirects to https://docs.snomed.org/?q=)
  - New Confluence search (redirects to https://snomed.atlassian.net/wiki/search?text=)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Proper focus states and semantic HTML

## Files

- `index.html` - Main HTML page with structure and content
- `styles.css` - CSS styling with responsive design and SNOMED International branding
- `script.js` - JavaScript functionality for search redirections
- `README.md` - This documentation file

## Usage

1. Host these files on any web server or static hosting service
2. Configure your old Confluence URL to redirect to this landing page
3. Users can search for content using either search box:
   - **Documentation Search**: Searches official SNOMED CT documentation
   - **Confluence Search**: Searches the new Atlassian Cloud workspace

## Search URLs

The page redirects searches to:
- Documentation: `https://docs.snomed.org/?q={search_query}`
- Confluence: `https://snomed.atlassian.net/wiki/search?text={search_query}`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with graceful degradation)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

To customize the branding or URLs:
1. Update the logo URL in `index.html` if needed
2. Modify the search base URLs in `script.js`
3. Adjust colors and styling in `styles.css`

## License

© 2025 International Health Terminology Standards Development Organisation (SNOMED International). All rights reserved.

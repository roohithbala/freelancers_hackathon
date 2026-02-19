// Enable copy functionality for the application
(function() {
  'use strict';

  // Create a simple copy function
  window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
      });
    } else if (window.clipboardData && window.clipboardData.setData) {
      // Fallback for older browsers
      window.clipboardData.setData('Text', text);
      console.log('Text copied to clipboard');
    } else {
      // Final fallback - use textarea method
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        console.log('Text copied to clipboard');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      
      document.body.removeChild(textArea);
    }
  };

  // Add global copy event listener for better UX
  document.addEventListener('copy', function(e) {
    const selection = window.getSelection().toString();
    if (selection) {
      e.preventDefault();
      window.copyToClipboard(selection);
    }
  });

  console.log('Copy functionality enabled');
})();

/** Site-wide settings that are not translations. */
export const site = {
  /**
   * Public address of the site, without a trailing slash (e.g. https://aleksandar.dev).
   * Link previews and search engines need absolute URLs, so the share image, canonical and
   * language links are only written into the HTML once this is set.
   */
  url: '',
  /** Placeholder address (reserved example.com domain) until a real one is chosen; the button is hidden while this is empty. */
  contactEmail: 'kontakt@example.com',
  /** Public LinkedIn profile URL; the button is hidden while this is empty. */
  linkedinUrl: ''
}

// Central place for outbound URLs used by the side link-tree panel and the
// landing page. Swap these to real destinations as they become available —
// nothing else in the app should hardcode these strings.

// The landing page is exported into dist/landing/ alongside the app export
// (see scripts/deploy.js and .github/workflows/deploy.yml) and served under
// this sub-path of the same GitHub Pages site.
export const LANDING_URL = 'https://ryuto-ship-it.github.io/zekto-app/landing/';

// The React Native (Expo web) app itself — what the landing page's
// "Try the app" CTA and the side panel's home button both point back to.
export const APP_DEMO_URL = 'https://ryuto-ship-it.github.io/zekto-app/';

// Placeholder Google Docs link — swap for the real public whitepaper URL
// once it's published.
export const WHITEPAPER_URL = 'https://docs.google.com/document/d/PLACEHOLDER-ZEKTO-WHITEPAPER/edit';

// Neither social account exists yet — both surfaces show a "Coming soon"
// toast instead of navigating anywhere. Flip these once the accounts are live.
export const SOCIAL_LINKS = {
  x: { url: null as string | null, comingSoon: true },
  telegram: { url: null as string | null, comingSoon: true },
};

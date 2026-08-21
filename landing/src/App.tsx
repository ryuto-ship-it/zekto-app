import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { APP_DEMO_URL, WHITEPAPER_URL } from './config';
import { TOKENOMICS_ALLOCATION } from './tokenomics';

const FEATURES = [
  {
    icon: '🎫',
    title: 'Prepay, save more',
    body: "Reserve the exact clinic, stay, or table you want before you land — locked in at a discount off the walk-in price.",
  },
  {
    icon: '🪙',
    title: 'Stablecoin is the cheapest way to pay',
    body: 'Every purchase shows a card / cash / stablecoin price ladder, and stablecoin always comes out lowest.',
  },
  {
    icon: '📈',
    title: 'FuturePass Points on every purchase',
    body: 'Earn points automatically and climb from Bronze to Platinum for better earn rates and platform perks.',
  },
  {
    icon: '🧠',
    title: 'SSDA finds your best benefit',
    body: 'At checkout, our benefit engine compares every eligible coupon in your wallet and silently applies the single best one — then shows you why.',
  },
];

function Nav() {
  return (
    <nav className="nav">
      <span className="nav-logo">ZEKTO</span>
      <a className="nav-cta" href={APP_DEMO_URL}>
        Try the app
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero-blob hero-blob-a" />
      <div className="hero-blob hero-blob-b" />
      <div className="hero-blob hero-blob-c" />
      <p className="eyebrow">FUTURE PASS FOR KOREA</p>
      <h1 className="hero-title">
        Book Korea, <span className="grad-text">curated</span>
        <br />
        before you land.
      </h1>
      <p className="hero-sub">
        Reserve beauty, medical, hotel, and dining experiences ahead of your trip — locked in at a discount, and
        even cheaper when you pay with a stablecoin.
      </p>
      <a className="btn-primary" href={APP_DEMO_URL}>
        Try the app →
      </a>
    </header>
  );
}

function Intro() {
  return (
    <section className="section">
      <p className="eyebrow eyebrow-center">HOW IT WORKS</p>
      <h2 className="section-title center">One pass, the whole trip.</h2>
      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <section className="section tokenomics">
      <p className="eyebrow eyebrow-center">$ZEKTO ALLOCATION</p>
      <h2 className="section-title center">Built for long-term alignment.</h2>
      <p className="tokenomics-sub">Illustrative allocation — subject to change before token launch.</p>

      <div className="tokenomics-panel">
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TOKENOMICS_ALLOCATION}
                dataKey="value"
                nameKey="label"
                innerRadius={78}
                outerRadius={132}
                paddingAngle={2}
                stroke="none"
              >
                {TOKENOMICS_ALLOCATION.map((slice) => (
                  <Cell key={slice.key} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v}%`, String(name)] as [string, string]}
                contentStyle={{ background: '#17141F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10 }}
                itemStyle={{ color: '#F4F1FB' }}
                labelStyle={{ color: '#F4F1FB' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="legend">
          {TOKENOMICS_ALLOCATION.map((slice) => (
            <div className="legend-row" key={slice.key}>
              <span className="legend-dot" style={{ background: slice.color }} />
              <span className="legend-label">{slice.label}</span>
              <span className="legend-value">{slice.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <a className="btn-secondary" href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer">
        Read the whitepaper
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">ZEKTO</span>
      <div className="footer-badges">
        <span className="badge">🕊️ X (Twitter) — Coming soon</span>
        <span className="badge">✈️ Telegram — Coming soon</span>
      </div>
      <p className="footer-fine">© 2026 ZEKTO. All figures on this page are illustrative.</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Intro />
      <Tokenomics />
      <Footer />
    </div>
  );
}

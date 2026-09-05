import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductTour } from "@/components/landing/ProductTour";
import { platformModules, questions } from "@/content/platform";
import logo from "@/assets/logo.png";
import "@fontsource-variable/manrope";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const CalScheduler = lazy(() => import("@/components/landing/CalScheduler"));
const APP_URL = import.meta.env.VITE_APP_URL || "https://app.operlyapp.com";
const CAL_LINK = (
  import.meta.env.VITE_CALCOM_EMBED_LINK || "operly-eeqtsh/30min"
)
  .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
  .replace(/^\/+|\/+$/g, "");

function Brand() {
  return (
    <a className="v3-brand" href="#top" aria-label="Operly home">
      <span className="v3-brand-mark">
        <img src={logo} alt="" width="64" height="64" />
      </span>
      <span>Operly</span>
    </a>
  );
}

function DemoButton({
  onClick,
  children = "Book a demo",
  className = "",
}: {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`v3-button ${className}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </button>
  );
}

class CalendarBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="calendar-loading">
        The calendar could not load. Use the direct booking link below.
      </p>
    ) : (
      this.props.children
    );
  }
}

export default function NetworkLanding() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const selectedModule = platformModules[moduleIndex];

  const bookDemo = () => {
    setMenuOpen(false);
    setShowCalendar(true);
    document
      .getElementById("demo")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line > span", {
          yPercent: 105,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        });
        gsap.from(".hero-intro, .hero-actions, .hero-foot", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.4,
          ease: "power2.out",
        });
        gsap.to(".hero-photograph", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".v3-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 93%", once: true },
          });
        });
        gsap.to(".reading-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".craft-photo img",
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: ".craft-photo",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-v3" ref={root} id="top">
      <a className="v3-skip" href="#main">
        Skip to content
      </a>
      <header className="v3-header">
        <div className="v3-nav v3-container">
          <Brand />
          <nav aria-label="Main navigation" className="v3-desktop-nav">
            <a href="#platform">
              Platform <ChevronDown size={12} />
            </a>
            <a href="#network">For your network</a>
            <a href="#roadmap">What’s next</a>
          </nav>
          <div className="v3-nav-actions">
            <a className="v3-signin" href={APP_URL}>
              Sign in <ArrowUpRight size={13} />
            </a>
            <DemoButton onClick={bookDemo} />
            <button
              type="button"
              ref={menuButton}
              className="v3-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="v3-mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["#platform", "Platform"],
              ["#network", "For your network"],
              ["#roadmap", "What’s next"],
              ["#pricing", "Pricing"],
              ["#faq", "Questions"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a href={APP_URL}>
              Sign in
              <ArrowUpRight size={18} />
            </a>
          </nav>
        )}
        <div className="reading-progress" aria-hidden="true" />
      </header>

      <main id="main">
        <section className="v3-hero" aria-labelledby="hero-title">
          <div className="hero-image-wrap">
            <img
              className="hero-photograph"
              src="/images/car-wash.jpg"
              width="1200"
              height="1500"
              alt="A vehicle inside a professional car wash"
              fetchPriority="high"
            />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content v3-container">
            <p className="hero-intro v3-kicker">
              <span className="small-rule" />
              THE BRAND & REVENUE PLATFORM FOR CAR WASH NETWORKS
            </p>
            <h1 id="hero-title">
              <span className="hero-line">
                <span>One brand.</span>
              </span>
              <span className="hero-line">
                <span>
                  Every <em>location.</em>
                </span>
              </span>
            </h1>
            <div className="hero-actions">
              <p>
                A bigger vision for your car wash business.
                <br />
                Bring your network, memberships and customer
                <br className="desktop-break" /> data into one connected
                platform.
              </p>
              <div className="hero-button-row">
                <DemoButton onClick={bookDemo}>
                  Let’s build what’s next
                </DemoButton>
                <a className="v3-text-link light" href="#platform">
                  Explore the platform <ArrowDown size={16} />
                </a>
              </div>
              <span className="hero-micro">
                Built for ambitious brands. Designed to grow with you.
              </span>
            </div>
            <div className="hero-foot">
              <span>YOUR BUSINESS, SEEN AS A WHOLE.</span>
              <a href="#platform" aria-label="Scroll to explore the platform">
                <span>Scroll to discover</span>
                <ArrowDown size={18} />
              </a>
              <span className="hero-index">01 — 05</span>
            </div>
          </div>
        </section>

        <div className="v3-service-strip" aria-label="Platform areas">
          <div className="v3-container">
            <span>ONE CONNECTED VISION</span>
            <p>
              Network
              <i />
              Memberships
              <i />
              Commerce
              <i />
              Brand
              <i />
              Intelligence
            </p>
            <ArrowUpRight size={22} aria-hidden="true" />
          </div>
        </div>

        <section
          id="platform"
          className="v3-product v3-container"
          aria-labelledby="product-title"
        >
          <div className="section-heading" data-reveal>
            <p className="v3-kicker">
              <span>01 / THE PLATFORM</span>
              <span>Built to connect the whole picture.</span>
            </p>
            <div className="split-heading">
              <h2 id="product-title">
                More locations.
                <br />
                <span>One direction.</span>
              </h2>
              <p>
                Growth brings more moving parts. Operly is being built to
                connect the people, memberships and decisions behind your brand,
                from the network to the individual wash.
              </p>
            </div>
          </div>
          <ProductTour />
        </section>

        <section
          id="network"
          className="v3-craft"
          aria-labelledby="craft-title"
        >
          <div className="craft-photo">
            <img
              src="/images/automatic-car-wash.jpg"
              width="1800"
              height="1200"
              loading="lazy"
              alt="A vehicle surrounded by rotating brushes in an automated car wash"
            />
            <div className="photo-note">
              <span>A BRAND IS BUILT AT EVERY VISIT.</span>
              <span>Every location has a part to play.</span>
            </div>
          </div>
          <div className="craft-copy" data-reveal>
            <p className="v3-kicker">02 / BUILT FOR THE WHOLE NETWORK</p>
            <h2 id="craft-title">
              Think bigger.
              <br />
              Stay <em>connected.</em>
            </h2>
            <p className="craft-description">
              Your brand is more than a name above the entrance. It’s the
              experience you want to deliver, again and again, wherever a member
              pulls in.
            </p>
            <div className="craft-benefits">
              <article>
                <span>01</span>
                <div>
                  <h3>One network. The right level of access.</h3>
                  <p>
                    Give central teams the wider view and local operators the
                    access their role requires.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Memberships with a shared foundation.</h3>
                  <p>
                    Connect your plan catalog, service benefits and location
                    eligibility across your brand.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>A platform that can grow with the brand.</h3>
                  <p>
                    Brand governance, member experience and intelligence extend
                    the same foundation as the roadmap develops.
                  </p>
                </div>
              </article>
            </div>
            <button className="v3-text-link" onClick={bookDemo}>
              Talk through your network <ArrowUpRight size={19} />
            </button>
          </div>
        </section>

        <section
          id="roadmap"
          className="v3-roadmap v3-container"
          aria-labelledby="roadmap-title"
        >
          <div className="split-heading" data-reveal>
            <div>
              <p className="v3-kicker">03 / A PLATFORM WITH A LONGER VIEW</p>
              <h2 id="roadmap-title">
                Built with
                <br />
                <span>what’s next in mind.</span>
              </h2>
            </div>
            <p>
              Start with a strong foundation. Build towards a more connected
              brand, member experience and business. Explore what’s built,
              what’s in validation and what comes next.
            </p>
          </div>
          <div className="module-explorer">
            <div
              className="module-list"
              role="tablist"
              aria-label="Platform modules"
              aria-orientation="vertical"
            >
              {platformModules.map((module, index) => (
                <button
                  type="button"
                  role="tab"
                  key={module.id}
                  id={`module-tab-${index}`}
                  aria-selected={moduleIndex === index}
                  aria-controls="module-panel"
                  tabIndex={moduleIndex === index ? 0 : -1}
                  onClick={() => setModuleIndex(index)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === "ArrowDown"
                        ? (index + 1) % platformModules.length
                        : event.key === "ArrowUp"
                          ? (index + platformModules.length - 1) %
                            platformModules.length
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? platformModules.length - 1
                              : -1;
                    if (next >= 0) {
                      event.preventDefault();
                      setModuleIndex(next);
                      document.getElementById(`module-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="module-number">0{index + 1}</span>
                  <span>{module.name}</span>
                  <ArrowUpRight size={19} />
                </button>
              ))}
            </div>
            <div
              className="module-detail"
              role="tabpanel"
              id="module-panel"
              aria-labelledby={`module-tab-${moduleIndex}`}
            >
              <div key={selectedModule.id} className="module-detail-content">
                <span
                  className={`module-status ${selectedModule.status === "On the roadmap" ? "planned" : ""}`}
                >
                  <span />
                  {selectedModule.status}
                </span>
                <h3>{selectedModule.short}</h3>
                <p className="module-description">
                  {selectedModule.description}
                </p>
                <div className="module-note">
                  <p>{selectedModule.detail}</p>
                </div>
                <button className="v3-text-link" onClick={bookDemo}>
                  Discuss this with our team <ArrowUpRight size={18} />
                </button>
              </div>
              <span className="module-big-number" aria-hidden="true">
                0{moduleIndex + 1}
              </span>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="v3-pricing"
          aria-labelledby="pricing-title"
        >
          <div className="v3-container">
            <p className="v3-kicker" data-reveal>
              04 / BUILT AROUND YOUR BUSINESS
            </p>
            <div className="pricing-layout">
              <div className="pricing-copy" data-reveal>
                <h2 id="pricing-title">
                  Your network.
                  <br />
                  <em>Your next chapter.</em>
                </h2>
                <p>
                  The right rollout starts with your business.
                  <br />
                  Your locations, your systems and your priorities.
                </p>
                <ul>
                  {[
                    "Multi-location operators",
                    "Corporate car wash groups",
                    "Franchise networks",
                    "Membership-first brands",
                  ].map((feature) => (
                    <li key={feature}>
                      <Check size={15} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pricing-offer" data-reveal>
                <span className="plan-name">
                  LET’S FIND YOUR STARTING POINT
                </span>
                <h3>
                  A conversation.
                  <br />A clearer path forward.
                </h3>
                <p className="billing-detail">
                  We’ll explore your current setup, confirm module availability
                  and POS compatibility, and discuss the scope and pricing for
                  your network.
                </p>
                <DemoButton onClick={bookDemo}>
                  Talk about your network
                </DemoButton>
                <p className="offer-note">
                  30-minute conversation. No obligation.
                </p>
                <div className="offer-bottom">
                  <Check size={16} />
                  <span>
                    Built around your rollout, not a one-size-fits-all plan.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="v3-faq v3-container"
          aria-labelledby="faq-title"
        >
          <div data-reveal>
            <p className="v3-kicker">A FEW THINGS WORTH KNOWING</p>
            <h2 id="faq-title">
              Big picture.
              <br />
              <span>Clear answers.</span>
            </h2>
            <button className="v3-text-link" onClick={bookDemo}>
              Ask us something else <ArrowUpRight size={18} />
            </button>
          </div>
          <Accordion type="single" collapsible className="v3-questions">
            {questions.map(([question, answer], i) => (
              <AccordionItem
                key={question}
                value={`question-${i}`}
                className="v3-question"
              >
                <AccordionTrigger>
                  <span>{question}</span>
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="demo" className="v3-demo" aria-labelledby="demo-title">
          <div className="v3-container">
            <div className="demo-heading">
              <p className="v3-kicker">05 / LET’S MAKE THE NEXT MOVE</p>
              <h2 id="demo-title">
                Your next chapter
                <br />
                starts <em>here.</em>
              </h2>
              <div className="demo-details">
                <p>
                  Bring your vision for the network.
                  <br />
                  Let’s talk about what comes next.
                </p>
                <DemoButton
                  className="v3-button-ink"
                  onClick={() => {
                    setShowCalendar(true);
                    window.setTimeout(
                      () =>
                        document
                          .getElementById("calendar-panel")
                          ?.scrollIntoView({
                            behavior: window.matchMedia(
                              "(prefers-reduced-motion: reduce)",
                            ).matches
                              ? "instant"
                              : "smooth",
                            block: "start",
                          }),
                      0,
                    );
                  }}
                >
                  {showCalendar
                    ? "Choose a time below"
                    : "Book your 30-minute demo"}
                </DemoButton>
              </div>
            </div>
            {showCalendar && (
              <div id="calendar-panel" className="v3-calendar">
                <div className="calendar-heading">
                  <h3>Find a time that works for you.</h3>
                  <button
                    type="button"
                    className="calendar-close"
                    aria-label="Close calendar"
                    onClick={() => setShowCalendar(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <CalendarBoundary>
                  <Suspense
                    fallback={
                      <p className="calendar-loading">
                        Loading available times…
                      </p>
                    }
                  >
                    <CalScheduler />
                  </Suspense>
                </CalendarBoundary>
                <a
                  href={`https://cal.com/${CAL_LINK}`}
                  target="_blank"
                  rel="noreferrer"
                  className="calendar-fallback"
                >
                  Open the booking calendar in a separate window{" "}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="v3-footer">
        <div className="v3-container">
          <div className="footer-top">
            <Brand />
            <p>
              One brand. Every location.
              <br />
              The bigger picture, connected.
            </p>
            <div>
              <a href="#platform">Platform</a>
              <a href="#roadmap">What’s next</a>
              <a href="#pricing">Pricing</a>
              <a href={APP_URL}>
                Sign in <ArrowUpRight size={12} />
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/operlyapp"
                target="_blank"
                rel="noreferrer"
              >
                Instagram <ArrowUpRight size={12} />
              </a>
              <a href="/termos">Terms of use</a>
              <a href="/privacidade">Privacy policy</a>
            </div>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            Operly<span>.</span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Operly. All rights reserved.</span>
            <a href="#top">
              Back to top <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

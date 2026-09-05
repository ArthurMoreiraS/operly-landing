import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  MapPin,
  Network,
  RotateCcw,
  ScanSearch,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/logo.png";

gsap.registerPlugin(ScrollTrigger);
const stages = [
  {
    label: "Your network",
    short: "Connect.",
    heading: "The whole business. In context.",
    body: "Bring your locations together without losing the detail. A shared foundation for your brand, your teams and your customer data.",
    detail: "Switch between locations to explore the example network.",
    icon: Network,
  },
  {
    label: "Memberships",
    short: "Grow.",
    heading: "One member. A wider relationship.",
    body: "Connect your catalog, benefits and location eligibility. Build a membership experience that belongs to your brand.",
    detail: "Choose a membership to see its benefits and access.",
    icon: CreditCard,
  },
  {
    label: "Copilots",
    short: "Understand.",
    heading: "The context behind the decision.",
    body: "Find the exceptions that deserve attention. Focused assistance helps your team understand the evidence before taking action.",
    detail: "Open an example exception to see what needs attention.",
    icon: ScanSearch,
  },
];
const locations = [
  {
    id: "north",
    name: "North Loop",
    code: "NL—01",
    members: 520,
    type: "Corporate",
  },
  {
    id: "river",
    name: "Riverside",
    code: "RV—02",
    members: 348,
    type: "Franchise",
  },
  {
    id: "west",
    name: "West End",
    code: "WE—03",
    members: 276,
    type: "Corporate",
  },
];
const plans = [
  {
    name: "Everyday",
    price: 24,
    benefit: "Exterior wash",
    access: "Home location",
    services: ["Exterior wash", "Wheel clean", "Air dry"],
  },
  {
    name: "Signature",
    price: 34,
    benefit: "Wash + protective finish",
    access: "All 3 example locations",
    services: [
      "Everything in Everyday",
      "Protective finish",
      "Undercarriage rinse",
    ],
  },
  {
    name: "Complete",
    price: 44,
    benefit: "Complete care",
    access: "All 3 example locations",
    services: ["Everything in Signature", "Ceramic protection", "Tire finish"],
  },
];

export function ProductTour() {
  const [stage, setStage] = useState(0);
  const [location, setLocation] = useState("all");
  const [planIndex, setPlanIndex] = useState(1);
  const [planDetails, setPlanDetails] = useState(false);
  const [exception, setException] = useState<number | null>(null);
  const section = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const activeLocations =
    location === "all"
      ? locations
      : locations.filter((item) => item.id === location);
  const plan = plans[planIndex];

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1050px) and (prefers-reduced-motion: no-preference)",
      () => {
        section.current
          ?.querySelectorAll<HTMLElement>(".tour-chapter")
          .forEach((chapter, index) => {
            ScrollTrigger.create({
              trigger: chapter,
              start: "top 48%",
              end: "bottom 48%",
              onEnter: () => {
                if (!manual.current) setStage(index);
              },
              onEnterBack: () => {
                if (!manual.current) setStage(index);
              },
            });
          });
      },
    );
    return () => media.revert();
  }, []);

  function selectStage(index: number) {
    manual.current = true;
    setStage(index);
  }
  function reset() {
    setStage(0);
    setLocation("all");
    setPlanIndex(1);
    setPlanDetails(false);
    setException(null);
    manual.current = true;
  }

  return (
    <div className="tour-layout" ref={section}>
      <div className="tour-chapters">
        {stages.map((item, i) => (
          <article
            className={`tour-chapter${stage === i ? " active" : ""}`}
            key={item.label}
          >
            <span className="chapter-number">0{i + 1}</span>
            <h3>{item.short}</h3>
            <h4>{item.heading}</h4>
            <p>{item.body}</p>
            <button
              type="button"
              className="v3-text-link"
              onClick={() => selectStage(i)}
            >
              Explore {item.label.toLowerCase()}
              <ArrowUpRight size={17} />
            </button>
          </article>
        ))}
      </div>
      <div className="tour-sticky">
        <div
          className="tour-tabs"
          role="tablist"
          aria-label="Explore the platform"
        >
          {stages.map((item, i) => (
            <button
              type="button"
              role="tab"
              id={`tour-tab-${i}`}
              aria-selected={stage === i}
              aria-controls="tour-panel"
              tabIndex={stage === i ? 0 : -1}
              key={item.label}
              onClick={() => selectStage(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (i + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  selectStage(next);
                  document.getElementById(`tour-tab-${next}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="product-preview"
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tour-tab-${stage}`}
        >
          <div className="preview-toolbar">
            <div>
              <span className="preview-mark">
                <img src={logo} alt="" width="48" height="48" />
              </span>
              <strong>Operly</strong>
              <span className="preview-divider" />
              <span>Brand & Revenue OS</span>
            </div>
            <span className="preview-demo">Explore</span>
          </div>
          <div className="preview-layout">
            <aside className="preview-sidebar" aria-label="Preview navigation">
              <span className="sidebar-caption">WORKSPACE</span>
              <span className="workspace-name">Evergreen Wash</span>
              <span className="sidebar-caption second">PLATFORM</span>
              {stages.map((item, i) => (
                <button
                  type="button"
                  aria-label={`Show ${item.label.toLowerCase()} preview`}
                  key={item.label}
                  className={stage === i ? "selected" : ""}
                  onClick={() => selectStage(i)}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
              <span className="sidebar-bottom">Example network</span>
            </aside>
            <div className="preview-content" key={stage}>
              {stage === 0 && (
                <>
                  <div className="preview-heading">
                    <div>
                      <span className="preview-eyebrow">NETWORK OVERVIEW</span>
                      <h3>The bigger picture.</h3>
                    </div>
                    <Network size={23} />
                  </div>
                  <label className="sr-only" htmlFor="preview-location">
                    Filter by location
                  </label>
                  <div className="location-select">
                    <MapPin size={15} />
                    <select
                      id="preview-location"
                      value={location}
                      onChange={(event) => {
                        manual.current = true;
                        setLocation(event.target.value);
                      }}
                    >
                      <option value="all">All locations</option>
                      {locations.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="network-metrics" aria-live="polite">
                    <div>
                      <span>Locations</span>
                      <strong>
                        {activeLocations.length.toString().padStart(2, "0")}
                      </strong>
                    </div>
                    <div>
                      <span>Active members</span>
                      <strong>
                        {activeLocations
                          .reduce((sum, item) => sum + item.members, 0)
                          .toLocaleString("en-US")}
                      </strong>
                    </div>
                    <div>
                      <span>Brand</span>
                      <strong>01</strong>
                    </div>
                  </div>
                  <div className="location-list">
                    <div className="location-list-heading">
                      <span>LOCATION</span>
                      <span>MEMBERS</span>
                    </div>
                    {activeLocations.map((item) => (
                      <button
                        type="button"
                        className="location-row"
                        key={item.id}
                        onClick={() => {
                          manual.current = true;
                          setLocation(location === item.id ? "all" : item.id);
                        }}
                      >
                        <span className="location-icon">
                          <Building2 size={16} />
                        </span>
                        <span>
                          <strong>{item.name}</strong>
                          <small>
                            {item.code} · {item.type}
                          </small>
                        </span>
                        <span>
                          {item.members}
                          <ArrowUpRight size={13} />
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="preview-insight">
                    <Check size={14} />
                    One brand. Clear context for every location.
                  </p>
                </>
              )}
              {stage === 1 && (
                <>
                  <div className="preview-heading">
                    <div>
                      <span className="preview-eyebrow">
                        MEMBERSHIP CATALOG
                      </span>
                      <h3>Your brand. Their plan.</h3>
                    </div>
                    <CreditCard size={23} />
                  </div>
                  <div
                    className="plan-picker"
                    role="group"
                    aria-label="Example membership plan"
                  >
                    {plans.map((item, i) => (
                      <button
                        type="button"
                        key={item.name}
                        aria-pressed={planIndex === i}
                        onClick={() => {
                          manual.current = true;
                          setPlanIndex(i);
                          setPlanDetails(false);
                        }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <div className="membership-preview">
                    <div className="membership-top">
                      <span>EVERGREEN WASH</span>
                      <span>MONTHLY MEMBERSHIP</span>
                    </div>
                    <h4>{plan.name}</h4>
                    <p>{plan.benefit}</p>
                    <div className="membership-price">
                      <sup>$</sup>
                      {plan.price}
                      <small>/ month</small>
                    </div>
                    <div className="membership-access">
                      <MapPin size={14} />
                      {plan.access}
                    </div>
                    <button
                      type="button"
                      className="preview-action"
                      aria-expanded={planDetails}
                      onClick={() => {
                        manual.current = true;
                        setPlanDetails(!planDetails);
                      }}
                    >
                      {planDetails
                        ? "Hide included services"
                        : "Explore included services"}
                      <ArrowRight size={16} />
                    </button>
                    {planDetails && (
                      <ul className="plan-services">
                        {plan.services.map((item) => (
                          <li key={item}>
                            <Check size={13} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="preview-smallprint">
                    Illustrative car wash plans, not Operly pricing.
                    <br />
                    Membership commerce is in validation.
                  </p>
                </>
              )}
              {stage === 2 && (
                <>
                  <div className="preview-heading">
                    <div>
                      <span className="preview-eyebrow">
                        MEMBERSHIP COPILOT
                      </span>
                      <h3>Know where to look.</h3>
                    </div>
                    <ScanSearch size={23} />
                  </div>
                  <p className="preview-description">
                    A focused review of membership exceptions.
                  </p>
                  <div className="exception-summary">
                    <strong>02</strong>
                    <div>
                      <span>Items to review</span>
                      <small>Rules-based example · read-only</small>
                    </div>
                  </div>
                  <div className="exceptions">
                    {[
                      {
                        title: "Payment evidence pending",
                        sub: "Example contract MB—0241",
                        text: "An active membership has no matching payment evidence in the latest import. Review the source record before changing the contract.",
                      },
                      {
                        title: "Vehicle link missing",
                        sub: "Example contract MB—0386",
                        text: "This example membership has no linked vehicle. Verify the member’s vehicle record before assessing redemption eligibility.",
                      },
                    ].map((item, i) => (
                      <div key={item.title} className="exception-item">
                        <button
                          type="button"
                          aria-expanded={exception === i}
                          onClick={() => {
                            manual.current = true;
                            setException(exception === i ? null : i);
                          }}
                        >
                          <span className="exception-index">0{i + 1}</span>
                          <span>
                            <strong>{item.title}</strong>
                            <small>{item.sub}</small>
                          </span>
                          <ArrowUpRight size={16} />
                        </button>
                        {exception === i && (
                          <p className="exception-explanation">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="preview-insight">
                    <Check size={14} />
                    Your team makes the decision.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="preview-footer">
            <span>
              <span className="status-dot" />
              Illustrative platform preview
            </span>
            <button type="button" onClick={reset}>
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>
        <p className="tour-hint">
          <span>Take a closer look.</span> {stages[stage].detail}
        </p>
      </div>
    </div>
  );
}

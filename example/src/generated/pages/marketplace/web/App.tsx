import "./styles.css"

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useTheme, type ThemeOption } from "../../../themes/ThemeContext";

type Route = "home" | "browse" | "detail" | "sell" | "cart" | "checkout" | "orders" | "account";
type ListingStatus = "available" | "reserved" | "sold";
type DesignButtonVariant = "primary" | "secondary" | "selected" | "dangerPrimary" | "dangerSecondary";
type DesignBadgeVariant = "info" | "neutral" | "success" | "warning" | "danger";
type Node = any;
type ButtonRecipe = Record<DesignButtonVariant, Record<string, string | number>>;

type Listing = {
  id: string;
  title: string;
  brand: string;
  size: string;
  condition: string;
  category: string;
  price: number;
  seller: string;
  rating: string;
  location: string;
  status: ListingStatus;
  palette: string;
  measurements: string;
  notes: string;
};

const listings: Listing[] = [
  {
    id: "LN-2048",
    title: "Wool chore jacket",
    brand: "Alder",
    size: "M",
    condition: "Excellent",
    category: "Outerwear",
    price: 86,
    seller: "Mina R.",
    rating: "4.9",
    location: "Portland, OR",
    status: "available",
    palette: "plum",
    measurements: "22 in chest, 27 in length",
    notes: "Warm midweight wool with two front pockets and a relaxed fit.",
  },
  {
    id: "LN-2052",
    title: "Straight-leg selvedge denim",
    brand: "Northmark",
    size: "30",
    condition: "Very good",
    category: "Denim",
    price: 64,
    seller: "Theo S.",
    rating: "4.8",
    location: "Chicago, IL",
    status: "available",
    palette: "indigo",
    measurements: "15 in waist, 30 in inseam",
    notes: "Broken in, no repairs, chain-stitched hem.",
  },
  {
    id: "LN-2074",
    title: "Ribbed cotton cardigan",
    brand: "Fold",
    size: "S",
    condition: "Good",
    category: "Knitwear",
    price: 42,
    seller: "Asha P.",
    rating: "5.0",
    location: "Austin, TX",
    status: "reserved",
    palette: "sage",
    measurements: "18 in chest, 21 in length",
    notes: "Soft cotton rib with light wear at the cuffs.",
  },
  {
    id: "LN-2091",
    title: "Pleated midi skirt",
    brand: "Vale",
    size: "8",
    condition: "Excellent",
    category: "Skirts",
    price: 58,
    seller: "Nora K.",
    rating: "4.7",
    location: "Brooklyn, NY",
    status: "sold",
    palette: "clay",
    measurements: "14 in waist, 31 in length",
    notes: "Structured pleats, side zip, fully lined.",
  },
];

const categories = ["All", "Outerwear", "Denim", "Knitwear", "Skirts"];
const sizes = ["All sizes", "XS", "S", "M", "8", "30"];
const conditions = ["Any condition", "Excellent", "Very good", "Good"];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function useMarketplaceTheme() {
  const { activeTheme, themeVars } = useTheme();
  const tokens = activeTheme.tokens;
  const border = `${tokens.borderWidth} solid ${tokens.border}`;
  const buttonBorder = `${tokens.buttonBorderWidth} solid ${tokens.border}`;
  const labelBorder = `${tokens.labelBorderWidth} solid ${tokens.border}`;

  return {
    themeVars: getMarketplaceVars(activeTheme, themeVars),
    componentRecipe: {
      page: {
        background: tokens.page,
        color: tokens.text,
        fontFamily: activeTheme.fontFamily,
      },
      header: {
        background: tokens.header,
        color: tokens.text,
        borderBottom: tokens.headerBorderStyle,
      },
      footer: {
        background: tokens.footer,
        color: tokens.mutedText,
      },
    },
    cardRecipe: {
      default: {
        background: tokens.surface,
        border: tokens.cardBorder,
        borderRadius: tokens.boxRadius,
        padding: 16,
      },
      resource: {
        background: tokens.surface,
        border,
        borderRadius: tokens.boxRadius,
        padding: 16,
      },
    },
    buttonRecipe: {
      primary: {
        background: tokens.primaryButton,
        color: tokens.primaryButtonText,
        border: buttonBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        fontSize: 16,
        hoverBackground: tokens.hover,
        activeBackground: tokens.selectedButton,
        transition: "120ms ease-out",
      },
      secondary: {
        background: tokens.secondaryButton,
        color: tokens.secondaryButtonText,
        border: buttonBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        fontSize: 16,
        hoverBackground: tokens.hover,
        hoverBorderColor: tokens.border,
        activeBackground: tokens.selectedButton,
        activeBorderColor: tokens.border,
        transition: "120ms ease-out",
      },
      selected: {
        background: tokens.selectedButton,
        color: tokens.selectedButtonText,
        border: buttonBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        fontSize: 16,
      },
      dangerPrimary: {
        background: tokens.dangerButton,
        color: tokens.dangerButtonText,
        border: buttonBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        fontSize: 16,
        transition: "120ms ease-out",
      },
      dangerSecondary: {
        background: tokens.surface,
        color: tokens.danger,
        border: buttonBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        fontSize: 16,
        transition: "120ms ease-out",
      },
    } as ButtonRecipe,
    badgeRecipe: {
      info: badgeStyle(tokens.info, tokens.raised, labelBorder, tokens.labelRadius),
      neutral: badgeStyle(tokens.text, tokens.raised, labelBorder, tokens.labelRadius),
      success: badgeStyle(tokens.success, tokens.raised, labelBorder, tokens.labelRadius),
      warning: badgeStyle(tokens.warning, tokens.raised, labelBorder, tokens.labelRadius),
      danger: badgeStyle(tokens.danger, tokens.raised, labelBorder, tokens.labelRadius),
    } satisfies Record<DesignBadgeVariant, Record<string, string | number>>,
    inputRecipe: {
      default: {
        background: tokens.raised,
        color: tokens.text,
        placeholderColor: tokens.subtleText,
        border: tokens.inputBorder,
        borderRadius: tokens.buttonRadius,
        minHeight: 40,
        paddingInline: 12,
        transition: "120ms ease-out",
      },
      active: {
        borderColor: tokens.accent,
        boxShadow: `0 0 0 2px ${tokens.accent}`,
      },
    },
    tableRecipe: {
      header: {
        background: tokens.raised,
        color: tokens.mutedText,
        fontSize: 12,
      },
      row: {
        borderBottom: border,
        hoverBackground: tokens.hover,
      },
    },
  };
}

function getMarketplaceVars(theme: ThemeOption, vars: CSSProperties) {
  return {
    ...vars,
    "--color-primary": theme.tokens.text,
    "--color-secondary": theme.tokens.mutedText,
    "--color-surface": theme.tokens.surface,
    "--color-page": theme.tokens.page,
    "--color-canvas": theme.tokens.page,
    "--color-brand": theme.tokens.accent,
    "--color-brand-hover": theme.tokens.selectedButtonText,
    "--color-brand-ring": theme.tokens.accent,
    "--color-brand-surface": theme.tokens.selectedButton,
    "--color-brand-border": theme.tokens.border,
    "--color-border": theme.tokens.border,
    "--color-border-subtle": theme.tokens.border,
    "--color-search-active": theme.tokens.hover,
    "--color-selected": theme.tokens.selectedButton,
    "--color-success-soft": theme.tokens.raised,
    "--color-success-border": theme.tokens.success,
    "--color-warning-soft": theme.tokens.raised,
    "--color-warning-border": theme.tokens.warning,
    "--color-disabled": theme.tokens.subtleText,
    "--font-product": theme.fontFamily,
    "--radius-card": theme.tokens.boxRadius,
    "--radius-button": theme.tokens.buttonRadius,
    "--radius-pill": theme.tokens.labelRadius,
    "--radius-input": theme.tokens.buttonRadius,
    "--shell-top-nav": "64px",
    "--motion-hover": "120ms ease-out",
  } as CSSProperties;
}

function badgeStyle(color: string, background: string, border: string, radius: string) {
  return {
    background,
    color,
    border,
    borderRadius: radius,
    paddingBlock: 3,
    paddingInline: 10,
    fontSize: 12,
    fontWeight: 500,
  };
}

function AppButton({
  children,
  variant = "secondary",
  onClick,
  disabled,
  type = "button",
}: {
  children: Node;
  variant?: DesignButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const { buttonRecipe } = useMarketplaceTheme();
  const recipe = buttonRecipe[variant];
  const tokens = useTheme().activeTheme.tokens;
  return (
    <button
      className="app-button"
      style={
        {
          "--button-bg": recipe.background,
          "--button-color": recipe.color,
          "--button-border": recipe.border,
          "--button-radius": `${recipe.borderRadius}px`,
          "--button-height": `${recipe.minHeight}px`,
          "--button-padding": `${recipe.paddingInline}px`,
          "--button-size": `${recipe.fontSize}px`,
          "--button-hover-bg": recipe.hoverBackground ?? recipe.background,
          "--button-hover-border": recipe.hoverBorderColor ?? tokens.border,
          "--button-active-bg": recipe.activeBackground ?? recipe.background,
          "--button-active-border": recipe.activeBorderColor ?? tokens.border,
          "--button-disabled-bg": recipe.disabledBackground ?? tokens.raised,
          "--button-disabled-color": recipe.disabledColor ?? tokens.subtleText,
          "--button-transition": recipe.transition ?? "120ms ease-out",
        } as CSSProperties
      }
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

function Badge({ children, variant = "neutral" }: { children: Node; variant?: DesignBadgeVariant }) {
  const { badgeRecipe } = useMarketplaceTheme();
  const recipe = badgeRecipe[variant];
  return (
    <span
      className="badge"
      style={
        {
        background: recipe.background,
        color: recipe.color,
        border: recipe.border,
        borderRadius: recipe.borderRadius,
        paddingBlock: recipe.paddingBlock,
        paddingInline: recipe.paddingInline,
        fontSize: recipe.fontSize,
        fontWeight: recipe.fontWeight,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

function Field({
  label,
  helper,
  placeholder,
  value,
  required,
  type = "text",
}: {
  label: string;
  helper: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  type?: string;
}) {
  const { inputRecipe } = useMarketplaceTheme();
  return (
    <label className="field">
      <span>
        {label} {required ? <b aria-hidden="true">*</b> : null}
      </span>
      <input
        className="input"
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        style={
          {
            "--input-bg": inputRecipe.default.background,
            "--input-color": inputRecipe.default.color,
            "--input-placeholder": inputRecipe.default.placeholderColor,
            "--input-border": inputRecipe.default.border,
            "--input-radius": `${inputRecipe.default.borderRadius}px`,
            "--input-height": `${inputRecipe.default.minHeight}px`,
            "--input-padding": `${inputRecipe.default.paddingInline}px`,
            "--input-focus": inputRecipe.active.borderColor,
            "--input-focus-shadow": inputRecipe.active.boxShadow,
            "--input-transition": inputRecipe.default.transition,
          } as CSSProperties
        }
        type={type}
      />
      <small>{helper}</small>
    </label>
  );
}

export function WebMarketplaceApp() {
  const { componentRecipe, themeVars } = useMarketplaceTheme();
  const [route, setRoute] = useState<Route>("home");
  const [selectedId, setSelectedId] = useState(listings[0].id);
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All sizes");
  const [condition, setCondition] = useState("Any condition");
  const [cart, setCart] = useState<string[]>([listings[1].id]);

  const selectedListing = listings.find((listing) => listing.id === selectedId) ?? listings[0];
  const cartListings = listings.filter((listing) => cart.includes(listing.id));

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const categoryMatch = category === "All" || listing.category === category;
      const sizeMatch = size === "All sizes" || listing.size === size;
      const conditionMatch = condition === "Any condition" || listing.condition === condition;
      return categoryMatch && sizeMatch && conditionMatch;
    });
  }, [category, condition, size]);

  const goToListing = (id: string) => {
    setSelectedId(id);
    setRoute("detail");
  };

  const addToCart = (id: string) => {
    setCart((items) => (items.includes(id) ? items : [...items, id]));
    setRoute("cart");
  };

  return (
    <div className="app" style={{ ...componentRecipe.page, ...themeVars }}>
      <Header route={route} setRoute={setRoute} cartCount={cart.length} />
      <main className="main">
        {route === "home" && <Home setRoute={setRoute} />}
        {route === "browse" && (
          <Browse
            category={category}
            condition={condition}
            filteredListings={filteredListings}
            setCategory={setCategory}
            setCondition={setCondition}
            setSize={setSize}
            size={size}
            goToListing={goToListing}
          />
        )}
        {route === "detail" && (
          <ListingDetail listing={selectedListing} addToCart={addToCart} setRoute={setRoute} />
        )}
        {route === "sell" && <Sell />}
        {route === "cart" && <Cart cartListings={cartListings} setCart={setCart} setRoute={setRoute} />}
        {route === "checkout" && <Checkout cartListings={cartListings} setRoute={setRoute} />}
        {route === "orders" && <Orders />}
        {route === "account" && <Account />}
      </main>
      <Footer setRoute={setRoute} />
    </div>
  );
}

function Header({ route, setRoute, cartCount }: { route: Route; setRoute: (route: Route) => void; cartCount: number }) {
  const { componentRecipe } = useMarketplaceTheme();
  const nav: Array<{ label: string; route: Route }> = [
    { label: "Browse", route: "browse" },
    { label: "Sell", route: "sell" },
    { label: "Orders", route: "orders" },
    { label: "Account", route: "account" },
  ];

  return (
    <header className="top-header" style={componentRecipe.header}>
      <div className="header-inner">
        <button className="brand-link" onClick={() => setRoute("home")} type="button">
          Loopline
        </button>
        <nav aria-label="Primary navigation">
          {nav.map((item) => (
            <button
              className={route === item.route ? "nav-link active" : "nav-link"}
              key={item.route}
              onClick={() => setRoute(item.route)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <AppButton onClick={() => setRoute("cart")} variant={route === "cart" ? "selected" : "secondary"}>
            Cart {cartCount}
          </AppButton>
          <AppButton onClick={() => setRoute("browse")} variant="primary">
            Shop
          </AppButton>
        </div>
      </div>
    </header>
  );
}

function Home({ setRoute }: { setRoute: (route: Route) => void }) {
  return (
    <section className="page home-page">
      <div className="hero">
        <div className="hero-copy">
          <Badge variant="info">Secondhand clothing marketplace</Badge>
          <h1>Buy and sell clothes with clearer details.</h1>
          <p>
            Find well-described pieces from individual sellers, compare condition and measurements, and list items
            without turning your closet into a spreadsheet.
          </p>
          <div className="hero-actions">
            <AppButton onClick={() => setRoute("browse")} variant="primary">
              Browse listings
            </AppButton>
            <AppButton onClick={() => setRoute("sell")}>List an item</AppButton>
          </div>
        </div>
        <div className="hero-media" aria-label="Marketplace listing preview">
          <ListingPreview listing={listings[0]} />
          <ListingPreview listing={listings[2]} compact />
        </div>
      </div>
      <div className="stat-row">
        <Stat label="Active listings" value="1,248" />
        <Stat label="Average seller rating" value="4.8" />
        <Stat label="Items recirculated" value="18,420" />
      </div>
    </section>
  );
}

function Browse({
  category,
  condition,
  filteredListings,
  goToListing,
  setCategory,
  setCondition,
  setSize,
  size,
}: {
  category: string;
  condition: string;
  filteredListings: Listing[];
  goToListing: (id: string) => void;
  setCategory: (value: string) => void;
  setCondition: (value: string) => void;
  setSize: (value: string) => void;
  size: string;
}) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <section className="page">
      <PageHeading
        eyebrow="Marketplace"
        title="Browse secondhand clothing"
        body="Filter by category, size, condition, and seller details before opening a listing."
      />
      <div className="market-layout">
        <aside className="filter-panel" style={cardRecipe.resource}>
          <h2>Filters</h2>
          <Select label="Category" options={categories} value={category} onChange={setCategory} />
          <Select label="Size" options={sizes} value={size} onChange={setSize} />
          <Select label="Condition" options={conditions} value={condition} onChange={setCondition} />
          <Field label="Search" helper="Try brand, fabric, or seller." placeholder="Search listings" />
          <AppButton>Save filters</AppButton>
        </aside>
        <div className="listing-area">
          <div className="toolbar">
            <p>{filteredListings.length} listings</p>
            <select aria-label="Sort listings" className="select-control">
              <option>Newest first</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>
          {filteredListings.length > 0 ? (
            <div className="listing-grid">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onOpen={() => goToListing(listing.id)} />
              ))}
            </div>
          ) : (
            <EmptyState title="No listings match these filters" body="Adjust a filter or save this search for later." />
          )}
        </div>
      </div>
    </section>
  );
}

function ListingDetail({
  addToCart,
  listing,
  setRoute,
}: {
  addToCart: (id: string) => void;
  listing: Listing;
  setRoute: (route: Route) => void;
}) {
  const { cardRecipe } = useMarketplaceTheme();
  const isAvailable = listing.status === "available";
  return (
    <section className="page">
      <button className="back-button" onClick={() => setRoute("browse")} type="button">
        Back to browse
      </button>
      <div className="detail-layout">
        <div className={`photo-block ${listing.palette}`}>
          <span>{listing.category}</span>
        </div>
        <div className="detail-panel" style={cardRecipe.default}>
          <div className="detail-topline">
            <Badge variant={statusVariant(listing.status)}>{listing.status}</Badge>
            <span className="listing-id">{listing.id}</span>
          </div>
          <h1>{listing.title}</h1>
          <p>{listing.brand}</p>
          <strong className="price">{money.format(listing.price)}</strong>
          <dl className="detail-list">
            <div>
              <dt>Size</dt>
              <dd>{listing.size}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{listing.condition}</dd>
            </div>
            <div>
              <dt>Measurements</dt>
              <dd>{listing.measurements}</dd>
            </div>
            <div>
              <dt>Seller</dt>
              <dd>
                {listing.seller} - {listing.rating}
              </dd>
            </div>
          </dl>
          <p>{listing.notes}</p>
          <div className="action-row">
            <AppButton disabled={!isAvailable} onClick={() => addToCart(listing.id)} variant="primary">
              Add to cart
            </AppButton>
            <AppButton>Save</AppButton>
          </div>
          {!isAvailable ? <p className="helper-text">This item is not currently available for checkout.</p> : null}
        </div>
      </div>
    </section>
  );
}

function Sell() {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <section className="page">
      <PageHeading
        eyebrow="Seller workspace"
        title="List a clothing item"
        body="Add the details buyers need before they commit: condition, measurements, photos, price, and shipping."
      />
      <div className="sell-layout">
        <form className="sell-form" style={cardRecipe.default}>
          <div className="form-grid">
            <Field label="Title" helper="Use item type, material, and fit." placeholder="Linen camp shirt" required />
            <Field label="Brand" helper="Use the label brand or independent maker." placeholder="Alder" required />
            <Field label="Size" helper="Add tagged size and fit notes." placeholder="M" required />
            <Field label="Price" helper="Buyer sees shipping separately." placeholder="68" required type="number" />
            <Field label="Condition" helper="Choose the closest condition." placeholder="Excellent" required />
            <Field label="Measurements" helper="Chest, waist, inseam, or length." placeholder="22 in chest" required />
          </div>
          <label className="field">
            <span>Description *</span>
            <textarea className="textarea" placeholder="Describe fabric, wear, repairs, and styling notes." required />
            <small>Include anything that would affect fit, value, or buyer expectations.</small>
          </label>
          <div className="action-row">
            <AppButton variant="primary" type="submit">
              Publish listing
            </AppButton>
            <AppButton>Save draft</AppButton>
          </div>
        </form>
        <aside className="preview-panel" style={cardRecipe.resource}>
          <h2>Preview</h2>
          <div className="photo-upload">
            <span>Photo slots</span>
          </div>
          <div className="checklist">
            <Badge variant="success">Ready</Badge>
            <p>Required fields, buyer measurements, and condition notes are included.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Cart({
  cartListings,
  setCart,
  setRoute,
}: {
  cartListings: Listing[];
  setCart: (items: string[]) => void;
  setRoute: (route: Route) => void;
}) {
  const { cardRecipe } = useMarketplaceTheme();
  const subtotal = cartListings.reduce((total, listing) => total + listing.price, 0);
  const shipping = cartListings.length > 0 ? 8 : 0;
  return (
    <section className="page">
      <PageHeading eyebrow="Cart" title="Review saved purchases" body="Confirm item availability before checkout." />
      {cartListings.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-list">
            {cartListings.map((listing) => (
              <div className="cart-row" key={listing.id} style={cardRecipe.resource}>
                <div className={`thumb ${listing.palette}`} />
                <div>
                  <h2>{listing.title}</h2>
                  <p>
                    {listing.brand} - {listing.size} - {listing.condition}
                  </p>
                </div>
                <strong>{money.format(listing.price)}</strong>
                <AppButton onClick={() => setCart(cartListings.filter((item) => item.id !== listing.id).map((item) => item.id))}>
                  Remove
                </AppButton>
              </div>
            ))}
          </div>
          <Summary subtotal={subtotal} shipping={shipping} setRoute={setRoute} />
        </div>
      ) : (
        <EmptyState title="Your cart is empty" body="Browse available listings and add items when you are ready." />
      )}
    </section>
  );
}

function Checkout({ cartListings, setRoute }: { cartListings: Listing[]; setRoute: (route: Route) => void }) {
  const { cardRecipe } = useMarketplaceTheme();
  const subtotal = cartListings.reduce((total, listing) => total + listing.price, 0);
  const shipping = cartListings.length > 0 ? 8 : 0;
  return (
    <section className="page">
      <PageHeading eyebrow="Checkout" title="Add shipping and payment" body="Payment is represented as a product-ready form state." />
      <div className="checkout-layout">
        <form className="sell-form" style={cardRecipe.default}>
          <div className="form-grid">
            <Field label="Full name" helper="Use the recipient name." placeholder="Jordan Lee" required />
            <Field label="Email" helper="Receipt and seller messages go here." placeholder="jordan@example.com" required type="email" />
            <Field label="Shipping address" helper="Street address and unit." placeholder="124 Market Street" required />
            <Field label="City" helper="Delivery city." placeholder="Seattle" required />
            <Field label="Payment method" helper="Card ending or saved wallet." placeholder="Card ending 4242" required />
            <Field label="Billing ZIP code" helper="Used for payment verification." placeholder="98101" required />
          </div>
          <div className="action-row">
            <AppButton onClick={() => setRoute("orders")} variant="primary">
              Place order
            </AppButton>
            <AppButton onClick={() => setRoute("cart")}>Back to cart</AppButton>
          </div>
        </form>
        <Summary subtotal={subtotal} shipping={shipping} setRoute={setRoute} compact />
      </div>
    </section>
  );
}

function Orders() {
  const { cardRecipe, tableRecipe } = useMarketplaceTheme();
  return (
    <section className="page">
      <PageHeading
        eyebrow="Orders"
        title="Track purchases and sales"
        body="Recent order status, seller updates, receipts, and return windows stay in one place."
      />
      <div className="table-card" style={cardRecipe.default}>
        <table>
          <thead style={tableRecipe.header}>
            <tr>
              <th>Order</th>
              <th>Item</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={tableRecipe.row}>
              <td>#1048</td>
              <td>Straight-leg selvedge denim</td>
              <td>
                <Badge variant="success">Delivered</Badge>
              </td>
              <td>{money.format(72)}</td>
              <td>Jun 9, 2026</td>
            </tr>
            <tr style={tableRecipe.row}>
              <td>#1049</td>
              <td>Wool chore jacket</td>
              <td>
                <Badge variant="info">In review</Badge>
              </td>
              <td>{money.format(94)}</td>
              <td>Jun 10, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Account() {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <section className="page">
      <PageHeading
        eyebrow="Account"
        title="Manage selling and buying"
        body="See saved items, drafts, active listings, seller performance, and account settings."
      />
      <div className="account-grid">
        <MetricCard label="Saved items" value="14" />
        <MetricCard label="Active listings" value="6" />
        <MetricCard label="Drafts" value="3" />
        <MetricCard label="Seller rating" value="4.9" />
      </div>
      <div className="settings-panel" style={cardRecipe.default}>
        <h2>Preferences</h2>
        <div className="settings-row">
          <span>Offer messages</span>
          <Badge variant="success">Enabled</Badge>
        </div>
        <div className="settings-row">
          <span>Saved search alerts</span>
          <Badge variant="info">Weekly</Badge>
        </div>
        <div className="settings-row">
          <span>Seller vacation mode</span>
          <Badge>Off</Badge>
        </div>
      </div>
    </section>
  );
}

function Footer({ setRoute }: { setRoute: (route: Route) => void }) {
  const { componentRecipe } = useMarketplaceTheme();
  return (
    <footer className="footer" style={componentRecipe.footer}>
      <div className="footer-inner">
        <span>Loopline</span>
        <button onClick={() => setRoute("account")} type="button">
          Help
        </button>
        <button onClick={() => setRoute("account")} type="button">
          Privacy
        </button>
        <button onClick={() => setRoute("account")} type="button">
          Terms
        </button>
        <button onClick={() => setRoute("sell")} type="button">
          Seller guidelines
        </button>
      </div>
    </footer>
  );
}

function PageHeading({ body, eyebrow, title }: { body: string; eyebrow: string; title: string }) {
  return (
    <div className="page-heading">
      <Badge variant="info">{eyebrow}</Badge>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

function ListingCard({ listing, onOpen }: { key?: string; listing: Listing; onOpen: () => void }) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <article className="listing-card" style={cardRecipe.default}>
      <div className={`thumb large ${listing.palette}`} />
      <div className="card-body">
        <div className="card-topline">
          <Badge variant={statusVariant(listing.status)}>{listing.status}</Badge>
          <button aria-label={`Save ${listing.title}`} className="save-button" type="button">
            Save
          </button>
        </div>
        <h2>{listing.title}</h2>
        <p>
          {listing.brand} - {listing.size} - {listing.condition}
        </p>
        <div className="price-row">
          <strong>{money.format(listing.price)}</strong>
          <span>{listing.seller}</span>
        </div>
        <AppButton disabled={listing.status !== "available"} onClick={onOpen} variant="primary">
          View listing
        </AppButton>
      </div>
    </article>
  );
}

function ListingPreview({ listing, compact }: { listing: Listing; compact?: boolean }) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <article className={compact ? "preview-card compact" : "preview-card"} style={cardRecipe.default}>
      <div className={`thumb ${listing.palette}`} />
      <div>
        <Badge variant={statusVariant(listing.status)}>{listing.status}</Badge>
        <h2>{listing.title}</h2>
        <p>{money.format(listing.price)}</p>
      </div>
    </article>
  );
}

function Select({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select className="select-control" onChange={(event: any) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <small>Use this to refine marketplace results.</small>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <div className="stat" style={cardRecipe.resource}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <div className="metric-card" style={cardRecipe.resource}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Summary({
  compact,
  setRoute,
  shipping,
  subtotal,
}: {
  compact?: boolean;
  setRoute: (route: Route) => void;
  shipping: number;
  subtotal: number;
}) {
  const { cardRecipe } = useMarketplaceTheme();
  const total = subtotal + shipping;
  return (
    <aside className={compact ? "summary compact" : "summary"} style={cardRecipe.default}>
      <h2>Order summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <strong>{money.format(subtotal)}</strong>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <strong>{money.format(shipping)}</strong>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <strong>{money.format(total)}</strong>
      </div>
      {!compact ? (
        <AppButton disabled={subtotal === 0} onClick={() => setRoute("checkout")} variant="primary">
          Checkout
        </AppButton>
      ) : null}
    </aside>
  );
}

function EmptyState({ body, title }: { body: string; title: string }) {
  const { cardRecipe } = useMarketplaceTheme();
  return (
    <div className="empty-state" style={cardRecipe.default}>
      <Badge variant="warning">Empty</Badge>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

function statusVariant(status: ListingStatus): DesignBadgeVariant {
  if (status === "available") return "success";
  if (status === "reserved") return "warning";
  return "neutral";
}

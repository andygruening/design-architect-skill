import { type CSSProperties, useMemo, useState } from "react";
import {
  Heart,
  MapPin,
  PackageCheck,
  Search,
  Star,
  Tag,
  X,
} from "lucide-react";
import { useTheme, type ThemeOption } from "../../../themes/ThemeContext";
import "./styles.css";

type Listing = {
  id: number;
  title: string;
  brand: string;
  category: "Outerwear" | "Tops" | "Bottoms" | "Shoes" | "Accessories";
  size: string;
  condition: "Like new" | "Excellent" | "Good" | "Worn in";
  price: number;
  originalPrice: number;
  location: string;
  seller: string;
  sellerRating: number;
  image: string;
  color: string;
  material: string;
  tags: string[];
  description: string;
};

type Page = "home" | "listings" | "create";
type Notice = { tone: "success" | "info"; message: string } | null;
type ThemeVars = CSSProperties & Record<`--${string}`, string>;
type StyleRecipe = Record<string, string | number>;

const listings: Listing[] = [
  {
    id: 1,
    title: "Cropped wool blend coat",
    brand: "Everlane",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    price: 68,
    originalPrice: 178,
    location: "Brooklyn, NY",
    seller: "Maya",
    sellerRating: 4.9,
    image:
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=900&q=80",
    color: "Camel",
    material: "Wool blend",
    tags: ["Warm", "Minimal", "Office"],
    description:
      "Soft cropped coat with a clean collar, two front pockets, and a structured shape. Freshly dry cleaned and ready for another season.",
  },
  {
    id: 2,
    title: "Vintage denim chore jacket",
    brand: "Levi's",
    category: "Outerwear",
    size: "L",
    condition: "Good",
    price: 52,
    originalPrice: 120,
    location: "Portland, OR",
    seller: "Jon",
    sellerRating: 4.8,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=900&q=80",
    color: "Faded blue",
    material: "Cotton denim",
    tags: ["Vintage", "Workwear", "Unisex"],
    description:
      "Heavy denim layer with natural fading and sturdy metal buttons. Broken in without major flaws.",
  },
  {
    id: 3,
    title: "Silk button-down blouse",
    brand: "Equipment",
    category: "Tops",
    size: "S",
    condition: "Like new",
    price: 46,
    originalPrice: 198,
    location: "Austin, TX",
    seller: "Priya",
    sellerRating: 5,
    image:
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80",
    color: "Ivory",
    material: "Silk",
    tags: ["Dressy", "Lightweight", "Classic"],
    description:
      "Fluid silk blouse with a relaxed drape and hidden placket. No pulls, stains, or missing buttons.",
  },
  {
    id: 4,
    title: "Wide-leg corduroy trousers",
    brand: "Madewell",
    category: "Bottoms",
    size: "28",
    condition: "Excellent",
    price: 39,
    originalPrice: 98,
    location: "Chicago, IL",
    seller: "Eli",
    sellerRating: 4.7,
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=900&q=80",
    color: "Olive",
    material: "Cotton corduroy",
    tags: ["Wide leg", "Textured", "Fall"],
    description:
      "High-rise corduroys with a full leg and roomy pockets. Washed once and kept in excellent condition.",
  },
  {
    id: 5,
    title: "Leather ankle boots",
    brand: "Vagabond",
    category: "Shoes",
    size: "8",
    condition: "Good",
    price: 58,
    originalPrice: 190,
    location: "Denver, CO",
    seller: "Noah",
    sellerRating: 4.9,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    color: "Black",
    material: "Leather",
    tags: ["Leather", "Everyday", "Stacked heel"],
    description:
      "Pull-on leather boots with a stable heel and light creasing. Soles have plenty of life left.",
  },
  {
    id: 6,
    title: "Hand-knit striped sweater",
    brand: "Local Maker",
    category: "Tops",
    size: "M",
    condition: "Excellent",
    price: 44,
    originalPrice: 110,
    location: "Seattle, WA",
    seller: "Ana",
    sellerRating: 4.9,
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=80",
    color: "Cream / navy",
    material: "Merino wool",
    tags: ["Handmade", "Cozy", "Relaxed"],
    description:
      "Chunky striped knit with ribbed cuffs and a relaxed fit. Stored folded and freshly de-pilled.",
  },
  {
    id: 7,
    title: "Quilted crossbody bag",
    brand: "Baggu",
    category: "Accessories",
    size: "One size",
    condition: "Like new",
    price: 34,
    originalPrice: 74,
    location: "Los Angeles, CA",
    seller: "Rina",
    sellerRating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    color: "Sage",
    material: "Recycled nylon",
    tags: ["Lightweight", "Crossbody", "Daily"],
    description:
      "Soft quilted bag with an adjustable strap, zip closure, and spotless interior.",
  },
  {
    id: 8,
    title: "Pleated midi skirt",
    brand: "COS",
    category: "Bottoms",
    size: "XS",
    condition: "Excellent",
    price: 42,
    originalPrice: 135,
    location: "San Francisco, CA",
    seller: "June",
    sellerRating: 5,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=80",
    color: "Charcoal",
    material: "Recycled polyester",
    tags: ["Pleated", "Work", "Minimal"],
    description:
      "Crisp pleated skirt with an elastic waist and smooth lining. Easy to style with boots or sneakers.",
  },
];

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"] as const;
const conditions = ["Any", "Like new", "Excellent", "Good", "Worn in"] as const;

const buttonRecipe: Record<"primary" | "secondary" | "selected", StyleRecipe> = {
  primary: {
    background: "var(--color-primary-button)",
    color: "var(--color-primary-button-text)",
    border: "var(--border-width) solid var(--color-border)",
  },
  secondary: {
    background: "var(--color-secondary-surface)",
    color: "var(--color-primary-text)",
    border: "var(--border-width) solid var(--color-border)",
  },
  selected: {
    background: "var(--color-selected-button)",
    color: "var(--color-selected-button-text)",
    border: "var(--border-width) solid var(--color-border)",
    borderRadius: "var(--radius-button)",
  },
};

const componentRecipe = {
  card: {
    background: "var(--color-surface)",
    border: "var(--border-width) solid var(--color-border)",
    borderRadius: "var(--radius-card)",
    padding: 24,
  },
  input: {
    background: "var(--color-secondary-surface)",
    color: "var(--color-primary-text)",
    border: "var(--border-width) solid var(--color-border)",
    borderRadius: "var(--radius-input)",
    minHeight: 40,
  },
  header: {
    background: "var(--color-header)",
    color: "var(--color-primary-text)",
    borderBottom: "var(--border-width) solid var(--color-header-border)",
  },
  footer: {
    background: "var(--color-footer)",
    color: "var(--color-secondary-text)",
  },
  badge: {
    info: { background: "var(--color-info-soft)", color: "var(--color-info)", border: "var(--label-border-width) solid var(--color-border)", borderRadius: "var(--radius-badge)" },
    neutral: { background: "var(--color-secondary-surface)", color: "var(--color-primary-text)", border: "var(--label-border-width) solid var(--color-border)", borderRadius: "var(--radius-badge)" },
    success: { background: "var(--color-success-soft)", color: "var(--color-success)", border: "var(--label-border-width) solid var(--color-border)", borderRadius: "var(--radius-badge)" },
    warning: { background: "var(--color-warning-soft)", color: "var(--color-warning)", border: "var(--label-border-width) solid var(--color-border)", borderRadius: "var(--radius-badge)" },
  },
} as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function WebMarketplaceApp() {
  const { activeTheme } = useTheme();
  const [page, setPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [selectedCondition, setSelectedCondition] = useState<(typeof conditions)[number]>("Any");
  const [query, setQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing>(listings[0]);
  const [favorites, setFavorites] = useState<number[]>([1, 6]);
  const [notice, setNotice] = useState<Notice>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formPrice, setFormPrice] = useState("");

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesCategory =
        selectedCategory === "All" || listing.category === selectedCategory;
      const matchesCondition =
        selectedCondition === "Any" || listing.condition === selectedCondition;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [listing.title, listing.brand, listing.color, listing.material, listing.location]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesCondition && matchesQuery;
    });
  }, [query, selectedCategory, selectedCondition]);

  const averageDiscount = Math.round(
    listings.reduce(
      (total, listing) => total + (1 - listing.price / listing.originalPrice) * 100,
      0,
    ) / listings.length,
  );

  function navigate(nextPage: Page) {
    setNotice(null);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }

  function handleRefresh() {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setNotice({ tone: "success", message: "Listings are up to date." });
    }, 500);
  }

  function handleCreateListing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formTitle.trim() || !formPrice.trim()) {
      setNotice({ tone: "info", message: "Add a title and price before saving." });
      return;
    }

    setNotice({ tone: "success", message: "Listing draft saved." });
    setFormTitle("");
    setFormPrice("");
    navigate("listings");
  }

  return (
    <div className="theme-root" data-theme={activeTheme.id} style={webThemeVars(activeTheme)}>
      <header className="top-header" style={componentRecipe.header}>
        <div className="page-width header-inner">
          <button className="brand-button" onClick={() => navigate("home")} type="button">
            <span className="brand-dot" aria-hidden="true" />
            <span>Thrift Store</span>
          </button>
          <nav aria-label="Primary navigation">
            <button
              className={page === "home" ? "nav-link active" : "nav-link"}
              onClick={() => navigate("home")}
              type="button"
            >
              Home
            </button>
            <button
              className={page === "listings" ? "nav-link active" : "nav-link"}
              onClick={() => navigate("listings")}
              type="button"
            >
              Listings
            </button>
          </nav>
          <button
            className="button primary"
            onClick={() => navigate("create")}
            style={buttonRecipe.primary}
            type="button"
          >
            <Tag size={16} />
            Create listing
          </button>
        </div>
      </header>

      <main className="main-content">
        {notice ? (
          <div className={`notice ${notice.tone}`} role="status">
            {notice.message}
          </div>
        ) : null}

        {page === "home" ? (
          <HomePage
            averageDiscount={averageDiscount}
            listingCount={listings.length}
            onCreate={() => navigate("create")}
            onStart={() => navigate("listings")}
          />
        ) : null}

        {page === "listings" ? (
          <ListingsPage
            averageDiscount={averageDiscount}
            favorites={favorites}
            filteredListings={filteredListings}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onSelectListing={setSelectedListing}
            query={query}
            selectedCategory={selectedCategory}
            selectedCondition={selectedCondition}
            selectedListing={selectedListing}
            setQuery={setQuery}
            setSelectedCategory={setSelectedCategory}
            setSelectedCondition={setSelectedCondition}
            toggleFavorite={toggleFavorite}
            onNotice={setNotice}
          />
        ) : null}

        {page === "create" ? (
          <CreateListingPage
            formPrice={formPrice}
            formTitle={formTitle}
            onCancel={() => navigate("listings")}
            onSubmit={handleCreateListing}
            setFormPrice={setFormPrice}
            setFormTitle={setFormTitle}
          />
        ) : null}
      </main>

      <footer className="site-footer" style={componentRecipe.footer}>
        <div className="page-width footer-inner">
          <span>Thrift Store</span>
          <span>Support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
    </div>
  );
}

function webThemeVars(theme: ThemeOption): ThemeVars {
  return {
    "--color-page": theme.tokens.page,
    "--color-surface": theme.tokens.surface,
    "--color-secondary-surface": theme.tokens.raised,
    "--color-header": theme.tokens.header,
    "--color-header-border": theme.tokens.headerBorder,
    "--color-footer": theme.tokens.footer,
    "--color-primary-text": theme.tokens.text,
    "--color-secondary-text": theme.tokens.mutedText,
    "--color-placeholder-text": theme.tokens.subtleText,
    "--color-border": theme.tokens.border,
    "--color-focus-ring": theme.tokens.accent,
    "--color-brand": theme.tokens.accent,
    "--color-hover": theme.tokens.hover,
    "--color-primary-button": theme.tokens.primaryButton,
    "--color-primary-button-text": theme.tokens.primaryButtonText,
    "--color-selected-button": theme.tokens.selectedButton,
    "--color-selected-button-text": theme.tokens.selectedButtonText,
    "--color-success": theme.tokens.success,
    "--color-success-soft": softColor(theme.tokens.success, theme.tokens.page),
    "--color-warning": theme.tokens.warning,
    "--color-warning-soft": softColor(theme.tokens.warning, theme.tokens.page),
    "--color-info": theme.tokens.info,
    "--color-info-soft": softColor(theme.tokens.info, theme.tokens.page),
    "--font-family": theme.fontFamily,
    "--line-height": "1.2",
    "--font-heading": "700",
    "--font-body": "500",
    "--border-width": theme.tokens.buttonBorderWidth,
    "--label-border-width": theme.tokens.labelBorderWidth,
    "--radius-card": theme.tokens.boxRadius,
    "--radius-input": theme.tokens.buttonRadius,
    "--radius-button": theme.tokens.buttonRadius,
    "--radius-button-large": theme.tokens.buttonRadius,
    "--radius-badge": theme.tokens.labelRadius,
    "--motion-hover": "120ms ease",
    "--motion-base": "200ms ease",
  };
}

function softColor(color: string, page: string) {
  return `color-mix(in srgb, ${color} 12%, ${page})`;
}

function HomePage({
  averageDiscount,
  listingCount,
  onCreate,
  onStart,
}: {
  averageDiscount: number;
  listingCount: number;
  onCreate: () => void;
  onStart: () => void;
}) {
  return (
    <section className="home-page page-width">
      <div className="home-copy">
        <p className="section-label">Second hand clothing marketplace</p>
        <h1>Find quality clothing from trusted sellers.</h1>
        <p>
          Browse pre-loved coats, denim, knitwear, shoes, and accessories with clear condition,
          price, seller, and location details before you make an offer.
        </p>
        <div className="home-actions">
          <button className="button primary large" onClick={onStart} style={buttonRecipe.primary}>
            Browse listings
          </button>
          <button className="button secondary large" onClick={onCreate} style={buttonRecipe.secondary}>
            Create listing
          </button>
        </div>
      </div>
      <div className="home-preview" style={componentRecipe.card} aria-label="Marketplace summary">
        <div>
          <span>Active listings</span>
          <strong>{listingCount}</strong>
        </div>
        <div>
          <span>Average retail savings</span>
          <strong>{averageDiscount}%</strong>
        </div>
        <div>
          <span>Categories</span>
          <strong>5</strong>
        </div>
      </div>
    </section>
  );
}

function ListingsPage({
  averageDiscount,
  favorites,
  filteredListings,
  isLoading,
  onNotice,
  onRefresh,
  onSelectListing,
  query,
  selectedCategory,
  selectedCondition,
  selectedListing,
  setQuery,
  setSelectedCategory,
  setSelectedCondition,
  toggleFavorite,
}: {
  averageDiscount: number;
  favorites: number[];
  filteredListings: Listing[];
  isLoading: boolean;
  onNotice: (notice: Notice) => void;
  onRefresh: () => void;
  onSelectListing: (listing: Listing) => void;
  query: string;
  selectedCategory: (typeof categories)[number];
  selectedCondition: (typeof conditions)[number];
  selectedListing: Listing;
  setQuery: (query: string) => void;
  setSelectedCategory: (category: (typeof categories)[number]) => void;
  setSelectedCondition: (condition: (typeof conditions)[number]) => void;
  toggleFavorite: (id: number) => void;
}) {
  return (
    <section className="listings-page page-width">
      <div className="page-heading">
        <div>
          <p className="section-label">Listings</p>
          <h1>Browse pre-loved pieces</h1>
        </div>
        <button className="button secondary" onClick={onRefresh} style={buttonRecipe.secondary}>
          Refresh
        </button>
      </div>

      <div className="summary-row" aria-label="Listings summary">
        <SummaryItem label="Results" value={String(filteredListings.length)} />
        <SummaryItem label="Saved" value={String(favorites.length)} />
        <SummaryItem label="Average retail savings" value={`${averageDiscount}%`} />
      </div>

      <div className="filters-panel" style={componentRecipe.card}>
        <label className="field search-field">
          <span>Search</span>
          <div className="input-shell" style={componentRecipe.input}>
            <Search size={18} />
            <input
              value={query}
              onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
              placeholder="Search brand, item, or city"
              type="search"
            />
            {query ? (
              <button className="icon-button" aria-label="Clear search" onClick={() => setQuery("")} type="button">
                <X size={16} />
              </button>
            ) : null}
          </div>
        </label>

        <div className="field category-field">
          <span>Category</span>
          <div className="segmented-control" role="group" aria-label="Category">
            {categories.map((category) => (
              <button
                className={selectedCategory === category ? "active" : ""}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <label className="field condition-field">
          <span>Condition</span>
          <select
            style={componentRecipe.input}
            value={selectedCondition}
            onChange={(event: { target: { value: string } }) =>
              setSelectedCondition(event.target.value as (typeof conditions)[number])
            }
          >
            {conditions.map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="state-card loading-state" style={componentRecipe.card}>
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className="market-layout">
          <section className="listing-grid" aria-label="Clothing listings">
            {filteredListings.map((listing) => (
              <ListingCard
                isFavorite={favorites.includes(listing.id)}
                isSelected={selectedListing.id === listing.id}
                key={listing.id}
                listing={listing}
                onSelect={() => onSelectListing(listing)}
                toggleFavorite={() => toggleFavorite(listing.id)}
              />
            ))}

            {filteredListings.length === 0 ? (
              <div className="state-card" style={componentRecipe.card}>
                <PackageCheck size={22} />
                <h2>No listings match these filters.</h2>
                <p>Clear search or choose a broader category to view available pieces.</p>
              </div>
            ) : null}
          </section>

          <ListingDetail
            isFavorite={favorites.includes(selectedListing.id)}
            listing={selectedListing}
            onMakeOffer={() =>
              onNotice({ tone: "info", message: `Offer started for ${selectedListing.title}.` })
            }
            onMessage={() =>
              onNotice({ tone: "info", message: `Message draft opened for ${selectedListing.seller}.` })
            }
            toggleFavorite={() => toggleFavorite(selectedListing.id)}
          />
        </div>
      )}
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-item" style={componentRecipe.card}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ListingCard({
  isFavorite,
  isSelected,
  listing,
  onSelect,
  toggleFavorite,
}: {
  key?: number;
  isFavorite: boolean;
  isSelected: boolean;
  listing: Listing;
  onSelect: () => void;
  toggleFavorite: () => void;
}) {
  return (
    <article className={isSelected ? "listing-card selected" : "listing-card"} style={componentRecipe.card}>
      <button className="card-media" onClick={onSelect} type="button">
        <img alt={listing.title} src={listing.image} />
      </button>
      <div className="listing-body">
        <button className="listing-title-button" onClick={onSelect} type="button">
          <span>{listing.title}</span>
          <small>{listing.brand}</small>
        </button>
        <button
          aria-label={isFavorite ? `Remove ${listing.title} from saved listings` : `Save ${listing.title}`}
          className={isFavorite ? "icon-button favorite active" : "icon-button favorite"}
          onClick={toggleFavorite}
          type="button"
        >
          <Heart size={18} fill="currentColor" />
        </button>
      </div>
      <div className="listing-price">
        <strong>{currency.format(listing.price)}</strong>
        <span>{currency.format(listing.originalPrice)} retail</span>
      </div>
      <footer className="badge-row">
        <Badge variant={conditionVariant(listing.condition)}>{listing.condition}</Badge>
        <Badge>{listing.size}</Badge>
        <Badge>{listing.category}</Badge>
      </footer>
    </article>
  );
}

function ListingDetail({
  isFavorite,
  listing,
  onMakeOffer,
  onMessage,
  toggleFavorite,
}: {
  isFavorite: boolean;
  listing: Listing;
  onMakeOffer: () => void;
  onMessage: () => void;
  toggleFavorite: () => void;
}) {
  return (
    <aside className="detail-panel" style={componentRecipe.card} aria-label="Selected listing details">
      <img alt={listing.title} src={listing.image} />
      <div className="detail-content">
        <div className="detail-heading">
          <div>
            <p>{listing.brand}</p>
            <h2>{listing.title}</h2>
          </div>
          <button
            aria-label={isFavorite ? "Remove selected listing from saved listings" : "Save selected listing"}
            className={isFavorite ? "icon-button favorite active" : "icon-button favorite"}
            onClick={toggleFavorite}
            type="button"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        </div>

        <div className="price-row">
          <strong>{currency.format(listing.price)}</strong>
          <span>{currency.format(listing.originalPrice)} retail</span>
        </div>

        <p className="description">{listing.description}</p>

        <dl className="spec-grid">
          <SpecItem label="Size" value={listing.size} />
          <SpecItem label="Condition" value={listing.condition} />
          <SpecItem label="Material" value={listing.material} />
          <SpecItem label="Color" value={listing.color} />
        </dl>

        <div className="badge-row">
          {listing.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="seller-row">
          <div className="avatar">{listing.seller.charAt(0)}</div>
          <div>
            <strong>{listing.seller}</strong>
            <span>
              <Star size={15} fill="currentColor" />
              {listing.sellerRating.toFixed(1)}
            </span>
          </div>
          <p>
            <MapPin size={15} />
            {listing.location}
          </p>
        </div>

        <div className="detail-actions">
          <button className="button primary" onClick={onMakeOffer} style={buttonRecipe.primary}>
            Make offer
          </button>
          <button className="button secondary" onClick={onMessage} style={buttonRecipe.secondary}>
            Message seller
          </button>
        </div>
      </div>
    </aside>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Badge({
  children,
  variant = "neutral",
}: {
  key?: string;
  children: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "info";
}) {
  return (
    <span className="badge" style={componentRecipe.badge[variant]}>
      {children}
    </span>
  );
}

function conditionVariant(condition: Listing["condition"]): "success" | "warning" | "info" {
  if (condition === "Like new" || condition === "Excellent") {
    return "success";
  }
  if (condition === "Worn in") {
    return "warning";
  }
  return "info";
}

function CreateListingPage({
  formPrice,
  formTitle,
  onCancel,
  onSubmit,
  setFormPrice,
  setFormTitle,
}: {
  formPrice: string;
  formTitle: string;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setFormPrice: (value: string) => void;
  setFormTitle: (value: string) => void;
}) {
  return (
    <section className="create-page page-width">
      <div className="page-heading">
        <div>
          <p className="section-label">Create listing</p>
          <h1>Add a clothing item.</h1>
        </div>
      </div>

      <form className="listing-form" onSubmit={onSubmit} style={componentRecipe.card}>
        <label className="field">
          <span>Title</span>
          <input
            style={componentRecipe.input}
            value={formTitle}
            onChange={(event: { target: { value: string } }) => setFormTitle(event.target.value)}
            placeholder="Vintage denim jacket"
            required
          />
        </label>
        <label className="field">
          <span>Brand</span>
          <input style={componentRecipe.input} placeholder="Brand or maker" />
        </label>
        <label className="field">
          <span>Category</span>
          <select style={componentRecipe.input} defaultValue="Outerwear">
            {categories.slice(1).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Condition</span>
          <select style={componentRecipe.input} defaultValue="Excellent">
            {conditions.slice(1).map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Size</span>
          <input style={componentRecipe.input} placeholder="M" />
        </label>
        <label className="field">
          <span>Price</span>
          <input
            inputMode="decimal"
            style={componentRecipe.input}
            value={formPrice}
            onChange={(event: { target: { value: string } }) => setFormPrice(event.target.value)}
            placeholder="68.00"
            required
          />
        </label>
        <label className="field wide">
          <span>Location</span>
          <input style={componentRecipe.input} placeholder="Brooklyn, NY" />
        </label>
        <label className="field wide">
          <span>Description</span>
          <textarea placeholder="Add condition notes, fit, fabric, and pickup details." />
        </label>
        <div className="form-actions">
          <button className="button secondary" onClick={onCancel} style={buttonRecipe.secondary} type="button">
            Cancel
          </button>
          <button className="button primary" style={buttonRecipe.primary} type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

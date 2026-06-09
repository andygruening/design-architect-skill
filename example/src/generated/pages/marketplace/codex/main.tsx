import { StrictMode } from "react";
import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  X,
} from "lucide-react";
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

export function CodexMarketplaceApp() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [selectedCondition, setSelectedCondition] = useState<(typeof conditions)[number]>("Any");
  const [query, setQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing>(listings[0]);
  const [favorites, setFavorites] = useState<number[]>([1, 6]);

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

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Marketplace controls">
        <div className="brand-lockup">
          <span className="brand-mark">
            <ShoppingBag size={22} />
          </span>
          <div>
            <p className="eyebrow">Second hand clothing</p>
            <h1>Thrift Store</h1>
          </div>
        </div>

        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
            placeholder="Search brand, item, city"
            type="search"
          />
          {query ? (
            <button aria-label="Clear search" onClick={() => setQuery("")} type="button">
              <X size={16} />
            </button>
          ) : null}
        </label>

        <section className="control-group" aria-labelledby="category-heading">
          <div className="control-title">
            <SlidersHorizontal size={17} />
            <h2 id="category-heading">Category</h2>
          </div>
          <div className="segmented-list">
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
        </section>

        <section className="control-group" aria-labelledby="condition-heading">
          <div className="control-title">
            <Sparkles size={17} />
            <h2 id="condition-heading">Condition</h2>
          </div>
          <select
            value={selectedCondition}
            onChange={(event: { target: { value: string } }) =>
              setSelectedCondition(event.target.value as (typeof conditions)[number])
            }
          >
            {conditions.map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </section>

        <div className="market-stats">
          <div>
            <strong>{listings.length}</strong>
            <span>Listings</span>
          </div>
          <div>
            <strong>{averageDiscount}%</strong>
            <span>Avg. off retail</span>
          </div>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Fresh finds</p>
            <h2>Browse pre-loved pieces</h2>
          </div>
          <button className="sell-button" type="button">
            <Tag size={18} />
            List an item
          </button>
        </header>

        <div className="market-layout">
          <section className="listing-grid" aria-label="Clothing listings">
            {filteredListings.map((listing) => (
              <article
                className={selectedListing.id === listing.id ? "listing-card selected" : "listing-card"}
                key={listing.id}
              >
                <button
                  className="card-action"
                  onClick={() => setSelectedListing(listing)}
                  type="button"
                >
                  <img alt={listing.title} src={listing.image} />
                  <span className="condition-pill">{listing.condition}</span>
                  <span className="price-chip">${listing.price}</span>
                </button>
                <div className="listing-body">
                  <div>
                    <h3>{listing.title}</h3>
                    <p>{listing.brand}</p>
                  </div>
                  <button
                    aria-label={
                      favorites.includes(listing.id)
                        ? `Remove ${listing.title} from favorites`
                        : `Add ${listing.title} to favorites`
                    }
                    className={favorites.includes(listing.id) ? "favorite active" : "favorite"}
                    onClick={() => toggleFavorite(listing.id)}
                    type="button"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <footer className="listing-meta">
                  <span>{listing.size}</span>
                  <span>{listing.category}</span>
                  <span>{listing.color}</span>
                </footer>
              </article>
            ))}

            {filteredListings.length === 0 ? (
              <div className="empty-state">
                <PackageCheck size={26} />
                <p>No listings match these filters.</p>
              </div>
            ) : null}
          </section>

          <aside className="detail-panel" aria-label="Selected listing details">
            <img alt={selectedListing.title} src={selectedListing.image} />
            <div className="detail-content">
              <div className="detail-heading">
                <div>
                  <p>{selectedListing.brand}</p>
                  <h2>{selectedListing.title}</h2>
                </div>
                <button
                  aria-label="Save selected listing"
                  className={favorites.includes(selectedListing.id) ? "favorite active" : "favorite"}
                  onClick={() => toggleFavorite(selectedListing.id)}
                  type="button"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>

              <div className="price-row">
                <strong>${selectedListing.price}</strong>
                <span>${selectedListing.originalPrice} retail</span>
              </div>

              <p className="description">{selectedListing.description}</p>

              <dl className="spec-grid">
                <div>
                  <dt>Size</dt>
                  <dd>{selectedListing.size}</dd>
                </div>
                <div>
                  <dt>Condition</dt>
                  <dd>{selectedListing.condition}</dd>
                </div>
                <div>
                  <dt>Material</dt>
                  <dd>{selectedListing.material}</dd>
                </div>
                <div>
                  <dt>Color</dt>
                  <dd>{selectedListing.color}</dd>
                </div>
              </dl>

              <div className="tag-row">
                {selectedListing.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="seller-row">
                <div className="avatar">{selectedListing.seller.charAt(0)}</div>
                <div>
                  <strong>{selectedListing.seller}</strong>
                  <span>
                    <Star size={15} fill="currentColor" />
                    {selectedListing.sellerRating.toFixed(1)}
                  </span>
                </div>
                <p>
                  <MapPin size={15} />
                  {selectedListing.location}
                </p>
              </div>

              <div className="detail-actions">
                <button type="button">Make offer</button>
                <button type="button">Message seller</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

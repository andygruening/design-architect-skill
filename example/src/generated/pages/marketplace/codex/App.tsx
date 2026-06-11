import "./styles.css"

import { FormEvent, useMemo, useState } from "react";

type Category = "Outerwear" | "Tops" | "Bottoms" | "Dresses" | "Shoes" | "Accessories";
type Condition = "New with tags" | "Like new" | "Good" | "Loved";
type Size = "XS" | "S" | "M" | "L" | "XL" | "6" | "7" | "8" | "9" | "10" | "One Size";

type Listing = {
  id: number;
  title: string;
  brand: string;
  category: Category;
  size: Size;
  condition: Condition;
  price: number;
  seller: string;
  city: string;
  color: string;
  material: string;
  image: string;
  notes: string;
};

type DraftListing = {
  title: string;
  brand: string;
  category: Category;
  size: Size;
  condition: Condition;
  price: string;
  color: string;
  material: string;
  notes: string;
};

const categories: Category[] = ["Outerwear", "Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];
const sizes: Size[] = ["XS", "S", "M", "L", "XL", "6", "7", "8", "9", "10", "One Size"];
const conditions: Condition[] = ["New with tags", "Like new", "Good", "Loved"];

const initialListings: Listing[] = [
  {
    id: 1,
    title: "Wool wrap coat",
    brand: "Aritzia",
    category: "Outerwear",
    size: "M",
    condition: "Like new",
    price: 118,
    seller: "Maya",
    city: "Brooklyn",
    color: "#7b604f",
    material: "Italian wool blend",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
    notes: "Dry cleaned, relaxed fit, includes waist tie.",
  },
  {
    id: 2,
    title: "Vintage denim jacket",
    brand: "Levi's",
    category: "Outerwear",
    size: "L",
    condition: "Good",
    price: 64,
    seller: "Theo",
    city: "Austin",
    color: "#5f7791",
    material: "Rigid cotton denim",
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80",
    notes: "Classic trucker cut with light sleeve fading.",
  },
  {
    id: 3,
    title: "Silk bias skirt",
    brand: "Reformation",
    category: "Bottoms",
    size: "S",
    condition: "Like new",
    price: 72,
    seller: "Nora",
    city: "Seattle",
    color: "#1e3932",
    material: "Silk charmeuse",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
    notes: "Midi length, no visible wear.",
  },
  {
    id: 4,
    title: "Leather loafers",
    brand: "G.H. Bass",
    category: "Shoes",
    size: "8",
    condition: "Good",
    price: 58,
    seller: "June",
    city: "Chicago",
    color: "#2f241d",
    material: "Polished leather",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    notes: "Fresh soles, minor creasing on vamp.",
  },
  {
    id: 5,
    title: "Linen camp shirt",
    brand: "Everlane",
    category: "Tops",
    size: "M",
    condition: "Loved",
    price: 26,
    seller: "Amir",
    city: "Portland",
    color: "#c5b28d",
    material: "Washed linen",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
    notes: "Soft, airy fabric with one tiny repaired cuff stitch.",
  },
  {
    id: 6,
    title: "Beaded mini bag",
    brand: "Shrimps",
    category: "Accessories",
    size: "One Size",
    condition: "New with tags",
    price: 92,
    seller: "Iris",
    city: "Los Angeles",
    color: "#d7cab2",
    material: "Glass beads",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    notes: "Unused, lined interior, magnetic closure.",
  },
];

const defaultDraft: DraftListing = {
  title: "",
  brand: "",
  category: "Tops",
  size: "M",
  condition: "Good",
  price: "",
  color: "#4f6f64",
  material: "",
  notes: "",
};

export function CodexMarketplaceApp() {
  const [listings, setListings] = useState(initialListings);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [cart, setCart] = useState<number[]>([]);
  const [draft, setDraft] = useState<DraftListing>(defaultDraft);

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesCategory = category === "All" || listing.category === category;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [listing.title, listing.brand, listing.seller, listing.material, listing.city]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [category, listings, query]);

  const cartListings = listings.filter((listing) => cart.includes(listing.id));
  const cartTotal = cartListings.reduce((total, listing) => total + listing.price, 0);

  function addToCart(id: number) {
    setCart((current) => (current.includes(id) ? current : [...current, id]));
  }

  function removeFromCart(id: number) {
    setCart((current) => current.filter((cartId) => cartId !== id));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim() || !draft.brand.trim() || !draft.price.trim()) {
      return;
    }

    const price = Number(draft.price);
    if (!Number.isFinite(price) || price <= 0) {
      return;
    }

    setListings((current) => [
      {
        id: Math.max(...current.map((listing) => listing.id)) + 1,
        title: draft.title.trim(),
        brand: draft.brand.trim(),
        category: draft.category,
        size: draft.size,
        condition: draft.condition,
        price: Math.round(price),
        seller: "You",
        city: "Local pickup",
        color: draft.color,
        material: draft.material.trim() || "Mixed materials",
        image:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
        notes: draft.notes.trim() || "Freshly listed secondhand piece.",
      },
      ...current,
    ]);
    setDraft(defaultDraft);
  }

  return (
    <main className="app-shell">
      <section className="market-header" aria-labelledby="market-title">
        <div className="header-copy">
          <span className="eyebrow">Circular style marketplace</span>
          <h1 id="market-title">Threadly Market</h1>
          <p>
            Buy verified secondhand clothing, list closet finds, and keep quality garments in motion.
          </p>
        </div>
        <div className="market-stats" aria-label="Marketplace summary">
          <div>
            <strong>{listings.length}</strong>
            <span>active listings</span>
          </div>
          <div>
            <strong>${Math.round(listings.reduce((total, item) => total + item.price, 0) / listings.length)}</strong>
            <span>average price</span>
          </div>
          <div>
            <strong>{cart.length}</strong>
            <span>in bag</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <div className="browse-panel">
          <div className="toolbar" aria-label="Browse controls">
            <label className="search-box">
              <span>Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Brand, material, seller..."
              />
            </label>
            <div className="category-tabs" aria-label="Category filter">
              {(["All", ...categories] as const).map((item) => (
                <button
                  className={category === item ? "active" : ""}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="listing-grid" aria-label="Available clothing listings">
            {filteredListings.map((listing) => {
              const isInCart = cart.includes(listing.id);

              return (
                <article className="listing-card" key={listing.id}>
                  <div className="image-frame">
                    <img src={listing.image} alt={`${listing.brand} ${listing.title}`} />
                    <span className="condition">{listing.condition}</span>
                  </div>
                  <div className="listing-body">
                    <div>
                      <p className="brand">{listing.brand}</p>
                      <h2>{listing.title}</h2>
                    </div>
                    <div className="listing-meta">
                      <span>{listing.category}</span>
                      <span>Size {listing.size}</span>
                      <span>{listing.city}</span>
                    </div>
                    <p className="notes">{listing.notes}</p>
                    <div className="listing-footer">
                      <div>
                        <span className="seller">Sold by {listing.seller}</span>
                        <strong>${listing.price}</strong>
                      </div>
                      <button
                        className={isInCart ? "secondary-button" : "primary-button"}
                        onClick={() => (isInCart ? removeFromCart(listing.id) : addToCart(listing.id))}
                        type="button"
                      >
                        {isInCart ? "Remove" : "Add"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="side-panel" aria-label="Sell and purchase tools">
          <section className="checkout-panel" aria-labelledby="bag-title">
            <div className="panel-title">
              <h2 id="bag-title">Purchase Bag</h2>
              <span>{cart.length} item{cart.length === 1 ? "" : "s"}</span>
            </div>
            {cartListings.length === 0 ? (
              <p className="empty-state">Add listings to reserve them before checkout.</p>
            ) : (
              <div className="bag-items">
                {cartListings.map((listing) => (
                  <div className="bag-row" key={listing.id}>
                    <span className="color-dot" style={{ backgroundColor: listing.color }} />
                    <div>
                      <strong>{listing.title}</strong>
                      <span>{listing.brand}</span>
                    </div>
                    <button onClick={() => removeFromCart(listing.id)} type="button" aria-label={`Remove ${listing.title}`}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="checkout-total">
              <span>Estimated total</span>
              <strong>${cartTotal}</strong>
            </div>
            <button className="checkout-button" disabled={cart.length === 0} type="button">
              Checkout
            </button>
          </section>

          <section className="sell-panel" aria-labelledby="sell-title">
            <div className="panel-title">
              <h2 id="sell-title">List an Item</h2>
              <span>Seller tools</span>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Item name
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  placeholder="Cashmere cardigan"
                />
              </label>
              <label>
                Brand
                <input
                  value={draft.brand}
                  onChange={(event) => setDraft({ ...draft, brand: event.target.value })}
                  placeholder="Brand or designer"
                />
              </label>
              <div className="form-row">
                <label>
                  Category
                  <select
                    value={draft.category}
                    onChange={(event) => setDraft({ ...draft, category: event.target.value as Category })}
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Size
                  <select
                    value={draft.size}
                    onChange={(event) => setDraft({ ...draft, size: event.target.value as Size })}
                  >
                    {sizes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Condition
                  <select
                    value={draft.condition}
                    onChange={(event) => setDraft({ ...draft, condition: event.target.value as Condition })}
                  >
                    {conditions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Price
                  <input
                    inputMode="numeric"
                    value={draft.price}
                    onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                    placeholder="48"
                  />
                </label>
              </div>
              <div className="form-row tight">
                <label>
                  Swatch
                  <input
                    type="color"
                    value={draft.color}
                    onChange={(event) => setDraft({ ...draft, color: event.target.value })}
                  />
                </label>
                <label>
                  Material
                  <input
                    value={draft.material}
                    onChange={(event) => setDraft({ ...draft, material: event.target.value })}
                    placeholder="Cotton"
                  />
                </label>
              </div>
              <label>
                Notes
                <textarea
                  value={draft.notes}
                  onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
                  placeholder="Fit, flaws, tailoring, pickup notes..."
                />
              </label>
              <button className="primary-button full-width" type="submit">
                Publish Listing
              </button>
            </form>
          </section>
        </aside>
      </section>
    </main>
  );
}


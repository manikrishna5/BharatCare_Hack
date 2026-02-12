import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { medicines } from "../medicines";
import { addToCart } from "../utils/cart";
import { useRef } from "react";
import { getCart, updateQty } from "../utils/cart";
const name = localStorage.getItem("name") || "User";
const email = localStorage.getItem("email") || "user@email.com";
const initials = name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);

const UserDashboard = () => {
  const cart = getCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "all", name: "All Medicines", icon: "💊" },
    { id: "pain", name: "Pain Relief", icon: "🩹" },
    { id: "cold", name: "Cold & Flu", icon: "🤧" },
    { id: "vitamins", name: "Vitamins", icon: "💪" },
  ];

  const quickActions = [
    {
      title: "View Cart",
      description: "See items added to your cart",
      icon: "🛒",
      action: () => navigate("/user/cart"),
      accent: "#0EA5E9",
    },
    {
      title: "Consult Doctor",
      description: "Connect with licensed healthcare professionals",
      icon: "👨‍⚕️",
      action: () => navigate("/user/consult"),
      accent: "#3DA8B5",
    },
    {
      title: "Upload Prescription",
      description: "Upload and manage your prescriptions",
      icon: "📋",
      action: () => navigate("/user/upload-prescription"),
      accent: "#2E96A2",
    },
    {
      title: "Order History",
      description: "Track and review your past orders",
      icon: "📦",
      action: () => navigate("/user/orders"),
      accent: "#1F8490",
    },
  ];

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.loaderWrapper}>
            <div style={styles.loaderRing}></div>
            <div style={styles.loaderInner}>
              <img
                src="/Bharath Care Logo.png"
                alt="BharathCare"
                style={styles.loaderLogo}
              />
            </div>
          </div>
          <p style={styles.loadingText}>Loading your dashboard...</p>
          <p style={styles.loadingSubtext}>BharathCare — Trusted Healthcare</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Subtle top accent bar */}
      <div style={styles.topAccent} />

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.brandRow}>
              <div style={styles.brandDot} />
              <span style={styles.brandLabel}>BharathCare</span>
            </div>
            <h2 style={styles.title}>Welcome back! 👋</h2>
            <p style={styles.subtitle}>How can we help you today?</p>
          </div>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              <span style={styles.avatarText}>{initials}</span>{" "}
            </div>
            <div>
              <p style={styles.userName}>{name}</p>
              <p style={styles.userEmail}>{email}</p>
              <div style={styles.userBadge}>
                <span style={styles.userBadgeDot} />
                <span style={styles.userBadgeText}>Active Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={styles.statsStrip}>
          {[
            { label: "Orders Placed", value: "12", icon: "📦" },
            { label: "Prescriptions", value: "3", icon: "📋" },
            { label: "Consultations", value: "5", icon: "👨‍⚕️" },
            { label: "Health Score", value: "92%", icon: "❤️" },
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <span style={styles.statIcon}>{stat.icon}</span>
              <div>
                <p style={styles.statValue}>{stat.value}</p>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionAccentBar} />
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
          </div>
          <div style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <div
                key={index}
                style={{
                  ...styles.actionCard,
                  ...(hoveredAction === index ? styles.actionCardHover : {}),
                }}
                onClick={action.action}
                onMouseEnter={() => setHoveredAction(index)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                <div
                  style={{
                    ...styles.actionIconWrap,
                    backgroundColor: `${action.accent}18`,
                    border: `1.5px solid ${action.accent}30`,
                  }}
                >
                  <span style={styles.actionEmoji}>{action.icon}</span>
                </div>
                <div style={styles.actionContent}>
                  <h4 style={styles.actionTitle}>{action.title}</h4>
                  <p style={styles.actionDescription}>{action.description}</p>
                </div>
                <div
                  style={{
                    ...styles.actionArrow,
                    color: hoveredAction === index ? action.accent : "#CBD5E1",
                  }}
                >
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Search Section */}
        <div style={styles.section}>
          <div style={styles.searchHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={styles.sectionAccentBar} />
              <h3 style={styles.sectionTitle}>Browse Medicines</h3>
            </div>
            <span style={styles.medicineCount}>
              {filteredMedicines.length} medicines available
            </span>
          </div>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for medicines, supplements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                ...styles.searchInput,
                ...(searchFocused ? styles.searchInputFocused : {}),
              }}
            />
            {search && (
              <button style={styles.clearButton} onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* Categories */}
          <div style={styles.categoriesContainer}>
            {categories.map((category) => (
              <button
                key={category.id}
                style={{
                  ...styles.categoryChip,
                  ...(selectedCategory === category.id
                    ? styles.categoryChipActive
                    : {}),
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Medicine List */}
          <div style={styles.medicineList}>
            {filteredMedicines.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIconWrap}>
                  <span style={styles.emptyIcon}>🔍</span>
                </div>
                <p style={styles.emptyText}>No medicines found</p>
                <p style={styles.emptySubtext}>
                  Try searching with a different keyword
                </p>
              </div>
            ) : (
              filteredMedicines.map((med, idx) => {
                const cartItem = cart.find((c: any) => c.id === med.id);

                return (
                  <div
                    key={med.id}
                    style={{
                      ...styles.medicineCard,
                      ...(idx === filteredMedicines.length - 1
                        ? { borderBottom: "none" }
                        : {}),
                    }}
                  >
                    <div style={styles.medicineIconWrap}>
                      <span style={styles.medicineIcon}>💊</span>
                    </div>

                    <div style={styles.medicineInfo}>
                      <h4 style={styles.medicineName}>{med.name}</h4>
                    </div>

                    <div style={styles.medicineAction}>
                      {cartItem ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() => {
                              updateQty(med.id, cartItem.qty - 1);
                              window.location.reload();
                            }}
                          >
                            ➖
                          </button>

                          <strong>{cartItem.qty}</strong>

                          <button
                            onClick={() => {
                              addToCart(med);
                              window.location.reload();
                            }}
                          >
                            ➕
                          </button>
                        </div>
                      ) : (
                        <button
                          style={styles.orderButton}
                          onClick={() => {
                            addToCart(med);
                            window.location.reload();
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Health Tips Banner */}
        <div style={styles.tipsBanner}>
          <div style={styles.tipsIconWrap}>
            <span style={{ fontSize: "22px" }}>💡</span>
          </div>
          <div style={styles.tipsContent}>
            <h4 style={styles.tipsTitle}>Health Tip of the Day</h4>
            <p style={styles.tipsText}>
              Stay hydrated! Drink at least 8 glasses of water daily for better
              health and well-being. Consistent hydration supports kidney
              function, improves energy levels, and helps maintain healthy skin.
            </p>
          </div>
          <div style={styles.tipsBadge}>BharathCare</div>
        </div>

        {/* Footer note */}
        <div style={styles.footerNote}>
          <span>© 2024 BharathCare — Trusted Healthcare Platform</span>
          <span style={styles.footerDivider}>|</span>
          <span>All medicines are sourced from verified pharmacies</span>
        </div>
  </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  // ─── Layout ───────────────────────────────────────────────────────────────
  container: {
    minHeight: "100vh",
    backgroundColor: "#F4F7FB",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    position: "relative",
  },
  topAccent: {
    height: "4px",
    background: "linear-gradient(90deg, #1C2F5E 0%, #49B6C6 60%, #7EDCE2 100%)",
    width: "100%",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 20px 48px",
    animation: "fadeSlideUp 0.5s ease both",
  },

  // ─── Loading ──────────────────────────────────────────────────────────────
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px",
    backgroundColor: "#F4F7FB",
  },
  loaderWrapper: {
    position: "relative",
    width: "84px",
    height: "84px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
  },
  loaderRing: {
    position: "absolute",
    inset: 0,
    border: "3px solid #E2EAF4",
    borderTop: "3px solid #49B6C6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loaderInner: {
    width: "52px",
    height: "52px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(28,47,94,0.12)",
    overflow: "hidden",
  },
  loaderLogo: {
    width: "38px",
    height: "38px",
    objectFit: "contain" as const,
  },
  loadingText: {
    fontSize: "17px",
    color: "#1C2F5E",
    fontWeight: "600",
    margin: 0,
  },
  loadingSubtext: {
    fontSize: "13px",
    color: "#6B7280",
    margin: 0,
    letterSpacing: "0.5px",
  },

  // ─── Header ───────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "20px",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginBottom: "10px",
  },
  brandDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
  },
  brandLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#49B6C6",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "30px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#6B7280",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: "#FFFFFF",
    padding: "14px 22px",
    borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(28,47,94,0.08)",
    border: "1px solid #E8EEF6",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1C2F5E 0%, #49B6C6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: "white",
    fontSize: "17px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  userName: {
    margin: "0 0 2px 0",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1F2937",
  },
  userEmail: {
    margin: "0 0 6px 0",
    fontSize: "12px",
    color: "#6B7280",
  },
  userBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#EBF9FB",
    padding: "3px 9px",
    borderRadius: "20px",
  },
  userBadgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
  },
  userBadgeText: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#1C2F5E",
    letterSpacing: "0.3px",
  },

  // ─── Stats Strip ──────────────────────────────────────────────────────────
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
    marginBottom: "36px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8EEF6",
    borderRadius: "12px",
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 1px 6px rgba(28,47,94,0.06)",
  },
  statIcon: {
    fontSize: "26px",
    flexShrink: 0,
  },
  statValue: {
    margin: "0 0 2px 0",
    fontSize: "20px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  statLabel: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },

  // ─── Section ──────────────────────────────────────────────────────────────
  section: {
    marginBottom: "40px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  sectionAccentBar: {
    width: "4px",
    height: "22px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #49B6C6 0%, #1C2F5E 100%)",
    flexShrink: 0,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.2px",
  },

  // ─── Quick Actions ────────────────────────────────────────────────────────
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "14px",
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 1px 6px rgba(28,47,94,0.06)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "#E8EEF6",
    cursor: "pointer",
    transition: "all 0.22s ease",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  actionCardHover: {
    boxShadow: "0 6px 24px rgba(28,47,94,0.13)",
    borderColor: "#49B6C6",
    transform: "translateY(-2px)",
  },
  actionIconWrap: {
    width: "54px",
    height: "54px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  actionEmoji: {
    fontSize: "26px",
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    margin: "0 0 4px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#1C2F5E",
  },
  actionDescription: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    lineHeight: "1.5",
  },
  actionArrow: {
    fontSize: "20px",
    fontWeight: "700",
    transition: "color 0.2s",
    flexShrink: 0,
  },

  // ─── Medicine Search ──────────────────────────────────────────────────────
  searchHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
    gap: "12px",
  },
  medicineCount: {
    fontSize: "13px",
    color: "#1C2F5E",
    backgroundColor: "#EBF9FB",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "700",
    border: "1px solid #B8EBF0",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "18px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "14px 48px",
    fontSize: "14px",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  searchInputFocused: {
    borderColor: "#49B6C6",
    boxShadow: "0 0 0 3px rgba(73,182,198,0.12)",
  },
  clearButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "15px",
    color: "#9CA3AF",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  categoriesContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  categoryChip: {
    padding: "9px 16px",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    cursor: "pointer",
    transition: "all 0.18s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "inherit",
  },
  categoryChipActive: {
    backgroundColor: "#1C2F5E",
    color: "#FFFFFF",
    borderColor: "#1C2F5E",
  },

  // ─── Medicine List ────────────────────────────────────────────────────────
  medicineList: {
    backgroundColor: "#FFFFFF",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 1px 8px rgba(28,47,94,0.07)",
    border: "1.5px solid #E8EEF6",
  },
  emptyState: {
    textAlign: "center",
    padding: "52px 20px",
  },
  emptyIconWrap: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    backgroundColor: "#F4F7FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    border: "2px solid #E8EEF6",
  },
  emptyIcon: {
    fontSize: "32px",
  },
  emptyText: {
    margin: "0 0 8px 0",
    fontSize: "17px",
    fontWeight: "700",
    color: "#1C2F5E",
  },
  emptySubtext: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },
  medicineCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    borderBottom: "1px solid #F4F7FB",
    transition: "background-color 0.15s",
  },
  medicineIconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#EBF9FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "1px solid #B8EBF0",
  },
  medicineIcon: {
    fontSize: "22px",
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    margin: "0 0 3px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#1F2937",
  },
  medicineDetails: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },
  medicineAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
    flexShrink: 0,
  },
  orderButton: {
    padding: "8px 20px",
    backgroundColor: "#49B6C6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.18s",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  },

  // ─── Health Tips Banner ───────────────────────────────────────────────────
  tipsBanner: {
    background:
      "linear-gradient(135deg, #1C2F5E 0%, #2A4A7A 60%, #1A3A5C 100%)",
    borderRadius: "16px",
    padding: "24px 28px",
    display: "flex",
    gap: "18px",
    alignItems: "flex-start",
    boxShadow: "0 4px 20px rgba(28,47,94,0.18)",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
  },
  tipsIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "rgba(73,182,198,0.2)",
    border: "1px solid rgba(73,182,198,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    margin: "0 0 8px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#7EDCE2",
    letterSpacing: "0.3px",
  },
  tipsText: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(255,255,255,0.82)",
    lineHeight: "1.7",
  },
  tipsBadge: {
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(126,220,226,0.7)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    alignSelf: "flex-end",
    flexShrink: 0,
  },

  // ─── Footer Note ──────────────────────────────────────────────────────────
  footerNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "12px",
    color: "#9CA3AF",
    flexWrap: "wrap",
    paddingTop: "8px",
  },
  footerDivider: {
    color: "#D1D5DB",
  },
};

export default UserDashboard;

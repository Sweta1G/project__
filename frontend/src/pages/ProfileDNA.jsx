// ProfileDNA.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

// Colors
const traitColors = {
  Luxury: "#FFA726",
  Street: "#8A2BE2",
  Minimalist: "#808080",
  Boho: "#00CED1",
  Futuristic: "#1E90FF",
  Vintage: "#FF8C00"
};

const traitOrder = ["Luxury", "Street", "Minimalist", "Boho", "Futuristic", "Vintage"];

// ✅ Animated DNA Helix
const DNAVisualization = ({ traits, className = "", animated = true }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => setPhase((p) => (p + 1) % 360), 50);
    return () => clearInterval(interval);
  }, [animated]);

  const helixWidth = 60;
  const helixHeight = 300;
  const turns = 3;

  const generateStrandPath = (isLeft) => {
    let points = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const angle =
        t * Math.PI * 2 * turns + (isLeft ? 0 : Math.PI) + phase * 0.05;
      const x = Math.cos(angle) * (helixWidth / 2) + 100;
      const y = t * helixHeight + 10;
      points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return points.join(" ");
  };

  return (
    <svg width="220" height="320" className={className}>
      {/* Helix strands */}
      <path
        d={generateStrandPath(true)}
        stroke="#8B5CF6"
        strokeWidth="3"
        fill="none"
      />
      <path
        d={generateStrandPath(false)}
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
      />

      {/* Trait nodes */}
      {traits.map((trait, i) => {
        const t = (i + 1) / (traits.length + 1);
        const angle1 = t * Math.PI * 2 * turns + phase * 0.05;
        const angle2 = angle1 + Math.PI;
        const x1 = Math.cos(angle1) * (helixWidth / 2) + 100;
        const x2 = Math.cos(angle2) * (helixWidth / 2) + 100;
        const y = t * helixHeight + 10;

        return (
          <g key={trait.id}>
            <circle cx={x1} cy={y} r="8" fill={trait.color} />
            <circle cx={x2} cy={y} r="8" fill={trait.color} />
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <text x={x2 + 12} y={y + 4} fontSize="10" fill="#111">
              {trait.name} {trait.percentage}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Avatar card stays same
const AvatarCard = ({ orders }) => {
  const baseAvatar = {
    img: "/avatar-base.png",
    desc: "Your Avatar (undergarments)",
  };
  const closet = orders.map((p, i) => ({
    img: p.image_url,
    name: p.name || p.type,
    id: p.id + "-" + i,
  }));
  const [selected, setSelected] = React.useState(null);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 4px 32px #a259ff22",
        padding: "2rem",
        marginBottom: "2.5rem",
      }}
    >
      <h2
        style={{
          fontWeight: 900,
          fontSize: "1.5rem",
          marginBottom: "1.2rem",
          color: "#a259ff",
        }}
      >
        Your Avatar
      </h2>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 160px", textAlign: "center" }}>
          <img
            src={selected ? selected.img : baseAvatar.img}
            alt="Avatar"
            style={{
              width: 140,
              height: 180,
              objectFit: "contain",
              borderRadius: "16px",
              background: "#f7f7f7",
              border: "2px solid #eee",
            }}
          />
          <div style={{ marginTop: "0.7rem", fontWeight: 700, color: "#888" }}>
            {selected ? selected.name : baseAvatar.desc}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: "0.7rem" }}>
            Your Closet
          </div>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            {closet.length === 0 ? (
              <div style={{ color: "#bbb" }}>
                No items yet. Buy something to fill your closet!
              </div>
            ) : (
              closet.map((item) => (
                <div
                  key={item.id}
                  style={{ cursor: "pointer", textAlign: "center" }}
                  onClick={() => setSelected(item)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: "10px",
                      background: "#f7f7f7",
                      border: "2px solid #eee",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.95rem",
                      marginTop: "0.3rem",
                      color: "#a259ff",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDNA = () => {
  const [purchases, setPurchases] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [tab, setTab] = useState("overview");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderArr = localStorage.getItem("orderHistory");
    const orders = orderArr ? JSON.parse(orderArr) : [];
    setOrders(orders);
    if (!orders.length) {
      setPurchases(null);
      setEvolution([]);
      return;
    }
    const dna = {};
    orders.forEach((p) => {
      if (p.tags) {
        p.tags.forEach((tag) => {
          dna[tag] = (dna[tag] || 0) + 1;
        });
      }
    });
    const total = Object.values(dna).reduce((a, b) => a + b, 0);
    const traitPercent = {};
    Object.keys(dna).forEach((k) => {
      traitPercent[k] = Math.round((dna[k] / total) * 100);
    });
    setPurchases(traitPercent);

    const evo = orders
      .map((p) => ({
        date: p.orderDate || "N/A",
        action: `Bought ${p.name || p.type}`,
        trait: p.tags && p.tags[0],
        traitDelta:
          p.tags && traitPercent[p.tags[0]]
            ? `+${traitPercent[p.tags[0]]}% ${p.tags[0]}`
            : null,
      }))
      .reverse();
    setEvolution(evo);
  }, []);

  if (!purchases)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "3rem",
          fontSize: "1.3rem",
          color: "#888",
        }}
      >
        No DNA yet. Make a purchase to see your Fashion DNA!
      </p>
    );

  const data = {
    labels: traitOrder.filter((t) => purchases[t]),
    datasets: [
      {
        label: "Your Fashion DNA",
        data: traitOrder.filter((t) => purchases[t]).map((t) => purchases[t]),
        backgroundColor: traitOrder
          .filter((t) => purchases[t])
          .map((t) => traitColors[t]),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const sortedTraits = Object.entries(purchases).sort((a, b) => b[1] - a[1]);
  const mainTraits = sortedTraits.slice(0, 2).map(([k]) => k).join(" and ");
  const hints = sortedTraits.slice(2, 4).map(([k]) => k).join(", ");
  const styleIdentity = `You're a unique blend of ${mainTraits}${
    hints ? ` with hints of ${hints}` : ""
  }. This combination makes you a trendsetter who stands out!`;

  // ✅ Convert purchases -> traits array for helix
  const traitsArray = Object.entries(purchases).map(([name, percentage], i) => ({
    id: i,
    name,
    percentage,
    color: traitColors[name] || "#999",
  }));

  return (
    <div
      className="profile-dna-container"
      style={{
        maxWidth: "700px",
        margin: "2.5rem auto",
        background: "linear-gradient(90deg,#a259ff 0%,#fbc2eb 100%)",
        borderRadius: "18px",
        boxShadow: "0 4px 32px #a259ff22",
        padding: "2.5rem 2.2rem",
        color: "#222",
      }}
    >
      <AvatarCard orders={orders} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 900,
              fontSize: "2.1rem",
              marginBottom: "0.2rem",
              color: "#fff",
            }}
          >
            Your Fashion DNA
          </h2>
          <div style={{ color: "#fff", fontWeight: 600 }}>
            Evolution Score:{" "}
            {Object.values(purchases).reduce((a, b) => a + b, 0) * 10} |{" "}
            {evolution.length} mutations
          </div>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            fontSize: "2rem",
            color: "#fff",
            cursor: "pointer",
          }}
          title="Close"
          onClick={() => (window.location.href = "/")}
        >
          &times;
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "2.5rem", marginBottom: "2.2rem" }}>
        <button
          className={tab === "overview" ? "dna-tab-active" : "dna-tab"}
          onClick={() => setTab("overview")}
        >
          DNA Overview
        </button>
        <button
          className={tab === "evolution" ? "dna-tab-active" : "dna-tab"}
          onClick={() => setTab("evolution")}
        >
          Evolution
        </button>
        <button
          className={tab === "matches" ? "dna-tab-active" : "dna-tab"}
          onClick={() => setTab("matches")}
        >
          Find Matches
        </button>
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <Pie data={data} />
            <div style={{ marginTop: "1.5rem" }}>
              {traitOrder.filter((t) => purchases[t]).map((trait) => (
                <div
                  key={trait}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: traitColors[trait],
                      marginRight: 10,
                    }}
                  ></span>
                  <span
                    style={{ fontWeight: 700, fontSize: "1.1rem", color: "#222" }}
                  >
                    {trait}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontWeight: 700,
                      color: "#888",
                    }}
                  >
                    {purchases[trait]}%
                  </span>
                  <div
                    style={{
                      flex: 1,
                      marginLeft: 18,
                      background: "#eee",
                      height: 7,
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${purchases[trait]}%`,
                        height: 7,
                        background: traitColors[trait],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Style Identity + ✅ Animated Helix */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.15rem",
                marginBottom: "1.1rem",
              }}
            >
              Your Style Identity
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "1.2rem",
                fontSize: "1.08rem",
                color: "#a259ff",
                boxShadow: "0 2px 12px #a259ff11",
              }}
            >
              {styleIdentity}
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <DNAVisualization traits={traitsArray} animated={true} />
            </div>
          </div>
        </div>
      )}

      {/* Evolution */}
      {tab === "evolution" && (
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.15rem",
              marginBottom: "1.1rem",
            }}
          >
            DNA Evolution History
          </div>
          {evolution.length === 0 ? (
            <div style={{ color: "#888" }}>No evolution history yet.</div>
          ) : (
            evolution.map((evo, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.1rem",
                  marginBottom: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  boxShadow: "0 2px 12px #a259ff11",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: traitColors[evo.trait] || "#aaa",
                    marginRight: 8,
                  }}
                ></span>
                <span style={{ fontWeight: 600 }}>{evo.date}</span>
                <span style={{ marginLeft: 18 }}>{evo.action}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#43a047",
                    fontWeight: 700,
                  }}
                >
                  {evo.traitDelta}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Matches */}
      {tab === "matches" && (
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.15rem",
              marginBottom: "1.1rem",
            }}
          >
            Find Your Style Twin
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "2rem",
              fontSize: "1.08rem",
              color: "#a259ff",
              boxShadow: "0 2px 12px #a259ff11",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>
              &#128101;
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              Connect with people who share your fashion DNA and discover new
              styles together.
            </div>
            <button
              style={{
                background: "linear-gradient(90deg,#a259ff 0%,#fbc2eb 100%)",
                color: "#fff",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                padding: "0.8rem 2.2rem",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Start Matching
            </button>
            <div
              style={{
                marginTop: "2rem",
                color: "#888",
                fontSize: "0.98rem",
                textAlign: "left",
              }}
            >
              <b>How DNA Matching Works</b>
              <ul style={{ margin: "0.7rem 0 0 1.2rem", padding: 0 }}>
                <li>Find users with similar trait combinations</li>
                <li>Unlock shared style challenges</li>
                <li>Get exclusive co-shopping discounts</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDNA;

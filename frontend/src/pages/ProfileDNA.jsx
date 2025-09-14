// ProfileDNA.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const traitColors = {
  Luxury: "#FFA726",
  Street: "#8A2BE2",
  Minimalist: "#808080",
  Boho: "#00CED1",
  Futuristic: "#1E90FF",
  Vintage: "#FF8C00"
};

const traitOrder = ["Luxury", "Street", "Minimalist", "Boho", "Futuristic", "Vintage"];

const DnaHelix = ({ traits }) => {
  const helixHeight = 220;
  const helixWidth = 120;
  const step = helixHeight / (traitOrder.length - 1);
  return (
    <svg width={helixWidth} height={helixHeight} style={{display:'block',margin:'0 auto'}}>
      {/* Draw helix backbone */}
      <polyline
        points={traitOrder.map((_,i)=>`${helixWidth/2-18},${i*step}`).join(' ')}
        fill="none" stroke="#bbb" strokeWidth="3"/>
      <polyline
        points={traitOrder.map((_,i)=>`${helixWidth/2+18},${i*step}`).join(' ')}
        fill="none" stroke="#bbb" strokeWidth="3"/>
      {/* Draw trait connectors */}
      {traitOrder.map((trait,i)=>(
        <g key={trait}>
          <line x1={helixWidth/2-18} y1={i*step} x2={helixWidth/2+18} y2={i*step} stroke={traitColors[trait]} strokeWidth="3"/>
          <circle cx={helixWidth/2-18} cy={i*step} r="8" fill={traitColors[trait]} />
          <circle cx={helixWidth/2+18} cy={i*step} r="8" fill={traitColors[trait]} />
          <text x={helixWidth/2+30} y={i*step+5} fontSize="1rem" fontWeight="700" fill={traitColors[trait]}>{trait} {traits[trait]||0}%</text>
        </g>
      ))}
    </svg>
  );
};

const AvatarCard = ({ orders }) => {
  // Avatar state: base, plus closet of purchased items
  const baseAvatar = {
    img: "/avatar-base.png", // You can use a placeholder SVG or PNG for undergarments
    desc: "Your Avatar (undergarments)"
  };
  const closet = orders.map((p, i) => ({
    img: p.image_url,
    name: p.name || p.type,
    id: p.id + '-' + i
  }));
  const [selected, setSelected] = React.useState(null);
  return (
    <div style={{background:'#fff',borderRadius:'18px',boxShadow:'0 4px 32px #a259ff22',padding:'2rem',marginBottom:'2.5rem'}}>
      <h2 style={{fontWeight:900,fontSize:'1.5rem',marginBottom:'1.2rem',color:'#a259ff'}}>Your Avatar</h2>
      <div style={{display:'flex',gap:'2.5rem',alignItems:'flex-start'}}>
        <div style={{flex:'0 0 160px',textAlign:'center'}}>
          <img src={selected ? selected.img : baseAvatar.img} alt="Avatar" style={{width:140,height:180,objectFit:'contain',borderRadius:'16px',background:'#f7f7f7',border:'2px solid #eee'}} />
          <div style={{marginTop:'0.7rem',fontWeight:700,color:'#888'}}>{selected ? selected.name : baseAvatar.desc}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,marginBottom:'0.7rem'}}>Your Closet</div>
          <div style={{display:'flex',gap:'1.2rem',flexWrap:'wrap'}}>
            {closet.length === 0 ? <div style={{color:'#bbb'}}>No items yet. Buy something to fill your closet!</div> : closet.map(item => (
              <div key={item.id} style={{cursor:'pointer',textAlign:'center'}} onClick={()=>setSelected(item)}>
                <img src={item.img} alt={item.name} style={{width:60,height:60,objectFit:'contain',borderRadius:'10px',background:'#f7f7f7',border:'2px solid #eee'}} />
                <div style={{fontSize:'0.95rem',marginTop:'0.3rem',color:'#a259ff'}}>{item.name}</div>
              </div>
            ))}
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
    // Calculate trait counts
    const dna = {};
    orders.forEach((p) => {
      if (p.tags) {
        p.tags.forEach((tag) => {
          dna[tag] = (dna[tag] || 0) + 1;
        });
      }
    });
    // Calculate percentages
    const total = Object.values(dna).reduce((a, b) => a + b, 0);
    const traitPercent = {};
    Object.keys(dna).forEach((k) => {
      traitPercent[k] = Math.round((dna[k] / total) * 100);
    });
    setPurchases(traitPercent);
    // Evolution history
    const evo = orders.map((p) => ({
      date: p.orderDate || "N/A",
      action: `Bought ${p.name || p.type}`,
      trait: p.tags && p.tags[0],
      traitDelta: p.tags && traitPercent[p.tags[0]] ? `+${traitPercent[p.tags[0]]}% ${p.tags[0]}` : null
    })).reverse();
    setEvolution(evo);
  }, []);

  if (!purchases) return <p style={{textAlign:'center',marginTop:'3rem',fontSize:'1.3rem',color:'#888'}}>No DNA yet. Make a purchase to see your Fashion DNA!</p>;

  // Pie chart data
  const data = {
    labels: traitOrder.filter((t) => purchases[t]),
    datasets: [
      {
        label: "Your Fashion DNA",
        data: traitOrder.filter((t) => purchases[t]).map((t) => purchases[t]),
        backgroundColor: traitOrder.filter((t) => purchases[t]).map((t) => traitColors[t]),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Style identity
  const sortedTraits = Object.entries(purchases).sort((a,b)=>b[1]-a[1]);
  const mainTraits = sortedTraits.slice(0,2).map(([k])=>k).join(" and ");
  const hints = sortedTraits.slice(2,4).map(([k])=>k).join(", ");
  const styleIdentity = `You're a unique blend of ${mainTraits}${hints?` with hints of ${hints}`:""}. This combination makes you a trendsetter who stands out!`;

  return (
    <div className="profile-dna-container" style={{maxWidth:'700px',margin:'2.5rem auto',background:'linear-gradient(90deg,#a259ff 0%,#fbc2eb 100%)',borderRadius:'18px',boxShadow:'0 4px 32px #a259ff22',padding:'2.5rem 2.2rem',color:'#222'}}>
      <AvatarCard orders={orders} />
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
        <div>
          <h2 style={{fontWeight:900,fontSize:'2.1rem',marginBottom:'0.2rem',color:'#fff'}}>Your Fashion DNA</h2>
          <div style={{color:'#fff',fontWeight:600}}>Evolution Score: {Object.values(purchases).reduce((a,b)=>a+b,0)*10} | {evolution.length} mutations</div>
        </div>
        <button style={{background:'none',border:'none',fontSize:'2rem',color:'#fff',cursor:'pointer'}} title="Close" onClick={()=>window.location.href='/'}>&times;</button>
      </div>
      <div style={{display:'flex',gap:'2.5rem',marginBottom:'2.2rem'}}>
        <button className={tab==="overview"?"dna-tab-active":"dna-tab"} onClick={()=>setTab("overview")}>DNA Overview</button>
        <button className={tab==="evolution"?"dna-tab-active":"dna-tab"} onClick={()=>setTab("evolution")}>Evolution</button>
        <button className={tab==="matches"?"dna-tab-active":"dna-tab"} onClick={()=>setTab("matches")}>Find Matches</button>
      </div>
      {tab==="overview" && (
        <div style={{display:'flex',gap:'2.5rem',alignItems:'flex-start'}}>
          <div style={{flex:1}}>
            <Pie data={data} />
            <div style={{marginTop:'1.5rem'}}>
              {traitOrder.filter((t)=>purchases[t]).map((trait)=>(
                <div key={trait} style={{display:'flex',alignItems:'center',marginBottom:'0.7rem'}}>
                  <span style={{display:'inline-block',width:18,height:18,borderRadius:'50%',background:traitColors[trait],marginRight:10}}></span>
                  <span style={{fontWeight:700,fontSize:'1.1rem',color:'#222'}}>{trait}</span>
                  <span style={{marginLeft:'auto',fontWeight:700,color:'#888'}}>{purchases[trait]}%</span>
                  <div style={{flex:1,marginLeft:18,background:'#eee',height:7,borderRadius:5,overflow:'hidden'}}>
                    <div style={{width:`${purchases[trait]}%`,height:7,background:traitColors[trait]}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:'1.15rem',marginBottom:'1.1rem'}}>Your Style Identity</div>
            <div style={{background:'#fff',borderRadius:'12px',padding:'1.2rem',fontSize:'1.08rem',color:'#a259ff',boxShadow:'0 2px 12px #a259ff11'}}>{styleIdentity}</div>
            <div style={{marginTop:'2.5rem'}}>
              <DnaHelix traits={purchases} />
            </div>
          </div>
        </div>
      )}
      {tab==="evolution" && (
        <div style={{marginTop:'1.5rem'}}>
          <div style={{fontWeight:700,fontSize:'1.15rem',marginBottom:'1.1rem'}}>DNA Evolution History</div>
          {evolution.length === 0 ? <div style={{color:'#888'}}>No evolution history yet.</div> : (
            evolution.map((evo,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'1.1rem',marginBottom:'1.1rem',display:'flex',alignItems:'center',gap:'1.2rem',boxShadow:'0 2px 12px #a259ff11'}}>
                <span style={{display:'inline-block',width:10,height:10,borderRadius:'50%',background:traitColors[evo.trait]||'#aaa',marginRight:8}}></span>
                <span style={{fontWeight:600}}>{evo.date}</span>
                <span style={{marginLeft:18}}>{evo.action}</span>
                <span style={{marginLeft:'auto',color:'#43a047',fontWeight:700}}>{evo.traitDelta}</span>
              </div>
            ))
          )}
        </div>
      )}
      {tab==="matches" && (
        <div style={{marginTop:'1.5rem'}}>
          <div style={{fontWeight:700,fontSize:'1.15rem',marginBottom:'1.1rem'}}>Find Your Style Twin</div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'2rem',fontSize:'1.08rem',color:'#a259ff',boxShadow:'0 2px 12px #a259ff11',textAlign:'center'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'1.2rem'}}>&#128101;</div>
            <div style={{marginBottom:'1.2rem'}}>Connect with people who share your fashion DNA and discover new styles together.</div>
            <button style={{background:'linear-gradient(90deg,#a259ff 0%,#fbc2eb 100%)',color:'#fff',fontWeight:700,border:'none',borderRadius:'8px',padding:'0.8rem 2.2rem',fontSize:'1.1rem',cursor:'pointer'}}>Start Matching</button>
            <div style={{marginTop:'2rem',color:'#888',fontSize:'0.98rem',textAlign:'left'}}>
              <b>How DNA Matching Works</b>
              <ul style={{margin:'0.7rem 0 0 1.2rem',padding:0}}>
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
import { useState, useRef, useEffect } from "react";

const SECRET = "YADLE2025";
const PIX_KEY = "790d9850-334c-43fb-a64c-1b3d83c57098";

function esc(t) {
  return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function formatReply(text, openVip) {
  let html = text;
  const up = html.match(/---UPGRADE---([\s\S]*?)---FIM---/);
  if (up) {
    html = html.replace(/---UPGRADE---([\s\S]*?)---FIM---/,
      `<div style="margin-top:12px;border:1px solid #ffd84d44;background:#0f1108;padding:14px 16px">
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.82rem;color:#ffd84d;margin-bottom:6px">★ Desbloquear Modo VIP</div>
        <div style="font-size:0.75rem;color:#4a5a72;line-height:1.7">${up[1].trim()}</div>
        <button onclick="window.__yadleVip()" style="margin-top:10px;background:#ffd84d;color:#000;border:none;padding:8px 16px;font-family:Syne,sans-serif;font-weight:700;font-size:0.7rem;letter-spacing:0.08em;cursor:pointer">ATIVAR VIP — R$ 4,75</button>
      </div>`);
  }
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_,_l,c) =>
    `<code style="display:block;background:#050709;border:1px solid #1a2235;padding:12px;margin:8px 0;font-size:0.7rem;color:#00ff88;white-space:pre-wrap;font-family:monospace;line-height:1.6">${esc(c.trim())}</code>`);
  html = html.replace(/`([^`]+)`/g, (_,c) =>
    `<code style="background:#050709;border:1px solid #1a2235;padding:1px 5px;font-size:0.7rem;color:#00ff88;font-family:monospace">${esc(c)}</code>`);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e0ecff">$1</strong>');
  html = html.replace(/\n/g, "<br>");
  return html;
}

function buildPrompt(isVIP) {
  return isVIP
    ? `Você é a YADLE AI, IA de elite em scripts (Python, JS, PowerShell, .bat) e análise de imagens. Personalidade: prestativa, direta e genial. MODO VIP ATIVO: scripts ilimitados, comentários em CADA linha explicando o que faz, múltiplas abordagens, máximo detalhe. Scripts Windows: sempre inclua ponto de restauração. Responda em português brasileiro.`
    : `Você é a YADLE AI, IA de elite em scripts (Python, JS, PowerShell, .bat) e análise de imagens. Personalidade: prestativa, direta e genial. MODO GRÁTIS: limite scripts a NO MÁXIMO 10 linhas. Se pedido avançado, entregue solução parcial e adicione ao final:\n\n---UPGRADE---\nNotei que este pedido é avançado. Para scripts ilimitados com comentários detalhados, ative o Modo VIP por R$ 4,75.\n---FIM---\n\nScripts Windows: sempre inclua ponto de restauração. Responda em português brasileiro.`;
}

// ── SITE ──
function Site({ onGoChat, onOpenPix }) {
  const [visibles, setVisibles] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisibles(v => ({ ...v, [e.target.dataset.rid]: true }));
      });
    }, { threshold: 0.1 });
    Object.values(refs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const rev = (id) => ({
    ref: el => { refs.current[id] = el; if (el) el.dataset.rid = id; },
    style: { opacity: visibles[id] ? 1 : 0, transform: visibles[id] ? "none" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }
  });

  const G = {
    bg: "#f5f0eb", dark: "#0d0d0d", pink: "#ff3cac",
    cyan: "#00e5ff", yellow: "#ffe600", green: "#00ff88", muted: "#888"
  };

  return (
    <div style={{ background: G.bg, color: G.dark, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        @keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.08)}}
        @keyframes drift2{from{transform:translate(-50%,-50%) scale(1)}to{transform:translate(calc(-50% + 20px),calc(-50% + 30px)) scale(1.1)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        .btn-pri{background:#ff3cac;color:#fff;font-family:Syne,sans-serif;font-weight:800;font-size:0.9rem;letter-spacing:0.06em;padding:16px 36px;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:transform 0.15s,box-shadow 0.2s;box-shadow:4px 4px 0 #0d0d0d}
        .btn-pri:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #0d0d0d}
        .btn-sec{background:transparent;color:#0d0d0d;font-family:Syne,sans-serif;font-weight:700;font-size:0.9rem;letter-spacing:0.06em;padding:15px 36px;border:2px solid #0d0d0d;cursor:pointer;text-decoration:none;display:inline-block;transition:background 0.2s,color 0.2s}
        .btn-sec:hover{background:#0d0d0d;color:#fff}
        .fcard{background:#fff;padding:36px 32px;border:2px solid #0d0d0d;position:relative;overflow:hidden;transition:transform 0.2s}
        .fcard:hover{transform:translate(-3px,-3px)}
        .plan-btn-free{width:100%;padding:14px;border:none;cursor:pointer;font-family:Syne,sans-serif;font-weight:800;font-size:0.82rem;letter-spacing:0.1em;background:#1a1a1a;color:#555;transition:all 0.2s}
        .plan-btn-free:hover{background:#222;color:#fff}
        .plan-btn-gold{width:100%;padding:14px;border:none;cursor:pointer;font-family:Syne,sans-serif;font-weight:800;font-size:0.82rem;letter-spacing:0.1em;background:#ffe600;color:#000;box-shadow:4px 4px 0 #5a4d00;transition:all 0.2s}
        .plan-btn-gold:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #5a4d00}
        .chip-s{background:#fff;border:2px solid #0d0d0d;padding:10px 18px;font-size:0.75rem;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s}
        .chip-s:hover{background:#0d0d0d;color:#fff}
      `}</style>

      {/* NAV */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 40px", background:"rgba(245,240,235,0.92)", backdropFilter:"blur(20px)", borderBottom:`2px solid ${G.dark}` }}>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:900, fontSize:"1.4rem", color:G.dark, letterSpacing:"-0.02em" }}>YADLE<span style={{color:G.pink}}>AI</span></div>
        <button onClick={onOpenPix} style={{ background:G.dark, color:"#fff", fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.75rem", letterSpacing:"0.1em", padding:"10px 22px", border:"none", cursor:"pointer", clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>★ ASSINAR VIP</button>
      </div>

      {/* HERO */}
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"120px 40px 80px", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", filter:"blur(80px)", opacity:0.35, background:G.pink, top:-100, left:-100, animation:"drift 8s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", filter:"blur(80px)", opacity:0.35, background:G.cyan, bottom:-80, right:-80, animation:"drift 8s ease-in-out infinite alternate", animationDelay:"-3s" }} />
        <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", filter:"blur(80px)", opacity:0.35, background:G.yellow, top:"50%", left:"50%", animation:"drift2 10s ease-in-out infinite alternate" }} />

        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:G.dark, color:"#fff", fontSize:"0.68rem", letterSpacing:"0.2em", padding:"7px 16px", marginBottom:28, position:"relative", zIndex:1, animation:"fadeDown 0.6s ease both" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:G.green, animation:"blink 1.4s step-end infinite" }} />
          INTELIGÊNCIA ARTIFICIAL ONLINE AGORA
        </div>

        <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:900, fontSize:"clamp(3rem,8vw,6.5rem)", lineHeight:1, letterSpacing:"-0.04em", color:G.dark, position:"relative", zIndex:1, animation:"fadeUp 0.7s ease 0.1s both", margin:"0 0 24px" }}>
          A AI que<br /><em style={{fontStyle:"normal",color:G.pink}}>resolve</em> de<br />
          <span style={{WebkitTextStroke:`3px ${G.dark}`,color:"transparent"}}>verdade</span>
        </h1>

        <p style={{ fontSize:"clamp(1rem,2vw,1.15rem)", color:G.muted, maxWidth:500, lineHeight:1.7, margin:"0 auto 40px", fontWeight:300, position:"relative", zIndex:1, animation:"fadeUp 0.7s ease 0.2s both" }}>
          Scripts, automações, análise de imagens e muito mais.<br />Rápida, precisa e sem enrolação — do grátis ao VIP.
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", position:"relative", zIndex:1, animation:"fadeUp 0.7s ease 0.3s both" }}>
          <button className="btn-pri" onClick={onGoChat}>🚀 USAR GRÁTIS AGORA</button>
          <a href="#pricing" className="btn-sec">VER PLANOS</a>
        </div>

        <div style={{ display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap", marginTop:70, paddingTop:40, borderTop:`2px solid ${G.dark}`, position:"relative", zIndex:1, animation:"fadeUp 0.7s ease 0.4s both" }}>
          {[["10k+","SCRIPTS GERADOS"],["99%","UPTIME"],["R$ 4,75","PLANO VIP"],["< 2s","RESPOSTA"]].map(([n,l]) => (
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"2.2rem",color:G.dark,lineHeight:1}}><span style={{color:G.pink}}>{n}</span></div>
              <div style={{fontSize:"0.7rem",color:G.muted,letterSpacing:"0.1em",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background:G.dark, padding:"14px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 20s linear infinite" }}>
          {["PYTHON","POWERSHELL","JAVASCRIPT","ANÁLISE DE IMAGEM","SCRIPTS .BAT","OTIMIZAÇÃO WINDOWS","AUTOMAÇÃO","PYTHON","POWERSHELL","JAVASCRIPT","ANÁLISE DE IMAGEM","SCRIPTS .BAT","OTIMIZAÇÃO WINDOWS","AUTOMAÇÃO"].map((w,i) => (
            <span key={i} style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.1em", color: i%2===1 ? G.yellow : "#fff", padding:"0 30px" }}>{i%2===1?"★":w}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding:"100px 40px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{fontSize:"0.68rem",letterSpacing:"0.2em",color:G.muted,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:30,height:2,background:G.pink,display:"inline-block"}}/>O QUE ELA FAZ
        </div>
        <h2 {...rev("f0")} style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.2rem)",lineHeight:1.1,letterSpacing:"-0.03em",color:G.dark,marginBottom:60}}>
          Tudo que você precisa, <span style={{color:G.pink}}>num só lugar</span>
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:2}}>
          {[
            {icon:"🐍",title:"Scripts Python & JS",desc:"Automatize tarefas, renomeie arquivos, faça scraping, crie bots — qualquer script que você precisar."},
            {icon:"🛡️",title:"PowerShell & .bat",desc:"Scripts Windows com ponto de restauração automático. Otimize, limpe e gerencie seu sistema."},
            {icon:"🖼️",title:"Análise de Imagens",desc:"Envie uma foto e a YADLE AI lê, interpreta e resolve — OCR, diagnóstico, código em imagem e mais."},
            {icon:"⚡",title:"Respostas Instantâneas",desc:"Sem espera, sem travamento. Resposta em segundos, direto ao ponto."},
          ].map((f,i) => (
            <div key={i} {...rev(`f${i+1}`)} className="fcard">
              <div style={{fontSize:"2rem",marginBottom:16}}>{f.icon}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.05rem",color:G.dark,marginBottom:10}}>{f.title}</div>
              <div style={{fontSize:"0.82rem",color:G.muted,lineHeight:1.7}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={{padding:"100px 40px",background:G.dark,overflow:"hidden"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{fontSize:"0.68rem",letterSpacing:"0.2em",color:"#555",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
            <span style={{width:30,height:2,background:G.yellow,display:"inline-block"}}/>PLANOS
          </div>
          <h2 {...rev("p0")} style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.2rem)",lineHeight:1.1,letterSpacing:"-0.03em",color:"#fff",marginBottom:50}}>
            Escolha seu <span style={{color:G.yellow}}>plano</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            {/* FREE */}
            <div {...rev("p1")} style={{padding:"40px 36px",border:"2px solid #333"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.8rem",letterSpacing:"0.15em",color:"#555",marginBottom:16}}>MODO GRÁTIS</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"3rem",color:"#fff",lineHeight:1,marginBottom:8}}>R$ 0</div>
              <div style={{fontSize:"0.75rem",color:"#555",marginBottom:28}}>para sempre grátis</div>
              <ul style={{listStyle:"none",marginBottom:32,padding:0}}>
                {[["✓","Chat ilimitado"],["✓","Scripts até 10 linhas"],["✓","Análise de imagens"],["✓","Python, JS, PowerShell"],["✗","Scripts ilimitados"],["✗","Comentários por linha"],["✗","Múltiplas soluções"]].map(([c,t],i) => (
                  <li key={i} style={{fontSize:"0.82rem",color:c==="✓"?"#888":"#333",padding:"8px 0",borderBottom:"1px solid #1a1a1a",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:c==="✓"?"#00ff88":"#333"}}>{c}</span>{t}
                  </li>
                ))}
              </ul>
              <button className="plan-btn-free" onClick={onGoChat}>USAR GRÁTIS</button>
            </div>
            {/* VIP */}
            <div {...rev("p2")} style={{padding:"40px 36px",border:`2px solid ${G.yellow}`,background:"linear-gradient(135deg,#1a1400,#0d0d0d)",position:"relative"}}>
              <div style={{position:"absolute",top:-14,left:32,background:G.yellow,color:"#000",fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.62rem",letterSpacing:"0.15em",padding:"5px 14px"}}>MAIS POPULAR</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.8rem",letterSpacing:"0.15em",color:G.yellow,marginBottom:16}}>MODO VIP</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"3rem",color:"#fff",lineHeight:1,marginBottom:8}}><sup style={{fontSize:"1rem",color:"#888"}}>R$</sup> 4,75</div>
              <div style={{fontSize:"0.75rem",color:"#888",marginBottom:28}}>pagamento único via Pix</div>
              <ul style={{listStyle:"none",marginBottom:32,padding:0}}>
                {[["✓","Chat ilimitado"],["✓","Scripts ilimitados","gold"],["✓","Análise de imagens"],["✓","Python, JS, PowerShell"],["✓","Comentários em cada linha"],["✓","Múltiplas soluções"],["✓","Prioridade máxima"]].map(([c,t,gold],i) => (
                  <li key={i} style={{fontSize:"0.82rem",color:"#ccc",padding:"8px 0",borderBottom:"1px solid #1f1f00",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:G.yellow}}>✓</span>
                    {gold ? <strong style={{color:G.yellow}}>{t}</strong> : t}
                  </li>
                ))}
              </ul>
              <button className="plan-btn-gold" onClick={onOpenPix}>★ ATIVAR VIP AGORA</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:G.dark,borderTop:"2px solid #111",padding:"32px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"1.2rem",color:"#fff"}}>YADLE<span style={{color:G.pink}}>AI</span></div>
        <div style={{fontSize:"0.72rem",color:"#333"}}>© 2025 YADLE AI. Todos os direitos reservados.</div>
      </div>
    </div>
  );
}

// ── CHAT ──
function Chat({ isVIP, onOpenVip, onBack }) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const endRef = useRef(null);
  const fileRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);
  useEffect(() => { window.__yadleVip = onOpenVip; return () => delete window.__yadleVip; }, [onOpenVip]);

  function handleFile(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPendingImage({ base64: ev.target.result.split(",")[1], mimeType: file.type, previewUrl: ev.target.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function send(overrideText) {
    const text = (overrideText ?? input).trim();
    if (!text && !pendingImage) return;
    if (loading) return;

    const userHTML = (pendingImage ? `<img src="${pendingImage.previewUrl}" style="max-width:200px;max-height:140px;display:block;margin-bottom:8px;border:1px solid #1a2235">` : "") + (text ? esc(text) : "");
    setMessages(m => [...m, { role:"user", html:userHTML }]);

    const userContent = [];
    if (pendingImage) userContent.push({ type:"image", source:{ type:"base64", media_type:pendingImage.mimeType, data:pendingImage.base64 } });
    if (text) userContent.push({ type:"text", text });

    const newHistory = [...history, { role:"user", content:userContent }];
    setHistory(newHistory);
    setInput(""); setPendingImage(null);
    if (taRef.current) { taRef.current.style.height = "auto"; }
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:buildPrompt(isVIP), messages:newHistory })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text||"").join("") || "Erro ao obter resposta.";
      setHistory(h => [...h, { role:"assistant", content:reply }]);
      setMessages(m => [...m, { role:"yadle", html:formatReply(reply, onOpenVip), vip:isVIP }]);
    } catch {
      setMessages(m => [...m, { role:"yadle", html:"Erro ao conectar. Tente novamente." }]);
    }
    setLoading(false);
  }

  const C = { bg:"#07090e", card:"#101520", border:"#1a2235", cyan:"#00e5ff", gold:"#ffd84d", text:"#c4d0e8", muted:"#4a5a72" };

  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:"'Space Mono',monospace", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
      <style>{`
        @keyframes bounce{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
        .c-chip:hover{border-color:#00e5ff!important;color:#00e5ff!important}
        .c-attach:hover{border-color:#00e5ff!important;color:#00e5ff!important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#1a2235}
      `}</style>

      <div style={{ position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none", zIndex:0 }} />

      {/* TOPBAR */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:`1px solid ${C.border}`, background:"#07090eee", backdropFilter:"blur(10px)", position:"relative", zIndex:10, flexShrink:0 }}>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"1.1rem", color:"#fff", letterSpacing:"0.06em", cursor:"pointer" }} onClick={onBack}>
          YADLE<span style={{color:C.cyan}}>AI</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 14px", fontSize:"0.62rem", letterSpacing:"0.18em", fontWeight:700, border:`1px solid ${isVIP?"#ffd84d55":C.border}`, color:isVIP?C.gold:C.muted, background:isVIP?"#1a1400":C.card, boxShadow:isVIP?"0 0 20px #ffd84d44":"none" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:isVIP?C.gold:C.muted, animation:"blink 1.4s step-end infinite" }} />
            {isVIP ? "★ MODO VIP" : "MODO GRÁTIS"}
          </div>
          {!isVIP && <button onClick={onOpenVip} style={{ background:"none", border:"1px solid #ffd84d33", color:C.gold, fontFamily:"'Space Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.14em", padding:"7px 14px", cursor:"pointer" }}>★ ATIVAR VIP</button>}
          <button onClick={onBack} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, fontFamily:"'Space Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.1em", padding:"7px 14px", cursor:"pointer" }}>← VOLTAR</button>
        </div>
      </div>

      {/* MESSAGES */}
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 12px", display:"flex", flexDirection:"column", gap:16, position:"relative", zIndex:1 }}>
        {messages.length === 0 && (
          <div style={{ textAlign:"center", padding:"32px 20px", color:C.muted, fontSize:"0.75rem", lineHeight:2 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"1.4rem", color:"#fff", marginBottom:10 }}>
              YADLE<span style={{color:C.cyan}}>AI</span> está online.
            </div>
            Envie uma mensagem ou foto para começar.<br />
            {isVIP ? "★ Modo VIP ativo — sem limites!" : "Modo Grátis ativo — scripts até 10 linhas."}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginTop:16 }}>
              {[["📄 Script Python","Crie um script Python para renomear arquivos em massa"],["⚡ Otimizar Windows","Como otimizar o Windows 11 para melhor desempenho?"],["🔧 O que é kernel?","Explique o que é kernel e como funciona"],["🛡 PowerShell","Crie um script PowerShell para criar ponto de restauração"]].map(([l,p]) => (
                <button key={l} className="c-chip" onClick={() => send(p)} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"8px 14px", fontSize:"0.68rem", cursor:"pointer", color:C.text, fontFamily:"'Space Mono',monospace" }}>{l}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex", gap:12, maxWidth:760, alignSelf:msg.role==="user"?"flex-end":"flex-start", flexDirection:msg.role==="user"?"row-reverse":"row", animation:"fadeUp 0.3s ease" }}>
            <div style={{ flexShrink:0, width:36, height:36, border:`1px solid ${msg.vip?"#ffd84d44":C.border}`, background:msg.vip?"#1a1400":C.card, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.9rem", alignSelf:"flex-end" }}>
              {msg.role==="user"?"👤":msg.vip?"★":"🤖"}
            </div>
            <div>
              {msg.role !== "user" && (
                <div style={{ fontSize:"0.58rem", letterSpacing:"0.16em", color:msg.vip?C.gold:C.muted, marginBottom:6, display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{width:16,height:1,background:"currentColor",display:"inline-block"}}/>
                  {msg.vip?"★ YADLE VIP":"YADLE AI"}
                </div>
              )}
              <div style={{ background:msg.role==="user"?"#0d1a2a":msg.vip?"#0f1108":C.card, border:`1px solid ${msg.role==="user"?"#1a3050":msg.vip?"#ffd84d22":C.border}`, padding:"14px 18px", fontSize:"0.78rem", lineHeight:1.85, maxWidth:560, position:"relative", boxShadow:msg.vip?"inset 0 1px 0 #ffd84d22":"none" }}
                dangerouslySetInnerHTML={{ __html: msg.html }} />
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex", gap:12, alignSelf:"flex-start" }}>
            <div style={{ flexShrink:0, width:36, height:36, border:`1px solid ${C.border}`, background:C.card, display:"flex", alignItems:"center", justifyContent:"center" }}>🤖</div>
            <div style={{ display:"flex", gap:5, alignItems:"center", padding:"14px 18px", background:C.card, border:`1px solid ${C.border}` }}>
              {[0,150,300].map(d => <div key={d} style={{ width:6, height:6, background:C.cyan, borderRadius:"50%", animation:`bounce 1.2s ease-in-out ${d}ms infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div style={{ borderTop:`1px solid ${C.border}`, padding:"14px 20px 18px", background:"#07090eee", backdropFilter:"blur(10px)", position:"relative", zIndex:10, flexShrink:0 }}>
        {pendingImage && (
          <div style={{ position:"relative", display:"inline-block", marginBottom:10 }}>
            <img src={pendingImage.previewUrl} style={{ maxHeight:80, border:`1px solid ${C.border}`, display:"block" }} alt="preview" />
            <button onClick={() => setPendingImage(null)} style={{ position:"absolute", top:-8, right:-8, width:18, height:18, background:"#ff4d6d", color:"#fff", border:"none", cursor:"pointer", fontSize:"0.7rem" }}>✕</button>
          </div>
        )}
        <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
          <button className="c-attach" onClick={() => fileRef.current.click()} style={{ flexShrink:0, width:42, height:42, background:C.card, border:`1px solid ${C.border}`, color:C.muted, fontSize:"1.1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>📎</button>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile} />
          <textarea ref={taRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} }}
            placeholder="Digite sua mensagem ou envie uma foto..."
            rows={1}
            style={{ flex:1, background:C.card, border:`1px solid ${C.border}`, color:C.text, fontFamily:"'Space Mono',monospace", fontSize:"0.78rem", padding:"12px 14px", resize:"none", outline:"none", lineHeight:1.6, minHeight:42, maxHeight:120 }}
            onInput={e => { e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; }} />
          <button onClick={() => send()} disabled={loading} style={{ flexShrink:0, width:42, height:42, background:C.cyan, border:"none", color:"#000", fontSize:"1rem", cursor:loading?"not-allowed":"pointer", opacity:loading?0.4:1 }}>➤</button>
        </div>
        <div style={{ fontSize:"0.6rem", color:C.muted, marginTop:8, display:"flex", justifyContent:"space-between" }}>
          <span>Enter para enviar · Shift+Enter nova linha</span>
          {!isVIP && <span style={{color:C.gold,cursor:"pointer"}} onClick={onOpenVip}>★ VIP: scripts ilimitados</span>}
          {isVIP && <span style={{color:C.gold}}>★ VIP ATIVO — SEM LIMITES</span>}
        </div>
      </div>
    </div>
  );
}

// ── PIX MODAL ──
function PixModal({ open, onClose, onGoChat }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(PIX_KEY).then(() => { setCopied(true); setTimeout(()=>setCopied(false),2000); });
  }
  if (!open) return null;
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed", inset:0, background:"#000000cc", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)" }}>
      <div style={{ background:"#fff", maxWidth:440, width:"90%", border:"3px solid #0d0d0d", padding:"44px 40px", position:"relative", boxShadow:"8px 8px 0 #0d0d0d" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:20, background:"none", border:"none", fontSize:"1.3rem", cursor:"pointer", color:"#888" }}>✕</button>
        <div style={{fontSize:"0.62rem",letterSpacing:"0.2em",color:"#888",marginBottom:10}}>★ ATIVAR MODO VIP</div>
        <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"1.8rem",color:"#0d0d0d",marginBottom:8,lineHeight:1.1}}>
          Pague via <span style={{color:"#ff3cac"}}>Pix</span> e ative
        </h2>
        <p style={{fontSize:"0.8rem",color:"#888",lineHeight:1.7,marginBottom:24}}>Faça o Pix, envie o comprovante e receba seu código VIP.</p>
        <div style={{background:"#0d0d0d",padding:24,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:"0.58rem",letterSpacing:"0.2em",color:"#555",marginBottom:8}}>CHAVE PIX (ALEATÓRIA)</div>
          <div style={{fontSize:"0.78rem",color:"#ffe600",letterSpacing:"0.04em",wordBreak:"break-all",marginBottom:12}}>{PIX_KEY}</div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:"2.8rem",color:"#fff",lineHeight:1}}>
            <sup style={{fontSize:"1rem",color:"#ffe600"}}>R$</sup> 4,75
          </div>
        </div>
        <button onClick={copy} style={{ width:"100%", padding:11, background:copied?"#00ff88":"transparent", border:"1px solid #333", color:copied?"#000":"#888", fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.68rem", letterSpacing:"0.1em", cursor:"pointer" }}>
          {copied ? "✅ CHAVE COPIADA!" : "📋 COPIAR CHAVE PIX"}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0",fontSize:"0.68rem",color:"#888"}}>
          <span style={{flex:1,height:1,background:"#e5e5e5",display:"block"}}/>APÓS PAGAR<span style={{flex:1,height:1,background:"#e5e5e5",display:"block"}}/>
        </div>
        <div style={{background:"#f5f5f5",padding:"16px 20px",marginBottom:16,border:"1px solid #e0e0e0",fontSize:"0.78rem",color:"#333",lineHeight:1.6}}>
          💬 <strong style={{fontFamily:"Syne,sans-serif"}}>Envie o comprovante</strong><br/>
          Entre em contato e mande o print do pagamento para receber o código VIP.
        </div>
        <button onClick={() => { onClose(); onGoChat(); }} style={{width:"100%",padding:13,background:"#0d0d0d",color:"#fff",border:"none",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",cursor:"pointer"}}>
          IR PARA O CHAT
        </button>
      </div>
    </div>
  );
}

// ── VIP MODAL (chat) ──
function VipModal({ open, onClose, onActivate }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  function tryActivate() {
    if (code.trim().toUpperCase() === SECRET) { onActivate(); onClose(); setCode(""); }
    else { setErr(true); setTimeout(()=>setErr(false),2000); }
  }
  if (!open) return null;
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"#000000bb",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div style={{background:"#0c0f18",border:"1px solid #ffd84d44",padding:40,maxWidth:420,width:"90%",boxShadow:"0 0 60px #ffd84d22",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:18,background:"none",border:"none",color:"#4a5a72",fontSize:"1.2rem",cursor:"pointer",fontFamily:"'Space Mono',monospace"}}>✕</button>
        <div style={{fontSize:"0.6rem",letterSpacing:"0.2em",color:"#ffd84d",marginBottom:12}}>★ MODO VIP</div>
        <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#fff",marginBottom:6}}>Ative o <span style={{color:"#ffd84d"}}>VIP</span><br/>por R$ 4,75</h2>
        <p style={{fontSize:"0.75rem",color:"#4a5a72",lineHeight:1.8,marginBottom:20}}>Scripts ilimitados, comentários em cada linha e múltiplas soluções. Pague via Pix e insira o código secreto.</p>
        <div style={{background:"#050709",border:"1px solid #ffd84d33",padding:16,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:"0.6rem",letterSpacing:"0.18em",color:"#4a5a72",marginBottom:8}}>CHAVE PIX</div>
          <div style={{fontSize:"0.78rem",color:"#ffd84d",wordBreak:"break-all",marginBottom:8}}>{PIX_KEY}</div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"2rem",color:"#fff"}}><sup style={{color:"#ffd84d",fontSize:"0.9rem"}}>R$</sup> 4,75</div>
        </div>
        <input value={code} onChange={e=>setCode(e.target.value)}
          placeholder={err?"CÓDIGO INVÁLIDO — TENTE NOVAMENTE":"CÓDIGO SECRETO VIP..."}
          maxLength={20}
          style={{width:"100%",background:"#050709",border:`1px solid ${err?"#ff4d6d":"#1a2235"}`,padding:"12px 14px",color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:"0.8rem",outline:"none",letterSpacing:"0.1em",marginBottom:10,boxSizing:"border-box"}}
          onKeyDown={e=>e.key==="Enter"&&tryActivate()}
        />
        <button onClick={tryActivate} style={{width:"100%",background:"#ffd84d",color:"#000",border:"none",padding:13,fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",cursor:"pointer"}}>ATIVAR MODO VIP</button>
        <div style={{fontSize:"0.62rem",color:"#4a5a72",textAlign:"center",marginTop:10,lineHeight:1.6}}>
          Após pagar, envie o comprovante para receber o código.<br/>
          <span style={{color:"#2a3a52",fontSize:"0.6rem"}}>código demo: YADLE2025</span>
        </div>
      </div>
    </div>
  );
}

// ── APP ──
export default function App() {
  const [page, setPage] = useState("site");
  const [isVIP, setIsVIP] = useState(false);
  const [pixOpen, setPixOpen] = useState(false);
  const [vipOpen, setVipOpen] = useState(false);

  return (
    <div style={{height:"100vh",overflow:page==="chat"?"hidden":"auto"}}>
      {page === "site" && (
        <Site onGoChat={() => setPage("chat")} onOpenPix={() => setPixOpen(true)} />
      )}
      {page === "chat" && (
        <Chat isVIP={isVIP} onOpenVip={() => setVipOpen(true)} onBack={() => setPage("site")} />
      )}
      <PixModal open={pixOpen} onClose={() => setPixOpen(false)} onGoChat={() => setPage("chat")} />
      <VipModal open={vipOpen} onClose={() => setVipOpen(false)} onActivate={() => { setIsVIP(true); setVipOpen(false); }} />
    </div>
  );
}

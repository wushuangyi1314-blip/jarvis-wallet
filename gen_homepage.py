#!/usr/bin/env python3
html = open('/dev/stdin').read()

body = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>AI Tool Reviewr - 首页</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--p:#6366F1;--p2:#10B981;--bg:#FAFAFA;--card:#FFF;--txt:#1F2937;--txt2:#6B7280;--txt3:#9CA3AF;--bd:#E5E7EB;--tb:#F3F4F6;--pbg:#EEF2FF;--ptxt:#4F46E5;--sbg:#D1FAE5;--stxt:#059669;--ncol:#8B5CF6;--ncol2:#7C3AED;--shadow:0 1px 3px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.08);--r:8px;--r2:12px;--r3:16px}
body{font-family:Inter,-apple-system,sans-serif;background:var(--bg);color:var(--txt);line-height:1.6;-webkit-font-smoothing:antialiased}
.c{max-width:1440px;margin:0 auto;padding:0 48px}
.hdr{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--bd);height:64px;display:flex;align-items:center}
.hdr .c{display:flex;align-items:center;gap:28px;width:100%}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.li{width:32px;height:32px;background:var(--p);border-radius:var(--r);display:flex;align-items:center;justify-content:center}
.lt{font-size:18px;font-weight:700;color:var(--txt);letter-spacing:-.02em}
.lt span{color:var(--p)}
nav ul{list-style:none;display:flex;gap:4px}
nav a{text-decoration:none;color:var(--txt2);font-size:14px;font-weight:500;padding:6px 14px;border-radius:var(--r);transition:all .15s}
nav a:hover{color:var(--txt);background:var(--tb)}
nav a.active{color:var(--txt);font-weight:600}
.srch{flex:1;max-width:360px;margin-left:auto;position:relative}
.srch input{width:100%;height:38px;padding:0 16px 0 40px;border:1px solid var(--bd);border-radius:100px;font-size:14px;font-family:inherit;background:var(--bg);color:var(--txt);outline:none;transition:all .15s}
.srch input:focus{border-color:var(--p);background:#fff;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.srch input::placeholder{color:var(--txt3)}
.srch .si{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--txt3);pointer-events:none}
.acns{display:flex;align-items:center;gap:8px}
.btn-g{height:36px;padding:0 16px;border:none;background:0 0;color:var(--txt2);font-size:14px;font-weight:500;font-family:inherit;border-radius:var(--r);cursor:pointer;transition:all .15s}
.btn-g:hover{background:var(--tb);color:var(--txt)}
.btn-p{height:36px;padding:0 20px;border:none;background:var(--p);color:#fff;font-size:14px;font-weight:600;font-family:inherit;border-radius:var(--r);cursor:pointer;transition:all .15s}
.btn-p:hover{background:#4F46E5}
.hero{padding:80px 0 64px;text-align:center}
.he{display:inline-flex;align-items:center;gap:6px;background:var(--pbg);color:var(--ptxt);font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;padding:6px 14px;border-radius:100px;margin-bottom:24px}
.hero h1{font-family:"Source Serif 4",Georgia,serif;font-size:64px;font-weight:700;line-height:1.1;letter-spacing:-.03em;color:var(--txt);margin-bottom:20px;max-width:800px;margin-left:auto;margin-right:auto}
.hero h1 em{font-style:normal;color:var(--p)}
.hero p{font-size:18px;color:var(--txt2);max-width:520px;margin:0 auto 40px;line-height:1.6}
.hs{max-width:560px;margin:0 auto;position:relative}
.hs input{width:100%;height:52px;padding:0 110px 0 52px;border:1.5px solid var(--bd);border-radius:14px;font-size:16px;font-family:inherit;background:var(--card);color:var(--txt);outline:none;transition:all .15s;box-shadow:var(--shadow)}
.hs input:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(99,102,241,.1),0 4px 12px rgba(0,0,0,.08)}
.hs input::placeholder{color:var(--txt3)}
.hs .si{position:absolute;left:18px;top:50%;transform:translateY(-50%);color:var(--txt3);pointer-events:none}
.hsbtn{position:absolute;right:6px;top:50%;transform:translateY(-50%);height:40px;padding:0 20px;background:var(--p);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .15s}
.hsbtn:hover{background:#4F46E5}
.hstats{display:flex;justify-content:center;gap:64px;margin-top:48px}
.stat{text-align:center}
.statn{font-size:30px;font-weight:800;color:var(--txt);letter-spacing:-.02em}
.statl{font-size:13px;color:var(--txt3);margin-top:4px}
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
.st{font-size:22px;font-weight:700;letter-spacing:-.02em;color:var(--txt)}
.sl{font-size:14px;font-weight:500;color:var(--p);text-decoration:none;display:flex;align-items:center;gap:4px}
.sl:hover{text-decoration:underline}
.fea{padding:0 0 64px}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fcard{background:var(--card);border:1px solid var(--bd);border-radius:var(--r3);padding:28px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.fcard:hover{box-shadow:var(--shadow);transform:translateY(-2px)}
.fcard::before{content:"";position:absolute;top:0;left:0;right:0;height:3px}
.fcard:nth-child(1)::before{background:var(--p)}
.fcard:nth-child(2)::before{background:var(--p2)}
.fcard:nth-child(3)::before{background:var(--ncol)}
.fbadge{display:inline-flex;align-items:center;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;padding:4px 10px;border-radius:100px;margin-bottom:16px}
.fcard:nth-child(1) .fbadge{color:var(--ptxt);background:var(--pbg)}
.fcard:nth-child(2) .fbadge{color:var(--stxt);background:var(--sbg)}
.fcard:nth-child(3) .fbadge{color:var(--ncol2);background:rgba(139,92,246,.12)}
.flr{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.fl{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff;flex-shrink:0}
.fi h3{font-size:18px;font-weight:700;letter-spacing:-.01em;color:var(--txt)}
.fi .fc{font-size:12px;color:var(--txt3);margin-top:3px}
.fd{font-size:14px;color:var(--txt2);line-height:1.6;margin-bottom:20px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ff{display:flex;align-items:center;justify-content:space-between}
.fr{display:flex;align-items:center;gap:6px}
.stars{display:flex;gap:2px}
.star{width:14px;height:14px;color:#F59E0B}
.star.empty{color:var(--bd)}
.rn{font-size:14px;font-weight:700;color:var(--txt)}
.rc{font-size:12px;color:var(--txt3)}
.fpr{font-size:13px;font-weight:600;color:var(--txt2)}
.cat{padding:0 0 64px}
.cgrid{display:flex;flex-wrap:wrap;gap:10px}
.cp{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 16px;background:var(--card);border:1px solid var(--bd);border-radius:100px;font-size:14px;font-weight:500;color:var(--txt2);cursor:pointer;transition:all .15s;white-space:nowrap;text-decoration:none}
.cp:hover{border-color:var(--p);color:var(--p);background:var(--pbg)}
.cp.active{background:var(--p);border-color:var(--p);color:#fff}
.tgs{padding:0 0 80px}
.tgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.tcard{background:var(--card);border:1px solid var(--bd);border-radius:var(--r3);padding:22px;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;gap:12px}
.tcard:hover{box-shadow:var(--shadow);transform:translateY(-2px);border-color:transparent}
.tch{display:flex;align-items:flex-start;gap:12px}
.tl{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;flex-shrink:0}
.tm{flex:1;min-width:0}
.tn{font-size:15px;font-weight:700;color:var(--txt);letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tc{font-size:12px;color:var(--txt3);margin-top:2px}
.trr{display:flex;align-items:center;gap:6px}
.trn{font-size:14px;font-weight:700;color:var(--txt)}
.trc{font-size:12px;color:var(--txt3)}
.ttags{display:flex;flex-wrap:wrap;gap:6px}
.tag{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:100px;font-size:11px;font-weight:600}
.td-default{background:var(--tb);color:var(--txt2)}
.td-primary{background:var(--pbg);color:var(--ptxt)}
.td-success{background:var(--sbg);color:var(--stxt)}
.td-new{background:rgba(139,92,246,.15);color:var(--ncol2)}
.td-free{background:rgba(6,182,212,.12);color:#0891B2}
.td{font-size:13px;color:var(--txt2);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1}
.tf{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--bd);margin-top:auto}
.td2{font-size:11px;color:var(--txt3)}
.rr{font-size:13px;font-weight:600;color:var(--p);display:flex;align-items:center;gap:4px;text-decoration:none}
.rr:hover{text-decoration:underline}
.foot{border-top:1px solid var(--bd);padding:40px 0;background:var(--card)}
.foot .c{display:flex;align-items:center;justify-content:space-between}
.fl2{display:flex;align-items:center;gap:24px}
.flogo{display:flex;align-items:center;gap:8px;text-decoration:none}
.fli{width:28px;height:28px;background:var(--p);border-radius:6px;display:flex;align-items:center;justify-content:center}
.flt{font-size:15px;font-weight:700;color:var(--txt)}
.fc{font-size:13px;color:var(--txt3)}
.flinks{display:flex;gap:24px;list-style:none}
.flinks a{font-size:13px;color:var(--txt2);text-decoration:none}
.flinks a:hover{color:var(--txt)}
.dv{height:1px;background:var(--bd);margin-bottom:64px}
</style>
</head>
<body>

<header class="hdr"><div class="c">
<a href="#" class="logo"><div class="li"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><span class="lt">AI<span>Reviewr</span></span></a>
<nav><ul>
<li><a href="#" class="active">Home</a></li>
<li><a href="#">Reviews</a></li>
<li><a href="#">About</a></li>
</ul></nav>
<div class="srch"><svg class="si" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" placeholder="Search AI tools..."></div>
<div class="acns"><button class="btn-g">Sign In</button><button class="btn-p">Get Started</button></div>
</div></header>

<section class="hero"><div class="c">
<div class="he">500+ AI Tools · Unbiased Reviews</div>
<h1>Find the right <em>AI tools</em> for your workflow</h1>
<p>Unbiased, in-depth reviews of the latest AI tools. Compare features, pricing, and performance — all in one place.</p>
<div class="hs"><svg class="si" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" placeholder="Try &quot;ChatGPT vs Claude&quot; or &quot;best AI writing tools&quot;... "><button class="hsbtn">Search</button></div>
<div class="hstats">
<div class="stat"><div class="statn">512</div><div class="statl">Tools Reviewed</div></div>
<div class="stat"><div class="statn">48</div><div class="statl">Categories</div></div>
<div class="stat"><div class="statn">12K+</div><div class="statl">Monthly Readers</div></div>
</div>
</div></section>

<section class="fea"><div class="c">
<div class="sh"><h2 class="st">&#11088; This Week's Featured</h2><a href="#" class="sl">View all &#8594;</a></div>
<div class="fgrid">

<div class="fcard"><div class="fbadge">Editor's Pick</div><div class="flr"><div class="fl" style="background:#D4A574;">C</div><div class="fi"><h3>Claude 3.5 Sonnet</h3><div class="fc">AI Assistant · Anthropic</div></div></div><p class="fd">The most capable AI model for complex reasoning, coding, and creative tasks. Features a 200K context window and agentic capabilities.</p><div class="ff"><div class="fr"><div class="stars"><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><span class="rn">4.9</span><span class="rc">(2,841)</span></div><span class="fpr">Free / $20/mo</span></div></div>

<div class="fcard"><div class="fbadge">&#128293; Most Popular</div><div class="flr"><div class="fl" style="background:#10A37F;">C</div><div class="fi"><h3>ChatGPT Plus</h3><div class="fc">AI Assistant · OpenAI</div></div></div><p class="fd">The most widely-used AI assistant with GPT-4o, multimodal capabilities, Advanced Data Analysis, and a growing ecosystem of GPTs.</p><div class="ff"><div class="fr"><div class="stars"><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><span class="rn">4.7</span><span class="rc">(5,102)</span></div><span class="fpr">$20/mo</span></div></div>

<div class="fcard"><div class="fbadge">&#10024; New</div><div class="flr"><div class="fl" style="background:#4B5563;">G</div><div class="fi"><h3>Gemini 1.5 Pro</h3><div class="fc">AI Assistant · Google</div></div></div><p class="fd">Google's most powerful model with a breakthrough 2M token context window, native multimodal processing, and state-of-the-art coding abilities.</p><div class="ff"><div class="fr"><div class="stars"><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><span class="rn">4.6</span><span class="rc">(1,203)</span></div><span class="fpr">Free / $19/mo</span></div></div>

</div>
</div></section>

<section class="cat"><div class="c">
<div class="sh"><h2 class="st">&#128203; Browse by Category</h2><a href="#" class="sl">All categories &#8594;</a></div>
<div class="cgrid">
<a href="#" class="cp active">&#9998;&#65039; AI Writing</a>
<a href="#" class="cp">&#128444;&#65039; Image Generation</a>
<a href="#" class="cp">&#128187; Code &amp; Dev</a>
<a href="#" class="cp">&#127916; Video &amp; Motion</a>
<a href="#" class="cp">&#127908; Voice &amp; Audio</a>
<a href="#" class="cp">&#129504; AI Assistant</a>
<a href="#" class="cp">&#128202; Data &amp; Analytics</a>
<a href="#" class="cp">&#127912; Design &amp; Creative</a>
<a href="#" class="cp">&#128221; Productivity</a>
<a href="#" class="cp">&#128269; Research &amp; Learning</a>
<a href="#" class="cp">&#128172; Chatbot &amp; </a>
<a href="#" class="cp">&#128295; Developer Tools</a>
<a href="#" class="cp">&#128241; Mobile Apps</a>
<a href="#" class="cp">&#127760; Browser Extensions</a>
<a href="#" class="cp">&#9925; SaaS Platforms</a>
<a href="#" class="cp">&#129302; Automation</a>
</div>
</div></section>

<div class="dv"></div>

<section class="tgs"><div class="c">
<div class="sh"><h2 class="st">&#128293; Trending Tools</h2><a href="#" class="sl">View all &#8594;</a></div>
<div class="tgrid">

<div class="tcard"><div class="tch"><div class="tl" style="background:#6366F1;">M</div><div class="tm"><div class="tn">Midjourney</div><div class="tc">Image Generation</div></div></div><div class="trr"><div class="stars"><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star empty" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><span class="trn">4.8</span><span class="trc">(3,421)</span></div><div class="ttags"><span class="tag td-new">New</span><span class="tag td-primary">Image</span></div><p class="td">State-of-the-art AI image generator with stunning artistic control and style versatility.</p><div class="tf"><span class="td2">Mar 15, 2026</span><a href="#" class="rr">Read Review &#8594;</a></div></div>

<div class="tcard"><div class="tch"><div class="tl" style="background:#0077FF;">N</div><div class="tm"><div class="tn">Notion AI</div><div class="tc">Productivity</div></div></div><div class="trr"><div class="stars"><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star empty" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div><span class="trn">4.6</span><span class="trc">(2,108)</span></div><div class="ttags"><span class="tag td-success">Free</span><span class="tag td-default">Writing</span></div><p class="td">AI-powered writing assistant integrated directly into your Notion workspace for seamless productivity.</p><div class="tf"><span class="td2">Mar 10, 2026</span><a href="#" class="rr">Read Review &#8594;</a></div></div>

<div class="tcard"><div class="tch"><div class="tl" style="background:#7C3AED;">R</div><div class="tm"><div class="tn">Runway</div><div class="tc">Video &amp; Motion</div></div></div><div class="trr"><div class="stars"><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg class="star" style="width:12px;height:12px" viewBox="0 0
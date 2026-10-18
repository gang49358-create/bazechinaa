import*as T from 'three';
const CFG={tg:'bazechina',wa:'79990000000'}; // ваши контакты: Telegram без @, WhatsApp номером без +
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)],calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
q('#tg').href='https://t.me/'+CFG.tg;q('#wa').href='https://wa.me/'+CFG.wa;
gsap.registerPlugin(ScrollTrigger);
let ln;if(!calm){ln=new Lenis({lerp:.075});ln.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>ln.raf(t*1e3));gsap.ticker.lagSmoothing(0)}
addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||!a.hash)return;const el=q(a.hash);if(el){e.preventDefault();ln?ln.scrollTo(el):el.scrollIntoView()}});
const t=q('#t');t.setAttribute('aria-label',t.textContent);t.innerHTML=[...t.textContent].map(c=>`<span class="ch" aria-hidden="true">${c==' '?'&nbsp;':c}</span>`).join('');
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>q('#alt').textContent=Math.round(s.progress*9000).toLocaleString('ru')+' м'});
if(!calm){
 gsap.from('.ch',{yPercent:110,opacity:0,filter:'blur(16px)',duration:1.8,stagger:.07,ease:'expo.out',delay:.3});
 gsap.from('[data-h]',{y:30,opacity:0,duration:1.4,stagger:.2,ease:'power3.out',delay:1.4});
 gsap.from('header',{yPercent:-100,opacity:0,duration:1.2,ease:'power3.out',delay:.8});
 qa('h2').forEach(h=>{h.innerHTML=h.textContent.split(' ').map(w=>`<span class="wm"><span class="wi">${w}</span></span>`).join(' ');gsap.from(h.querySelectorAll('.wi'),{yPercent:115,rotate:5,duration:1.5,stagger:.09,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 85%',toggleActions:'play none none reverse'}})});
 gsap.from('.av',{scale:0,rotate:-200,duration:1.6,stagger:.25,ease:'back.out(1.6)',scrollTrigger:{trigger:'#team',start:'top 55%',toggleActions:'play none none reverse'}});
 qa('[data-r]').forEach(el=>gsap.from(el,{y:90,opacity:0,filter:'blur(14px)',ease:'none',scrollTrigger:{trigger:el,start:'top 92%',end:'top 55%',scrub:.8}}));
 qa('.card').forEach((c,i)=>gsap.from(c,{y:120+i*40,rotateX:-18,opacity:0,ease:'none',scrollTrigger:{trigger:c,start:'top 95%',end:'top 55%',scrub:.8}}));
 qa('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.5,ease:'power3.out'})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.8,ease:'elastic.out(1,.4)'}))});
}
try{
 const m=innerWidth<800,R=new T.WebGLRenderer({canvas:q('#sky'),powerPreference:'high-performance'});
 R.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const sc=new T.Scene(),cam=new T.PerspectiveCamera(60,1,.1,400),night=new T.Color(0x0b1f6b),day=new T.Color(0x3a86ff);
 sc.background=night.clone();sc.fog=new T.FogExp2(0x0b1f6b,.008);
 const tex=()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
  for(let i=0;i<26;i++){const px=50+Math.random()*156,py=90+Math.random()*76,r=30+Math.random()*38,g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,255,255,.8)');g.addColorStop(.55,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,256,256)}
  const k=new T.CanvasTexture(c);k.colorSpace=T.SRGBColorSpace;return k};
 const mats=[0,1,2].map(()=>new T.SpriteMaterial({map:tex(),color:0xffffff,transparent:true,depthWrite:false,opacity:1}));
 const cl=[];for(let i=0;i<(m?60:110);i++){const s=new T.Sprite(mats[i%3]),k=12+Math.random()*16;s.position.set((Math.random()<.5?-1:1)*(2+Math.random()*18),(Math.random()-.5)*14-2,-Math.random()*220);s.scale.set(k*1.7,k,1);s.userData.p=Math.random()*6;sc.add(s);cl.push(s)}
 const sp=new Float32Array(4500);for(let i=0;i<1500;i++)sp.set([(Math.random()-.5)*160,Math.random()*70-10,-Math.random()*90],i*3);
 const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));
 const sm=new T.PointsMaterial({size:.35,color:0xffffff,transparent:true,fog:false,depthWrite:false});sc.add(new T.Points(sg,sm));
 cam.position.set(0,0,12);
 if(!calm){const tl=gsap.timeline({scrollTrigger:{trigger:'main',start:'top top',end:'bottom bottom',scrub:1.4},defaults:{ease:'none',duration:1}});
  tl.to(cam.position,{z:-195},0).to(sc.background,{r:day.r,g:day.g,b:day.b},0).to(sc.fog.color,{r:day.r,g:day.g,b:day.b},0).to(sm,{opacity:0,duration:.3},0);
  }
 let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 const fit=()=>{R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};fit();addEventListener('resize',fit);
 let sv=0;ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{sv=s.getVelocity()}});
 const loop=ms=>{const t=ms*.001;cam.position.x+=(mx*3+Math.sin(t*.3)*1.2-cam.position.x)*.04;cam.position.y+=(-my*1.8+Math.cos(t*.25)*.5-cam.position.y)*.04;cam.rotation.z=Math.sin(t*.2)*.02;
  cl.forEach(s=>{s.position.x+=Math.sin(t*.1+s.userData.p)*.004});sv*=.9;cam.fov+=(60+Math.min(Math.abs(sv)/150,16)-cam.fov)*.08;cam.updateProjectionMatrix();R.render(sc,cam)};
 calm?loop(0):R.setAnimationLoop(loop);
 addEventListener('load',()=>ScrollTrigger.refresh());
}catch(e){q('#sky')?.remove()}

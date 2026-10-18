const CFG={tg:'bazechina',wa:'79990000000'}; // ВАШИ контакты: Telegram без @, WhatsApp номером без +
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const H=s=>btoa(unescape(encodeURIComponent(s)));
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const rub=n=>n.toLocaleString('ru')+' ₽';
const ST=['Новый','В обработке','Отправлен','Доставлен','Отменён'];
const IC={'Кроссовки':'👟','Одежда':'🧥','Аксессуары':'🎒'};
const P=[
{id:1,n:'adidas Jeremy Scott Wings',c:'Кроссовки',p:12900},
{id:2,n:'adidas Jeremy Scott 2.0',c:'Кроссовки',p:13900},
{id:3,n:'Nike Air Force 1 Swarovski',c:'Кроссовки',p:14500},
{id:4,n:'Худи Oversize Blue',c:'Одежда',p:4900},
{id:5,n:'Карго-штаны Street',c:'Одежда',p:5400},
{id:6,n:'Бомбер Night',c:'Одежда',p:7900},
{id:7,n:'Кепка Baze',c:'Аксессуары',p:1800},
{id:8,n:'Сумка через плечо',c:'Аксессуары',p:3200}];
const SEED=[{n:'Артём',s:5,t:'Кроссовки пришли за две недели, всё как на фото.'},{n:'Лена',s:5,t:'Худи плотное, размер в размер. Беру ещё.'},{n:'Даниил',s:4,t:'Курьер задержался на день, но вещь огонь.'}];
let cat='Все';
(()=>{const u=L('bc_users',[]);if(!u.some(x=>x.e=='admin')){u.push({e:'admin',n:'Администратор',p:H('admin123'),r:'admin'});S('bc_users',u)}})();
const me=()=>L('bc_users',[]).find(u=>u.e==L('bc_me',''));
const cart=()=>L('bc_cart',[]);
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3200)};
const modal=h=>{$('#box').innerHTML=h;$('#modal').classList.add('open')};
const closeM=()=>$('#modal').classList.remove('open');
const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ob.unobserve(e.target)}}),{threshold:.12});
const io=()=>$$('.rv:not(.in)').forEach(el=>ob.observe(el));
function head(){const u=me();$('#bAcc').textContent=u?u.n.split(' ')[0]:'Войти';$('#bAdm').hidden=u?.r!='admin'}
function shop(){
 $('#tabs').innerHTML=['Все',...Object.keys(IC)].map(c=>`<button data-tab="${c}" class="${c==cat?'on':''}">${c}</button>`).join('');
 $('#grid').innerHTML=P.filter(p=>cat=='Все'||p.c==cat).map(p=>`<article class="card rv"><div class="ph"><img src="img/${p.id}.jpg" alt="${p.n}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${IC[p.c]}'}))"></div><h3>${p.n}</h3><div class="row"><b>${rub(p.p)}</b><button class="btn s" data-add="${p.id}">В корзину</button></div></article>`).join('');io()}
function revs(){$('#revs').innerHTML=L('bc_revs',SEED).map(r=>`<blockquote class="rv"><b>${esc(r.n)}</b> <span class="st">${'★'.repeat(r.s)}</span><p>${esc(r.t)}</p></blockquote>`).join('');io()}
const det=()=>{const it=cart().map(i=>({...P.find(p=>p.id==i.id),q:i.q}));return{it,sum:it.reduce((s,i)=>s+i.p*i.q,0)}};
const setCart=c=>{S('bc_cart',c);drawCart()};
function drawCart(){const{it,sum}=det();$('#cnt').textContent=it.reduce((s,i)=>s+i.q,0);
 $('#cartBody').innerHTML=it.length?it.map(i=>`<div class="ci"><span style="font-size:28px">${IC[i.c]}</span><div><b>${i.n}</b><small>${rub(i.p)}</small></div><div class="q"><button data-q="${i.id}:-1">−</button>${i.q}<button data-q="${i.id}:1">+</button></div></div>`).join('')+`<p class="tot">Итого: <b>${rub(sum)}</b></p>`:'<p class="mut">Корзина пуста. Добавь что-нибудь из каталога.</p>';
 $('#ord').hidden=!it.length}
function auth(msg='',reg=false){
 modal(`<h3>${reg?'Регистрация':'Вход'}</h3><p class="mut">${msg}</p><form id="af">${reg?'<input name="n" placeholder="Имя" required>':''}<input name="e" placeholder="Email" required><input name="p" type="password" placeholder="Пароль (от 6 символов)" minlength="6" required><button class="btn">${reg?'Создать аккаунт':'Войти'}</button></form><p style="margin-top:14px"><a href="#" data-x="${reg?'login':'reg'}">${reg?'Уже есть аккаунт? Войти':'Нет аккаунта? Зарегистрироваться'}</a></p>`);
 $('#af').onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target)),us=L('bc_users',[]),k=f.e.trim().toLowerCase();
  if(reg){if(us.some(u=>u.e==k))return toast('Этот email уже зарегистрирован');us.push({e:k,n:f.n.trim(),p:H(f.p),r:'user'});S('bc_users',us)}
  else if(!us.some(u=>u.e==k&&u.p==H(f.p)))return toast('Неверный email или пароль');
  S('bc_me',k);closeM();head();toast('Добро пожаловать!')}}
function prof(){const u=me(),os=L('bc_orders',[]).filter(o=>o.u==u.e);
 modal(`<h3>${esc(u.n)}</h3><p class="mut">${esc(u.e)}</p><h4>Мои заказы</h4>${os.map(o=>`<div class="ord"><b>№${o.id}</b><span class="chip">${o.st}</span><small>${o.d}</small><p>${o.it.map(esc).join(', ')} — ${rub(o.sum)}</p></div>`).join('')||'<p class="mut">Заказов пока нет. Загляни в каталог.</p>'}<button class="btn s" data-x="out">Выйти</button>`)}
function adm(){const os=L('bc_orders',[]);
 modal(`<h3>Админ-панель</h3><p class="mut">Заказов: ${os.length} · Выручка без отменённых: ${rub(os.filter(o=>o.st!='Отменён').reduce((s,o)=>s+o.sum,0))}</p>${os.length?`<div class="tw"><table><tr><th>№</th><th>Клиент</th><th>Заказ</th><th>Сумма</th><th>Статус</th></tr>${os.map(o=>`<tr><td>${o.id}<small>${o.d}</small></td><td>${esc(o.n)}<small>${esc(o.ph)}<br>${esc(o.a)}</small></td><td>${o.it.map(esc).join('<br>')}</td><td>${rub(o.sum)}</td><td><select data-o="${o.id}">${ST.map(s=>`<option${s==o.st?' selected':''}>${s}</option>`).join('')}</select></td></tr>`).join('')}</table></div>`:'<p class="mut">Заказов пока нет. Они появятся здесь после первой покупки.</p>'}`)}
$('#ord').onsubmit=e=>{e.preventDefault();const u=me();if(!u)return auth('Войди, чтобы оформить заказ');
 const f=new FormData(e.target),{it,sum}=det(),o={id:String(Date.now()).slice(-6),u:u.e,n:f.get('n'),ph:f.get('p'),a:f.get('a'),it:it.map(i=>`${i.n} × ${i.q}`),sum,st:ST[0],d:new Date().toLocaleString('ru')};
 S('bc_orders',[o,...L('bc_orders',[])]);
 const msg=`Заказ №${o.id}\n${o.n}, ${o.ph}\n${o.a}\n${o.it.join('\n')}\nИтого: ${rub(sum)}`;
 if(f.get('m')=='wa')open(`https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}`);
 else{navigator.clipboard?.writeText(msg).catch(()=>{});open(`https://t.me/${CFG.tg}`)}
 setCart([]);$('#cart').classList.remove('open');e.target.reset();toast(f.get('m')=='tg'?'Заказ сохранён. Текст скопирован — вставь его в чат Telegram':'Заказ сохранён. Подтверди его в WhatsApp')};
$('#rf').onsubmit=e=>{e.preventDefault();const u=me();if(!u)return auth('Войди, чтобы оставить отзыв');
 const f=new FormData(e.target);S('bc_revs',[{n:u.n,s:+f.get('s'),t:f.get('t')},...L('bc_revs',SEED)]);e.target.reset();revs();toast('Спасибо за отзыв!')};
document.addEventListener('click',e=>{
 if(e.target.id=='modal')closeM();
 const t=e.target.closest('[data-add],[data-q],[data-tab],[data-x]');if(!t)return;const d=t.dataset;
 if(d.tab){cat=d.tab;shop()}
 if(d.add){const c=cart(),i=c.find(x=>x.id==d.add);i?i.q++:c.push({id:+d.add,q:1});setCart(c);toast('Добавлено в корзину')}
 if(d.q){const[id,n]=d.q.split(':');setCart(cart().map(i=>i.id==id?{...i,q:i.q+ +n}:i).filter(i=>i.q>0))}
 if(d.x){e.preventDefault();({login:()=>auth('',0),reg:()=>auth('',1),out:()=>{S('bc_me','');closeM();head();toast('Ты вышел из аккаунта')}})[d.x]()}});
document.addEventListener('change',e=>{const id=e.target.dataset.o;if(id){S('bc_orders',L('bc_orders',[]).map(o=>o.id==id?{...o,st:e.target.value}:o));toast('Статус обновлён')}});
document.addEventListener('mousemove',e=>{const c=$('#cur');c.style.opacity=1;c.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
 const k=e.target.closest('.card');if(k){const r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;k.style.transform=`perspective(700px) rotateY(${x*16}deg) rotateX(${-y*16}deg) scale(1.03)`}
 $('#stage').style.transform=`rotateY(${(e.clientX/innerWidth-.5)*40}deg) rotateX(${-(e.clientY/innerHeight-.5)*30}deg)`});
document.addEventListener('mouseout',e=>{const k=e.target.closest?.('.card');if(k&&!k.contains(e.relatedTarget))k.style.transform=''});
document.addEventListener('keydown',e=>{if(e.key=='Escape'){closeM();$('#cart').classList.remove('open')}});
$('#b3d').innerHTML=Array.from({length:12},(_,i)=>`<i style="transform:translateZ(${i*7-38}px)">B</i>`).join('');
$('#bAcc').onclick=()=>me()?prof():auth();$('#bAdm').onclick=adm;
$('#bCart').onclick=()=>$('#cart').classList.toggle('open');$('#cx').onclick=()=>$('#cart').classList.remove('open');$('#mx').onclick=closeM;
head();shop();revs();drawCart();io();

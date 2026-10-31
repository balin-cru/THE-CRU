  // timecode ticker
  (function(){
    var start = performance.now();
    var el = document.getElementById('timecode');
    function pad(n){return String(n).padStart(2,'0');}
    function tick(){
      var elapsed = performance.now() - start;
      var totalFrames = Math.floor(elapsed/1000*24);
      var ff = totalFrames % 24;
      var totalSeconds = Math.floor(totalFrames/24);
      var ss = totalSeconds % 60;
      var mm = Math.floor(totalSeconds/60) % 60;
      var hh = Math.floor(totalSeconds/3600);
      if(el) el.textContent = pad(hh)+':'+pad(mm)+':'+pad(ss)+':'+pad(ff);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  // slate date (home page only)
  (function(){
    var d = document.getElementById('slateDate');
    if(d) d.textContent = new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  })();

  // intro slate sequence (home page only)
  (function(){
    var overlay = document.getElementById('slate-overlay');
    if(!overlay) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ overlay.remove(); return; }
    var t1 = setTimeout(function(){ overlay.classList.add('clap'); }, 350);
    var t2 = setTimeout(function(){ overlay.classList.add('lift'); }, 950);
    var t3 = setTimeout(function(){ overlay.remove(); }, 1700);
    overlay.addEventListener('click', function(){
      clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);
      overlay.remove();
    });
  })();

  // cursor reticle
  (function(){
    var r = document.getElementById('cursor-reticle');
    if(!r) return;
    if(!window.matchMedia('(pointer:fine)').matches){ r.style.display='none'; return; }
    var mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; r.style.opacity=1; });
    function raf(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      r.style.transform = 'translate('+rx+'px,'+ry+'px)';
      requestAnimationFrame(raf);
    }
    raf();
  })();

  // cycling crew-discipline word in the hero — plays twice, then settles on a clean centered "THE / CRU"
  (function(){
    var words = ['FILM','PHOTO','DOC','GRIP','EDIT'];
    var el = document.getElementById('cycleWord');
    var wrap = el ? el.parentElement : null;
    if(!el || !wrap) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ wrap.classList.add('collapsed'); wrap.classList.add('hidden'); return; }

    var passes = 2;
    var totalSteps = words.length * passes;
    var i = 0;
    var flickerStep = 110;
    var startDelay = 1650;

    function flicker(){
      el.textContent = words[i % words.length];
      i++;
      if(i < totalSteps){
        setTimeout(flicker, flickerStep);
      } else {
        setTimeout(function(){ wrap.classList.add('collapsed'); }, 260);
      }
    }
    wrap.addEventListener('transitionend', function(e){
      if(e.propertyName === 'max-height' && wrap.classList.contains('collapsed')){
        wrap.classList.add('hidden');
      }
    });
    setTimeout(flicker, startDelay);
  })();

  // lazy video embed (YouTube / Vimeo) — click-to-load, only fires once a real ID is set
  (function(){
    var frames = document.querySelectorAll('.video-frame[data-video-id]');
    frames.forEach(function(el){
      var id = el.getAttribute('data-video-id');
      if(!id) return; // no link set yet — stays a static placeholder
      el.addEventListener('click', function(){
        var provider = el.getAttribute('data-provider') || 'youtube';
        var src = provider === 'vimeo'
          ? 'https://player.vimeo.com/video/' + id + '?autoplay=1'
          : 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
        var iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.loading = 'lazy';
        iframe.title = el.getAttribute('data-title') || 'Showreel';
        el.innerHTML = '';
        el.appendChild(iframe);
        el.classList.add('loaded');
      }, { once:true });
    });
  })();

  // FPV drone — descends and banks as the home page scrolls, then fades out
  (function(){
    var drone = document.getElementById('droneIcon');
    if(!drone) return;
    var label = document.getElementById('droneLabel');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce) return; // stays hidden — no scroll-linked motion for reduced-motion users

    var flightRange = 1500; // px of scroll the flight plays out over
    var ticking = false;

    function update(){
      var y = window.scrollY;
      var progress = Math.min(Math.max(y / flightRange, 0), 1);
      var descend = progress * 360;
      var sway = Math.sin(progress * Math.PI * 2.4) * 22;
      var bank = Math.sin(progress * Math.PI * 3.2) * 9;
      drone.style.transform = 'translate(' + sway.toFixed(1) + 'px,' + descend.toFixed(1) + 'px) rotate(' + bank.toFixed(1) + 'deg)';

      var fadeIn = Math.min(progress / 0.06, 1);
      var fadeOut = progress > 0.78 ? Math.max(0, 1 - (progress - 0.78) / 0.2) : 1;
      drone.style.opacity = (Math.min(fadeIn, fadeOut) * 0.85).toFixed(2);

      if(label){
        var labelOpacity = progress < 0.03 ? progress / 0.03 : Math.max(0, 1 - (progress - 0.03) / 0.1);
        label.style.opacity = labelOpacity.toFixed(2);
      }
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    update();
  })();

  // nav scroll state + mobile toggle
  (function(){
    var nav = document.getElementById('siteNav');
    var btn = document.getElementById('navToggle');
    var list = document.getElementById('navList');
    if(!nav || !btn || !list) return;
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
    btn.addEventListener('click', function(){
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    list.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ list.classList.remove('open'); });
    });
  })();

  // scroll reveal (with fallback if IntersectionObserver is unavailable)
  (function(){
    var items = document.querySelectorAll('[data-reveal]');
    if(!('IntersectionObserver' in window)){
      items.forEach(function(i){ i.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, {threshold:.15});
    items.forEach(function(i){ io.observe(i); });
  })();

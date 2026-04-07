document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS for smooth transitions
    const style = document.createElement('style');
    style.innerHTML = `
        .app-container { transition: opacity 0.2s ease-in-out; }
        .app-container.fade-out { opacity: 0; }
    `;
    document.head.appendChild(style);

    // Initialize loaded scripts map
    window.loadedScripts = new Set();
    document.querySelectorAll('script').forEach(s => {
        let key = s.src || s.innerHTML.substring(0, 50).trim();
        if (key) window.loadedScripts.add(key);
    });

    // Intercept link clicks
    document.body.addEventListener('click', async (e) => {
        if (e.defaultPrevented) return;

        let link = e.target.closest('a');
        if (!link) return;
        
        let href = link.getAttribute('href');
        // Ignore external or anchor links
        if (!href || href === '#' || href.startsWith('http') || link.getAttribute('target') || href.includes('javascript')) return;
        
        e.preventDefault();
        
        let currentPath = window.location.pathname.split('/').pop() || 'home.html';
        let [targetUrl, targetHash = ''] = href.split('#');
        let targetPath = (targetUrl.split('/').pop() || currentPath);

        if (targetPath === currentPath) {
            if (targetHash) {
                window.location.hash = targetHash;
            }
            return;
        }

        navigateTo(href);
    });

    window.addEventListener('popstate', (e) => {
        let url = e.state ? e.state.url : (window.location.pathname.split('/').pop() || 'home.html');
        navigateTo(url, false);
    });
});

async function navigateTo(url, pushState = true) {
    try {
        const container = document.querySelector('.app-container');
        if (container) container.classList.add('fade-out');
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Page note found');
        const html = await res.text();
        
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const newContainer = doc.querySelector('.app-container');
        if (!newContainer) {
            window.location.href = url;
            return;
        }

        setTimeout(() => {
            if (doc.title) document.title = doc.title;
            container.outerHTML = newContainer.outerHTML;
            window.scrollTo(0, 0);
            
            if (pushState) window.history.pushState({ url }, '', url);
            
            // Re-init generic UI
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            // Execute new scripts to avoid redeclaration issues for inline ones
            doc.querySelectorAll('script').forEach(script => {
                let key = script.src || script.innerHTML.substring(0, 50).trim();
                if (!key) return;
                
                if (!window.loadedScripts.has(key)) {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        // Hacky way to allow multiple evaluations of the same block if it breaks or is re-loaded
                        newScript.innerHTML = script.innerHTML.replace(/\bconst\b/g, 'var').replace(/\blet\b/g, 'var');
                    }
                    document.body.appendChild(newScript);
                    window.loadedScripts.add(key);
                }
            });
            
            // Fix states if scripts were already loaded
            setTimeout(() => {
                const finalUrl = url.split('/').pop() || url;
                if (finalUrl.includes('bookings') && typeof initBookings === 'function') initBookings();
                else if (finalUrl.includes('home') && typeof setGender === 'function') {
                    setGender('male');
                    if (window.location.hash === '#saved' && typeof showSavedView === 'function') {
                        showSavedView(document.getElementById('nav-saved'), false);
                    } else if (typeof showHomeView === 'function') {
                        showHomeView(document.getElementById('nav-home'), false);
                    }
                }
            }, 50);
            
        }, 200); 
    } catch (e) {
        window.location.href = url;
    }
}

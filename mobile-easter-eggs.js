// Mobile Easter Eggs Implementation

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile Easter eggs
    initMobileEasterEggs();
});

function initMobileEasterEggs() {
    // Variables for double tap detection
    let lastTap = 0;
    const doubleTapDelay = 300; // milliseconds between taps
    
    // Variables for long press detection
    let pressTimer;
    const longPressTime = 2500; // milliseconds to hold for long press
    
    // 1. Double tap anywhere on screen for RAWR Easter egg
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < doubleTapDelay && tapLength > 0) {
            // Double tap detected
            e.preventDefault();
            activateRawrEasterEgg();
        }
        
        lastTap = currentTime;
    });
    
    // 2. Long press on hamburger menu for VORE Easter egg (SWAPPED)
    const hamburgerMenu = document.querySelector('.hamburger');
    if (hamburgerMenu) {
        // Touch start - start the timer
        hamburgerMenu.addEventListener('touchstart', (e) => {
            console.log('Touch start detected on hamburger menu');
            pressTimer = setTimeout(() => {
                console.log('Long press detected on hamburger menu! Activating VORE Easter egg');
                activateVoreEasterEgg();
            }, longPressTime);
        });
        
        // Touch end or Touch cancel - clear the timer
        ['touchend', 'touchcancel', 'touchmove'].forEach(evt => {
            hamburgerMenu.addEventListener(evt, () => {
                console.log('Touch ended or moved on hamburger menu, clearing timer');
                clearTimeout(pressTimer);
            });
        });
    }
    
    // Set up long press detection for LAWLESS Easter egg
    document.addEventListener('touchstart', (e) => {
        // Don't trigger if we're pressing on the hamburger menu (to avoid double triggers)
        if (e.target.closest('.hamburger')) {
            return;
        }
        
        console.log('Touch start detected for LAWLESS Easter egg');
        pressTimer = setTimeout(() => {
            console.log('Long press detected! Activating LAWLESS Easter egg');
            activateLawlessEasterEgg();
        }, longPressTime);
    });
    
    // Clear the timer if the touch ends or moves
    ['touchend', 'touchcancel', 'touchmove'].forEach(evt => {
        document.addEventListener(evt, (e) => {
            // Don't clear if we're on the hamburger menu (to avoid interfering with hamburger menu long press)
            if (e.target.closest('.hamburger')) {
                return;
            }
            console.log('Touch ended or moved, clearing LAWLESS timer');
            clearTimeout(pressTimer);
        });
    });
    
    // 4. Long press anywhere on lore page for VORE Easter egg (kept for backward compatibility)
    // Check if we're on the lore page
    const checkAndSetupLorePageListeners = () => {
        console.log('Checking if on lore page. Current hash:', window.location.hash);
        // Check if we're on the lore page by looking at the URL hash
        if (window.location.hash === '#lore') {
            console.log('Lore page detected! Setting up long press listeners');
            // We're on the lore page, set up long press detection
            document.addEventListener('touchstart', (e) => {
                // Don't trigger if we're pressing on the hamburger menu (to avoid double triggers)
                if (e.target.closest('.hamburger')) {
                    return;
                }
                
                console.log('Touch start detected on lore page');
                pressTimer = setTimeout(() => {
                    console.log('Long press detected on lore page! Activating VORE Easter egg');
                    activateVoreEasterEgg();
                }, longPressTime);
            });
            
            // Clear the timer if the touch ends or moves
            ['touchend', 'touchcancel', 'touchmove'].forEach(evt => {
                document.addEventListener(evt, (e) => {
                    // Don't clear if we're on the hamburger menu (to avoid interfering with hamburger menu long press)
                    if (e.target.closest('.hamburger')) {
                        return;
                    }
                    console.log('Touch ended or moved on lore page, clearing timer');
                    clearTimeout(pressTimer);
                });
            });
        } else {
            console.log('Not on lore page, skipping setup of VORE Easter egg listeners');
        }
    };
    
    // Initial check when the page loads
    checkAndSetupLorePageListeners();
    
    // Also check when the hash changes (user navigates to lore page)
    window.addEventListener('hashchange', checkAndSetupLorePageListeners);
}

// Function to activate RAWR Easter egg (reusing existing function from script.js)
function activateRawrEasterEgg() {
    // Check if the function exists in the global scope
    if (typeof activateEasterEgg === 'function') {
        activateEasterEgg();
    } else {
        console.warn('RAWR Easter egg function not found');
        // Fallback implementation if the original function is not available
        const roarSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        roarSound.volume = 0.3;
        roarSound.play();
        
        // Create a simple visual effect - mobile optimized
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.color = '#00fbff';
        
        // Improved responsive font sizing for different device widths
        if (window.innerWidth <= 320) {
            // Extra small devices
            overlay.style.fontSize = '0.9rem';
            overlay.style.padding = '0.6rem';
        } else if (window.innerWidth <= 480) {
            // Small mobile devices
            overlay.style.fontSize = '1.1rem';
            overlay.style.padding = '0.7rem';
        } else if (window.innerWidth <= 768) {
            // Regular mobile devices
            overlay.style.fontSize = '1.4rem';
            overlay.style.padding = '0.8rem';
        } else {
            // Tablets and larger
            overlay.style.fontSize = '2.2rem';
            overlay.style.padding = '0';
        }
        
        overlay.style.fontFamily = 'Orbitron, sans-serif';
        overlay.style.textShadow = '0 0 10px #00fbff';
        overlay.style.textAlign = 'center';
        overlay.style.maxWidth = '100%';
        overlay.style.wordWrap = 'break-word';
        overlay.style.flexDirection = 'column';
        overlay.style.padding = '1rem';
        
        const dragonEmoji = document.createElement('div');
        dragonEmoji.textContent = '🐉✨';
        dragonEmoji.style.fontSize = '1.5em';
        dragonEmoji.style.marginBottom = '0.5rem';
        
        const rawrText = document.createElement('div');
        rawrText.textContent = 'RAWRRRRR!!!';
        rawrText.style.letterSpacing = '1px';
        
        const subText = document.createElement('div');
        subText.textContent = 'Tercipta dari es abadi';
        subText.style.fontSize = '0.7em';
        subText.style.marginTop = '0.5rem';
        subText.style.opacity = '0.8';
        
        const powerText = document.createElement('div');
        powerText.textContent = 'Kekuatan IceWing & SeaWing telah aktif!';
        powerText.style.fontSize = '0.8em';
        powerText.style.marginTop = '1rem';
        powerText.style.padding = '0.5rem';
        powerText.style.border = '1px solid #00fbff';
        powerText.style.borderRadius = '20px';
        powerText.style.boxShadow = '0 0 10px #00fbff';
        
        overlay.appendChild(dragonEmoji);
        overlay.appendChild(rawrText);
        overlay.appendChild(subText);
        overlay.appendChild(powerText);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.8s';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 800);
        }, 3000);
    }
}

// Function to activate LAWLESS Easter egg (reusing existing function from script.js)
function activateLawlessEasterEgg() {
    // Check if the function exists in the global scope
    if (typeof showTrivia === 'function') {
        showTrivia();
    } else {
        console.warn('LAWLESS Easter egg function not found');
        // Fallback implementation if the original function is not available
        const triviaList = [
            "Lawless memiliki sisik yang berkilau seperti kristal es di bawah sinar matahari",
            "Suhu tubuh Lawless bisa beradaptasi dengan lingkungan sekitarnya",
            "Lawless bisa bernafas di air dan membekukan air di sekitarnya",
            "Sayap Lawless memiliki corak unik yang menyerupai aurora",
            "Lawless sangat menyukai seafood, terutama salmon"
        ];
        
        const randomTrivia = triviaList[Math.floor(Math.random() * triviaList.length)];
        
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.color = '#00fbff';
        overlay.style.fontFamily = 'Orbitron, sans-serif';
        overlay.style.padding = '2rem';
        overlay.style.textAlign = 'center';
        
        const content = document.createElement('div');
        content.innerHTML = `<div style="font-size: 2rem; margin-bottom: 1rem; text-shadow: 0 0 15px #00fbff">Tahukah kamu?</div>
                           <div style="font-size: 1.2rem; line-height: 1.6; text-shadow: 0 0 10px #0088ff">${randomTrivia}</div>`;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.8s';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 800);
        }, 4000);
    }
}

// Function to activate VORE Easter egg (using the existing voreEasterEgg object)
function activateVoreEasterEgg() {
    console.log('activateVoreEasterEgg function called');
    
    // First, ensure the vore-easter-egg.js script is loaded
    const ensureVoreScriptLoaded = () => {
        return new Promise((resolve) => {
            // Check if voreEasterEgg object already exists
            if (window.voreEasterEgg && typeof window.voreEasterEgg.activate === 'function') {
                console.log('voreEasterEgg object already exists');
                resolve(true);
                return;
            }
            
            console.log('Loading vore-easter-egg.js script');
            // Check if the script is already in the document
            const existingScript = document.querySelector('script[src*="vore-easter-egg.js"]');
            if (existingScript) {
                console.log('vore-easter-egg.js script already in document');
                // Script exists but might not be fully loaded yet
                if (window.voreEasterEgg) {
                    resolve(true);
                } else {
                    // Wait for script to load
                    existingScript.addEventListener('load', () => resolve(true));
                    // Set a timeout in case the script fails to load
                    setTimeout(() => resolve(false), 3000);
                }
                return;
            }
            
            // Create and add the script - using absolute path to ensure it loads correctly
            const script = document.createElement('script');
            // Try to determine the correct path
            const currentScriptPath = document.currentScript ? document.currentScript.src : '';
            const basePath = currentScriptPath ? currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) : '';
            
            // Use absolute path with origin if we can determine it, otherwise fallback to relative
            script.src = basePath ? `${basePath}vore-easter-egg.js` : '/vore-easter-egg.js';
            console.log(`Loading vore script from: ${script.src}`);
            script.async = false; // Changed to synchronous loading to ensure it's fully loaded
            
            script.onload = () => {
                console.log('vore-easter-egg.js loaded successfully');
                // Add a small delay to ensure the script is fully initialized
                setTimeout(() => {
                    // Force the current page to be the lore page if not already there
                    // This ensures the Easter egg works properly regardless of which page we're on
                    const lorePage = document.getElementById('lore');
                    if (lorePage) {
                        // Make sure all other sections are hidden
                        document.querySelectorAll('section').forEach(section => {
                            section.classList.remove('active');
                        });
                        // Activate the lore page
                        lorePage.classList.add('active');
                        // Update URL hash to match
                        window.location.hash = '#lore';
                    }
                    resolve(true);
                }, 100);
            };
            
            script.onerror = (error) => {
                console.error('Failed to load vore-easter-egg.js:', error);
                // Try alternative path as fallback
                const alternativeScript = document.createElement('script');
                alternativeScript.src = './vore-easter-egg.js';
                console.log(`Trying alternative path: ${alternativeScript.src}`);
                alternativeScript.async = false;
                
                alternativeScript.onload = () => {
                    console.log('vore-easter-egg.js loaded successfully from alternative path');
                    setTimeout(() => resolve(true), 100);
                };
                
                alternativeScript.onerror = () => {
                    console.error('Failed to load vore-easter-egg.js from all paths');
                    resolve(false);
                };
                
                document.head.appendChild(alternativeScript);
            };
            
            document.head.appendChild(script);
        });
    };
    
    // Try to load and activate the vore easter egg
    ensureVoreScriptLoaded().then(success => {
        // Double check if voreEasterEgg is available after loading
        if (window.voreEasterEgg) {
            console.log('voreEasterEgg object found in window:', window.voreEasterEgg);
        } else {
            console.warn('voreEasterEgg object not found in window after loading script');
        }
        
        if (success && window.voreEasterEgg && typeof window.voreEasterEgg.activate === 'function') {
            console.log('Using voreEasterEgg.activate() function');
            try {
                window.voreEasterEgg.activate();
                console.log('voreEasterEgg.activate() called successfully');
            } catch (error) {
                console.error('Error calling voreEasterEgg.activate():', error);
                showFallbackNotification('Error activating VORE Easter Egg: ' + error.message);
            }
        } else {
            console.warn('VORE Easter egg function not found, using fallback');
            // Try to directly access the voreEasterEgg object from the global scope
            try {
                if (typeof voreEasterEgg !== 'undefined' && typeof voreEasterEgg.activate === 'function') {
                    console.log('Found voreEasterEgg in global scope, activating');
                    voreEasterEgg.activate();
                    return;
                }
            } catch (error) {
                console.error('Error accessing global voreEasterEgg:', error);
            }
            
            // Fallback implementation - just update the audio system state
            if (window.audioSystem && typeof window.audioSystem.setEasterEggState === 'function') {
                console.log('Using audioSystem.setEasterEggState() fallback');
                window.audioSystem.setEasterEggState(true);
                showFallbackNotification('VORE Easter Egg Activated! (Using audio system only)');
            } else {
                console.error('No fallback available for VORE Easter egg');
                showFallbackNotification('VORE Easter Egg Activated!');
            }
        }
    });
    
    // Helper function to show fallback notification
    function showFallbackNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(255, 0, 255, 0.8)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '9999';
        notification.style.fontFamily = 'Orbitron, sans-serif';
        notification.style.boxShadow = '0 0 15px rgba(255, 0, 255, 0.6)';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.8s';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 800);
        }, 3000);
    }
}

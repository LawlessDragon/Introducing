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
    const longPressTime = 1000; // milliseconds to hold for long press
    
        // Variables for triple tap detection
    let tapCount = 0;
    let lastTapTime = 0;
    const tapDelay = 500; // milliseconds between taps
    
    // 1. Triple tap anywhere for RAWR Easter egg
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime > tapDelay) {
            // Reset tap count if too much time has passed
            tapCount = 1;
        } else {
            tapCount++;
        }
        
        lastTapTime = currentTime;
        
        if (tapCount === 3) {
            // Triple tap detected
            console.log('Triple tap detected! Activating RAWR Easter egg');
            e.preventDefault();
            activateRawrEasterEgg();
            tapCount = 0; // Reset tap count
        }
    });
    
    // 3. Long press on hamburger menu for VORE Easter egg (kept as is)
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

function activateRawrEasterEgg() {
    // Check if the function exists in the global scope
    if (typeof activateEasterEgg === 'function') {
        activateEasterEgg();
    } else {
        console.warn('RAWR Easter egg function not found');
        
        // Play sound
        const roarSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        roarSound.volume = 0.3;
        roarSound.play();
        
        // Konstanta untuk warna dan font
        const textColor = '#00fbff';
        const fontFamily = 'Orbitron, sans-serif';
        
        // Membuat overlay - pengaturan dasar
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '9999';
        overlay.style.boxSizing = 'border-box';
        
        // Menggunakan grid layout untuk perataan sempurna
        const contentGrid = document.createElement('div');
        contentGrid.style.position = 'absolute';
        contentGrid.style.width = '100%';
        contentGrid.style.height = '100%';
        contentGrid.style.display = 'grid';
        contentGrid.style.placeItems = 'center'; // Shorthand untuk align-items & justify-items
        contentGrid.style.boxSizing = 'border-box';
        
        // Container utama untuk konten - akan selalu ditengah secara sempurna
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.alignItems = 'center';
        contentContainer.style.justifyContent = 'center';
        contentContainer.style.width = '100%';
        contentContainer.style.maxWidth = '100%';
        contentContainer.style.boxSizing = 'border-box';
        contentContainer.style.padding = '0 20px'; // Tambah padding horizontal untuk mode portrait
        contentContainer.style.textAlign = 'center';
        
        // LAWLESS text
        const lawlessText = document.createElement('div');
        lawlessText.textContent = 'LAWLESS';
        lawlessText.style.color = textColor;
        lawlessText.style.fontFamily = fontFamily;
        lawlessText.style.fontSize = 'clamp(1.5rem, 5vw, 2.5rem)'; // Responsive font size
        lawlessText.style.textShadow = `0 0 10px ${textColor}`;
        lawlessText.style.textAlign = 'center';
        lawlessText.style.width = '100%';
        lawlessText.style.boxSizing = 'border-box';
        lawlessText.style.margin = '0 0 10px 0';
        
        // RAWR text - penting untuk tetap ditengah
        const rawrText = document.createElement('div');
        rawrText.textContent = 'RAWRRRR!!!';
        rawrText.style.color = textColor;
        rawrText.style.fontFamily = fontFamily;
        rawrText.style.fontSize = 'clamp(2rem, 8vw, 3.5rem)'; // Responsive font size
        rawrText.style.textShadow = `0 0 10px ${textColor}`;
        rawrText.style.letterSpacing = '2px';
        rawrText.style.textAlign = 'center';
        rawrText.style.width = '100%';
        rawrText.style.boxSizing = 'border-box';
        rawrText.style.margin = '0 0 15px 0';
        
        // Naga dan bintang container
        const emojiContainer = document.createElement('div');
        emojiContainer.style.width = '100%';
        emojiContainer.style.textAlign = 'center';
        emojiContainer.style.margin = '0 0 15px 0';
        emojiContainer.style.boxSizing = 'border-box';
        
        // Naga dan bintang dengan display block
        const emoji = document.createElement('div');
        emoji.style.display = 'inline-block'; // Pastikan elemen inline block
        emoji.style.fontSize = 'clamp(1.8rem, 6vw, 2.5rem)'; // Responsive font size
        emoji.style.textAlign = 'center';
        emoji.innerHTML = '🐉 ✨'; // Space diantara emoji
        emojiContainer.appendChild(emoji);
        
        // Tercipta dari es abadi
        const subText = document.createElement('div');
        subText.textContent = 'Tercipta dari es abadi';
        subText.style.color = textColor;
        subText.style.fontFamily = fontFamily;
        subText.style.fontSize = 'clamp(0.8rem, 3vw, 1.2rem)'; // Responsive font size
        subText.style.opacity = '0.8';
        subText.style.textShadow = `0 0 10px ${textColor}`;
        subText.style.textAlign = 'center';
        subText.style.width = '100%';
        subText.style.boxSizing = 'border-box';
        subText.style.margin = '0 0 20px 0';
        
        // Kekuatan container - key untuk mode portrait
        const powerContainer = document.createElement('div');
        powerContainer.style.width = '100%';
        powerContainer.style.textAlign = 'center';
        powerContainer.style.boxSizing = 'border-box';
        
        // Box untuk kekuatan text
        const powerBox = document.createElement('div');
        powerBox.style.display = 'inline-block'; // Penting untuk pemusatan
        powerBox.style.boxSizing = 'border-box';
        powerBox.style.padding = '10px 20px';
        powerBox.style.border = `1px solid ${textColor}`;
        powerBox.style.borderRadius = '20px';
        powerBox.style.boxShadow = `0 0 10px ${textColor}`;
        powerBox.style.maxWidth = '100%'; // Penting untuk mode portrait
        powerBox.style.textAlign = 'center';
        
        // Kekuatan text
        const powerText = document.createElement('div');
        powerText.textContent = 'Kekuatan IceWing & SeaWing telah aktif!';
        powerText.style.color = textColor;
        powerText.style.fontFamily = fontFamily;
        powerText.style.fontSize = 'clamp(0.9rem, 3vw, 1.2rem)'; // Responsive font size
        powerText.style.textShadow = `0 0 5px ${textColor}`;
        powerText.style.textAlign = 'center';
        powerText.style.boxSizing = 'border-box';
        powerText.style.margin = '0';
        powerBox.appendChild(powerText);
        powerContainer.appendChild(powerBox);
        
        // Struktur DOM dengan cara yang benar
        contentContainer.appendChild(lawlessText);
        contentContainer.appendChild(rawrText);
        contentContainer.appendChild(emojiContainer);
        contentContainer.appendChild(subText);
        contentContainer.appendChild(powerContainer);
        contentGrid.appendChild(contentContainer);
        overlay.appendChild(contentGrid);
        document.body.appendChild(overlay);
        
        // Event listener untuk perubahan orientasi
        const handleOrientationChange = () => {
            // Additional adjustments based on orientation
            if (window.innerHeight > window.innerWidth) {
                // Portrait mode adjustments
                powerBox.style.maxWidth = '90%';
                contentContainer.style.padding = '0 15px';
            } else {
                // Landscape mode adjustments
                powerBox.style.maxWidth = '100%';
                contentContainer.style.padding = '0 20px';
            }
        };
        
        // Call once to set initial state
        handleOrientationChange();
        
        // Add event listeners
        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Remove after delay
        setTimeout(() => {
            // Remove event listeners
            window.removeEventListener('resize', handleOrientationChange);
            window.removeEventListener('orientationchange', handleOrientationChange);
            
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.8s';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 800);
        }, 3000);
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

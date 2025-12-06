/**
 * BirdTurds.com - Charity Selection System V2 (Debugged)
 * 20% of proceeds go to the charity OR CAUSE of YOUR choice!
 * Dude.com © 2024. All Rights Reserved.
 * 
 * "Pure religion is this: to look after orphans and widows"
 * — James 1:27
 */

(function() {
  'use strict';

  // =============================================================================
  // CHARITY OPTIONS
  // =============================================================================

  const CHARITY_OPTIONS = [
    {
      id: 'widows_worldwide',
      name: 'Widows Worldwide',
      icon: '💔',
      description: 'Supporting widows in need across the globe with food, shelter, and hope.',
      scripture: '"A father to the fatherless, a defender of widows" — Psalm 68:5'
    },
    {
      id: 'orphan_care',
      name: 'Orphan Care International',
      icon: '👶',
      description: 'Providing loving homes, education, and care for orphans worldwide.',
      scripture: '"Religion that God accepts is caring for orphans and widows" — James 1:27'
    },
    {
      id: 'feed_the_poor',
      name: 'Feed The Poor Ministry',
      icon: '🍞',
      description: 'Fighting hunger and providing meals to those in poverty.',
      scripture: '"For I was hungry and you gave me food" — Matthew 25:35'
    },
    {
      id: 'clean_water',
      name: 'Clean Water for All',
      icon: '💧',
      description: 'Bringing clean, safe drinking water to communities in need.',
      scripture: '"Whoever gives a cup of water in My name will not lose their reward" — Mark 9:41'
    },
    {
      id: 'mission_outreach',
      name: 'Gospel Mission Outreach',
      icon: '✝️',
      description: 'Sharing the Gospel of Jesus Christ to unreached communities.',
      scripture: '"Go into all the world and preach the gospel" — Mark 16:15'
    },
    {
      id: 'youth_ministry',
      name: 'Youth For Christ',
      icon: '🙏',
      description: 'Reaching young people with the love of Jesus through outreach programs.',
      scripture: '"Don\'t let anyone look down on you because you are young" — 1 Timothy 4:12'
    },
    {
      id: 'homeless_help',
      name: 'Homeless Help Network',
      icon: '🏠',
      description: 'Providing shelter, meals, and hope to the homeless.',
      scripture: '"I was a stranger and you invited me in" — Matthew 25:35'
    },
    {
      id: 'disaster_relief',
      name: 'Disaster Relief Fund',
      icon: '🆘',
      description: 'Rapid response to natural disasters and emergencies worldwide.',
      scripture: '"Bear one another\'s burdens" — Galatians 6:2'
    },
    {
      id: 'persecuted_church',
      name: 'Persecuted Church Support',
      icon: '⛪',
      description: 'Supporting Christians facing persecution for their faith.',
      scripture: '"Remember those in prison as if you were together with them" — Hebrews 13:3'
    },
    {
      id: 'birdturds_choice',
      name: 'BirdTurds Ministry Choice',
      icon: '🦅',
      description: 'Let us prayerfully allocate funds where most needed this month.',
      scripture: '"We are accountable to Jesus our Lord for the administration of His funds"'
    }
  ];

  // =============================================================================
  // STATE
  // =============================================================================

  let currentSelection = {
    charityId: null,
    customName: '',
    customNote: '',
    isCustom: false,
    callback: null,
    purchaseAmount: 0,
    is100Percent: false
  };

  // =============================================================================
  // SHOW CHARITY SELECTOR
  // =============================================================================

  function showCharitySelector(purchaseAmount, onSelectCallback, is100Percent) {
    // Reset state
    currentSelection = {
      charityId: null,
      customName: '',
      customNote: '',
      isCustom: false,
      callback: onSelectCallback,
      purchaseAmount: purchaseAmount || 0,
      is100Percent: is100Percent || false
    };

    const charityPercent = is100Percent ? 1.0 : 0.20;
    const charityAmount = (purchaseAmount * charityPercent).toFixed(2);
    const percentLabel = is100Percent ? '100%' : '20%';

    // Remove existing modal
    const existing = document.getElementById('charity-selector-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'charity-selector-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.95);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    `;

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:20px;border:3px solid #a855f7;padding:30px;max-width:850px;width:100%;max-height:90vh;overflow-y:auto;">
        <div style="text-align:center;margin-bottom:25px;">
          <div style="font-size:48px;margin-bottom:10px;">💜 ✝️ 🙏</div>
          <h2 style="color:#c084fc;font-size:28px;margin:0 0 10px 0;">Choose Your Charity or Cause</h2>
          <p style="color:#e5e7eb;font-size:16px;margin:0;">
            <strong style="color:#22c55e;">$${charityAmount}</strong> (${percentLabel} of your purchase) will go to the charity or cause of your choice:
          </p>
        </div>
        
        <!-- Preset Charities Grid -->
        <div id="charity-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:20px;">
          ${CHARITY_OPTIONS.map(charity => `
            <div class="charity-option" data-charity-id="${charity.id}" onclick="window.selectPresetCharity('${charity.id}')" style="
              background: rgba(255,255,255,0.05);
              border: 2px solid #374151;
              border-radius: 12px;
              padding: 15px;
              cursor: pointer;
              transition: all 0.3s;
            ">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="font-size:28px;">${charity.icon}</span>
                <div style="color:#fff;font-weight:bold;font-size:13px;line-height:1.2;">${charity.name}</div>
              </div>
              <p style="color:#9ca3af;font-size:11px;line-height:1.3;margin:0;">${charity.description.substring(0, 70)}...</p>
            </div>
          `).join('')}
        </div>
        
        <!-- Custom Charity Option -->
        <div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(245,158,11,0.1));border:2px solid #f59e0b;border-radius:15px;padding:20px;margin-bottom:20px;">
          <h3 style="color:#fcd34d;font-size:18px;margin:0 0 15px 0;">✨ Or Choose Your Own Charity/Cause</h3>
          <p style="color:#fef3c7;font-size:13px;margin-bottom:15px;">
            Have a specific charity, church, or cause you'd like to support? Enter it below!
          </p>
          
          <div style="margin-bottom:15px;">
            <label style="color:#fcd34d;font-size:13px;display:block;margin-bottom:5px;">Charity/Cause Name *</label>
            <input type="text" id="custom-charity-name" placeholder="e.g., My Local Food Bank, St. Mary's Church, Red Cross..."
              style="width:100%;padding:12px 15px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;font-size:14px;box-sizing:border-box;"
              oninput="window.onCustomCharityInput()">
          </div>
          
          <div style="margin-bottom:15px;">
            <label style="color:#fcd34d;font-size:13px;display:block;margin-bottom:5px;">Additional Notes (Optional)</label>
            <textarea id="custom-charity-note" placeholder="Any specific instructions, dedication, or notes for this donation..."
              style="width:100%;padding:12px 15px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;font-size:14px;min-height:70px;resize:vertical;box-sizing:border-box;"
              oninput="window.onCustomCharityInput()"></textarea>
          </div>
          
          <button id="select-custom-btn" onclick="window.selectCustomCharity()" disabled style="
            background: linear-gradient(135deg,#f59e0b,#d97706);
            color: #000;
            border: none;
            padding: 12px 25px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            opacity: 0.5;
          ">
            ✓ Use This Custom Charity/Cause
          </button>
        </div>
        
        <!-- Selected Display -->
        <div id="selected-charity-display" style="display:none;background:linear-gradient(135deg,rgba(34,197,94,0.2),rgba(16,185,129,0.1));border:2px solid #22c55e;border-radius:15px;padding:20px;text-align:center;margin-bottom:20px;">
          <p style="color:#22c55e;font-size:16px;margin:0 0 10px 0;font-weight:bold;">✓ Selected:</p>
          <p id="selected-charity-name" style="color:#fff;font-size:20px;margin:0;"></p>
          <p id="selected-charity-note" style="color:#86efac;font-size:12px;margin-top:8px;font-style:italic;"></p>
        </div>
        
        <!-- Buttons -->
        <div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">
          <button id="confirm-charity-btn" onclick="window.confirmCharitySelection()" disabled style="
            background: linear-gradient(135deg,#22c55e,#16a34a);
            color: #fff;
            border: none;
            padding: 15px 40px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 12px;
            cursor: pointer;
            opacity: 0.5;
          ">
            ✓ Confirm & Continue
          </button>
          <button onclick="window.closeCharitySelector()" style="
            background: #374151;
            color: #fff;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            border-radius: 12px;
            cursor: pointer;
          ">
            Cancel
          </button>
        </div>
        
        <p style="color:#64748b;font-size:11px;text-align:center;margin-top:20px;">
          ✝️ "We are accountable to Jesus our Lord for the administration of His funds."
        </p>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // =============================================================================
  // SELECTION HANDLERS
  // =============================================================================

  function selectPresetCharity(charityId) {
    const charity = CHARITY_OPTIONS.find(c => c.id === charityId);
    if (!charity) return;

    currentSelection.charityId = charityId;
    currentSelection.isCustom = false;
    currentSelection.customName = '';
    currentSelection.customNote = '';

    // Update UI - highlight selected
    document.querySelectorAll('.charity-option').forEach(el => {
      el.style.borderColor = '#374151';
      el.style.background = 'rgba(255,255,255,0.05)';
    });

    const selectedEl = document.querySelector(`[data-charity-id="${charityId}"]`);
    if (selectedEl) {
      selectedEl.style.borderColor = '#22c55e';
      selectedEl.style.background = 'rgba(34,197,94,0.2)';
    }

    // Clear custom inputs
    const nameInput = document.getElementById('custom-charity-name');
    const noteInput = document.getElementById('custom-charity-note');
    const customBtn = document.getElementById('select-custom-btn');
    if (nameInput) nameInput.value = '';
    if (noteInput) noteInput.value = '';
    if (customBtn) { customBtn.disabled = true; customBtn.style.opacity = '0.5'; }

    // Show selected
    const display = document.getElementById('selected-charity-display');
    const nameEl = document.getElementById('selected-charity-name');
    const noteEl = document.getElementById('selected-charity-note');
    if (display) display.style.display = 'block';
    if (nameEl) nameEl.textContent = `${charity.icon} ${charity.name}`;
    if (noteEl) noteEl.textContent = charity.scripture;

    enableConfirmButton();
  }

  function onCustomCharityInput() {
    const nameInput = document.getElementById('custom-charity-name');
    const customBtn = document.getElementById('select-custom-btn');
    
    if (nameInput && customBtn) {
      const hasName = nameInput.value.trim().length >= 3;
      customBtn.disabled = !hasName;
      customBtn.style.opacity = hasName ? '1' : '0.5';
    }
  }

  function selectCustomCharity() {
    const nameInput = document.getElementById('custom-charity-name');
    const noteInput = document.getElementById('custom-charity-note');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const note = noteInput ? noteInput.value.trim() : '';

    if (name.length < 3) {
      alert('Please enter a charity/cause name (at least 3 characters)');
      return;
    }

    currentSelection.charityId = 'custom';
    currentSelection.isCustom = true;
    currentSelection.customName = name;
    currentSelection.customNote = note;

    // Clear preset selection
    document.querySelectorAll('.charity-option').forEach(el => {
      el.style.borderColor = '#374151';
      el.style.background = 'rgba(255,255,255,0.05)';
    });

    // Show selected
    const display = document.getElementById('selected-charity-display');
    const nameEl = document.getElementById('selected-charity-name');
    const noteEl = document.getElementById('selected-charity-note');
    if (display) display.style.display = 'block';
    if (nameEl) nameEl.textContent = `✨ ${name}`;
    if (noteEl) noteEl.textContent = note || 'Custom charity/cause selected';

    enableConfirmButton();
  }

  function enableConfirmButton() {
    const btn = document.getElementById('confirm-charity-btn');
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  }

  function confirmCharitySelection() {
    if (!currentSelection.charityId) return;

    let charityData;

    if (currentSelection.isCustom) {
      charityData = {
        id: 'custom',
        name: currentSelection.customName,
        note: currentSelection.customNote,
        isCustom: true
      };
    } else {
      const charity = CHARITY_OPTIONS.find(c => c.id === currentSelection.charityId);
      charityData = {
        id: currentSelection.charityId,
        name: charity ? charity.name : currentSelection.charityId,
        note: '',
        isCustom: false
      };
    }

    // Save to localStorage
    localStorage.setItem('birdturds_selected_charity', JSON.stringify(charityData));

    // Save to Firebase
    saveCharityToFirebase(charityData, currentSelection.purchaseAmount, currentSelection.is100Percent);

    closeCharitySelector();

    // Call callback
    if (typeof currentSelection.callback === 'function') {
      currentSelection.callback(charityData);
    }
  }

  function closeCharitySelector() {
    const modal = document.getElementById('charity-selector-modal');
    if (modal) modal.remove();
  }

  // =============================================================================
  // FIREBASE
  // =============================================================================

  async function saveCharityToFirebase(charityData, purchaseAmount, is100Percent) {
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      console.log('Firebase not available');
      return;
    }

    try {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const userId = user ? user.uid : 'guest_' + Date.now();
      const charityPercent = is100Percent ? 1.0 : 0.20;

      await db.collection('charity_donations').add({
        userId: userId,
        charityId: charityData.id,
        charityName: charityData.name,
        customNote: charityData.note || '',
        isCustomCharity: charityData.isCustom,
        purchaseAmount: purchaseAmount,
        charityAmount: purchaseAmount * charityPercent,
        charityPercent: charityPercent * 100,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });

      console.log('✅ Charity selection saved');
    } catch (error) {
      console.error('Error saving charity:', error);
    }
  }

  // =============================================================================
  // CHARITY STATS
  // =============================================================================

  async function showCharityStats() {
    let totals = [];

    if (typeof firebase !== 'undefined' && firebase.firestore) {
      try {
        const snapshot = await firebase.firestore().collection('charity_totals').get();
        totals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.error('Error fetching charity stats:', e);
      }
    }

    // Remove existing
    const existing = document.getElementById('charity-stats-modal');
    if (existing) existing.remove();

    const totalRaised = totals.reduce((sum, c) => sum + (c.totalRaised || 0), 0);

    const modal = document.createElement('div');
    modal.id = 'charity-stats-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:20px;border:3px solid #22c55e;padding:30px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="color:#22c55e;margin:0;font-size:24px;">💚 Charity Impact Report</h2>
          <button onclick="document.getElementById('charity-stats-modal').remove()" style="background:#374151;color:#fff;border:none;width:35px;height:35px;border-radius:50%;font-size:20px;cursor:pointer;line-height:1;">×</button>
        </div>
        
        <div style="background:rgba(34,197,94,0.2);border:2px solid #22c55e;border-radius:15px;padding:20px;text-align:center;margin-bottom:25px;">
          <p style="color:#86efac;font-size:14px;margin:0 0 5px 0;">Total Raised for Charity</p>
          <p style="color:#22c55e;font-size:48px;font-weight:bold;margin:0;">$${totalRaised.toFixed(2)}</p>
        </div>
        
        <h3 style="color:#ffd700;font-size:16px;margin-bottom:15px;">Breakdown by Charity:</h3>
        
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${CHARITY_OPTIONS.map(charity => {
            const data = totals.find(t => t.id === charity.id) || { totalRaised: 0, donationCount: 0 };
            return `
              <div style="background:rgba(255,255,255,0.05);padding:12px 15px;border-radius:10px;display:flex;align-items:center;gap:12px;">
                <span style="font-size:24px;">${charity.icon}</span>
                <div style="flex:1;">
                  <div style="color:#fff;font-size:13px;font-weight:bold;">${charity.name}</div>
                  <div style="color:#9ca3af;font-size:11px;">${data.donationCount || 0} donations</div>
                </div>
                <div style="color:#22c55e;font-size:16px;font-weight:bold;">$${(data.totalRaised || 0).toFixed(2)}</div>
              </div>
            `;
          }).join('')}
        </div>
        
        <p style="color:#64748b;font-size:11px;text-align:center;margin-top:20px;">
          ✝️ Updated in real-time • Full transparency
        </p>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // =============================================================================
  // EXPORTS
  // =============================================================================

  window.showCharitySelector = showCharitySelector;
  window.selectPresetCharity = selectPresetCharity;
  window.onCustomCharityInput = onCustomCharityInput;
  window.selectCustomCharity = selectCustomCharity;
  window.confirmCharitySelection = confirmCharitySelection;
  window.closeCharitySelector = closeCharitySelector;
  window.showCharityStats = showCharityStats;
  window.CHARITY_OPTIONS = CHARITY_OPTIONS;

  console.log('💚 Charity Selection System loaded');

})();

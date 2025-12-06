/**
 * BirdTurds Church Directory UI v43
 * Full-featured church finder with categories, events, and bulletins
 */

(function() {
  'use strict';

  class ChurchDirectoryUI_v43 {
    constructor() {
      this.isOpen = false;
      this.currentTab = 'churches';
      this.currentDenomination = 'all';
      this.currentEventCategory = 'all';
      this.searchQuery = '';
    }

    open(tab = 'churches') {
      this.isOpen = true;
      this.currentTab = tab;
      this.render();
      
      // Listen for updates
      window.addEventListener('churchDirectoryUpdate', this.handleUpdate.bind(this));
    }

    close() {
      this.isOpen = false;
      window.removeEventListener('churchDirectoryUpdate', this.handleUpdate.bind(this));
      const modal = document.getElementById('church-dir-modal-v43');
      if (modal) modal.remove();
    }

    handleUpdate(e) {
      if (this.isOpen) {
        this.updateContent();
      }
    }

    render() {
      const existing = document.getElementById('church-dir-modal-v43');
      if (existing) existing.remove();

      const modal = document.createElement('div');
      modal.id = 'church-dir-modal-v43';
      modal.innerHTML = this.getModalHTML();
      document.body.appendChild(modal);

      this.updateContent();
    }

    getModalHTML() {
      return `
        <style>
          #church-dir-modal-v43 {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95); z-index: 99999;
            overflow-y: auto; padding: 20px;
          }
          .cd-container {
            max-width: 1100px; margin: 0 auto;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 20px; border: 3px solid #22c55e;
            overflow: hidden;
          }
          .cd-header {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            padding: 20px 25px; display: flex;
            justify-content: space-between; align-items: center;
          }
          .cd-header h2 { color: #fff; font-size: 24px; margin: 0; }
          .cd-close {
            background: rgba(255,255,255,0.2); border: none; color: #fff;
            width: 40px; height: 40px; border-radius: 50%;
            font-size: 24px; cursor: pointer; line-height: 1;
          }
          .cd-tabs {
            display: flex; background: rgba(0,0,0,0.4);
            padding: 10px 15px; gap: 8px; flex-wrap: wrap;
          }
          .cd-tab {
            padding: 12px 20px; background: transparent;
            border: 2px solid transparent; color: #9ca3af;
            border-radius: 10px; cursor: pointer;
            font-weight: bold; font-size: 13px; transition: all 0.3s;
          }
          .cd-tab:hover { background: rgba(34,197,94,0.2); color: #86efac; }
          .cd-tab.active {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff; border-color: #4ade80;
          }
          .cd-filters {
            padding: 15px 20px; background: rgba(0,0,0,0.3);
            display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
          }
          .cd-search {
            flex: 1; min-width: 200px; padding: 12px 15px;
            border-radius: 10px; border: 2px solid #374151;
            background: #1e293b; color: #fff; font-size: 14px;
          }
          .cd-search:focus { border-color: #22c55e; outline: none; }
          .cd-select {
            padding: 12px 15px; border-radius: 10px;
            border: 2px solid #374151; background: #1e293b;
            color: #fff; font-size: 13px; cursor: pointer;
          }
          .cd-btn {
            padding: 12px 20px; border-radius: 10px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff; border: none; font-weight: bold;
            cursor: pointer; font-size: 13px;
          }
          .cd-content { padding: 20px; min-height: 400px; }
          
          /* Church Cards */
          .cd-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 15px;
          }
          .cd-church-card {
            background: rgba(255,255,255,0.05);
            border: 2px solid #374151; border-radius: 15px;
            padding: 20px; cursor: pointer; transition: all 0.3s;
          }
          .cd-church-card:hover {
            border-color: #22c55e; transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(34,197,94,0.2);
          }
          .cd-church-card.featured {
            border-color: #ffd700;
            background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.05));
          }
          .cd-church-header {
            display: flex; gap: 15px; align-items: flex-start; margin-bottom: 12px;
          }
          .cd-church-icon {
            width: 50px; height: 50px; border-radius: 12px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; flex-shrink: 0;
          }
          .cd-church-name { color: #fff; font-size: 16px; font-weight: bold; margin: 0; }
          .cd-church-pastor { color: #9ca3af; font-size: 12px; margin-top: 4px; }
          .cd-church-denom {
            display: inline-block; padding: 4px 10px; border-radius: 20px;
            background: rgba(139,92,246,0.2); color: #a78bfa;
            font-size: 11px; margin-top: 8px;
          }
          .cd-church-location { color: #60a5fa; font-size: 12px; margin-top: 10px; }
          .cd-church-distance {
            color: #22c55e; font-size: 11px; font-weight: bold;
          }
          .cd-church-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
          .cd-church-tag {
            padding: 3px 8px; border-radius: 12px;
            background: rgba(34,197,94,0.2); color: #86efac;
            font-size: 10px;
          }
          .cd-church-rating {
            color: #ffd700; font-size: 12px; margin-top: 8px;
          }
          .cd-featured-badge {
            background: linear-gradient(135deg, #ffd700, #f59e0b);
            color: #000; padding: 4px 10px; border-radius: 20px;
            font-size: 10px; font-weight: bold;
          }
          
          /* Events */
          .cd-event-card {
            background: rgba(255,255,255,0.05);
            border: 2px solid #374151; border-radius: 15px;
            padding: 20px; margin-bottom: 15px;
          }
          .cd-event-date {
            display: inline-block; padding: 8px 15px; border-radius: 10px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #fff; font-weight: bold; font-size: 13px;
            margin-bottom: 12px;
          }
          .cd-event-title { color: #fff; font-size: 18px; font-weight: bold; margin: 0 0 8px 0; }
          .cd-event-church { color: #60a5fa; font-size: 13px; }
          .cd-event-desc { color: #9ca3af; font-size: 13px; margin-top: 10px; line-height: 1.5; }
          .cd-event-category {
            display: inline-block; padding: 4px 10px; border-radius: 20px;
            background: rgba(168,85,247,0.2); color: #c084fc;
            font-size: 11px; margin-top: 10px;
          }
          
          /* Bulletins */
          .cd-bulletin-card {
            background: rgba(255,255,255,0.05);
            border: 2px solid #374151; border-radius: 15px;
            padding: 20px; margin-bottom: 15px;
          }
          .cd-bulletin-week {
            color: #22c55e; font-size: 12px; font-weight: bold;
            margin-bottom: 8px;
          }
          .cd-bulletin-church { color: #fff; font-size: 16px; font-weight: bold; }
          .cd-bulletin-content { margin-top: 15px; }
          .cd-bulletin-section {
            background: rgba(0,0,0,0.2); padding: 12px;
            border-radius: 8px; margin-bottom: 10px;
          }
          .cd-bulletin-section h4 {
            color: #ffd700; font-size: 12px; margin: 0 0 8px 0;
          }
          .cd-bulletin-section p, .cd-bulletin-section li {
            color: #e5e7eb; font-size: 12px; margin: 4px 0;
          }
          
          /* Categories sidebar */
          .cd-categories {
            display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;
            padding-bottom: 15px; border-bottom: 1px solid #374151;
          }
          .cd-cat-btn {
            padding: 8px 14px; border-radius: 20px;
            background: rgba(255,255,255,0.05); border: 1px solid #374151;
            color: #9ca3af; font-size: 12px; cursor: pointer;
            transition: all 0.2s;
          }
          .cd-cat-btn:hover { border-color: #22c55e; color: #22c55e; }
          .cd-cat-btn.active {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff; border-color: #22c55e;
          }
          
          /* Empty state */
          .cd-empty {
            text-align: center; padding: 60px 20px; color: #9ca3af;
          }
          .cd-empty-icon { font-size: 60px; margin-bottom: 15px; }
          
          /* Loading */
          .cd-loading { text-align: center; padding: 60px; }
          .cd-spinner {
            width: 50px; height: 50px; border: 4px solid #374151;
            border-top-color: #22c55e; border-radius: 50%;
            animation: cd-spin 1s linear infinite;
            margin: 0 auto 15px;
          }
          @keyframes cd-spin { to { transform: rotate(360deg); } }
          
          /* Stats */
          .cd-stats {
            display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;
          }
          .cd-stat {
            background: rgba(34,197,94,0.1); border: 1px solid #22c55e;
            border-radius: 10px; padding: 15px 20px; text-align: center;
          }
          .cd-stat-num { color: #22c55e; font-size: 28px; font-weight: bold; }
          .cd-stat-label { color: #9ca3af; font-size: 11px; margin-top: 4px; }
        </style>
        
        <div class="cd-container">
          <div class="cd-header">
            <h2>⛪ SPIRIT-FILLED CHURCH FINDER</h2>
            <button class="cd-close" onclick="churchDirUI.close()">✕</button>
          </div>
          
          <div class="cd-tabs">
            <button class="cd-tab ${this.currentTab === 'churches' ? 'active' : ''}" onclick="churchDirUI.switchTab('churches')">
              ⛪ Churches
            </button>
            <button class="cd-tab ${this.currentTab === 'events' ? 'active' : ''}" onclick="churchDirUI.switchTab('events')">
              📅 Events
            </button>
            <button class="cd-tab ${this.currentTab === 'bulletins' ? 'active' : ''}" onclick="churchDirUI.switchTab('bulletins')">
              📰 Bulletins
            </button>
            <button class="cd-tab ${this.currentTab === 'submit' ? 'active' : ''}" onclick="churchDirUI.switchTab('submit')">
              ➕ Submit Church
            </button>
          </div>
          
          <div class="cd-filters" id="cd-filters">
            <!-- Filters populated by JavaScript -->
          </div>
          
          <div class="cd-content" id="cd-content">
            <div class="cd-loading">
              <div class="cd-spinner"></div>
              <p style="color:#9ca3af;">Loading churches...</p>
            </div>
          </div>
        </div>
      `;
    }

    updateContent() {
      this.updateFilters();
      
      const content = document.getElementById('cd-content');
      if (!content) return;

      switch (this.currentTab) {
        case 'churches':
          content.innerHTML = this.getChurchesHTML();
          break;
        case 'events':
          content.innerHTML = this.getEventsHTML();
          break;
        case 'bulletins':
          content.innerHTML = this.getBulletinsHTML();
          break;
        case 'submit':
          content.innerHTML = this.getSubmitHTML();
          break;
      }
    }

    updateFilters() {
      const filters = document.getElementById('cd-filters');
      if (!filters) return;

      if (this.currentTab === 'churches') {
        filters.innerHTML = `
          <input type="text" class="cd-search" placeholder="🔍 Search churches, pastors, cities..." 
            value="${this.searchQuery}" oninput="churchDirUI.setSearch(this.value)">
          <select class="cd-select" onchange="churchDirUI.setDenomination(this.value)">
            <option value="all">All Denominations</option>
            ${window.CHURCH_CATEGORIES?.map(cat => 
              `<option value="${cat}" ${this.currentDenomination === cat ? 'selected' : ''}>${cat}</option>`
            ).join('') || ''}
          </select>
          <button class="cd-btn" onclick="churchDirUI.updateContent()">🔍 Search</button>
        `;
      } else if (this.currentTab === 'events') {
        filters.innerHTML = `
          <select class="cd-select" onchange="churchDirUI.setEventCategory(this.value)">
            <option value="all">All Events</option>
            <option value="worship" ${this.currentEventCategory === 'worship' ? 'selected' : ''}>Worship</option>
            <option value="bible-study" ${this.currentEventCategory === 'bible-study' ? 'selected' : ''}>Bible Study</option>
            <option value="conference" ${this.currentEventCategory === 'conference' ? 'selected' : ''}>Conference</option>
            <option value="outreach" ${this.currentEventCategory === 'outreach' ? 'selected' : ''}>Outreach</option>
            <option value="missions" ${this.currentEventCategory === 'missions' ? 'selected' : ''}>Missions</option>
            <option value="youth" ${this.currentEventCategory === 'youth' ? 'selected' : ''}>Youth</option>
          </select>
        `;
      } else {
        filters.innerHTML = '';
      }
    }

    getChurchesHTML() {
      const mgr = window.churchDirectoryManager;
      if (!mgr) return '<div class="cd-empty"><div class="cd-empty-icon">⛪</div><p>Church directory loading...</p></div>';

      const churches = mgr.getChurches({
        denomination: this.currentDenomination,
        search: this.searchQuery,
        featuredFirst: true
      });

      if (churches.length === 0) {
        return `
          <div class="cd-empty">
            <div class="cd-empty-icon">🔍</div>
            <p>No churches found matching your criteria.</p>
            <p style="font-size:12px;margin-top:10px;">Try adjusting your search or filters.</p>
          </div>
        `;
      }

      // Stats
      const featured = churches.filter(c => c.featured).length;
      const statsHTML = `
        <div class="cd-stats">
          <div class="cd-stat">
            <div class="cd-stat-num">${churches.length}</div>
            <div class="cd-stat-label">CHURCHES</div>
          </div>
          <div class="cd-stat">
            <div class="cd-stat-num">${featured}</div>
            <div class="cd-stat-label">FEATURED</div>
          </div>
          <div class="cd-stat">
            <div class="cd-stat-num">${new Set(churches.map(c => c.address?.state)).size}</div>
            <div class="cd-stat-label">STATES</div>
          </div>
        </div>
      `;

      // Category buttons
      const categories = [...new Set(churches.map(c => c.denomination))].filter(Boolean);
      const catHTML = `
        <div class="cd-categories">
          <button class="cd-cat-btn ${this.currentDenomination === 'all' ? 'active' : ''}" 
            onclick="churchDirUI.setDenomination('all')">All</button>
          ${categories.map(cat => `
            <button class="cd-cat-btn ${this.currentDenomination === cat ? 'active' : ''}"
              onclick="churchDirUI.setDenomination('${cat}')">${cat}</button>
          `).join('')}
        </div>
      `;

      // Church cards
      const cardsHTML = churches.map(church => `
        <div class="cd-church-card ${church.featured ? 'featured' : ''}" onclick="churchDirUI.showChurchDetail('${church.id}')">
          <div class="cd-church-header">
            <div class="cd-church-icon">⛪</div>
            <div style="flex:1;">
              <h3 class="cd-church-name">${church.name}</h3>
              <p class="cd-church-pastor">${church.pastor || ''}</p>
              ${church.featured ? '<span class="cd-featured-badge">⭐ FEATURED</span>' : ''}
            </div>
          </div>
          <span class="cd-church-denom">${church.denomination || 'Non-denominational'}</span>
          <p class="cd-church-location">
            📍 ${church.address?.city || ''}, ${church.address?.state || ''}
            ${church.distance ? `<span class="cd-church-distance"> • ${church.distance} mi away</span>` : ''}
          </p>
          ${church.rating ? `<p class="cd-church-rating">${'⭐'.repeat(Math.floor(church.rating))} ${church.rating}/5</p>` : ''}
          <div class="cd-church-tags">
            ${(church.tags || []).slice(0, 4).map(tag => `<span class="cd-church-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `).join('');

      return statsHTML + catHTML + `<div class="cd-grid">${cardsHTML}</div>`;
    }

    getEventsHTML() {
      const mgr = window.churchDirectoryManager;
      if (!mgr) return '<div class="cd-empty"><div class="cd-empty-icon">📅</div><p>Events loading...</p></div>';

      const events = mgr.getEvents({
        category: this.currentEventCategory
      });

      if (events.length === 0) {
        return `
          <div class="cd-empty">
            <div class="cd-empty-icon">📅</div>
            <p>No upcoming events found.</p>
            <p style="font-size:12px;margin-top:10px;">Check back later for new events!</p>
          </div>
        `;
      }

      return events.map(event => {
        const date = new Date(event.date);
        const dateStr = date.toLocaleDateString('en-US', { 
          weekday: 'long', month: 'long', day: 'numeric' 
        });

        return `
          <div class="cd-event-card">
            <span class="cd-event-date">📅 ${dateStr} at ${event.time || 'TBD'}</span>
            <h3 class="cd-event-title">${event.title}</h3>
            <p class="cd-event-church">⛪ ${event.churchName}</p>
            <p class="cd-event-desc">${event.description || ''}</p>
            <span class="cd-event-category">${event.category || 'General'}</span>
          </div>
        `;
      }).join('');
    }

    getBulletinsHTML() {
      const mgr = window.churchDirectoryManager;
      if (!mgr) return '<div class="cd-empty"><div class="cd-empty-icon">📰</div><p>Bulletins loading...</p></div>';

      const bulletins = mgr.getBulletins({ limit: 10 });

      if (bulletins.length === 0) {
        return `
          <div class="cd-empty">
            <div class="cd-empty-icon">📰</div>
            <p>No bulletins available yet.</p>
            <p style="font-size:12px;margin-top:10px;">Churches can submit weekly bulletins to share here.</p>
          </div>
        `;
      }

      return bulletins.map(bulletin => {
        const weekOf = new Date(bulletin.weekOf);
        const weekStr = weekOf.toLocaleDateString('en-US', { 
          month: 'long', day: 'numeric', year: 'numeric' 
        });

        return `
          <div class="cd-bulletin-card">
            <p class="cd-bulletin-week">Week of ${weekStr}</p>
            <h3 class="cd-bulletin-church">⛪ ${bulletin.churchName}</h3>
            ${bulletin.content ? `
              <div class="cd-bulletin-content">
                ${bulletin.content.welcomeMessage ? `
                  <div class="cd-bulletin-section">
                    <h4>Welcome</h4>
                    <p>${bulletin.content.welcomeMessage}</p>
                  </div>
                ` : ''}
                ${bulletin.content.announcements?.length ? `
                  <div class="cd-bulletin-section">
                    <h4>Announcements</h4>
                    <ul style="padding-left:20px;margin:0;">
                      ${bulletin.content.announcements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${bulletin.content.prayerRequests?.length ? `
                  <div class="cd-bulletin-section">
                    <h4>🙏 Prayer Requests</h4>
                    <ul style="padding-left:20px;margin:0;">
                      ${bulletin.content.prayerRequests.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    getSubmitHTML() {
      return `
        <div style="max-width:600px;margin:0 auto;">
          <h3 style="color:#22c55e;margin-bottom:20px;">➕ Submit a Church</h3>
          <p style="color:#9ca3af;margin-bottom:20px;font-size:13px;">
            Know a spirit-filled, Bible-believing church? Submit it here and we'll review it for inclusion!
          </p>
          
          <div style="margin-bottom:15px;">
            <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">Church Name *</label>
            <input type="text" id="submit-name" class="cd-search" style="width:100%;" placeholder="e.g., Grace Community Church">
          </div>
          
          <div style="margin-bottom:15px;">
            <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">Denomination</label>
            <select id="submit-denom" class="cd-select" style="width:100%;">
              <option value="">Select denomination...</option>
              ${window.CHURCH_CATEGORIES?.map(cat => `<option value="${cat}">${cat}</option>`).join('') || ''}
            </select>
          </div>
          
          <div style="margin-bottom:15px;">
            <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">Pastor's Name</label>
            <input type="text" id="submit-pastor" class="cd-search" style="width:100%;" placeholder="e.g., Pastor John Smith">
          </div>
          
          <div style="display:flex;gap:10px;margin-bottom:15px;">
            <div style="flex:1;">
              <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">City *</label>
              <input type="text" id="submit-city" class="cd-search" style="width:100%;" placeholder="City">
            </div>
            <div style="width:100px;">
              <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">State *</label>
              <input type="text" id="submit-state" class="cd-search" style="width:100%;" placeholder="CA" maxlength="2">
            </div>
          </div>
          
          <div style="margin-bottom:15px;">
            <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">Website</label>
            <input type="url" id="submit-website" class="cd-search" style="width:100%;" placeholder="https://...">
          </div>
          
          <div style="margin-bottom:20px;">
            <label style="color:#e5e7eb;font-size:13px;display:block;margin-bottom:5px;">Why recommend this church?</label>
            <textarea id="submit-reason" style="width:100%;padding:12px;border-radius:10px;border:2px solid #374151;background:#1e293b;color:#fff;font-size:13px;min-height:80px;resize:vertical;" placeholder="Tell us what makes this church special..."></textarea>
          </div>
          
          <button class="cd-btn" style="width:100%;padding:15px;" onclick="churchDirUI.submitChurch()">
            ✅ Submit Church for Review
          </button>
          
          <p style="color:#6b7280;font-size:11px;margin-top:15px;text-align:center;">
            * We only list churches that preach the full Gospel and stand on biblical truth.
            All submissions are reviewed before being added.
          </p>
        </div>
      `;
    }

    // =========================================================================
    // ACTIONS
    // =========================================================================

    switchTab(tab) {
      this.currentTab = tab;
      
      // Update tab styles
      document.querySelectorAll('.cd-tab').forEach(t => t.classList.remove('active'));
      document.querySelector(`.cd-tab:nth-child(${
        tab === 'churches' ? 1 : tab === 'events' ? 2 : tab === 'bulletins' ? 3 : 4
      })`)?.classList.add('active');
      
      this.updateContent();
    }

    setDenomination(denom) {
      this.currentDenomination = denom;
      this.updateContent();
    }

    setEventCategory(cat) {
      this.currentEventCategory = cat;
      this.updateContent();
    }

    setSearch(query) {
      this.searchQuery = query;
    }

    showChurchDetail(churchId) {
      const mgr = window.churchDirectoryManager;
      const church = mgr?.getChurchById(churchId);
      if (!church) return;

      const modal = document.createElement('div');
      modal.id = 'church-detail-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:100000;overflow-y:auto;padding:20px;';
      
      modal.innerHTML = `
        <div style="max-width:700px;margin:0 auto;background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:20px;border:2px solid #22c55e;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:25px;">
            <button onclick="document.getElementById('church-detail-modal').remove()" style="float:right;background:rgba(255,255,255,0.2);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:20px;cursor:pointer;">✕</button>
            <h2 style="color:#fff;font-size:24px;margin:0;">${church.name}</h2>
            <p style="color:rgba(255,255,255,0.8);margin:10px 0 0 0;">${church.denomination || 'Non-denominational'}</p>
          </div>
          
          <div style="padding:25px;">
            ${church.pastor ? `<p style="color:#ffd700;font-size:14px;margin-bottom:15px;">👤 ${church.pastor}</p>` : ''}
            
            <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:10px;margin-bottom:15px;">
              <h4 style="color:#22c55e;font-size:13px;margin:0 0 10px 0;">📍 LOCATION</h4>
              <p style="color:#e5e7eb;font-size:14px;margin:0;">
                ${church.address?.street || ''}<br>
                ${church.address?.city || ''}, ${church.address?.state || ''} ${church.address?.zip || ''}
              </p>
              ${church.distance ? `<p style="color:#22c55e;font-size:12px;margin-top:8px;">${church.distance} miles away</p>` : ''}
            </div>
            
            ${church.services?.length ? `
              <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:10px;margin-bottom:15px;">
                <h4 style="color:#22c55e;font-size:13px;margin:0 0 10px 0;">⏰ SERVICE TIMES</h4>
                ${church.services.map(s => `
                  <p style="color:#e5e7eb;font-size:13px;margin:5px 0;">
                    <strong>${s.day}</strong> at ${s.time} - ${s.type || 'Service'}
                  </p>
                `).join('')}
              </div>
            ` : ''}
            
            ${church.description ? `
              <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:10px;margin-bottom:15px;">
                <h4 style="color:#22c55e;font-size:13px;margin:0 0 10px 0;">📖 ABOUT</h4>
                <p style="color:#e5e7eb;font-size:13px;line-height:1.6;margin:0;">${church.description}</p>
              </div>
            ` : ''}
            
            ${church.contact?.website ? `
              <a href="${church.contact.website}" target="_blank" style="display:block;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;text-align:center;padding:15px;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:10px;">
                🌐 Visit Website
              </a>
            ` : ''}
            
            ${church.contact?.phone ? `
              <a href="tel:${church.contact.phone}" style="display:block;background:#374151;color:#fff;text-align:center;padding:15px;border-radius:10px;text-decoration:none;font-weight:bold;">
                📞 ${church.contact.phone}
              </a>
            ` : ''}
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
    }

    async submitChurch() {
      const name = document.getElementById('submit-name')?.value?.trim();
      const city = document.getElementById('submit-city')?.value?.trim();
      const state = document.getElementById('submit-state')?.value?.trim()?.toUpperCase();
      
      if (!name || !city || !state) {
        alert('Please fill in required fields: Church Name, City, and State');
        return;
      }

      const churchData = {
        name: name,
        denomination: document.getElementById('submit-denom')?.value || 'Non-denominational',
        pastor: document.getElementById('submit-pastor')?.value?.trim() || '',
        address: { city, state },
        contact: {
          website: document.getElementById('submit-website')?.value?.trim() || ''
        },
        submissionReason: document.getElementById('submit-reason')?.value?.trim() || '',
        submittedBy: window.currentUser?.email || 'anonymous',
        verified: false
      };

      const mgr = window.churchDirectoryManager;
      if (mgr) {
        const id = await mgr.addChurch(churchData);
        if (id) {
          alert('✅ Thank you! Your church submission has been received and will be reviewed.');
          this.switchTab('churches');
        } else {
          alert('❌ Error submitting church. Please try again.');
        }
      } else {
        alert('❌ Church directory not available. Please try again later.');
      }
    }
  }

  // =============================================================================
  // GLOBAL INSTANCE
  // =============================================================================

  const churchDirUI = new ChurchDirectoryUI_v43();
  window.churchDirUI = churchDirUI;

  // Override the search function from index.html
  window.searchChurches = function() {
    churchDirUI.open('churches');
  };

  // Also add a function to open it
  window.openChurchDirectory = function(tab) {
    churchDirUI.open(tab || 'churches');
  };

  console.log('⛪ Church Directory UI v43 loaded');

})();

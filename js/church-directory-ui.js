/**
 * BirdTurds.com - Church Directory UI (Debugged)
 * Beautiful interface for finding churches
 * Dude.com © 2024. All Rights Reserved.
 */

(function() {
  'use strict';

  // =============================================================================
  // CHURCH DIRECTORY UI CLASS
  // =============================================================================

  class ChurchDirectoryUI {
    constructor() {
      this.currentTab = 'churches';
      this.currentChurch = null;
      this.isOpen = false;
    }

    open(tab = 'churches') {
      this.currentTab = tab;
      this.isOpen = true;
      this.render();
      this.loadContent();
    }

    close() {
      this.isOpen = false;
      const modal = document.getElementById('church-directory-modal');
      if (modal) modal.remove();
    }

    render() {
      const existing = document.getElementById('church-directory-modal');
      if (existing) existing.remove();

      const modal = document.createElement('div');
      modal.id = 'church-directory-modal';
      modal.innerHTML = this.getModalHTML();
      document.body.appendChild(modal);
    }

    getModalHTML() {
      return `
        <style>
          #church-directory-modal {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95); z-index: 99999;
            overflow-y: auto; padding: 20px;
          }
          .church-dir-container {
            max-width: 1000px; margin: 0 auto;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border-radius: 20px; border: 2px solid #a855f7; overflow: hidden;
          }
          .church-dir-header {
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            padding: 20px 25px; display: flex;
            justify-content: space-between; align-items: center;
          }
          .church-dir-header h2 { color: #fff; font-size: 24px; margin: 0; }
          .church-dir-close {
            background: rgba(255,255,255,0.2); border: none; color: #fff;
            width: 40px; height: 40px; border-radius: 50%;
            font-size: 24px; cursor: pointer; line-height: 1;
          }
          .church-dir-tabs {
            display: flex; background: rgba(0,0,0,0.3);
            padding: 10px; gap: 10px; flex-wrap: wrap;
          }
          .church-dir-tab {
            flex: 1; min-width: 100px; padding: 12px 15px;
            background: transparent; border: 2px solid transparent;
            color: #9ca3af; border-radius: 10px; cursor: pointer;
            font-size: 13px; font-weight: bold;
          }
          .church-dir-tab:hover { background: rgba(168,85,247,0.2); color: #c084fc; }
          .church-dir-tab.active {
            background: linear-gradient(135deg, #a855f7, #7c3aed);
            color: #fff; border-color: #c084fc;
          }
          .church-dir-search {
            padding: 15px 20px; background: rgba(0,0,0,0.2);
            display: flex; gap: 10px; flex-wrap: wrap;
          }
          .church-dir-search input, .church-dir-search select {
            padding: 12px 15px; border-radius: 10px;
            border: 2px solid #374151; background: #1e293b;
            color: #fff; font-size: 14px;
          }
          .church-dir-search input { flex: 1; min-width: 200px; }
          .church-dir-search button {
            padding: 12px 20px;
            background: linear-gradient(135deg, #a855f7, #7c3aed);
            color: #fff; border: none; border-radius: 10px;
            font-weight: bold; cursor: pointer;
          }
          .church-dir-content { padding: 20px; min-height: 300px; }
          .church-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
          }
          .church-card {
            background: rgba(255,255,255,0.05);
            border: 2px solid #374151; border-radius: 15px;
            padding: 18px; cursor: pointer; transition: all 0.3s;
          }
          .church-card:hover {
            border-color: #a855f7; transform: translateY(-3px);
          }
          .church-logo {
            width: 45px; height: 45px;
            background: linear-gradient(135deg, #a855f7, #6d28d9);
            border-radius: 10px; display: flex;
            align-items: center; justify-content: center; font-size: 22px;
          }
          .event-card, .bulletin-card {
            background: rgba(255,255,255,0.05);
            border: 2px solid #374151; border-radius: 15px;
            padding: 18px; margin-bottom: 15px;
          }
          .event-date {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff; padding: 8px 12px; border-radius: 8px;
            display: inline-block; margin-bottom: 10px; font-weight: bold; font-size: 13px;
          }
          .loading { text-align: center; padding: 50px; color: #9ca3af; }
          .loading-spinner {
            width: 40px; height: 40px; border: 4px solid #374151;
            border-top-color: #a855f7; border-radius: 50%;
            animation: spin 1s linear infinite; margin: 0 auto 15px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          .empty-state { text-align: center; padding: 50px; color: #9ca3af; }
          .empty-state .icon { font-size: 50px; margin-bottom: 15px; }
          .back-btn {
            background: transparent; border: 2px solid #374151;
            color: #fff; padding: 10px 20px; border-radius: 8px;
            cursor: pointer; margin-bottom: 20px;
          }
          .church-tag {
            background: rgba(168,85,247,0.2); color: #c084fc;
            padding: 4px 10px; border-radius: 20px; font-size: 11px;
          }
          .verified-badge {
            background: rgba(59,130,246,0.2); color: #93c5fd;
            padding: 4px 10px; border-radius: 20px; font-size: 11px;
          }
          .distance-badge {
            background: rgba(34,197,94,0.2); color: #86efac;
            padding: 4px 10px; border-radius: 20px; font-size: 11px;
          }
          .btn-primary {
            background: linear-gradient(135deg, #a855f7, #7c3aed);
            color: #fff; border: none; padding: 10px 20px;
            border-radius: 8px; cursor: pointer; font-weight: bold;
          }
          .btn-success {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff; border: none; padding: 10px 20px;
            border-radius: 8px; cursor: pointer; font-weight: bold;
          }
        </style>
        
        <div class="church-dir-container">
          <div class="church-dir-header">
            <h2>⛪ Church Directory</h2>
            <button class="church-dir-close" onclick="window.churchDirectoryUI.close()">×</button>
          </div>
          
          <div class="church-dir-tabs">
            <button class="church-dir-tab ${this.currentTab === 'churches' ? 'active' : ''}" onclick="window.churchDirectoryUI.switchTab('churches')">⛪ Churches</button>
            <button class="church-dir-tab ${this.currentTab === 'events' ? 'active' : ''}" onclick="window.churchDirectoryUI.switchTab('events')">📅 Events</button>
            <button class="church-dir-tab ${this.currentTab === 'bulletins' ? 'active' : ''}" onclick="window.churchDirectoryUI.switchTab('bulletins')">📰 Bulletins</button>
            <button class="church-dir-tab ${this.currentTab === 'saved' ? 'active' : ''}" onclick="window.churchDirectoryUI.switchTab('saved')">❤️ Saved</button>
          </div>
          
          <div class="church-dir-search" id="church-dir-search">${this.getSearchHTML()}</div>
          
          <div class="church-dir-content" id="church-dir-content">
            <div class="loading"><div class="loading-spinner"></div><p>Loading...</p></div>
          </div>
        </div>
      `;
    }

    getSearchHTML() {
      if (this.currentTab === 'churches') {
        return `
          <input type="text" id="church-search-input" placeholder="Search churches..." onkeyup="if(event.key==='Enter')window.churchDirectoryUI.search()">
          <select id="church-denom-filter">
            <option value="all">All Denominations</option>
            <option value="Baptist">Baptist</option>
            <option value="Methodist">Methodist</option>
            <option value="Non-denominational">Non-denominational</option>
            <option value="Catholic">Catholic</option>
            <option value="Lutheran">Lutheran</option>
            <option value="Pentecostal">Pentecostal</option>
            <option value="Assembly of God">Assembly of God</option>
          </select>
          <button onclick="window.churchDirectoryUI.search()">🔍 Search</button>
        `;
      } else if (this.currentTab === 'events') {
        return `
          <input type="text" id="event-search-input" placeholder="Search events...">
          <select id="event-category-filter">
            <option value="all">All Categories</option>
            <option value="worship">Worship</option>
            <option value="youth">Youth</option>
            <option value="outreach">Outreach</option>
            <option value="study">Bible Study</option>
          </select>
          <button onclick="window.churchDirectoryUI.searchEvents()">🔍 Search</button>
        `;
      }
      return `<input type="text" id="bulletin-search-input" placeholder="Search bulletins..."><button onclick="window.churchDirectoryUI.searchBulletins()">🔍 Search</button>`;
    }

    switchTab(tab) {
      this.currentTab = tab;
      this.currentChurch = null;

      document.querySelectorAll('.church-dir-tab').forEach((t, i) => {
        t.classList.toggle('active', ['churches', 'events', 'bulletins', 'saved'][i] === tab);
      });

      const searchEl = document.getElementById('church-dir-search');
      if (searchEl) searchEl.innerHTML = this.getSearchHTML();

      this.loadContent();
    }

    async loadContent() {
      const content = document.getElementById('church-dir-content');
      if (!content) return;

      content.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p>Loading...</p></div>';

      try {
        switch (this.currentTab) {
          case 'churches': await this.loadChurches(); break;
          case 'events': await this.loadEvents(); break;
          case 'bulletins': await this.loadBulletins(); break;
          case 'saved': await this.loadSavedChurches(); break;
        }
      } catch (error) {
        console.error('Load error:', error);
        content.innerHTML = '<div class="empty-state"><div class="icon">😞</div><p>Error loading. Please try again.</p></div>';
      }
    }

    // =========================================================================
    // CHURCHES
    // =========================================================================

    async loadChurches() {
      if (!window.churchDirectory) {
        this.showError('Church directory not loaded');
        return;
      }
      const churches = await window.churchDirectory.fetchChurches();
      this.renderChurches(churches);
    }

    async search() {
      const input = document.getElementById('church-search-input');
      const denom = document.getElementById('church-denom-filter');
      const term = input ? input.value : '';
      const denomVal = denom ? denom.value : 'all';

      if (!window.churchDirectory) return;

      let churches;
      if (term) {
        churches = await window.churchDirectory.searchChurches(term);
      } else {
        churches = await window.churchDirectory.fetchChurches({ denomination: denomVal });
      }

      if (denomVal !== 'all') {
        churches = churches.filter(c => c.denomination === denomVal);
      }

      this.renderChurches(churches);
    }

    renderChurches(churches) {
      const content = document.getElementById('church-dir-content');
      if (!content) return;

      if (!churches || churches.length === 0) {
        content.innerHTML = `
          <div class="empty-state">
            <div class="icon">⛪</div>
            <p>No churches found.</p>
            <button class="btn-primary" onclick="window.churchDirectoryUI.showAddChurchForm()" style="margin-top:15px;">➕ Add Your Church</button>
          </div>
        `;
        return;
      }

      content.innerHTML = `<div class="church-list">${churches.map(church => `
        <div class="church-card" onclick="window.churchDirectoryUI.showChurchDetail('${church.id}')">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="church-logo">⛪</div>
            <div>
              <div style="color:#fff;font-weight:bold;font-size:15px;">${this.escapeHtml(church.name)}</div>
              <div style="color:#a78bfa;font-size:12px;">${this.escapeHtml(church.denomination || 'Christian')}</div>
            </div>
          </div>
          <div style="color:#9ca3af;font-size:13px;margin-bottom:8px;">
            📍 ${this.escapeHtml(church.address?.city || 'Location')}, ${this.escapeHtml(church.address?.state || '')}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${church.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            ${church.distance ? `<span class="distance-badge">${church.distance} mi</span>` : ''}
          </div>
        </div>
      `).join('')}</div>`;
    }

    async showChurchDetail(churchId) {
      const content = document.getElementById('church-dir-content');
      if (!content || !window.churchDirectory) return;

      content.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

      const church = await window.churchDirectory.getChurchById(churchId);
      if (!church) {
        content.innerHTML = '<div class="empty-state">Church not found.</div>';
        return;
      }

      this.currentChurch = church;
      const events = await window.churchDirectory.getEventsByChurch(churchId, 5);
      const bulletin = await window.churchDirectory.getLatestBulletin(churchId);

      content.innerHTML = `
        <button class="back-btn" onclick="window.churchDirectoryUI.loadChurches()">← Back</button>
        
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:25px;">
          <div class="church-logo" style="width:100px;height:100px;font-size:50px;">⛪</div>
          <div>
            <h2 style="color:#fff;font-size:26px;margin:0 0 5px 0;">${this.escapeHtml(church.name)}</h2>
            <p style="color:#a78bfa;font-size:16px;margin:0 0 15px 0;">${this.escapeHtml(church.denomination || 'Christian Church')}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button class="btn-primary" onclick="window.churchDirectoryUI.saveChurch('${church.id}')">❤️ Save</button>
              <button class="btn-success" onclick="window.churchDirectoryUI.setHomeChurch('${church.id}')">🏠 Set Home</button>
              ${church.contact?.website ? `<button style="background:#374151;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;" onclick="window.open('${church.contact.website}','_blank')">🌐 Website</button>` : ''}
            </div>
          </div>
        </div>
        
        ${church.description ? `<div style="background:rgba(255,255,255,0.05);border-radius:15px;padding:20px;margin-bottom:20px;"><h3 style="color:#fcd34d;margin:0 0 10px 0;">📖 About</h3><p style="color:#e5e7eb;margin:0;line-height:1.6;">${this.escapeHtml(church.description)}</p></div>` : ''}
        
        <div style="background:rgba(255,255,255,0.05);border-radius:15px;padding:20px;margin-bottom:20px;">
          <h3 style="color:#fcd34d;margin:0 0 15px 0;">🕐 Service Times</h3>
          ${(church.services || []).map(s => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);"><span style="color:#a78bfa;">${s.day}</span><span style="color:#86efac;">${s.time}</span></div>`).join('') || '<p style="color:#9ca3af;">Contact for times</p>'}
        </div>
        
        <div style="background:rgba(255,255,255,0.05);border-radius:15px;padding:20px;margin-bottom:20px;">
          <h3 style="color:#fcd34d;margin:0 0 15px 0;">📞 Contact</h3>
          ${church.contact?.phone ? `<p style="color:#e5e7eb;margin:5px 0;">📞 ${church.contact.phone}</p>` : ''}
          ${church.contact?.email ? `<p style="color:#e5e7eb;margin:5px 0;">✉️ ${church.contact.email}</p>` : ''}
          ${church.address ? `<p style="color:#e5e7eb;margin:5px 0;">📍 ${this.escapeHtml(church.address.street || '')}, ${this.escapeHtml(church.address.city)}, ${this.escapeHtml(church.address.state)} ${church.address.zip || ''}</p>` : ''}
          ${church.pastor ? `<p style="color:#e5e7eb;margin:10px 0 0 0;">👤 <strong>${this.escapeHtml(church.pastor)}</strong></p>` : ''}
        </div>
        
        ${events && events.length > 0 ? `
          <div style="background:rgba(255,255,255,0.05);border-radius:15px;padding:20px;margin-bottom:20px;">
            <h3 style="color:#fcd34d;margin:0 0 15px 0;">📅 Upcoming Events</h3>
            ${events.map(e => `<div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);"><div style="color:#22c55e;font-size:12px;">${e.date ? new Date(e.date).toLocaleDateString() : 'TBD'}</div><div style="color:#fff;font-weight:bold;">${this.escapeHtml(e.title)}</div></div>`).join('')}
          </div>
        ` : ''}
      `;
    }

    async saveChurch(churchId) {
      if (!window.churchDirectory) return;
      const success = await window.churchDirectory.saveChurch(churchId);
      alert(success ? '❤️ Church saved!' : 'Please log in to save churches.');
    }

    async setHomeChurch(churchId) {
      if (!window.churchDirectory) return;
      const success = await window.churchDirectory.setHomeChurch(churchId);
      alert(success ? '🏠 Home church set!' : 'Please log in.');
    }

    // =========================================================================
    // EVENTS
    // =========================================================================

    async loadEvents() {
      if (!window.churchDirectory) return;
      const events = await window.churchDirectory.fetchEvents();
      this.renderEvents(events);
    }

    async searchEvents() {
      const input = document.getElementById('event-search-input');
      const category = document.getElementById('event-category-filter');
      const term = input ? input.value.toLowerCase() : '';
      const cat = category ? category.value : 'all';

      if (!window.churchDirectory) return;

      let events = await window.churchDirectory.fetchEvents({ category: cat !== 'all' ? cat : undefined });

      if (term) {
        events = events.filter(e =>
          (e.title || '').toLowerCase().includes(term) ||
          (e.churchName || '').toLowerCase().includes(term)
        );
      }

      this.renderEvents(events);
    }

    renderEvents(events) {
      const content = document.getElementById('church-dir-content');
      if (!content) return;

      if (!events || events.length === 0) {
        content.innerHTML = '<div class="empty-state"><div class="icon">📅</div><p>No events found.</p></div>';
        return;
      }

      content.innerHTML = events.map(e => `
        <div class="event-card">
          <div class="event-date">📅 ${e.date ? new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'}</div>
          <h3 style="color:#fff;font-size:18px;margin:0 0 8px 0;">${this.escapeHtml(e.title)}</h3>
          <p style="color:#a78bfa;font-size:13px;margin:0 0 10px 0;">⛪ ${this.escapeHtml(e.churchName)}</p>
          <p style="color:#9ca3af;font-size:14px;margin:0 0 10px 0;">${this.escapeHtml(e.description || '')}</p>
          <div style="color:#64748b;font-size:12px;">🕐 ${e.time || 'TBD'} • 📍 ${this.escapeHtml(e.location || 'TBD')} • ${e.isFree ? '✅ Free' : '💳 Registration'}</div>
        </div>
      `).join('');
    }

    // =========================================================================
    // BULLETINS
    // =========================================================================

    async loadBulletins() {
      if (!window.churchDirectory) return;
      const bulletins = await window.churchDirectory.fetchBulletins();
      this.renderBulletins(bulletins);
    }

    async searchBulletins() {
      const input = document.getElementById('bulletin-search-input');
      const term = input ? input.value.toLowerCase() : '';

      if (!window.churchDirectory) return;

      let bulletins = await window.churchDirectory.fetchBulletins();

      if (term) {
        bulletins = bulletins.filter(b =>
          (b.churchName || '').toLowerCase().includes(term)
        );
      }

      this.renderBulletins(bulletins);
    }

    renderBulletins(bulletins) {
      const content = document.getElementById('church-dir-content');
      if (!content) return;

      if (!bulletins || bulletins.length === 0) {
        content.innerHTML = '<div class="empty-state"><div class="icon">📰</div><p>No bulletins found.</p></div>';
        return;
      }

      content.innerHTML = bulletins.map(b => `
        <div class="bulletin-card">
          <div style="display:flex;justify-content:space-between;margin-bottom:15px;">
            <div>
              <h3 style="color:#fff;font-size:16px;margin:0;">${this.escapeHtml(b.churchName)}</h3>
              <p style="color:#a78bfa;font-size:12px;margin:5px 0 0 0;">${this.escapeHtml(b.title)}</p>
            </div>
            ${b.pdfUrl ? `<a href="${b.pdfUrl}" target="_blank" style="background:#374151;color:#fff;padding:8px 15px;border-radius:6px;text-decoration:none;font-size:12px;">📄 PDF</a>` : ''}
          </div>
          ${b.content?.welcomeMessage ? `<p style="color:#e5e7eb;margin-bottom:15px;">${this.escapeHtml(b.content.welcomeMessage)}</p>` : ''}
          ${b.content?.announcements?.length ? `<div style="margin-bottom:10px;"><h4 style="color:#fcd34d;font-size:13px;margin:0 0 8px 0;">📢 Announcements</h4><ul style="color:#9ca3af;margin:0;padding-left:20px;">${b.content.announcements.map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}</ul></div>` : ''}
        </div>
      `).join('');
    }

    // =========================================================================
    // SAVED
    // =========================================================================

    async loadSavedChurches() {
      if (!window.churchDirectory) return;
      const churches = await window.churchDirectory.getSavedChurches();

      if (!churches || churches.length === 0) {
        const content = document.getElementById('church-dir-content');
        if (content) {
          content.innerHTML = `
            <div class="empty-state">
              <div class="icon">❤️</div>
              <p>No saved churches yet.</p>
              <button class="btn-primary" onclick="window.churchDirectoryUI.switchTab('churches')" style="margin-top:15px;">⛪ Browse Churches</button>
            </div>
          `;
        }
        return;
      }

      this.renderChurches(churches);
    }

    // =========================================================================
    // ADD CHURCH
    // =========================================================================

    showAddChurchForm() {
      const content = document.getElementById('church-dir-content');
      if (!content) return;

      content.innerHTML = `
        <button class="back-btn" onclick="window.churchDirectoryUI.loadChurches()">← Back</button>
        <div style="max-width:600px;margin:0 auto;">
          <h2 style="color:#fff;margin-bottom:20px;">➕ Add Your Church</h2>
          <div style="display:flex;flex-direction:column;gap:15px;">
            <input type="text" id="add-name" placeholder="Church Name *" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
            <select id="add-denom" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
              <option value="">Denomination</option>
              <option>Baptist</option><option>Methodist</option><option>Non-denominational</option>
              <option>Catholic</option><option>Lutheran</option><option>Pentecostal</option>
            </select>
            <input type="text" id="add-city" placeholder="City *" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
            <input type="text" id="add-state" placeholder="State *" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
            <input type="text" id="add-phone" placeholder="Phone" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
            <input type="url" id="add-website" placeholder="Website" style="padding:12px;border-radius:8px;border:2px solid #374151;background:#1e293b;color:#fff;">
            <button class="btn-success" onclick="window.churchDirectoryUI.submitChurch()" style="padding:15px;">✓ Submit</button>
          </div>
        </div>
      `;
    }

    async submitChurch() {
      const name = document.getElementById('add-name')?.value.trim();
      const city = document.getElementById('add-city')?.value.trim();
      const state = document.getElementById('add-state')?.value.trim();

      if (!name || !city || !state) {
        alert('Please fill required fields');
        return;
      }

      if (!window.churchDirectory) return;

      const id = await window.churchDirectory.addChurch({
        name,
        denomination: document.getElementById('add-denom')?.value || '',
        address: { city, state },
        contact: {
          phone: document.getElementById('add-phone')?.value || '',
          website: document.getElementById('add-website')?.value || ''
        }
      });

      alert(id ? '✅ Church submitted for review!' : '❌ Error. Try again.');
      if (id) this.loadChurches();
    }

    // =========================================================================
    // HELPERS
    // =========================================================================

    escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    showError(msg) {
      const content = document.getElementById('church-dir-content');
      if (content) {
        content.innerHTML = `<div class="empty-state"><div class="icon">😞</div><p>${msg}</p></div>`;
      }
    }
  }

  // =============================================================================
  // CREATE INSTANCE & EXPORT
  // =============================================================================

  const churchDirectoryUI = new ChurchDirectoryUI();

  function openChurchDirectory(tab) {
    churchDirectoryUI.open(tab || 'churches');
  }

  window.churchDirectoryUI = churchDirectoryUI;
  window.openChurchDirectory = openChurchDirectory;

  console.log('⛪ Church Directory UI loaded');

})();

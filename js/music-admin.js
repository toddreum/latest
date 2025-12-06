/**
 * BirdTurds.com - Music Admin Panel (Debugged)
 * Backend for users to enable/disable worship songs
 * Dude.com © 2024. All Rights Reserved.
 */

(function() {
  'use strict';

  let previewAudio = null;

  function getPlaylist() {
    // Get playlist from worship scene or return empty
    if (typeof window.MODERN_WORSHIP_PLAYLIST !== 'undefined' && Array.isArray(window.MODERN_WORSHIP_PLAYLIST)) {
      return window.MODERN_WORSHIP_PLAYLIST;
    }
    console.warn('MODERN_WORSHIP_PLAYLIST not found - load worship-ending-scene.js first');
    return [];
  }

  function showMusicAdminPanel() {
    const playlist = getPlaylist();
    
    if (playlist.length === 0) {
      alert('Music playlist not loaded. Please refresh the page.');
      return;
    }
    
    // Get saved enabled songs
    let enabledIds = [];
    try {
      const saved = localStorage.getItem('birdturds_worship_music_enabled');
      enabledIds = saved ? JSON.parse(saved) : playlist.map(s => s.id);
    } catch (e) {
      enabledIds = playlist.map(s => s.id);
    }
    
    // Remove existing modal
    const existing = document.getElementById('music-admin-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'music-admin-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.95);
      z-index: 100001;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    `;
    
    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:20px;border:3px solid #ffd700;padding:30px;max-width:800px;width:100%;max-height:90vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
          <h2 style="color:#ffd700;font-size:28px;margin:0;">🎵 Worship Music Manager</h2>
          <button onclick="window.closeMusicAdmin()" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;">×</button>
        </div>
        
        <p style="color:#e5e7eb;margin-bottom:20px;">
          Select which songs to include in game worship scenes. Enabled songs will play randomly during victory celebrations.
        </p>
        
        <div style="display:flex;gap:15px;margin-bottom:20px;flex-wrap:wrap;">
          <button onclick="window.selectAllMusicSongs()" style="background:#22c55e;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:bold;">
            ✓ Enable All
          </button>
          <button onclick="window.deselectAllMusicSongs()" style="background:#ef4444;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:bold;">
            ✗ Disable All
          </button>
        </div>
        
        <div id="music-list" style="display:grid;gap:10px;">
          ${playlist.map(song => `
            <div class="music-song-row" data-song-id="${song.id}" 
                 style="background:rgba(255,255,255,0.05);border:2px solid ${enabledIds.includes(song.id) ? '#22c55e' : '#374151'};border-radius:12px;padding:15px;display:flex;align-items:center;gap:15px;cursor:pointer;transition:all 0.2s;"
                 onclick="window.toggleMusicSong('${song.id}')">
              <input type="checkbox" class="music-song-checkbox" data-song-id="${song.id}" 
                     ${enabledIds.includes(song.id) ? 'checked' : ''} 
                     style="width:24px;height:24px;cursor:pointer;flex-shrink:0;"
                     onclick="event.stopPropagation();window.toggleMusicSong('${song.id}')">
              <div style="flex:1;min-width:0;">
                <div style="color:#fff;font-weight:bold;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${song.title}</div>
                <div style="color:#a78bfa;font-size:13px;">${song.artist}</div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="color:#64748b;font-size:11px;">CCLI ${song.ccli}</div>
                <button onclick="event.stopPropagation();window.previewMusicSong('${song.id}')" 
                        style="background:#3b82f6;color:#fff;border:none;padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer;margin-top:5px;">
                  ▶ Preview
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top:25px;padding-top:20px;border-top:1px solid #374151;">
          <h3 style="color:#ffd700;font-size:18px;margin-bottom:15px;">📤 Upload Your Licensed Music</h3>
          <p style="color:#9ca3af;font-size:13px;margin-bottom:15px;">
            Upload MP3 files from your CCLI subscription to Firebase Storage.
          </p>
          <div style="background:rgba(59,130,246,0.2);border:2px solid #3b82f6;border-radius:10px;padding:15px;">
            <p style="color:#93c5fd;font-size:13px;margin:0 0 10px 0;"><strong>Firebase Storage Path:</strong></p>
            <code style="background:#1e293b;color:#fcd34d;padding:8px 12px;border-radius:5px;display:block;font-size:12px;word-break:break-all;">
              gs://birdturds-a9e0b.appspot.com/audio-worship/[song_id].mp3
            </code>
          </div>
        </div>
        
        <div style="display:flex;gap:15px;justify-content:center;margin-top:25px;flex-wrap:wrap;">
          <button onclick="window.saveMusicAdminSettings()" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:none;padding:15px 40px;border-radius:12px;font-size:16px;font-weight:bold;cursor:pointer;">
            ✓ Save Settings
          </button>
          <button onclick="window.closeMusicAdmin()" style="background:#374151;color:#fff;border:none;padding:15px 30px;border-radius:12px;font-size:16px;cursor:pointer;">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  function toggleMusicSong(songId) {
    const row = document.querySelector(`.music-song-row[data-song-id="${songId}"]`);
    const checkbox = document.querySelector(`.music-song-checkbox[data-song-id="${songId}"]`);
    
    if (!row || !checkbox) return;
    
    checkbox.checked = !checkbox.checked;
    row.style.borderColor = checkbox.checked ? '#22c55e' : '#374151';
  }

  function selectAllMusicSongs() {
    document.querySelectorAll('.music-song-row').forEach(row => {
      const checkbox = row.querySelector('.music-song-checkbox');
      if (checkbox) {
        checkbox.checked = true;
        row.style.borderColor = '#22c55e';
      }
    });
  }

  function deselectAllMusicSongs() {
    document.querySelectorAll('.music-song-row').forEach(row => {
      const checkbox = row.querySelector('.music-song-checkbox');
      if (checkbox) {
        checkbox.checked = false;
        row.style.borderColor = '#374151';
      }
    });
  }

  function saveMusicAdminSettings() {
    const enabledIds = [];
    
    document.querySelectorAll('.music-song-checkbox:checked').forEach(checkbox => {
      const songId = checkbox.getAttribute('data-song-id');
      if (songId) enabledIds.push(songId);
    });
    
    localStorage.setItem('birdturds_worship_music_enabled', JSON.stringify(enabledIds));
    
    // Save to Firebase if available
    saveMusicSettingsToFirebase(enabledIds);
    
    alert(`✓ Saved! ${enabledIds.length} songs enabled for worship scenes.`);
    closeMusicAdmin();
  }

  async function saveMusicSettingsToFirebase(enabledIds) {
    if (typeof firebase === 'undefined' || !firebase.firestore) return;
    
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;
      
      await firebase.firestore().collection('user_settings').doc(user.uid).set({
        worshipMusicEnabled: enabledIds,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      console.log('✅ Music settings saved to Firebase');
    } catch (error) {
      console.error('Error saving music settings:', error);
    }
  }

  function previewMusicSong(songId) {
    const playlist = getPlaylist();
    const song = playlist.find(s => s.id === songId);
    if (!song) return;
    
    // Stop current preview
    if (previewAudio) {
      previewAudio.pause();
      previewAudio = null;
    }
    
    try {
      const url = `https://firebasestorage.googleapis.com/v0/b/birdturds-a9e0b.appspot.com/o/${encodeURIComponent(song.firebasePath)}?alt=media`;
      previewAudio = new Audio(url);
      previewAudio.volume = 0.5;
      previewAudio.play().catch(e => {
        console.log('Preview failed - upload MP3 to Firebase Storage');
        alert('Song not found. Upload MP3 to Firebase Storage first!');
      });
      
      // Stop after 15 seconds
      setTimeout(() => {
        if (previewAudio) {
          previewAudio.pause();
          previewAudio = null;
        }
      }, 15000);
    } catch (error) {
      alert('Upload this song to Firebase Storage first!');
    }
  }

  function closeMusicAdmin() {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio = null;
    }
    const modal = document.getElementById('music-admin-modal');
    if (modal) modal.remove();
  }

  // Export to window
  window.showMusicAdminPanel = showMusicAdminPanel;
  window.toggleMusicSong = toggleMusicSong;
  window.selectAllMusicSongs = selectAllMusicSongs;
  window.deselectAllMusicSongs = deselectAllMusicSongs;
  window.saveMusicAdminSettings = saveMusicAdminSettings;
  window.previewMusicSong = previewMusicSong;
  window.closeMusicAdmin = closeMusicAdmin;

  console.log('🎵 Music Admin Panel loaded');

})();

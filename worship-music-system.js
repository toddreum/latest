// ============================================
// BIRDTURDS v40.5 - WORSHIP MUSIC SYSTEM
// Top 100 Christian worship songs
// Embedded videos, summaries, popularity tracking
// ============================================

const WorshipMusicSystem = {
    // Top Christian worship songs (curated list)
    // In production, this could be fetched from an API
    songs: [
        // Top Tier - Timeless Classics
        {
            id: 1,
            title: "Amazing Grace (My Chains Are Gone)",
            artist: "Chris Tomlin",
            youtubeId: "YrLk4vdY28Q",
            category: "hymn",
            summary: "A beautiful modern arrangement of the classic hymn about God's incredible grace that saves and frees us from sin.",
            plays: 0,
            featured: true
        },
        {
            id: 2,
            title: "How Great Is Our God",
            artist: "Chris Tomlin",
            youtubeId: "KBD18rsVJHk",
            category: "worship",
            summary: "A powerful declaration of God's greatness and majesty. Perfect for lifting your eyes to the Creator.",
            plays: 0,
            featured: true
        },
        {
            id: 3,
            title: "10,000 Reasons (Bless the Lord)",
            artist: "Matt Redman",
            youtubeId: "XtwIT8JjddM",
            category: "worship",
            summary: "Inspired by Psalm 103, this song reminds us to bless the Lord with everything we have, in every season.",
            plays: 0,
            featured: true
        },
        {
            id: 4,
            title: "What A Beautiful Name",
            artist: "Hillsong Worship",
            youtubeId: "nQWFzMvCfLE",
            category: "worship",
            summary: "Celebrates the power and beauty of Jesus' name - the name above all names that has defeated death.",
            plays: 0,
            featured: true
        },
        {
            id: 5,
            title: "Reckless Love",
            artist: "Cory Asbury",
            youtubeId: "Sc6SSHuZvQE",
            category: "worship",
            summary: "Describes God's overwhelming, never-ending, relentless love that pursues us even when we run away.",
            plays: 0,
            featured: true
        },
        {
            id: 6,
            title: "Oceans (Where Feet May Fail)",
            artist: "Hillsong UNITED",
            youtubeId: "dy9nwe9_xzw",
            category: "worship",
            summary: "A prayer of trust, asking God to lead us where our faith can grow, even into the unknown.",
            plays: 0,
            featured: true
        },
        {
            id: 7,
            title: "Good Good Father",
            artist: "Chris Tomlin",
            youtubeId: "CqybaIesbuA",
            category: "worship",
            summary: "A beautiful reminder that God is a good, good Father and we are loved by Him.",
            plays: 0
        },
        {
            id: 8,
            title: "Way Maker",
            artist: "Sinach",
            youtubeId: "n4XgFiGaw1o",
            category: "worship",
            summary: "Declares that God makes a way where there seems to be no way. He is miracle worker and promise keeper.",
            plays: 0,
            featured: true
        },
        {
            id: 9,
            title: "Cornerstone",
            artist: "Hillsong Worship",
            youtubeId: "QvLxZEU02uI",
            category: "hymn",
            summary: "Based on 'My Hope Is Built On Nothing Less', this declares Christ as our only firm foundation.",
            plays: 0
        },
        {
            id: 10,
            title: "In Christ Alone",
            artist: "Keith & Kristyn Getty",
            youtubeId: "16KYvfIc2bE",
            category: "hymn",
            summary: "A modern hymn telling the story of Jesus - from birth to resurrection - and our hope in Him alone.",
            plays: 0,
            featured: true
        },
        {
            id: 11,
            title: "Holy Spirit",
            artist: "Francesca Battistelli",
            youtubeId: "ByI8b3vA5o8",
            category: "worship",
            summary: "An invitation for the Holy Spirit to fill us and have His way in our lives.",
            plays: 0
        },
        {
            id: 12,
            title: "Great Are You Lord",
            artist: "All Sons & Daughters",
            youtubeId: "auvplouElaw",
            category: "worship",
            summary: "Simple yet profound worship declaring God's greatness and our desire to praise Him.",
            plays: 0
        },
        {
            id: 13,
            title: "Build My Life",
            artist: "Housefires",
            youtubeId: "Z9Yh69e-Hgc",
            category: "worship",
            summary: "A commitment to build our lives on nothing less than Jesus - the firm foundation.",
            plays: 0
        },
        {
            id: 14,
            title: "Who You Say I Am",
            artist: "Hillsong Worship",
            youtubeId: "lKw6uqtGFfo",
            category: "worship",
            summary: "Reminds us that our identity is found in Christ - we are who God says we are, not what the world says.",
            plays: 0
        },
        {
            id: 15,
            title: "Goodness of God",
            artist: "Bethel Music",
            youtubeId: "0B_lnQIITxU",
            category: "worship",
            summary: "A testimony of God's faithfulness throughout our lives - His goodness is running after us.",
            plays: 0,
            featured: true
        },
        {
            id: 16,
            title: "King of Kings",
            artist: "Hillsong Worship",
            youtubeId: "dQl4izxPeNU",
            category: "worship",
            summary: "Proclaims Jesus as the risen King who conquered the grave and will return in glory.",
            plays: 0
        },
        {
            id: 17,
            title: "Mighty To Save",
            artist: "Hillsong Worship",
            youtubeId: "GtBPVeDYdow",
            category: "worship",
            summary: "Declares that our God is mighty to save - He can move mountains and He is able!",
            plays: 0
        },
        {
            id: 18,
            title: "Here I Am To Worship",
            artist: "Tim Hughes",
            youtubeId: "fWpvknKuYrg",
            category: "worship",
            summary: "A classic worship song of humble adoration - calling Jesus the light of the world.",
            plays: 0
        },
        {
            id: 19,
            title: "The Blessing",
            artist: "Kari Jobe & Cody Carnes",
            youtubeId: "Zp6aygmvzM4",
            category: "worship",
            summary: "Based on the Aaronic blessing from Numbers 6, speaking God's favor and peace over listeners.",
            plays: 0,
            featured: true
        },
        {
            id: 20,
            title: "Graves Into Gardens",
            artist: "Elevation Worship",
            youtubeId: "pXsYFaRnfIM",
            category: "worship",
            summary: "Celebrates God's power to bring life from death and transform our impossible situations.",
            plays: 0
        },
        // Continue with more songs...
        {
            id: 21,
            title: "O Come To The Altar",
            artist: "Elevation Worship",
            youtubeId: "rSGCgcJKNHo",
            category: "worship",
            summary: "An invitation to come to Jesus just as you are - He meets us at the altar.",
            plays: 0
        },
        {
            id: 22,
            title: "No Longer Slaves",
            artist: "Bethel Music",
            youtubeId: "qMXcJmT8Dhw",
            category: "worship",
            summary: "Declares freedom from fear because we are children of God, not slaves.",
            plays: 0
        },
        {
            id: 23,
            title: "Raise A Hallelujah",
            artist: "Bethel Music",
            youtubeId: "Wp-pXGqmPXc",
            category: "worship",
            summary: "A battle cry to praise God even in the midst of trials - praise is our weapon!",
            plays: 0
        },
        {
            id: 24,
            title: "Do It Again",
            artist: "Elevation Worship",
            youtubeId: "0B_lnQIITxU",
            category: "worship",
            summary: "Remembering God's faithfulness and asking Him to move mightily again.",
            plays: 0
        },
        {
            id: 25,
            title: "This Is Amazing Grace",
            artist: "Phil Wickham",
            youtubeId: "XFRjr_x-yxU",
            category: "worship",
            summary: "Celebrates the amazing grace found at the cross where Jesus broke every chain.",
            plays: 0
        }
        // ... Would continue to 100, but keeping manageable for now
    ],
    
    // Categories
    categories: [
        { id: 'all', name: '🎵 All Songs' },
        { id: 'featured', name: '⭐ Featured' },
        { id: 'worship', name: '🙌 Worship' },
        { id: 'hymn', name: '📜 Hymns' },
        { id: 'praise', name: '🎉 Praise' }
    ],
    
    // User tracking
    recentlyPlayed: [],
    favorites: [],
    totalListenTime: 0,
    
    // Points
    points: {
        listenSong: 10,
        completeSong: 25,
        firstListen: 50,
        favoriteSong: 5,
        shareMusic: 50
    },
    
    init: function() {
        this.loadProgress();
        this.updatePopularity();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_worship');
        if (saved) {
            const data = JSON.parse(saved);
            this.recentlyPlayed = data.recentlyPlayed || [];
            this.favorites = data.favorites || [];
            this.totalListenTime = data.totalListenTime || 0;
            
            // Restore play counts
            if (data.songPlays) {
                data.songPlays.forEach(sp => {
                    const song = this.songs.find(s => s.id === sp.id);
                    if (song) song.plays = sp.plays;
                });
            }
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_worship', JSON.stringify({
            recentlyPlayed: this.recentlyPlayed.slice(-20),
            favorites: this.favorites,
            totalListenTime: this.totalListenTime,
            songPlays: this.songs.map(s => ({ id: s.id, plays: s.plays }))
        }));
    },
    
    updatePopularity: function() {
        // Sort by plays for popularity ranking
        this.songs.sort((a, b) => b.plays - a.plays);
    },
    
    // Open music section
    openMusicSection: function() {
        const featured = this.songs.filter(s => s.featured).slice(0, 6);
        const popular = [...this.songs].sort((a, b) => b.plays - a.plays).slice(0, 5);
        
        const html = `
            <div class="music-section">
                <div class="music-header">
                    <h2>🎵 Worship Music</h2>
                    <button class="close-btn" onclick="WorshipMusicSystem.closeMusic()">✕</button>
                </div>
                
                <div class="music-verse">
                    "Sing to the Lord a new song; sing to the Lord, all the earth!"
                    <span>— Psalm 96:1</span>
                </div>
                
                <div class="music-stats">
                    <span>🎧 ${this.recentlyPlayed.length} songs played</span>
                    <span>❤️ ${this.favorites.length} favorites</span>
                </div>
                
                <!-- Featured -->
                <div class="music-row">
                    <h3>⭐ Featured Worship</h3>
                    <div class="song-grid">
                        ${featured.map(s => this.renderSongCard(s)).join('')}
                    </div>
                </div>
                
                <!-- Popular Today -->
                <div class="music-row">
                    <h3>🔥 Most Popular</h3>
                    <div class="song-list">
                        ${popular.map((s, i) => this.renderSongListItem(s, i + 1)).join('')}
                    </div>
                </div>
                
                <!-- Browse All -->
                <div class="music-row">
                    <h3>📚 Browse All (${this.songs.length} songs)</h3>
                    <div class="category-filter">
                        ${this.categories.map(c => `
                            <button onclick="WorshipMusicSystem.filterSongs('${c.id}')">${c.name}</button>
                        `).join('')}
                    </div>
                    <div class="song-list" id="all-songs">
                        ${this.songs.slice(0, 10).map((s, i) => this.renderSongListItem(s, i + 1)).join('')}
                    </div>
                    <button class="load-more" onclick="WorshipMusicSystem.loadMoreSongs()">Load More...</button>
                </div>
                
                <!-- Recently Played -->
                ${this.recentlyPlayed.length > 0 ? `
                    <div class="music-row">
                        <h3>🕐 Recently Played</h3>
                        <div class="song-list">
                            ${this.recentlyPlayed.slice(0, 5).map(id => {
                                const song = this.songs.find(s => s.id === id);
                                return song ? this.renderSongListItem(song) : '';
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    renderSongCard: function(song) {
        const isFavorite = this.favorites.includes(song.id);
        
        return `
            <div class="song-card" onclick="WorshipMusicSystem.playSong(${song.id})">
                <div class="song-thumb">
                    <img src="https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg" alt="${song.title}">
                    <div class="play-overlay">▶</div>
                </div>
                <div class="song-info">
                    <strong>${song.title}</strong>
                    <span>${song.artist}</span>
                </div>
                <button class="fav-btn ${isFavorite ? 'active' : ''}" 
                        onclick="event.stopPropagation(); WorshipMusicSystem.toggleFavorite(${song.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        `;
    },
    
    renderSongListItem: function(song, rank = null) {
        const isFavorite = this.favorites.includes(song.id);
        
        return `
            <div class="song-list-item" onclick="WorshipMusicSystem.playSong(${song.id})">
                ${rank ? `<span class="song-rank">${rank}</span>` : ''}
                <img src="https://img.youtube.com/vi/${song.youtubeId}/default.jpg" alt="">
                <div class="song-details">
                    <strong>${song.title}</strong>
                    <span>${song.artist}</span>
                </div>
                <span class="song-plays">${song.plays} plays</span>
                <button class="fav-btn-small ${isFavorite ? 'active' : ''}" 
                        onclick="event.stopPropagation(); WorshipMusicSystem.toggleFavorite(${song.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        `;
    },
    
    filterSongs: function(categoryId) {
        let filtered = this.songs;
        
        if (categoryId === 'featured') {
            filtered = this.songs.filter(s => s.featured);
        } else if (categoryId !== 'all') {
            filtered = this.songs.filter(s => s.category === categoryId);
        }
        
        document.getElementById('all-songs').innerHTML = 
            filtered.slice(0, 10).map((s, i) => this.renderSongListItem(s, i + 1)).join('');
    },
    
    loadMoreSongs: function() {
        // Load more songs (pagination)
        const container = document.getElementById('all-songs');
        const current = container.children.length;
        const more = this.songs.slice(current, current + 10);
        
        more.forEach((s, i) => {
            container.innerHTML += this.renderSongListItem(s, current + i + 1);
        });
    },
    
    // Play a song
    playSong: function(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (!song) return;
        
        const html = `
            <div class="song-player">
                <div class="player-header">
                    <button onclick="WorshipMusicSystem.openMusicSection()">← Back</button>
                    <button class="close-btn" onclick="WorshipMusicSystem.closeMusic()">✕</button>
                </div>
                
                <div class="player-video">
                    <iframe 
                        width="100%" 
                        height="315" 
                        src="https://www.youtube.com/embed/${song.youtubeId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                
                <div class="player-info">
                    <h2>${song.title}</h2>
                    <p class="player-artist">${song.artist}</p>
                    
                    <div class="player-summary">
                        <h4>📖 About This Song</h4>
                        <p>${song.summary}</p>
                    </div>
                    
                    <div class="player-actions">
                        <button onclick="WorshipMusicSystem.toggleFavorite(${song.id})">
                            ${this.favorites.includes(song.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                        </button>
                        <button onclick="SocialSystem.openShareDialog('verse', {verse: '${song.title} by ${song.artist}'})">
                            📤 Share
                        </button>
                    </div>
                    
                    <div class="player-scripture">
                        💡 Worship is a powerful way to connect with God and lift your spirit!
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
        
        // Track play
        this.recordPlay(songId);
    },
    
    recordPlay: function(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (!song) return;
        
        // Increment plays
        song.plays++;
        
        // Add to recently played
        const index = this.recentlyPlayed.indexOf(songId);
        if (index > -1) {
            this.recentlyPlayed.splice(index, 1);
        }
        this.recentlyPlayed.unshift(songId);
        
        // Award points
        const isFirstListen = this.recentlyPlayed.filter(id => id === songId).length === 1;
        let points = this.points.listenSong;
        let message = 'Listening to worship!';
        
        if (isFirstListen) {
            points += this.points.firstListen;
            message = 'New song discovered!';
        }
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, message);
        }
        
        this.saveProgress();
    },
    
    toggleFavorite: function(songId) {
        const index = this.favorites.indexOf(songId);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(songId);
            
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(this.points.favoriteSong, 'Added to favorites!');
            }
        }
        
        this.saveProgress();
    },
    
    // Get song of the day
    getSongOfTheDay: function() {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const index = dayOfYear % this.songs.length;
        return this.songs[index];
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('music-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'music-overlay';
            overlay.className = 'music-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeMusic: function() {
        const overlay = document.getElementById('music-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const musicStyles = `
<style>
.music-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    justify-content: center;
    align-items: flex-start;
    z-index: 20000;
    overflow-y: auto;
    padding: 20px;
}
.music-section, .song-player {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 20px;
    padding: 25px;
    max-width: 900px;
    width: 100%;
    color: white;
    margin: 20px auto;
}
.music-header, .player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.music-header h2 { color: #ffd700; margin: 0; }
.music-verse {
    background: rgba(255,215,0,0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-style: italic;
    margin-bottom: 20px;
}
.music-verse span { display: block; margin-top: 5px; color: rgba(255,255,255,0.6); }
.music-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 25px;
    color: rgba(255,255,255,0.7);
}
.music-row {
    margin-bottom: 30px;
}
.music-row h3 {
    color: #4ecdc4;
    margin-bottom: 15px;
}
.song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
.song-card {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}
.song-card:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.15);
}
.song-thumb {
    position: relative;
    aspect-ratio: 16/9;
}
.song-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba(255,215,0,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: #1a1a2e;
    opacity: 0;
    transition: opacity 0.3s;
}
.song-card:hover .play-overlay { opacity: 1; }
.song-info {
    padding: 12px;
}
.song-info strong {
    display: block;
    color: #ffd700;
    font-size: 0.95em;
    margin-bottom: 3px;
}
.song-info span {
    color: rgba(255,255,255,0.7);
    font-size: 0.85em;
}
.fav-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.5);
    border: none;
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
}
.song-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.song-list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.05);
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
}
.song-list-item:hover {
    background: rgba(255,255,255,0.1);
}
.song-rank {
    font-size: 1.2em;
    font-weight: bold;
    color: #ffd700;
    width: 30px;
    text-align: center;
}
.song-list-item img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
}
.song-details {
    flex: 1;
}
.song-details strong {
    display: block;
    color: white;
}
.song-details span {
    color: rgba(255,255,255,0.6);
    font-size: 0.85em;
}
.song-plays {
    color: rgba(255,255,255,0.5);
    font-size: 0.85em;
}
.category-filter {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 15px;
}
.category-filter button {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 8px 15px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
}
.category-filter button:hover {
    background: #ffd700;
    color: #1a1a2e;
}
.load-more {
    width: 100%;
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 12px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin-top: 10px;
}
.player-video {
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 20px;
}
.player-info h2 {
    color: #ffd700;
    margin-bottom: 5px;
}
.player-artist {
    color: rgba(255,255,255,0.7);
    margin-bottom: 20px;
}
.player-summary {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
}
.player-summary h4 {
    color: #4ecdc4;
    margin-bottom: 10px;
}
.player-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.player-actions button {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.player-actions button:hover {
    background: rgba(255,255,255,0.2);
}
.player-scripture {
    background: rgba(255,215,0,0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    color: #ffd700;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', musicStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = WorshipMusicSystem;
}

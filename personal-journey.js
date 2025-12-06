// ============================================
// BIRDTURDS v40.5 - PERSONAL JOURNEY SYSTEM
// Private, personalized spiritual support
// Ask about struggles, provide tailored scripture & prayer
// ============================================

const PersonalJourneySystem = {
    // User's journey data (private, local only)
    profile: {
        struggles: [],
        prayerRequests: [],
        victories: [],
        favoriteVerses: [],
        journalEntries: []
    },
    
    // Struggle categories with tailored resources
    struggleCategories: {
        anxiety: {
            name: '😟 Anxiety & Worry',
            description: 'Feeling overwhelmed, stressed, or worried',
            scriptures: [
                { ref: 'Philippians 4:6-7', text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' },
                { ref: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.' },
                { ref: 'Matthew 6:34', text: 'Do not worry about tomorrow, for tomorrow will worry about itself.' },
                { ref: 'Isaiah 41:10', text: 'Do not fear, for I am with you; do not be dismayed, for I am your God.' },
                { ref: 'Psalm 94:19', text: 'When anxiety was great within me, your consolation brought me joy.' }
            ],
            prayers: [
                'Lord, I give you my worries today. Help me trust in Your plan.',
                'Father, calm my anxious heart and fill me with Your peace.',
                'God, remind me that You are in control when I feel overwhelmed.'
            ],
            readingPlan: 'anxiety'
        },
        depression: {
            name: '😢 Sadness & Depression',
            description: 'Feeling low, hopeless, or empty',
            scriptures: [
                { ref: 'Psalm 34:18', text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
                { ref: 'Psalm 42:11', text: 'Why are you downcast, O my soul? Put your hope in God.' },
                { ref: 'Isaiah 41:10', text: 'Do not fear, for I am with you; do not be dismayed, for I am your God.' },
                { ref: 'Romans 8:38-39', text: 'Nothing can separate us from the love of God.' },
                { ref: 'Psalm 23:4', text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.' }
            ],
            prayers: [
                'Lord, lift my spirit and remind me of Your love.',
                'Father, bring light into my darkness today.',
                'God, help me feel Your presence even when I feel alone.'
            ],
            helpNote: 'If you\'re struggling with thoughts of self-harm, please reach out to someone you trust or call a helpline. You matter.'
        },
        addiction: {
            name: '⛓️ Addiction & Temptation',
            description: 'Struggling with habits, substances, or temptation',
            scriptures: [
                { ref: '1 Corinthians 10:13', text: 'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.' },
                { ref: 'James 4:7', text: 'Submit yourselves to God. Resist the devil, and he will flee from you.' },
                { ref: 'Galatians 5:1', text: 'It is for freedom that Christ has set us free.' },
                { ref: '2 Corinthians 5:17', text: 'If anyone is in Christ, the new creation has come: The old has gone, the new is here!' },
                { ref: 'Romans 6:14', text: 'Sin shall no longer be your master, because you are not under the law, but under grace.' }
            ],
            prayers: [
                'Lord, give me strength to resist temptation today.',
                'Father, break the chains that hold me and set me free.',
                'God, fill the emptiness in me that I\'ve tried to fill with other things.'
            ]
        },
        relationships: {
            name: '💔 Relationship Struggles',
            description: 'Conflict, loneliness, or family issues',
            scriptures: [
                { ref: 'Colossians 3:13', text: 'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.' },
                { ref: '1 Corinthians 13:4-7', text: 'Love is patient, love is kind. It does not envy, it does not boast...' },
                { ref: 'Proverbs 17:17', text: 'A friend loves at all times, and a brother is born for a time of adversity.' },
                { ref: 'Ephesians 4:32', text: 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.' },
                { ref: 'Romans 12:18', text: 'If it is possible, as far as it depends on you, live at peace with everyone.' }
            ],
            prayers: [
                'Lord, heal my relationships and give me a forgiving heart.',
                'Father, help me love others the way You love me.',
                'God, bring peace and understanding where there is conflict.'
            ]
        },
        purpose: {
            name: '❓ Feeling Lost / No Purpose',
            description: 'Unsure of direction or meaning in life',
            scriptures: [
                { ref: 'Jeremiah 29:11', text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
                { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
                { ref: 'Ephesians 2:10', text: 'We are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.' },
                { ref: 'Psalm 139:16', text: 'All the days ordained for me were written in your book before one of them came to be.' }
            ],
            prayers: [
                'Lord, show me Your purpose for my life.',
                'Father, guide my steps when I don\'t know which way to go.',
                'God, help me trust Your plan even when I can\'t see it.'
            ],
            readingPlan: 'purpose'
        },
        faith_doubts: {
            name: '🤔 Faith Doubts',
            description: 'Questions about God or struggling to believe',
            scriptures: [
                { ref: 'Mark 9:24', text: 'I do believe; help me overcome my unbelief!' },
                { ref: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
                { ref: 'James 1:5', text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.' },
                { ref: 'John 20:29', text: 'Blessed are those who have not seen and yet have believed.' }
            ],
            prayers: [
                'Lord, help my unbelief and grow my faith.',
                'Father, reveal Yourself to me in ways I can understand.',
                'God, give me wisdom to find answers to my questions.'
            ],
            note: 'Doubt is not the opposite of faith - it\'s part of the journey. God can handle your questions.'
        },
        anger: {
            name: '😤 Anger & Bitterness',
            description: 'Struggling with resentment or rage',
            scriptures: [
                { ref: 'Ephesians 4:26-27', text: 'In your anger do not sin. Do not let the sun go down while you are still angry.' },
                { ref: 'James 1:19-20', text: 'Everyone should be quick to listen, slow to speak and slow to become angry.' },
                { ref: 'Proverbs 15:1', text: 'A gentle answer turns away wrath, but a harsh word stirs up anger.' },
                { ref: 'Colossians 3:8', text: 'But now you must also rid yourselves of all such things as these: anger, rage, malice, slander.' }
            ],
            prayers: [
                'Lord, take this anger from me and replace it with peace.',
                'Father, help me forgive those who have hurt me.',
                'God, heal the wounds that cause my bitterness.'
            ]
        },
        fear: {
            name: '😨 Fear',
            description: 'Living in fear or feeling unsafe',
            scriptures: [
                { ref: '2 Timothy 1:7', text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.' },
                { ref: 'Isaiah 41:13', text: 'For I am the Lord your God who takes hold of your right hand and says to you, Do not fear; I will help you.' },
                { ref: 'Psalm 27:1', text: 'The Lord is my light and my salvation—whom shall I fear?' },
                { ref: 'Psalm 56:3', text: 'When I am afraid, I put my trust in you.' }
            ],
            prayers: [
                'Lord, replace my fear with faith in Your protection.',
                'Father, remind me that You are bigger than anything I face.',
                'God, help me walk in courage knowing You are with me.'
            ]
        }
    },
    
    isProfileSet: false,
    
    init: function() {
        this.loadProfile();
    },
    
    loadProfile: function() {
        const saved = localStorage.getItem('birdturds_personal_journey');
        if (saved) {
            this.profile = JSON.parse(saved);
            this.isProfileSet = this.profile.struggles.length > 0;
        }
    },
    
    saveProfile: function() {
        localStorage.setItem('birdturds_personal_journey', JSON.stringify(this.profile));
    },
    
    // First-time setup (opt-in)
    offerPersonalSetup: function() {
        const html = `
            <div class="journey-setup">
                <h2>🌟 Your Personal Journey</h2>
                
                <p class="setup-intro">
                    We'd love to support you personally. If you're comfortable sharing, 
                    let us know what you're going through so we can offer relevant 
                    scripture, prayers, and encouragement.
                </p>
                
                <p class="privacy-note">
                    🔒 <strong>100% Private</strong> - This stays on your device only. 
                    No one else will ever see it.
                </p>
                
                <div class="struggle-options">
                    <p>What are you struggling with? (Select any that apply)</p>
                    <div class="struggle-grid">
                        ${Object.entries(this.struggleCategories).map(([id, cat]) => `
                            <label class="struggle-checkbox">
                                <input type="checkbox" value="${id}" onchange="PersonalJourneySystem.toggleStruggle('${id}')">
                                <span>${cat.name}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="setup-actions">
                    <button class="setup-save" onclick="PersonalJourneySystem.saveSetup()">
                        Save & Continue
                    </button>
                    <button class="setup-skip" onclick="PersonalJourneySystem.closeJourney()">
                        Skip for now
                    </button>
                </div>
                
                <p class="setup-reassure">
                    You can change these anytime. God meets you where you are. 💛
                </p>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    toggleStruggle: function(id) {
        const idx = this.profile.struggles.indexOf(id);
        if (idx > -1) {
            this.profile.struggles.splice(idx, 1);
        } else {
            this.profile.struggles.push(id);
        }
    },
    
    saveSetup: function() {
        this.isProfileSet = this.profile.struggles.length > 0;
        this.saveProfile();
        
        if (this.isProfileSet) {
            this.showPersonalDashboard();
        } else {
            this.closeJourney();
        }
    },
    
    // Main dashboard with personalized content
    showPersonalDashboard: function() {
        if (!this.isProfileSet) {
            this.offerPersonalSetup();
            return;
        }
        
        // Get personalized scripture based on struggles
        const scripture = this.getPersonalizedScripture();
        const prayer = this.getPersonalizedPrayer();
        
        const html = `
            <div class="journey-dashboard">
                <div class="journey-header">
                    <h2>🌟 Your Journey</h2>
                    <button class="close-btn" onclick="PersonalJourneySystem.closeJourney()">✕</button>
                </div>
                
                <div class="today-word">
                    <h3>📖 Word for You Today</h3>
                    <div class="personal-scripture">
                        "${scripture.text}"
                        <span class="scripture-ref">- ${scripture.ref}</span>
                    </div>
                </div>
                
                <div class="today-prayer">
                    <h3>🙏 Prayer for Your Heart</h3>
                    <p class="personal-prayer">${prayer}</p>
                    <button class="pray-btn" onclick="PrayerSystem.offerPrayerMoment('personal')">
                        Pray This Now
                    </button>
                </div>
                
                <div class="journey-actions">
                    <button onclick="PersonalJourneySystem.showJournal()">
                        ✍️ Journal
                    </button>
                    <button onclick="PersonalJourneySystem.showVictories()">
                        🏆 Victories
                    </button>
                    <button onclick="PersonalJourneySystem.showResources()">
                        📚 Resources
                    </button>
                    <button onclick="PersonalJourneySystem.updateStruggles()">
                        ⚙️ Update
                    </button>
                </div>
                
                <div class="encouragement">
                    ${this.getEncouragement()}
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    getPersonalizedScripture: function() {
        // Collect all scriptures from user's struggle areas
        let allScriptures = [];
        this.profile.struggles.forEach(struggleId => {
            const cat = this.struggleCategories[struggleId];
            if (cat && cat.scriptures) {
                allScriptures = allScriptures.concat(cat.scriptures);
            }
        });
        
        if (allScriptures.length === 0) {
            // Default scripture
            return { 
                ref: 'Jeremiah 29:11', 
                text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' 
            };
        }
        
        // Return random scripture from their areas
        return allScriptures[Math.floor(Math.random() * allScriptures.length)];
    },
    
    getPersonalizedPrayer: function() {
        let allPrayers = [];
        this.profile.struggles.forEach(struggleId => {
            const cat = this.struggleCategories[struggleId];
            if (cat && cat.prayers) {
                allPrayers = allPrayers.concat(cat.prayers);
            }
        });
        
        if (allPrayers.length === 0) {
            return 'Lord, guide me today and fill me with Your peace.';
        }
        
        return allPrayers[Math.floor(Math.random() * allPrayers.length)];
    },
    
    getEncouragement: function() {
        const encouragements = [
            "God sees you, knows you, and loves you exactly where you are.",
            "Your struggles don't define you - God's love does.",
            "Every day is a new chance to experience God's grace.",
            "You're not alone in this. God is with you.",
            "Progress, not perfection. Keep going!",
            "The fact that you're here shows courage. Be proud of that.",
            "Your story isn't over. God is still writing it."
        ];
        
        return `<p class="daily-encouragement">"${encouragements[Math.floor(Math.random() * encouragements.length)]}"</p>`;
    },
    
    showJournal: function() {
        const entries = this.profile.journalEntries || [];
        
        const html = `
            <div class="journey-journal">
                <div class="journal-header">
                    <h2>✍️ Private Journal</h2>
                    <button onclick="PersonalJourneySystem.showPersonalDashboard()">← Back</button>
                </div>
                
                <div class="journal-prompt">
                    <p>Write whatever is on your heart. This is between you and God.</p>
                    <textarea id="journal-entry" placeholder="What's on your mind today?"></textarea>
                    <button onclick="PersonalJourneySystem.saveJournalEntry()">
                        💾 Save Entry (+25 pts)
                    </button>
                </div>
                
                <div class="journal-entries">
                    <h3>Past Entries</h3>
                    ${entries.length === 0 ? '<p class="no-entries">No entries yet. Start writing!</p>' : 
                        entries.slice(-10).reverse().map(e => `
                            <div class="journal-entry">
                                <span class="entry-date">${new Date(e.date).toLocaleDateString()}</span>
                                <p>${e.text.substring(0, 200)}${e.text.length > 200 ? '...' : ''}</p>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    saveJournalEntry: function() {
        const text = document.getElementById('journal-entry')?.value?.trim();
        if (!text || text.length < 10) {
            UIManager?.showMessage('Write at least 10 characters', 2000);
            return;
        }
        
        this.profile.journalEntries = this.profile.journalEntries || [];
        this.profile.journalEntries.push({
            date: new Date().toISOString(),
            text: text.substring(0, 1000)
        });
        
        // Keep last 50 entries
        if (this.profile.journalEntries.length > 50) {
            this.profile.journalEntries = this.profile.journalEntries.slice(-50);
        }
        
        this.saveProfile();
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(25, 'Journal Entry');
        }
        
        document.getElementById('journal-entry').value = '';
        UIManager?.showMessage('Journal saved! +25 pts', 2000);
        
        // Refresh view
        this.showJournal();
    },
    
    showVictories: function() {
        const victories = this.profile.victories || [];
        
        const html = `
            <div class="journey-victories">
                <div class="victories-header">
                    <h2>🏆 Your Victories</h2>
                    <button onclick="PersonalJourneySystem.showPersonalDashboard()">← Back</button>
                </div>
                
                <p class="victories-intro">
                    Celebrate the wins! No victory is too small. Write down when God 
                    helps you overcome, answers prayer, or you experience His goodness.
                </p>
                
                <div class="add-victory">
                    <textarea id="victory-entry" placeholder="What victory can you celebrate?"></textarea>
                    <button onclick="PersonalJourneySystem.saveVictory()">
                        🎉 Add Victory (+50 pts)
                    </button>
                </div>
                
                <div class="victory-list">
                    ${victories.length === 0 ? '<p class="no-victories">Record your first victory!</p>' :
                        victories.slice(-20).reverse().map(v => `
                            <div class="victory-item">
                                <span class="victory-date">${new Date(v.date).toLocaleDateString()}</span>
                                <p>🏆 ${v.text}</p>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    saveVictory: function() {
        const text = document.getElementById('victory-entry')?.value?.trim();
        if (!text || text.length < 5) {
            UIManager?.showMessage('Describe your victory!', 2000);
            return;
        }
        
        this.profile.victories = this.profile.victories || [];
        this.profile.victories.push({
            date: new Date().toISOString(),
            text: text.substring(0, 500)
        });
        
        this.saveProfile();
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(50, 'Victory Recorded!');
        }
        
        UIManager?.showMessage('Victory recorded! +50 pts 🎉', 2000);
        this.showVictories();
    },
    
    showResources: function() {
        const html = `
            <div class="journey-resources">
                <div class="resources-header">
                    <h2>📚 Resources for You</h2>
                    <button onclick="PersonalJourneySystem.showPersonalDashboard()">← Back</button>
                </div>
                
                <p>Based on what you're going through, here are some helpful resources:</p>
                
                <div class="resource-sections">
                    ${this.profile.struggles.map(struggleId => {
                        const cat = this.struggleCategories[struggleId];
                        if (!cat) return '';
                        return `
                            <div class="resource-section">
                                <h3>${cat.name}</h3>
                                <div class="resource-scriptures">
                                    ${cat.scriptures.slice(0, 3).map(s => `
                                        <div class="resource-verse">
                                            <strong>${s.ref}</strong>
                                            <p>${s.text}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                ${cat.helpNote ? `<p class="help-note">💙 ${cat.helpNote}</p>` : ''}
                                ${cat.note ? `<p class="resource-note">💡 ${cat.note}</p>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="hotlines">
                    <h3>🆘 Need More Help?</h3>
                    <p>If you're in crisis, please reach out:</p>
                    <ul>
                        <li><strong>National Suicide Prevention:</strong> 988</li>
                        <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                        <li><strong>SAMHSA Helpline:</strong> 1-800-662-4357</li>
                    </ul>
                    <p class="hotline-note">You matter. Help is available. 💛</p>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    updateStruggles: function() {
        this.offerPersonalSetup();
    },
    
    // Called during gameplay to offer relevant support
    offerContextualSupport: function(context) {
        // Don't interrupt - just note for later
        if (!this.isProfileSet) return;
        
        // Could show subtle encouragement based on context
        // e.g., if player is struggling in game and has "anxiety" in profile
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('journey-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'journey-overlay';
            overlay.className = 'journey-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeJourney: function() {
        const overlay = document.getElementById('journey-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const journeyStyles = `
<style>
.journey-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 20000;
    overflow-y: auto;
    padding: 20px;
}
.journey-setup, .journey-dashboard, .journey-journal, .journey-victories, .journey-resources {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.journey-setup h2, .journey-dashboard h2 { color: #ffd700; text-align: center; }
.setup-intro { text-align: center; margin: 20px 0; line-height: 1.6; }
.privacy-note {
    background: rgba(78,205,196,0.2);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    margin: 20px 0;
}
.struggle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin: 20px 0;
}
.struggle-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
}
.struggle-checkbox:hover {
    background: rgba(255,255,255,0.2);
}
.struggle-checkbox input:checked + span {
    color: #4ecdc4;
}
.setup-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 25px 0;
}
.setup-save {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    color: white;
    font-size: 1.1em;
    cursor: pointer;
}
.setup-skip {
    background: none;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 15px 30px;
    border-radius: 25px;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
}
.setup-reassure {
    text-align: center;
    color: rgba(255,255,255,0.6);
    font-size: 0.9em;
}
.journey-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}
.today-word, .today-prayer {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
}
.today-word h3, .today-prayer h3 {
    color: #ffd700;
    margin-bottom: 15px;
}
.personal-scripture {
    font-size: 1.2em;
    line-height: 1.6;
    font-style: italic;
}
.scripture-ref {
    display: block;
    margin-top: 10px;
    color: rgba(255,255,255,0.6);
    font-style: normal;
}
.personal-prayer {
    font-size: 1.1em;
    line-height: 1.5;
}
.pray-btn {
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    border: none;
    padding: 10px 25px;
    border-radius: 20px;
    color: #1a1a2e;
    cursor: pointer;
    margin-top: 15px;
}
.journey-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px 0;
}
.journey-actions button {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 15px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}
.journey-actions button:hover {
    background: rgba(255,255,255,0.2);
    border-color: #4ecdc4;
}
.daily-encouragement {
    text-align: center;
    color: #4ecdc4;
    font-style: italic;
    margin-top: 20px;
    padding: 15px;
    background: rgba(78,205,196,0.1);
    border-radius: 10px;
}
.journal-prompt textarea, .add-victory textarea {
    width: 100%;
    height: 100px;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
    color: white;
    resize: none;
    margin: 15px 0;
}
.journal-entry, .victory-item {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
}
.entry-date, .victory-date {
    color: rgba(255,255,255,0.5);
    font-size: 0.85em;
}
.resource-section {
    background: rgba(255,255,255,0.05);
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
}
.resource-section h3 { color: #ffd700; }
.resource-verse {
    margin: 15px 0;
    padding: 10px;
    background: rgba(255,255,200,0.1);
    border-radius: 10px;
}
.help-note {
    background: rgba(78,205,196,0.2);
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
}
.hotlines {
    background: rgba(255,107,107,0.1);
    border: 1px solid rgba(255,107,107,0.3);
    border-radius: 15px;
    padding: 20px;
    margin-top: 25px;
}
.hotlines h3 { color: #ff6b6b; }
.hotlines ul {
    list-style: none;
    margin: 15px 0;
}
.hotlines li {
    padding: 8px 0;
}
.hotline-note {
    text-align: center;
    color: #ffd700;
    margin-top: 15px;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', journeyStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = PersonalJourneySystem;
}

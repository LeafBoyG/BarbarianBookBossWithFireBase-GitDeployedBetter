document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const enums = {
        views: { LOG: 'log', STATS: 'stats', JOURNEY: 'journey', ATTRIBUTES: 'attributes', FEATS: 'feats', BOUNTIES: 'bounties', CLANS: 'clans' },
        attributes: { STRENGTH: 'strength', INTELLECT: 'intellect', WISDOM: 'wisdom', CHARISMA: 'charisma' },
        questStatus: { ACTIVE: 'active', CONQUERED: 'conquered', ABANDONED: 'abandoned' }
    };

    const BARB_ISMS = {
        "Grizzled Veteran": {
            welcome: ["Hmph. Another twig-arm. Ready for words or just to be food for worms?"], book_completed: ["You crushed that book! Next!"], general_encouragement: ["Good. Keep at it. Don't let your mind get soft."], charmed_encouragement: ["Your progress is... acceptable. Continue.", "Hmph. Not bad. For a book-worm."], saving_data: ["Recording your deeds..."], quest_accepted: ["A new challenge! Do not fail me, whelp."], quest_surrendered: ["You flee?! Cowards have no place in my war-band!"], quest_undone: ["Hah! The tome returns from the grave!"], error_undo: ["Finish your current battle before starting another!"], error_page_count: ["YOU CANNOT READ MORE PAGES THAN EXIST, FOOL!"], error: ["Fool! Not like that!"], auth_errors: { "auth/invalid-email": "EMAIL BAD! NOT A REAL EMAIL, FOOL!", "auth/user-not-found": "NO WARRIOR WITH THAT EMAIL! SIGN UP, MAYBE?", "auth/wrong-password": "PASSWORD WRONG! TRY AGAIN, OR BRAIN SMASH!", "auth/email-already-in-use": "EMAIL TAKEN! ANOTHER WARRIOR GOT IT! USE ANOTHER!", "auth/weak-password": "PASSWORD WEAK! NEED 6+ CHARACTERS! BE STRONGER!", "default": "AUTH FAILED!" }
        }
    };
    const BARB_IMAGE_PATH = 'assets/Barbs/';
    const FEATS_LIST = { page_pounder: { name: "Page Pounder", description: "Read 50 pages in a single day." }, saga_smasher: { name: "Saga Smasher", description: "Conquer 3 books." }, epic_explorer: { name: "Epic Explorer", description: "Conquer a book over 500 pages long." }, librarians_bane: { name: "Librarian's Bane", description: "Conquer 10 books." }, genre_master_fantasy: { name: "Fantasy Realm Master", description: "Conquer 5 fantasy books." }, genre_master_scifi: { name: "Starship Captain", description: "Conquer 5 Science Fiction books." } };
    const PERKS_LIST = {
        strength: [ { id: 'str_perk_5a', name: 'Tome Hauler', description: 'Gain a permanent 5% bonus to all Strength XP earned from reading pages.', requiredLevel: 5 }, { id: 'str_perk_5b', name: 'Finishing Blow', description: 'Gain a flat +50 bonus to Strength XP each time you conquer a book.', requiredLevel: 5 }, { id: 'str_perk_10a', name: 'Warrior\'s Stamina', description: 'The first 25 pages you read each day grant 1.5x Strength XP.', requiredLevel: 10 }, { id: 'str_perk_10b', name: 'Unstoppable Force', description: 'Gain 10 bonus Strength XP for each day of your current reading streak.', requiredLevel: 10 }, { id: 'str_perk_15a', name: 'Literary Crusher', description: 'Gain a permanent +10% to Strength XP from all sources.', requiredLevel: 15 }, { id: 'str_perk_15b', name: 'Epic Strength', description: 'Double the Strength XP gained from conquering books over 500 pages.', requiredLevel: 15 }, { id: 'str_perk_20a', name: 'Master of the Grind', description: 'The bonus from the "Tome Hauler" perk is doubled to 10%.', requiredLevel: 20 }, { id: 'str_perk_20b', name: 'Unending Power', description: 'Reading streaks no longer reset; they only pause after 3 days of inactivity.', requiredLevel: 20 } ],
        intellect: [ { id: 'int_perk_5a', name: 'Polymath', description: 'Gain a 10% bonus to the flat XP reward for conquering a book in a new genre.', requiredLevel: 5 }, { id: 'int_perk_5b', name: 'Quick Study', description: 'The first 10 pages you read each day grant double Strength XP.', requiredLevel: 5 }, { id: 'int_perk_10a', name: 'Librarian\'s Scorn', description: 'Gain a flat +150 Intellect XP for conquering any Non-Fiction book.', requiredLevel: 10 }, { id: 'int_perk_10b', name: 'Genre Dabbler', description: 'Gain a flat +100 Intellect XP for every 3 unique genres you conquer.', requiredLevel: 10 }, { id: 'int_perk_15a', name: 'Scholarly Pursuit', description: 'The XP bonus from the "Polymath" perk is doubled to 20%.', requiredLevel: 15 }, { id: 'int_perk_15b', name: 'Deep Thinker', description: 'Unlocking any Feat now also grants a bonus of 300 Intellect XP.', requiredLevel: 15 }, { id: 'int_perk_20a', name: 'Master Linguist', description: 'Gain a permanent +10% to Intellect XP from all sources.', requiredLevel: 20 }, { id: 'int_perk_20b', name: 'Encyclopedic Knowledge', description: 'The flat XP bonus for conquering a book in a new genre is permanently tripled.', requiredLevel: 20 } ],
        wisdom: [ { id: 'wis_perk_5a', name: 'Sage Advice', description: 'Gain a 10% bonus to Wisdom XP when conquering epic tomes (500+ pages).', requiredLevel: 5 }, { id: 'wis_perk_5b', name: 'Patient Scholar', description: 'Gain 25 bonus Wisdom XP on any day you read at least one page.', requiredLevel: 5 }, { id: 'wis_perk_10a', name: 'Meditative Reading', description: 'Gain a small amount of Wisdom XP for every day you maintain a reading streak.', requiredLevel: 10 }, { id: 'wis_perk_10b', name: 'Focused Mind', description: 'If you only log pages for a single book for 7 consecutive days, gain a +500 Wisdom XP bonus.', requiredLevel: 10 }, { id: 'wis_perk_15a', name: 'Ancient Knowledge', description: 'The bonus XP from the "Sage Advice" perk is doubled to 20%.', requiredLevel: 15 }, { id: 'wis_perk_15b', name: 'Marathon Runner', description: 'Conquering any book over 1000 pages instantly grants one free Perk Point.', requiredLevel: 15 }, { id: 'wis_perk_20a', name: 'Oracle', description: 'Gain a permanent +10% to Wisdom XP from all sources.', requiredLevel: 20 }, { id: 'wis_perk_20b', name: 'Timeless Wisdom', description: 'The daily Wisdom XP bonus from "Patient Scholar" is tripled.', requiredLevel: 20 } ],
        charisma: [ { id: 'cha_perk_1a', name: 'Silver Tongue', description: 'The Barbarian is permanently charmed and will always use his more encouraging dialogue.', requiredLevel: 5 }, { id: 'cha_perk_1b', name: 'Inspiring Tales', description: 'Gain +50 bonus Charisma XP when you conquer a book from the Fantasy or Romance genres.', requiredLevel: 5 }, { id: 'cha_perk_10a', name: 'Bardic Knowledge', description: 'Gain a small amount of Charisma XP when you unlock any Feat.', requiredLevel: 10 }, { id: 'cha_perk_10b', name: 'Gift of Gab', description: 'The Barbarian\'s dialogue when you spend a Perk Point is unique and highly congratulatory.', requiredLevel: 10 }, { id: 'cha_perk_15a', name: 'Beloved Leader', description: 'The bonus XP from the "Inspiring Tales" perk is doubled.', requiredLevel: 15 }, { id: 'cha_perk_15b', name: 'Diplomat', description: 'Gain a flat +200 Charisma XP for conquering a book from the "Non-Fiction" or "History" genres.', requiredLevel: 15 }, { id: 'cha_perk_20a', name: 'Legendary Presence', description: 'Gain a permanent +10% to Charisma XP from all sources.', requiredLevel: 20 }, { id: 'cha_perk_20b', name: 'Ultimate Charm', description: 'The "Silver Tongue" perk now gives a 5% chance for the Barbarian to grant you a bonus Perk Point when any attribute levels up.', requiredLevel: 20 } ]
    };
    const BOUNTY_LIST = { weekly_pages: { id: 'weekly_pages', title: 'Weekly Page-Slayer', description: 'Read 500 pages within 7 days.', target: 500, reward: 750, type: 'pages' }, monthly_conqueror: { id: 'monthly_conqueror', title: 'Monthly Conqueror', description: 'Conquer 4 books in a single month.', target: 4, reward: 1500, type: 'books' } };
    const CLAN_BOUNTIES_LIST = {
        epic_grind: { id: 'epic_grind', title: 'The Epic Grind', description: 'As a clan, conquer 3 books over 500 pages long.', target: 3, reward: { perkPoints: 1 }, type: 'epic_books' },
        genre_warfare: { id: 'genre_warfare', title: 'Genre Warfare', description: 'As a clan, conquer 5 Fantasy and 5 Sci-Fi books.', target: 10, reward: { xp: 2000 }, type: 'multi_genre' },
        page_massacre: { id: 'page_massacre', title: 'Page Massacre', description: 'As a clan, read a total of 10,000 pages.', target: 10000, reward: { perkPoints: 1 }, type: 'total_pages' }
    };
    
    const UI = {
        mainView: document.querySelector('.game-ui-layout'),
        statsView: document.getElementById('statsPage'),
        journeyView: document.getElementById('journeyPage'),
        attributesView: document.getElementById('attributesPage'),
        featsView: document.getElementById('featsPage'),
        bountiesView: document.getElementById('bountiesPage'),
        clansView: document.getElementById('clansPage'),
        nav: {
            readingLog: document.getElementById('readingLogNav'), attributes: document.getElementById('attributesNav'), feats: document.getElementById('featsNav'), stats: document.getElementById('statsNav'), journey: document.getElementById('journeyNav'), bounties: document.getElementById('bountiesNav'), clans: document.getElementById('clansNav'),
            hamburgerMenu: document.getElementById('hamburgerMenu'), linksContainer: document.getElementById('navLinksContainer'), menuOverlay: document.getElementById('menuOverlay')
        },
        clans: { noClanView: document.getElementById('noClanView'), memberView: document.getElementById('clanMemberView'), nameInput: document.getElementById('clanNameInput'), createBtn: document.getElementById('createClanBtn'), list: document.getElementById('clanList'), bannerName: document.getElementById('clanNameBanner'), bannerMotto: document.getElementById('clanMottoBanner'), statsPanel: document.getElementById('clanStatsPanel'), bountyPanel: document.getElementById('clanBountyPanel'), roster: document.getElementById('clanRoster'), leaderboard: document.getElementById('clanLeaderboard'), adminBtn: document.getElementById('clanAdminBtn'), leaveBtn: document.getElementById('leaveClanBtn'), },
        clanAdminModal: { modal: document.getElementById('clanAdminModal'), nameInput: document.getElementById('editClanNameInput'), mottoInput: document.getElementById('editClanMottoInput'), saveBtn: document.getElementById('saveClanChangesBtn'), cancelBtn: document.getElementById('cancelClanChangesBtn'), },
        bounties: { grid: document.getElementById('bountiesGrid'), },
        attributes: { perkPointsDisplay: document.getElementById('perkPointsDisplay'), perksSection: document.getElementById('perksSection'), strength: { level: document.getElementById('attrStrengthLevel'), xpFill: document.getElementById('attrStrengthXpFill'), xpText: document.getElementById('attrStrengthXpText'), perksContainer: document.getElementById('strengthPerksContainer') }, intellect: { level: document.getElementById('attrIntellectLevel'), xpFill: document.getElementById('attrIntellectXpFill'), xpText: document.getElementById('attrIntellectXpText'), perksContainer: document.getElementById('intellectPerksContainer') }, wisdom: { level: document.getElementById('attrWisdomLevel'), xpFill: document.getElementById('attrWisdomXpFill'), xpText: document.getElementById('attrWisdomXpText'), perksContainer: document.getElementById('wisdomPerksContainer') }, charisma: { level: document.getElementById('attrCharismaLevel'), xpFill: document.getElementById('attrCharismaXpFill'), xpText: document.getElementById('attrCharismaXpText'), perksContainer: document.getElementById('charismaPerksContainer') }, },
        editQuest: { btn: document.getElementById('editQuestBtn'), modal: document.getElementById('editQuestModal'), titleInput: document.getElementById('editBookTitleInput'), authorInput: document.getElementById('editBookAuthorInput'), genreSelect: document.getElementById('editBookGenreSelect'), customGenreInput: document.getElementById('editCustomGenreInput'), totalPagesInput: document.getElementById('editBookTotalPagesInput'), saveBtn: document.getElementById('saveQuestChangesBtn'), cancelBtn: document.getElementById('cancelEditQuestBtn'), },
        feats: { grid: document.getElementById('featsGrid'), },
        journey: { container: document.getElementById('timelineContainer'), filters: document.querySelector('.timeline-filters'), },
        stats: { totalBooks: document.getElementById('statsTotalBooks'), totalPages: document.getElementById('statsTotalPages'), mightiestBook: document.getElementById('statsMightiestBook'), mightiestBookPages: document.getElementById('statsMightiestBookPages'), favGenre: document.getElementById('statsFavGenre'), },
        barb: { image: document.getElementById('bossBarbImage'), dialogue: document.getElementById('bossBarbDialogue').querySelector('.dialogue-text'), },
        player: { level: document.getElementById('playerLevel'), xpBarFill: document.getElementById('xpBarFill'), },
        activeQuest: { display: document.getElementById('activeQuestDisplay'), title: document.getElementById('activeBookTitle'), author: document.getElementById('activeBookAuthor'), progressBar: document.getElementById('questProgressBar'), progressText: document.getElementById('questProgressText'), pagesReadInput: document.getElementById('pagesReadInput'), logPagesBtn: document.getElementById('logPagesBtn'), conquerBtn: document.getElementById('conquerBookBtn'), surrenderBtn: document.getElementById('surrenderQuestBtn'), },
        newQuest: { display: document.getElementById('noActiveQuestDisplay'), form: document.getElementById('newQuestForm'), creatorSection: document.getElementById('quest-creator-section'), titleInput: document.getElementById('bookTitleInput'), authorInput: document.getElementById('bookAuthorInput'), genreSelect: document.getElementById('bookGenreSelect'), customGenreInput: document.getElementById('customGenreInput'), totalPagesInput: document.getElementById('bookTotalPagesInput'), startBtn: document.getElementById('startNewQuestBtn'), addBtn: document.getElementById('addBookBtn'), cancelBtn: document.getElementById('cancelAddBookBtn'), },
        completed: { list: document.getElementById('completedBooksList'), },
        auth: { userName: document.getElementById('userName'), btn: document.getElementById('authBtn'), form: document.getElementById('authForm'), emailInput: document.getElementById('authEmail'), usernameInput: document.getElementById('authUsername'), passwordInput: document.getElementById('authPassword'), loginBtn: document.getElementById('loginBtn'), signupBtn: document.getElementById('signupBtn'), cancelBtn: document.getElementById('cancelAuthBtn'), errorMessage: document.getElementById('authErrorMessage'), },
        sounds: { click: document.getElementById('soundClick'), pageTurn: document.getElementById('soundPageTurn'), questComplete: document.getElementById('soundQuestComplete'), questStart: document.getElementById('soundQuestStart'), error: document.getElementById('soundError'), }
    };
    
    let userData = {};
    let currentUser = null;
    let idleTimeout;
    let currentJourneyFilter = 'all';
    const defaultUserData = { perkPoints: 0, unlockedPerks: [], activeQuest: null, completedQuests: [], archivedQuests: [], feats: {}, pagesReadToday: 0, attributes: { strength: { level: 1, xp: 0 }, intellect: { level: 1, xp: 0 }, wisdom: { level: 1, xp: 0 }, charisma: { level: 1, xp: 0 } }, conqueredGenres: [], bounties: {}, clanId: null, clanName: null, lastLoginDate: new Date().toDateString() };

    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const playSound = (soundElement) => { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.error("Sound playback failed:", e)); } }
    const isCurrentUser = (id) => currentUser && currentUser.uid === id;

    function updateBarbarian(state, message = null) {
        clearTimeout(idleTimeout);
        const imageMap = { 'pleased': 'NormalBarb.webp', 'angry': 'AngryBarb.webp', 'celebrate': 'CelebratingBarb.webp', 'idle': 'NormalBarb.webp' };
        UI.barb.image.src = BARB_IMAGE_PATH + (imageMap[state] || 'NormalBarb.webp');
        if (message) { UI.barb.dialogue.innerHTML = message.replace(/\n/g, '<br>'); }
        if (state !== 'idle') { idleTimeout = setTimeout(() => { UI.barb.image.src = BARB_IMAGE_PATH + 'NormalBarb.webp'; }, 5000); }
    }

    const getXpForNextLevel = (currentLevel) => Math.floor(100 * Math.pow(currentLevel, 1.5));
    const getOverallLevel = (userObject = userData) => {
        if (!userObject.attributes) return 1;
        const { strength, intellect, wisdom, charisma } = userObject.attributes;
        return Math.floor((strength.level + intellect.level + wisdom.level + charisma.level) / 4);
    }
    
    const VIEWS = {
        [enums.views.LOG]: { element: UI.mainView, nav: UI.nav.readingLog, renderFunc: null },
        [enums.views.STATS]: { element: UI.statsView, nav: UI.nav.stats, renderFunc: renderStatsPage },
        [enums.views.JOURNEY]: { element: UI.journeyView, nav: UI.nav.journey, renderFunc: renderJourneyPage },
        [enums.views.ATTRIBUTES]: { element: UI.attributesView, nav: UI.nav.attributes, renderFunc: renderAttributesPage },
        [enums.views.FEATS]: { element: UI.featsView, nav: UI.nav.feats, renderFunc: renderFeatsPage },
        [enums.views.BOUNTIES]: { element: UI.bountiesView, nav: UI.nav.bounties, renderFunc: renderBountiesPage },
        [enums.views.CLANS]: { element: UI.clansView, nav: UI.nav.clans, renderFunc: renderClansPage },
    };

    function switchView(viewToShow) {
        Object.values(VIEWS).forEach(view => {
            view.element.classList.add('hidden');
            if(view.nav) view.nav.classList.remove('active');
        });
        const targetView = VIEWS[viewToShow] || VIEWS[enums.views.LOG];
        targetView.element.classList.remove('hidden');
        if(targetView.nav) targetView.nav.classList.add('active');
        if (targetView.renderFunc) targetView.renderFunc();
    }

    async function renderClansPage() {
        if (!userData || !currentUser) return;
        const inClan = !!userData.clanId;
        UI.clans.noClanView.classList.toggle('hidden', inClan);
        UI.clans.memberView.classList.toggle('hidden', !inClan);
        if (inClan) {
            try {
                const clanRef = db.collection('clans').doc(userData.clanId);
                let clanDoc = await clanRef.get();
                if (!clanDoc.exists) { return handleLeaveClan(false); }
                let clanData = clanDoc.data();
                if (!clanData.activeBounty) {
                    const bountyKeys = Object.keys(CLAN_BOUNTIES_LIST);
                    const newBountyId = randomChoice(bountyKeys);
                    const newBounty = { bountyId: newBountyId, progress: 0, startDate: new Date().toISOString() };
                    await clanRef.update({ activeBounty: newBounty });
                    clanData.activeBounty = newBounty;
                }
                const isLeader = isCurrentUser(clanData.leaderId);
                UI.clans.bannerName.textContent = clanData.name;
                UI.clans.bannerMotto.textContent = clanData.motto || "No motto set.";
                UI.clans.adminBtn.classList.toggle('hidden', !isLeader);
                const memberPromises = clanData.memberIds.map(id => db.collection('users').doc(id).get());
                const memberDocs = await Promise.all(memberPromises);
                const members = memberDocs.map(doc => ({ id: doc.id, ...doc.data() }));
                let totalBooks = members.reduce((sum, m) => sum + (m.completedQuests?.length || 0), 0);
                let totalPages = members.reduce((sum, m) => sum + (m.completedQuests?.reduce((pSum, q) => pSum + q.totalPages, 0) || 0), 0);
                UI.clans.statsPanel.innerHTML = `<div class="clan-stat"><h4>Members</h4><p>${clanData.memberIds.length}</p></div><div class="clan-stat"><h4>Total Books</h4><p>${totalBooks.toLocaleString()}</p></div><div class="clan-stat"><h4>Total Pages</h4><p>${totalPages.toLocaleString()}</p></div>`;
                UI.clans.roster.innerHTML = members.map(member => `<li class="clan-roster-item"><div class="roster-item-name">${member.displayName || member.id.substring(0,8)}${member.id === clanData.leaderId ? '<span class="leader-badge">★</span>' : ''}</div><div class="roster-item-stats">Lvl ${getOverallLevel(member)}${isLeader && !isCurrentUser(member.id) ? `<button class="kick-btn" data-kick-id="${member.id}" title="Kick Member">✖</button>` : ''}</div></li>`).join('');
                const sortedByBooks = [...members].sort((a, b) => (b.completedQuests?.length || 0) - (a.completedQuests?.length || 0));
                const sortedByPages = [...members].sort((a, b) => (b.completedQuests?.reduce((s,q)=>s+q.totalPages,0)||0) - (a.completedQuests?.reduce((s,q)=>s+q.totalPages,0)||0));
                UI.clans.leaderboard.innerHTML = `<h4>Total Books Conquered</h4><ul class="clan-leaderboard-list">${sortedByBooks.slice(0, 3).map(m => `<li class="clan-leaderboard-item"><span class="leaderboard-item-name">${m.displayName || m.id.substring(0,8)}</span><span class="leaderboard-item-score">${(m.completedQuests?.length || 0).toLocaleString()} books</span></li>`).join('')}</ul><h4>Total Pages Read</h4><ul class="clan-leaderboard-list">${sortedByPages.slice(0, 3).map(m => `<li class="clan-leaderboard-item"><span class="leaderboard-item-name">${m.displayName || m.id.substring(0,8)}</span><span class="leaderboard-item-score">${(m.completedQuests?.reduce((s,q)=>s+q.totalPages,0)||0).toLocaleString()} pages</span></li>`).join('')}</ul>`;
                const activeBounty = clanData.activeBounty;
                if (activeBounty && CLAN_BOUNTIES_LIST[activeBounty.bountyId]) {
                    const bountyDef = CLAN_BOUNTIES_LIST[activeBounty.bountyId];
                    const percentage = (activeBounty.progress / bountyDef.target) * 100;
                    UI.clans.bountyPanel.innerHTML = `<h4>${bountyDef.title}</h4><p>${bountyDef.description}</p><div class="progress-bar-container"><div class="progress-bar"><div class="progress-bar-fill" style="width: ${percentage}%;"></div></div><div class="progress-bar-text">${activeBounty.progress.toLocaleString()} / ${bountyDef.target.toLocaleString()}</div></div><div class="bounty-reward">Reward: ${bountyDef.reward.perkPoints ? `${bountyDef.reward.perkPoints} Perk Point(s)` : `${bountyDef.reward.xp} XP`} for all members</div>`;
                } else { UI.clans.bountyPanel.innerHTML = `<p>A new bounty will be assigned soon!</p>`; }
            } catch (error) { console.error("Error rendering clan page:", error); }
        } else {
            try {
                const clansSnapshot = await db.collection('clans').orderBy('name').limit(20).get();
                UI.clans.list.innerHTML = clansSnapshot.empty ? '<li class="clan-list-item-placeholder">No war-bands have been founded yet.</li>' : clansSnapshot.docs.map(doc => { const clan = doc.data(); return `<li class="clan-list-item"><div class="clan-info"><div class="name">${clan.name}</div><div class="members">${clan.memberIds.length} member(s)</div></div><button class="join-btn" data-clan-id="${doc.id}" data-clan-name="${clan.name}">Join</button></li>`; }).join('');
            } catch (error) { console.error("Error fetching clans:", error); }
        }
    }
    
    function renderBountiesPage() {
        if (!userData) return;
        UI.bounties.grid.innerHTML = '';
        for (const bountyId in BOUNTY_LIST) {
            const bountyDef = BOUNTY_LIST[bountyId];
            const activeBounty = userData.bounties[bountyId];
            const card = document.createElement('div');
            card.classList.add('ui-card', 'bounty-card');
            let content = `<h3>${bountyDef.title}</h3><p>${bountyDef.description}</p>`;
            if (activeBounty) {
                card.classList.add('in-progress');
                const progress = activeBounty.progress || 0;
                const percentage = (progress / bountyDef.target) * 100;
                content += `<div class="progress-bar-container"><div class="progress-bar"><div class="progress-bar-fill" style="width: ${percentage}%;"></div></div><div class="progress-bar-text">${progress} / ${bountyDef.target}</div></div><div class="bounty-reward">Reward: ${bountyDef.reward} XP</div>`;
            } else {
                content += `<div class="bounty-reward">Reward: ${bountyDef.reward} XP</div><button class="accept-bounty-btn" data-bounty-id="${bountyId}">Accept Bounty</button>`;
            }
            card.innerHTML = content;
            UI.bounties.grid.appendChild(card);
        }
    }

    function renderStatsPage() {
        if (!userData || !userData.completedQuests) return;
        const stats = calculateStats();
        UI.stats.totalBooks.textContent = stats.totalBooks;
        UI.stats.totalPages.textContent = stats.totalPages.toLocaleString();
        UI.stats.mightiestBook.textContent = stats.mightiestBook;
        UI.stats.mightiestBookPages.textContent = stats.mightiestBookPages > 0 ? `${stats.mightiestBookPages.toLocaleString()} pages` : '';
        UI.stats.favGenre.textContent = stats.favGenre;
        UI.stats.favGenre.style.textTransform = 'capitalize';
    }

    function renderJourneyPage() {
        if (!userData) return;
        const allEvents = [...(userData.completedQuests || []), ...(userData.archivedQuests || [])];
        const filteredEvents = allEvents.filter(quest => currentJourneyFilter === 'all' || quest.status === currentJourneyFilter);
        if (filteredEvents.length === 0) {
            UI.journey.container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">No entries found for this filter.</p>`;
            return;
        }
        const parseDate = (quest) => { const ds = quest.dateConquered || quest.dateAbandoned; return ds ? new Date(ds.split('/').reverse().join('-')) : new Date(0); };
        filteredEvents.sort((a, b) => parseDate(b) - parseDate(a));
        let lastMonth = null;
        UI.journey.container.innerHTML = filteredEvents.map(quest => {
            let html = '';
            const eventDate = parseDate(quest);
            const eventMonth = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (eventMonth !== lastMonth) {
                html += `<div class="timeline-divider"><span>— ${eventMonth} —</span></div>`;
                lastMonth = eventMonth;
            }
            const isConquered = quest.status === enums.questStatus.CONQUERED;
            html += `<div class="timeline-entry"><div class="timeline-card"><h3>${quest.title}</h3><p>${quest.author||'Unknown'}</p><p>${isConquered ? quest.totalPages : `Read ${quest.currentPage} of ${quest.totalPages}`} pages</p><p>From ${quest.dateStarted} to ${quest.dateConquered||quest.dateAbandoned}</p><div class="status-badge ${isConquered ? 'status-conquered':'status-abandoned'}">${isConquered ? 'Conquered':'Abandoned'}</div></div></div>`;
            return html;
        }).join('');
    }

    function renderAttributesPage() {
        if (!userData || !userData.attributes) return;
        UI.attributes.perkPointsDisplay.textContent = userData.perkPoints || 0;
        Object.entries(userData.attributes).forEach(([attrKey, attrData]) => {
            const attrUI = UI.attributes[attrKey];
            if (attrUI) {
                const xpNext = getXpForNextLevel(attrData.level);
                attrUI.level.textContent = attrData.level;
                attrUI.xpText.textContent = `${attrData.xp} / ${xpNext} XP`;
                attrUI.xpFill.style.width = `${(attrData.xp / xpNext) * 100}%`;
            }
        });
        renderPerks();
    }
    
    function renderFeatsPage() {
        if (!userData) return;
        UI.feats.grid.innerHTML = '';
        for (const featId in FEATS_LIST) {
            const feat = FEATS_LIST[featId];
            const unlockDate = userData.feats[featId];
            const featCard = document.createElement('div');
            featCard.classList.add('ui-card', 'feat-card', unlockDate ? 'unlocked' : 'locked');
            featCard.innerHTML = `<div class="feat-name">${feat.name}</div><div class="feat-description">${feat.description}</div>${unlockDate ? `<div class="feat-unlocked-date">Unlocked: ${unlockDate}</div>` : ''}`;
            UI.feats.grid.appendChild(featCard);
        }
    }
    
    function renderPerks() {
        if (!userData) return;
        Object.entries(PERKS_LIST).forEach(([attrKey, attrPerks]) => {
            const container = UI.attributes[attrKey].perksContainer;
            container.innerHTML = attrPerks.map(perk => {
                const isUnlocked = userData.unlockedPerks.includes(perk.id);
                const canAfford = (userData.perkPoints || 0) > 0;
                const meetsLevel = userData.attributes[attrKey].level >= perk.requiredLevel;
                let stateClass = isUnlocked ? 'unlocked' : (canAfford && meetsLevel ? 'available' : 'locked');
                return `<div class="ui-card perk-card ${stateClass}" data-perk-id="${perk.id}" data-attribute="${attrKey}">
                    <div class="perk-name">${perk.name}</div>
                    <div class="perk-description">${perk.description}</div>
                    <div class="perk-requirement">Requires ${attrKey.toUpperCase()} Level ${perk.requiredLevel}</div>
                    ${isUnlocked ? '<div class="perk-unlocked-text">UNLOCKED</div>' : ''}
                </div>`;
            }).join('');
        });
    }

    function calculateStats() {
        const stats = { totalBooks: 0, totalPages: 0, mightiestBook: 'None Conquered', mightiestBookPages: 0, favGenre: 'N/A' };
        const completed = userData.completedQuests;
        if (!completed || completed.length === 0) return stats;
        stats.totalBooks = completed.length;
        const genreCounts = {};
        completed.forEach(quest => {
            stats.totalPages += quest.totalPages;
            if (quest.totalPages > stats.mightiestBookPages) {
                stats.mightiestBookPages = quest.totalPages;
                stats.mightiestBook = quest.title;
            }
            if (quest.genre) { genreCounts[quest.genre.toLowerCase()] = (genreCounts[quest.genre.toLowerCase()] || 0) + 1; }
        });
        if (Object.keys(genreCounts).length > 0) { stats.favGenre = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b); }
        return stats;
    }

    function renderUI() {
        if (!currentUser) return;
        UI.player.level.textContent = getOverallLevel();
        let totalXpPercentage = 0;
        const attrs = Object.values(userData.attributes);
        attrs.forEach(attr => { totalXpPercentage += (attr.xp / getXpForNextLevel(attr.level)) * 100; });
        UI.player.xpBarFill.style.width = `${totalXpPercentage / attrs.length}%`;
        const hasActiveQuest = !!userData.activeQuest;
        UI.activeQuest.display.classList.toggle('hidden', !hasActiveQuest);
        UI.newQuest.creatorSection.classList.toggle('hidden', hasActiveQuest);
        if (hasActiveQuest) { renderActiveQuest(); } else { handleHideNewQuestForm(false); }
        renderCompletedQuests();
    }
    
    function renderActiveQuest() {
        const quest = userData.activeQuest;
        if (!quest) return;
        UI.activeQuest.title.textContent = quest.title;
        UI.activeQuest.author.textContent = quest.author ? `by ${quest.author}` : '';
        UI.activeQuest.progressBar.style.width = `${Math.min((quest.currentPage / quest.totalPages) * 100, 100)}%`;
        UI.activeQuest.progressText.textContent = `${quest.currentPage} / ${quest.totalPages} pages`;
    }

    function renderCompletedQuests() {
        const completed = userData.completedQuests || [];
        UI.completed.list.innerHTML = completed.length === 0 ? '<li>The Hall is empty. Go conquer some books!</li>' : [...completed].reverse().map(quest => `<li><span>${quest.title}</span> - Conquered on ${quest.dateConquered}<button class="undo-btn" data-id="${quest.id}" aria-label="Undo Conquest" title="Undo Conquest">↶</button></li>`).join('');
    }

    function calculateXpForQuest(quest) {
        const xpGains = { strength: 0, intellect: 0, wisdom: 0, charisma: 0 };
        if (!quest) return xpGains;
        const hasPerk = (id) => userData.unlockedPerks.includes(id);
        xpGains.wisdom += Math.floor(quest.totalPages / 2);
        if (hasPerk('str_perk_5b')) xpGains.strength += 50;
        if (quest.totalPages >= 500 && hasPerk('str_perk_15b')) xpGains.strength += xpGains.wisdom;
        const genreLower = quest.genre.toLowerCase();
        if (!userData.conqueredGenres.includes(genreLower)) {
            let bonus = hasPerk('int_perk_20b') ? 750 : 250;
            if (hasPerk('int_perk_15a')) bonus *= 1.2; else if (hasPerk('int_perk_5a')) bonus *= 1.1;
            xpGains.intellect += bonus;
        }
        if (['fantasy', 'romance'].includes(genreLower) && hasPerk('cha_perk_1b')) xpGains.charisma += (hasPerk('cha_perk_15a') ? 100 : 50);
        if (['non-fiction', 'history'].includes(genreLower) && hasPerk('cha_perk_15b')) xpGains.charisma += 200;
        if (hasPerk('str_perk_20a')) xpGains.strength *= 1.10; else if (hasPerk('str_perk_5a')) xpGains.strength *= 1.05;
        if (hasPerk('str_perk_15a')) xpGains.strength *= 1.10;
        if (hasPerk('int_perk_20a')) xpGains.intellect *= 1.1; if (hasPerk('wis_perk_20a')) xpGains.wisdom *= 1.1; if (hasPerk('cha_perk_20a')) xpGains.charisma *= 1.1;
        for (const key in xpGains) { xpGains[key] = Math.ceil(xpGains[key]); }
        return xpGains;
    }

    function applyXpGains(gains) { Object.entries(gains).forEach(([attrKey, amount]) => { if (userData.attributes[attrKey] && amount > 0) { userData.attributes[attrKey].xp += Math.ceil(amount); } }); }

    function checkAttributesForLevelUp() {
        if (!userData || !userData.attributes) return;
        Object.entries(userData.attributes).forEach(([attrKey, attr]) => {
            let xpForNextLevel = getXpForNextLevel(attr.level);
            while (attr.xp >= xpForNextLevel) {
                attr.xp -= xpForNextLevel; attr.level++;
                if (attr.level % 5 === 0) userData.perkPoints = (userData.perkPoints || 0) + 1;
                if (userData.unlockedPerks.includes('cha_perk_20b') && Math.random() < 0.05) userData.perkPoints = (userData.perkPoints || 0) + 1;
                setTimeout(() => { playSound(UI.sounds.questComplete); updateBarbarian('celebrate', `${attrKey.toUpperCase()} increased to Level ${attr.level}!`); }, 500);
                xpForNextLevel = getXpForNextLevel(attr.level);
            }
        });
    }

    function checkForFeats(conqueredQuest = null) {
        if (!userData || !userData.feats) return;
        for (const featId in FEATS_LIST) {
            if (userData.feats[featId]) continue;
            let isUnlocked = false;
            switch (featId) {
                case 'page_pounder': if (userData.pagesReadToday >= 50) isUnlocked = true; break;
                case 'saga_smasher': if (userData.completedQuests.length >= 3) isUnlocked = true; break;
                case 'librarians_bane': if (userData.completedQuests.length >= 10) isUnlocked = true; break;
                case 'epic_explorer': if (conqueredQuest && conqueredQuest.totalPages >= 500) isUnlocked = true; break;
                case 'genre_master_fantasy': if (userData.completedQuests.filter(q => q.genre?.toLowerCase() === 'fantasy').length >= 5) isUnlocked = true; break;
                case 'genre_master_scifi': if (userData.completedQuests.filter(q => q.genre?.toLowerCase() === 'science fiction').length >= 5) isUnlocked = true; break;
            }
            if (isUnlocked) {
                userData.feats[featId] = new Date().toLocaleDateString('en-GB');
                if (userData.unlockedPerks.includes('int_perk_15b')) userData.attributes.intellect.xp += 300;
                setTimeout(() => { playSound(UI.sounds.questComplete); updateBarbarian('celebrate', `FEAT UNLOCKED: ${FEATS_LIST[featId].name}`); }, 1500);
            }
        }
    }
    
    function checkForBountyCompletion() {
        if (!userData || !userData.bounties) return;
        for (const bountyId in userData.bounties) {
            const activeBounty = userData.bounties[bountyId];
            const bountyDef = BOUNTY_LIST[bountyId];
            if (activeBounty.progress >= bountyDef.target) {
                userData.attributes.strength.xp += bountyDef.reward;
                delete userData.bounties[bountyId];
                setTimeout(() => { playSound(UI.sounds.questComplete); updateBarbarian('celebrate', `BOUNTY COMPLETE: ${bountyDef.title}!`); }, 1000);
            }
        }
    }
    
    async function completeClanBounty(clanId, bounty) {
        updateBarbarian('celebrate', `Hah! Your war-band has completed the bounty: ${bounty.title}!`);
        const batch = db.batch();
        const clanRef = db.collection('clans').doc(clanId);
        const clanDoc = await clanRef.get();
        const memberIds = clanDoc.data().memberIds;
        for (const memberId of memberIds) {
            const memberRef = db.collection('users').doc(memberId);
            if (bounty.reward.perkPoints) { batch.update(memberRef, { perkPoints: firebase.firestore.FieldValue.increment(bounty.reward.perkPoints) }); }
            if (bounty.reward.xp) { batch.update(memberRef, { 'attributes.strength.xp': firebase.firestore.FieldValue.increment(bounty.reward.xp) }); }
        }
        batch.update(clanRef, { activeBounty: null });
        await batch.commit();
        renderClansPage();
    }

    async function handleUnlockPerk(event) {
        const perkCard = event.target.closest('.perk-card.available');
        if (!perkCard) return;
        const { perkId, attribute } = perkCard.dataset;
        const perk = PERKS_LIST[attribute].find(p => p.id === perkId);
        if (confirm(`Unlock the "${perk.name}" perk for 1 Perk Point?`)) {
            playSound(UI.sounds.questStart);
            userData.perkPoints--; userData.unlockedPerks.push(perkId);
            updateBarbarian('celebrate', userData.unlockedPerks.includes('cha_perk_10b') ? `A wise choice! You have learned the ways of "${perk.name}"!` : `PERK UNLOCKED: ${perk.name}!`);
            await saveUserDataToFirestore(); renderAttributesPage();
        }
    }
    
    async function handleAcceptBounty(event) {
        if (!event.target.classList.contains('accept-bounty-btn')) return;
        playSound(UI.sounds.questStart);
        userData.bounties[event.target.dataset.bountyId] = { progress: 0, startDate: new Date().toISOString() };
        await saveUserDataToFirestore(); renderBountiesPage();
    }

    function handleShowNewQuestForm() { playSound(UI.sounds.click); UI.newQuest.display.classList.add('hidden'); UI.newQuest.form.classList.remove('hidden'); UI.newQuest.titleInput.focus(); }
    function handleHideNewQuestForm(playSoundOnClick = true) { if(playSoundOnClick) playSound(UI.sounds.click); UI.newQuest.form.classList.add('hidden'); UI.newQuest.display.classList.remove('hidden'); clearNewQuestForm(); }
    
    async function handleAcceptQuest(e) {
        e.preventDefault(); playSound(UI.sounds.questStart);
        const title = UI.newQuest.titleInput.value.trim();
        const author = UI.newQuest.authorInput.value.trim();
        let genre = (UI.newQuest.genreSelect.value === 'custom') ? UI.newQuest.customGenreInput.value.trim() : UI.newQuest.genreSelect.value;
        const totalPages = parseInt(UI.newQuest.totalPagesInput.value);
        if (!title || !genre || isNaN(totalPages) || totalPages <= 0) { playSound(UI.sounds.error); updateBarbarian('angry', randomChoice(BARB_ISMS["Grizzled Veteran"].error)); return; }
        userData.activeQuest = { id: `quest_${Date.now()}`, title, author, genre, totalPages, currentPage: 0, status: enums.questStatus.ACTIVE, dateStarted: new Date().toLocaleDateString('en-GB') };
        clearNewQuestForm(); updateBarbarian('pleased', randomChoice(BARB_ISMS["Grizzled Veteran"].saving_data));
        await saveUserDataToFirestore(); updateBarbarian('celebrate', randomChoice(BARB_ISMS["Grizzled Veteran"].quest_accepted)); renderUI();
    }
    async function handleLogPages() {
        playSound(UI.sounds.pageTurn);
        const pages = parseInt(UI.activeQuest.pagesReadInput.value);
        if (isNaN(pages) || pages <= 0) { return; }
        const quest = userData.activeQuest;
        const remainingPages = quest.totalPages - quest.currentPage;
        if (pages > remainingPages) { playSound(UI.sounds.error); updateBarbarian('angry', `${BARB_ISMS["Grizzled Veteran"].error_page_count[0]} YOU ONLY HAVE ${remainingPages} PAGES LEFT!`); return; }
        if (userData.clanId && pages > 0) {
            const clanRef = db.collection('clans').doc(userData.clanId);
            clanRef.get().then(doc => {
                const activeBounty = doc.data()?.activeBounty;
                if (activeBounty && CLAN_BOUNTIES_LIST[activeBounty.bountyId]?.type === 'total_pages') {
                    const bountyDef = CLAN_BOUNTIES_LIST[activeBounty.bountyId];
                    const newProgress = (activeBounty.progress || 0) + pages;
                    if (newProgress >= bountyDef.target) { setTimeout(() => completeClanBounty(userData.clanId, bountyDef), 500); }
                    else { clanRef.update({ 'activeBounty.progress': firebase.firestore.FieldValue.increment(pages) }); }
                }
            });
        }
        quest.currentPage += pages; userData.pagesReadToday = (userData.pagesReadToday || 0) + pages;
        applyXpGains(calculateXpGains({ type: 'logPages', pages }));
        if(userData.bounties?.weekly_pages) { userData.bounties.weekly_pages.progress = (userData.bounties.weekly_pages.progress || 0) + pages; }
        UI.activeQuest.pagesReadInput.value = '';
        checkForFeats(); checkForBountyCompletion(); checkAttributesForLevelUp();
        updateBarbarian('pleased', randomChoice(BARB_ISMS["Grizzled Veteran"].saving_data));
        await saveUserDataToFirestore();
        updateBarbarian('pleased', userData.unlockedPerks.includes('cha_perk_1a') ? randomChoice(BARB_ISMS["Grizzled Veteran"].charmed_encouragement) : randomChoice(BARB_ISMS["Grizzled Veteran"].general_encouragement));
        renderUI();
    }
    async function handleConquerQuest() {
        playSound(UI.sounds.questComplete);
        const quest = userData.activeQuest; if (!quest) return;
        if (userData.clanId) {
            const clanRef = db.collection('clans').doc(userData.clanId);
            try {
                await db.runTransaction(async (transaction) => {
                    const clanDoc = await transaction.get(clanRef);
                    if (!clanDoc.exists) throw "Clan does not exist!";
                    const activeBounty = clanDoc.data().activeBounty;
                    if (activeBounty) {
                        const bountyDef = CLAN_BOUNTIES_LIST[activeBounty.bountyId];
                        let progressMade = 0;
                        if (bountyDef.type === 'epic_books' && quest.totalPages >= 500) { progressMade = 1; }
                        if (progressMade > 0) {
                            const newProgress = (activeBounty.progress || 0) + progressMade;
                            if (newProgress >= bountyDef.target) { 
                                transaction.update(clanRef, { 'activeBounty.progress': newProgress });
                                setTimeout(() => completeClanBounty(userData.clanId, bountyDef), 500); 
                            }
                            else { transaction.update(clanRef, { 'activeBounty.progress': newProgress }); }
                        }
                    }
                });
            } catch (e) { console.error("Clan bounty transaction failed: ", e); }
        }
        const xpGains = calculateXpForQuest(quest);
        applyXpGains(xpGains);
        const genreLower = quest.genre.toLowerCase();
        if (!userData.conqueredGenres.includes(genreLower)) { userData.conqueredGenres.push(genreLower); }
        if (userData.bounties?.monthly_conqueror) { userData.bounties.monthly_conqueror.progress = (userData.bounties.monthly_conqueror.progress || 0) + 1; }
        const conqueredQuest = { ...quest, status: enums.questStatus.CONQUERED, dateConquered: new Date().toLocaleDateString('en-GB'), xpAwarded: xpGains };
        userData.completedQuests.push(conqueredQuest);
        userData.activeQuest = null;
        checkForFeats(quest); checkForBountyCompletion(); checkAttributesForLevelUp();
        updateBarbarian('celebrate', randomChoice(BARB_ISMS["Grizzled Veteran"].saving_data));
        await saveUserDataToFirestore();
        updateBarbarian('celebrate', randomChoice(BARB_ISMS["Grizzled Veteran"].book_completed));
        renderUI();
    }
    async function handleSurrenderQuest() {
        playSound(UI.sounds.error);
        if (confirm("Are you sure you wish to flee from this quest, coward?")) {
            userData.archivedQuests.push({ ...userData.activeQuest, status: enums.questStatus.ABANDONED, dateAbandoned: new Date().toLocaleDateString('en-GB') });
            userData.activeQuest = null; updateBarbarian('angry', randomChoice(BARB_ISMS["Grizzled Veteran"].saving_data));
            await saveUserDataToFirestore(); updateBarbarian('angry', randomChoice(BARB_ISMS["Grizzled Veteran"].quest_surrendered)); renderUI();
        }
    }
    async function handleUndoConquest(questId) {
        playSound(UI.sounds.click);
        if (userData.activeQuest) {
            playSound(UI.sounds.error);
            updateBarbarian('angry', randomChoice(BARB_ISMS["Grizzled Veteran"].error_undo));
            return;
        }
        const questIndex = userData.completedQuests.findIndex(q => q.id === questId);
        if (questIndex > -1) {
            const questToUndo = userData.completedQuests[questIndex];
            if (questToUndo.xpAwarded) {
                for (const attrKey in questToUndo.xpAwarded) {
                    userData.attributes[attrKey].xp -= questToUndo.xpAwarded[attrKey];
                    if (userData.attributes[attrKey].xp < 0) {
                        userData.attributes[attrKey].xp = 0;
                    }
                }
            }
            delete questToUndo.dateConquered;
            delete questToUndo.xpAwarded;
            questToUndo.status = enums.questStatus.ACTIVE;
            userData.activeQuest = questToUndo;
            userData.completedQuests.splice(questIndex, 1);
            updateBarbarian('pleased', randomChoice(BARB_ISMS["Grizzled Veteran"].saving_data));
            await saveUserDataToFirestore();
            updateBarbarian('pleased', randomChoice(BARB_ISMS["Grizzled Veteran"].quest_undone));
            renderUI();
        }
    }
    function openEditModal() {
        playSound(UI.sounds.click); if (!userData.activeQuest) return;
        const quest = userData.activeQuest;
        UI.editQuest.titleInput.value = quest.title; UI.editQuest.authorInput.value = quest.author; UI.editQuest.totalPagesInput.value = quest.totalPages;
        const genreOptions = Array.from(UI.editQuest.genreSelect.options).map(opt => opt.value);
        if (genreOptions.includes(quest.genre)) { UI.editQuest.genreSelect.value = quest.genre; UI.editQuest.customGenreInput.classList.add('hidden'); } else { UI.editQuest.genreSelect.value = 'custom'; UI.editQuest.customGenreInput.value = quest.genre; UI.editQuest.customGenreInput.classList.remove('hidden'); }
        UI.editQuest.modal.classList.remove('hidden');
    }
    function closeEditModal() { playSound(UI.sounds.click); UI.editQuest.modal.classList.add('hidden'); }
    async function handleSaveChanges() {
        playSound(UI.sounds.click); if (!userData.activeQuest) return;
        const quest = userData.activeQuest;
        quest.title = UI.editQuest.titleInput.value.trim(); quest.author = UI.editQuest.authorInput.value.trim();
        quest.genre = (UI.editQuest.genreSelect.value === 'custom') ? UI.editQuest.customGenreInput.value.trim() : UI.editQuest.genreSelect.value;
        quest.totalPages = parseInt(UI.editQuest.totalPagesInput.value);
        if (!quest.title || !quest.genre || isNaN(quest.totalPages) || quest.totalPages <= 0) { playSound(UI.sounds.error); alert("Fool! Title, Genre, and a valid Page Count are required."); return; }
        await saveUserDataToFirestore(); renderUI(); closeEditModal();
    }
    function clearNewQuestForm() { UI.newQuest.form.reset(); UI.newQuest.customGenreInput.classList.add('hidden'); }

    async function handleCreateClan() {
        playSound(UI.sounds.questStart);
        const clanName = UI.clans.nameInput.value.trim();
        if (clanName.length < 3 || clanName.length > 25) { playSound(UI.sounds.error); updateBarbarian('angry', "A clan name must be between 3 and 25 characters!"); return; }
        if (userData.clanId) { playSound(UI.sounds.error); updateBarbarian('angry', "You are already in a clan!"); return; }
        updateBarbarian('pleased', 'Forging your new War-Band...');
        try {
            const batch = db.batch(); const clanRef = db.collection('clans').doc(); const userRef = db.collection('users').doc(currentUser.uid);
            const clanData = { name: clanName, motto: "The mightiest war-band!", leaderId: currentUser.uid, memberIds: [currentUser.uid], createdAt: firebase.firestore.FieldValue.serverTimestamp(), activeBounty: null };
            batch.set(clanRef, clanData); batch.update(userRef, { clanId: clanRef.id, clanName: clanName });
            await batch.commit();
            userData.clanId = clanRef.id; userData.clanName = clanName;
            updateBarbarian('celebrate', `The "${clanName}" war-band has been founded!`); renderClansPage();
        } catch (error) { console.error("Error creating clan: ", error); updateBarbarian('angry', "The founding ritual failed! Try again."); }
    }
    async function handleJoinClan(event) {
        if (!event.target.classList.contains('join-btn')) return;
        playSound(UI.sounds.questStart); const { clanId, clanName } = event.target.dataset;
        if (userData.clanId) { updateBarbarian('angry', "You are already in a clan!"); return; }
        updateBarbarian('pleased', `Joining the ${clanName} war-band...`);
        try {
            const batch = db.batch(); const userRef = db.collection('users').doc(currentUser.uid); const clanRef = db.collection('clans').doc(clanId);
            batch.update(userRef, { clanId: clanId, clanName: clanName }); batch.update(clanRef, { memberIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid) });
            await batch.commit();
            userData.clanId = clanId; userData.clanName = clanName;
            updateBarbarian('celebrate', `You have joined the ranks of ${clanName}!`); renderClansPage();
        } catch (error) { console.error("Error joining clan:", error); updateBarbarian('angry', "The joining ritual failed! Try again."); }
    }
    async function handleLeaveClan(withConfirmation = true) {
        playSound(UI.sounds.error); if (!userData.clanId) return;
        const clanDoc = await db.collection('clans').doc(userData.clanId).get();
        if(clanDoc.exists && isCurrentUser(clanDoc.data().leaderId) && clanDoc.data().memberIds.length > 1) { alert("The clan leader must pass leadership before abandoning their war-band!"); return; }
        if (!withConfirmation || confirm(`Are you sure you wish to abandon the ${userData.clanName} war-band?`)) {
            updateBarbarian('angry', 'Leaving the clan...');
            try {
                const batch = db.batch(); const userRef = db.collection('users').doc(currentUser.uid); const clanRef = db.collection('clans').doc(userData.clanId);
                batch.update(userRef, { clanId: null, clanName: null }); batch.update(clanRef, { memberIds: firebase.firestore.FieldValue.arrayRemove(currentUser.uid) });
                await batch.commit();
                const oldClanName = userData.clanName; userData.clanId = null; userData.clanName = null;
                updateBarbarian('pleased', `You have left the ${oldClanName} war-band.`); renderClansPage();
            } catch (error) { console.error("Error leaving clan:", error); updateBarbarian('angry', "Could not leave the clan."); }
        }
    }
    function handleOpenClanAdminModal() {
        playSound(UI.sounds.click);
        const clanRef = db.collection('clans').doc(userData.clanId);
        clanRef.get().then(doc => {
            if(doc.exists) {
                const data = doc.data();
                UI.clanAdminModal.nameInput.value = data.name;
                UI.clanAdminModal.mottoInput.value = data.motto || '';
                UI.clanAdminModal.modal.classList.remove('hidden');
            }
        });
    }
    async function handleSaveClanChanges() {
        playSound(UI.sounds.click);
        const newName = UI.clanAdminModal.nameInput.value.trim();
        const newMotto = UI.clanAdminModal.mottoInput.value.trim();
        if (newName.length < 3 || newName.length > 25) { return alert("Clan name must be between 3 and 25 characters."); }
        const clanRef = db.collection('clans').doc(userData.clanId);
        await clanRef.update({ name: newName, motto: newMotto });
        UI.clanAdminModal.modal.classList.add('hidden');
        renderClansPage();
    }
    async function handleKickMember(event) {
        if (!event.target.classList.contains('kick-btn')) return;
        const memberIdToKick = event.target.dataset.kickId;
        const memberName = event.target.closest('.clan-roster-item').querySelector('.roster-item-name').textContent.trim();
        if (confirm(`Are you sure you want to kick ${memberName} from the clan?`)) {
            playSound(UI.sounds.error);
            const batch = db.batch();
            const clanRef = db.collection('clans').doc(userData.clanId);
            const userRef = db.collection('users').doc(memberIdToKick);
            batch.update(clanRef, { memberIds: firebase.firestore.FieldValue.arrayRemove(memberIdToKick) });
            batch.update(userRef, { clanId: null, clanName: null });
            await batch.commit();
            renderClansPage();
        }
    }

    function showAuthError(message) { UI.auth.errorMessage.textContent = message; UI.auth.errorMessage.classList.add('visible'); }
    function clearAuthError() { UI.auth.errorMessage.textContent = ''; UI.auth.errorMessage.classList.remove('visible'); }
    function getAuthErrorMessage(errorCode) { return (BARB_ISMS["Grizzled Veteran"].auth_errors[errorCode]) || BARB_ISMS["Grizzled Veteran"].auth_errors["default"]; }
    function handleAuthButtonClick() { playSound(UI.sounds.click); if (currentUser) { auth.signOut(); } else { UI.auth.form.classList.remove('hidden'); clearAuthError(); } }
    
    async function handleLogin(event) {
        event.preventDefault();
        playSound(UI.sounds.click);
        clearAuthError();
        try {
            await auth.signInWithEmailAndPassword(UI.auth.emailInput.value, UI.auth.passwordInput.value);
        } catch (error) {
            playSound(UI.sounds.error);
            updateBarbarian('angry');
            showAuthError(getAuthErrorMessage(error.code));
        }
    }
    async function handleSignup(event) {
        event.preventDefault();
         alert("Sign Up button was definitely clicked!");
        playSound(UI.sounds.click);
        clearAuthError();
        const username = UI.auth.usernameInput.value.trim();
        if (!username) {
            playSound(UI.sounds.error);
            updateBarbarian('angry');
            showAuthError("USERNAME IS REQUIRED, WHELP!");
            return;
        }
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(UI.auth.emailInput.value, UI.auth.passwordInput.value);
            await userCredential.user.updateProfile({ displayName: username });
        } catch (error) {
            playSound(UI.sounds.error);
            updateBarbarian('angry');
            showAuthError(getAuthErrorMessage(error.code));
        }
    }

    async function saveUserDataToFirestore() { if (currentUser) { try { await db.collection('users').doc(currentUser.uid).set(userData); } catch (error) { console.error("Error saving user data:", error); updateBarbarian('angry', "Could not save your progress!"); } } }
    async function loadUserDataFromFirestore() {
        const userRef = db.collection('users').doc(currentUser.uid); const doc = await userRef.get();
        if (doc.exists) {
            userData = { ...defaultUserData, ...doc.data() };
            let needsSave = false;
            if (!userData.attributes || !userData.attributes.strength.hasOwnProperty('level')) { userData.attributes = { ...defaultUserData.attributes }; needsSave = true; }
            ['unlockedPerks', 'conqueredGenres', 'archivedQuests'].forEach(prop => { if (!Array.isArray(userData[prop])) { userData[prop] = []; needsSave = true; } });
            if (typeof userData.perkPoints !== 'number') { userData.perkPoints = 0; needsSave = true; }
            if (typeof userData.bounties !== 'object' || userData.bounties === null) { userData.bounties = {}; needsSave = true; }
            if (needsSave) await saveUserDataToFirestore();
            const today = new Date().toDateString();
            if(userData.lastLoginDate !== today) { userData.pagesReadToday = 0; userData.lastLoginDate = today; await saveUserDataToFirestore(); }
        } else { userData = { ...defaultUserData, displayName: currentUser.displayName }; await saveUserDataToFirestore(); }
    }
    
    function initializeEventListeners() {
        const toggleMenu = () => {
            document.body.classList.toggle('menu-open');
        };
        UI.nav.hamburgerMenu.addEventListener('click', toggleMenu);
        UI.nav.menuOverlay.addEventListener('click', toggleMenu);
        
        UI.nav.linksContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('nav-item')) {
                playSound(UI.sounds.click);
                if (document.body.classList.contains('menu-open')) {
                    toggleMenu();
                }
                const viewId = event.target.id.replace('Nav', '');
                const viewKey = viewId === 'readingLog' ? 'log' : viewId;
                switchView(viewKey);
            }
        });
        
        UI.attributes.perksSection.addEventListener('click', handleUnlockPerk);
        UI.journey.filters.addEventListener('click', (event) => { if (event.target.classList.contains('filter-btn')) { playSound(UI.sounds.click); UI.journey.filters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active')); event.target.classList.add('active'); currentJourneyFilter = event.target.dataset.filter; renderJourneyPage(); } });
        UI.bounties.grid.addEventListener('click', handleAcceptBounty);
        UI.completed.list.addEventListener('click', (event) => { if (event.target.classList.contains('undo-btn')) { handleUndoConquest(event.target.dataset.id); } });
        UI.clans.list.addEventListener('click', handleJoinClan);
        UI.newQuest.startBtn.addEventListener('click', handleShowNewQuestForm);
        UI.newQuest.form.addEventListener('submit', handleAcceptQuest);
        UI.newQuest.cancelBtn.addEventListener('click', () => handleHideNewQuestForm(true));
        UI.activeQuest.logPagesBtn.addEventListener('click', handleLogPages);
        UI.activeQuest.conquerBtn.addEventListener('click', handleConquerQuest);
        UI.activeQuest.surrenderBtn.addEventListener('click', handleSurrenderQuest);
        UI.clans.createBtn.addEventListener('click', handleCreateClan);
        UI.clans.leaveBtn.addEventListener('click', () => handleLeaveClan(true));
        UI.clans.adminBtn.addEventListener('click', handleOpenClanAdminModal);
        UI.clanAdminModal.saveBtn.addEventListener('click', handleSaveClanChanges);
        UI.clanAdminModal.cancelBtn.addEventListener('click', () => UI.clanAdminModal.modal.classList.add('hidden'));
        UI.clans.roster.addEventListener('click', handleKickMember);
        UI.editQuest.btn.addEventListener('click', openEditModal);
        UI.editQuest.saveBtn.addEventListener('click', handleSaveChanges);
        UI.editQuest.cancelBtn.addEventListener('click', closeEditModal);
        UI.auth.btn.addEventListener('click', handleAuthButtonClick);
        
        UI.auth.loginBtn.addEventListener('click', handleLogin);
        UI.auth.signupBtn.addEventListener('click', handleSignup);

        UI.auth.cancelBtn.addEventListener('click', () => { playSound(UI.sounds.click); UI.auth.form.classList.add('hidden'); clearAuthError(); });
        const setupGenreToggle = (select, customInput) => { select.addEventListener('change', () => { customInput.classList.toggle('hidden', select.value !== 'custom'); }); };
        setupGenreToggle(UI.newQuest.genreSelect, UI.newQuest.customGenreInput);
        setupGenreToggle(UI.editQuest.genreSelect, UI.editQuest.customGenreInput);
    }
    
    async function handleUserLoggedIn(user) {
        currentUser = user; UI.auth.form.classList.add('hidden');
        UI.auth.userName.textContent = user.displayName || user.email.split('@')[0];
        UI.auth.btn.textContent = "Log Out";
        await loadUserDataFromFirestore();
        updateBarbarian('idle', randomChoice(BARB_ISMS["Grizzled Veteran"].welcome)); renderUI();
    }
    function handleUserLoggedOut() {
        currentUser = null; UI.auth.form.classList.add('hidden');
        userData = { ...defaultUserData };
        UI.auth.userName.textContent = "Guest Warrior"; UI.auth.btn.textContent = "Sign Up / Log In";
        updateBarbarian('idle', "Hmph. A stranger. Sign up if you want your deeds remembered.");
        switchView(enums.views.LOG); renderUI();
    }
    
    initializeEventListeners();
    auth.onAuthStateChanged((user) => { user ? handleUserLoggedIn(user) : handleUserLoggedOut(); });
});
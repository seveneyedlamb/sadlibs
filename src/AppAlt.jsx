import { useState, useMemo, useEffect, useRef } from 'react'
import './alt.css';
import logo from '../images/logo.png';
import babyEmailImg from '../images/babyemail.webp';
import trumpAvatar from '../images/trumptalking.gif';
import heroCard from '../images/herocard.png';
import sadGirlImg from '../images/sadgirl.png';
import funForAllAgesImg from '../images/fun4allages.png';
import merchImg from '../images/buyatee.png';
import themeSong from '../audio/sad.mp3';
import html2canvas from 'html2canvas';

import bg1 from '../images/1.webp';
import bg2 from '../images/2.webp';
import bg3 from '../images/3.webp';
import bg4 from '../images/4.webp';
import bg5 from '../images/5.webp';
import bg6 from '../images/6.webp';
import bg7 from '../images/7.webp';
import bg8 from '../images/8.webp';
import bg9 from '../images/9.webp';
const BGS = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

const NAMES_DATA = [
    { name: 'Donald Trump', url: 'https://en.wikipedia.org/wiki/Donald_Trump' },
    { name: 'Bill Clinton', url: 'https://en.wikipedia.org/wiki/Bill_Clinton' },
    { name: 'Bill Gates', url: 'https://en.wikipedia.org/wiki/Bill_Gates' },
    { name: 'Hillary Clinton', url: 'https://en.wikipedia.org/wiki/Hillary_Clinton' },
    { name: 'Tony Blair', url: 'https://en.wikipedia.org/wiki/Tony_Blair' },
    { name: 'Mohammed bin Salman', url: 'https://en.wikipedia.org/wiki/Mohammed_bin_Salman' },
    { name: 'Henry Kissinger', url: 'https://en.wikipedia.org/wiki/Henry_Kissinger' },
    { name: 'Harvey Weinstein', url: 'https://en.wikipedia.org/wiki/Harvey_Weinstein' },
    { name: 'Ghislaine Maxwell', url: 'https://en.wikipedia.org/wiki/Ghislaine_Maxwell' },
    { name: 'Andrew Mountbatten-Windsor', url: 'https://en.wikipedia.org/wiki/Prince_Andrew,_Duke_of_York' },
    { name: 'Woody Allen', url: 'https://en.wikipedia.org/wiki/Woody_Allen' },
    { name: 'Richard Branson', url: 'https://en.wikipedia.org/wiki/Richard_Branson' },
    { name: 'Ehud Barak', url: 'https://en.wikipedia.org/wiki/Ehud_Barak' },
    { name: 'Ehud Olmert', url: 'https://en.wikipedia.org/wiki/Ehud_Olmert' },
    { name: 'Kevin Spacey', url: 'https://en.wikipedia.org/wiki/Kevin_Spacey' },
    { name: 'Larry Page', url: 'https://en.wikipedia.org/wiki/Larry_Page' },
    { name: 'Peter Thiel', url: 'https://en.wikipedia.org/wiki/Peter_Thiel' },
    { name: 'Reid Hoffman', url: 'https://en.wikipedia.org/wiki/Reid_Hoffman' },
    { name: 'Jamie Dimon', url: 'https://en.wikipedia.org/wiki/Jamie_Dimon' },
    { name: 'Larry Summers', url: 'https://en.wikipedia.org/wiki/Lawrence_Summers' },
    { name: 'Robert Kraft', url: 'https://en.wikipedia.org/wiki/Robert_Kraft' },
    { name: 'Leon Black', url: 'https://en.wikipedia.org/wiki/Leon_Black' },
    { name: 'Al Gore', url: 'https://en.wikipedia.org/wiki/Al_Gore' },
    { name: 'Alan Dershowitz', url: 'https://en.wikipedia.org/wiki/Alan_Dershowitz' },
    { name: 'Les Wexner', url: 'https://en.wikipedia.org/wiki/Leslie_Wexner' },
    { name: 'Noam Chomsky', url: 'https://en.wikipedia.org/wiki/Noam_Chomsky' },
    { name: 'Sarah Kellen', url: 'https://en.wikipedia.org/wiki/Sarah_Kellen' },
    { name: 'Jean-Luc Brunel', url: 'https://en.wikipedia.org/wiki/Jean-Luc_Brunel' },
    { name: 'Nadia Marcinkova', url: 'https://en.wikipedia.org/wiki/Nadia_Marcinkova' },
    { name: 'Lesley Groff', url: 'https://en.wikipedia.org/wiki/Lesley_Groff' },
];

const stories = [
    {
        id: 'lolita-2017',
        title: 'The "Lolita" Scouting Email (2017)',
        hook: 'A professional recruiter emailed their billionaire boss to compare a living human girl to a character from a famous novel about child rape. In writing. The boss did not reply with "what the actual fuck is wrong with you." He kept her on payroll.',
        text: 'It was a very [adjective] day in the [place] when a highly-paid [noun] decided to put their own career suicide in writing. They had just finished devouring a platter of [plural noun] when they emailed their billionaire boss. "Boss, I met [person\'s name] today while I was [verb ending in -ing] near the [noun]. Let me tell you, she is exactly like [proper noun] from that famous book about the [adjective] [noun]. She is basically a [adjective] miniature :) I couldn\'t believe my [body part (plural)]. So now, moving forward, as we plan our next [adjective] retreat to [country], should I just send you her specific type of [plural noun] from now on? Please reply [adverb] before the FBI [verb]!"',
        realQuote: '"I met [REDACTED] today. She is like Lolita from Nabokov, femme miniature :) So now I should send you her type of candidates only?"',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'littlest-girl-2014',
        title: 'The "Littlest Girl" Email (2014)',
        hook: 'A guest at the pedophile mansion wrote Epstein a thank-you note. It included a Yelp-style review of the "littlest girl" on staff. Congress spent two years trying to figure out who sent it. It was a Republican congressman\'s wife.',
        text: 'A high-profile VIP had a very [adjective] evening vacationing on the infamous island of [fictional place]. The next morning, after slamming a tall glass of [liquid], they typed out a polite thank you note on their custom [noun]: "Dear Jeffrey, Thank you for such a [adjective] night. You are quite the [noun], and your mansion smells like [noun]. By the way, your [adjective] girl was a [adverb] naughty, which made the whole [event] totally [adjective]. We should definitely [verb] her the next time we ride the [mode of transportation] to hell together!"',
        realQuote: '"Thank you for a fun night… Your littlest girl was a little naughty." (Rep. Massie confirmed the sender was his wife).',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'beautiful-little-girl-2014',
        title: 'The "Beautiful Little Girl" Email (2014)',
        hook: 'A grown adult had a literal meltdown on Madison Avenue. Not a medical emergency. A meltdown because they saw a child\'s hair. They emailed Epstein about it immediately. Like a normal person does.',
        text: '"I simply can\'t take it anymore!!!!!!!" the frantic email began, sent at exactly [time] in the morning by an adult human with a job. "I was just walking down [street name] wearing my favorite [article of clothing] to get my morning [noun]. Suddenly, I looked past the [noun] and I saw the most [adjective] [adjective] girl. She had incredibly long, [adjective], [color] hair that flowed like a river of [plural noun]. My heart started [verb ending in -ing] uncontrollably! We need to [verb] her immediately before the [group of people] find out and cancel my [noun] subscription!"',
        realQuote: '"I can\'t take it anymore!!!!!!! I just saw the most beautiful little girl on Madison with long soft blonde hair."',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'brazilian-2013',
        title: 'The "New Brazilian" Email (2013)',
        hook: 'A talent scout sent a midnight candidate review. A formatting glitch made her age look like "9yo". Federal investigators spent two years arguing if the typo meant 9 or 19. CNN had to publish a correction. About the age. Of a human being.',
        text: 'An enthusiastic agent from the prestigious [adjective] human-trafficking agency fired off a quick, breathless message right after eating a large [food item]: "Good news, boss! A new [nationality] has just arrived in town on a giant [mode of transportation]. She is extremely [adjective] and [adverb] [adjective]. When I asked her age, the paperwork clearly said she was only [number]yo! Wait, was that a typo? Who cares, grab the [noun]!"',
        realQuote: '"New Brazilian just arrived, sexy and cute, 19yo." (A formatting glitch caused some to read it as 9yo. CNN confirmed it said 19).',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'young-poor-2018',
        title: 'The "Young Poor" Email (2018)',
        hook: 'The most bleak performance review ever filed. Submitted by a recruiter who was "so tired" that grammar became completely optional. Includes the business assessment "we both really likes her a lot." These people walked among us.',
        text: 'The daily scouting report arrived at midnight from an absolute moron: "Boss, I scoured the streets of [city] and found at least [number] very good, young, [adjective] prospects. But honestly, we was so [adjective] from [verb ending in -ing] all day that we couldn\'t even [verb] them." A quick follow-up: "You definitely need to meet this specific one. She\'s not exactly the beauty [noun] of the group, and she talks like a [animal], but we both really likes her a [noun]. Can we send her over in a [mode of transportation]?"',
        realQuote: '"I found at least 3 very good young poor but we was so tired." Follow-up: "Meet this one, not the beauty queen but we both likes her a lot."',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'attia-crude',
        title: "Peter Attia's Diet Email",
        hook: 'Dr. Peter Attia has three million podcast listeners and wrote a book about living forever. He emailed Jeffrey Epstein a low-carb diet joke where the punchline was female anatomy. Epstein out-grossed him with a photo. This is our medical elite.',
        text: 'A famous longevity doctor emailed the billionaire pedophile with the bizarre subject line "[adjective]". In the body: "The [noun] is, indeed, very low carb. It pairs excellently with [food item]. However, I am still waiting on my lab assistant, [name], for the results on the [noun] content." Later, he received a shockingly inappropriate [noun] in reply. He responded: "Please, for the love of [deity], tell me that you found that [noun] online somewhere... you absolute [insult]."',
        realQuote: 'Subject: "confirmed" — body: "Pussy is, indeed, low carb. Still awaiting results on gluten content." Epstein sent Attia a picture; Attia replied: "Please tell you found that picture on line…bastard."',
        sources: [{ name: 'NBC News', url: 'https://www.nbcnews.com/politics/justice-department/live-blog/epstein-files-trump-doj-release-live-updates-rcna256639' }]
    },
    {
        id: 'peggy-african',
        title: "The African Baby Email",
        hook: 'A real New York socialite offered to procure Epstein an African baby as a GIFT. In the same email, she offered to "neutralize" a journalist. This is not a metaphor. She meant an actual human baby. As a gift. For Jeffrey Epstein.',
        text: 'High-society PR ghoul Peggy Siegal had a unique offer: she casually promised to procure him an [nationality] [noun], "or maybe two, if you\'d like to fill up the [room in a house]!" To sweeten the deal, she even offered to completely "[verb]" a pesky journalist named Tina Brown. "Just say the word, and she\'ll be swimming with the [plural animal]," Peggy joked, sipping her morning [liquid] made of [noun].',
        realQuote: 'PR maven Peggy Siegal offered to get Epstein an African baby "or two" and offered to "neutralize" journalist Tina Brown on his behalf.',
        sources: [{ name: 'Zeteo', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' }]
    },
    {
        id: 'fake-wife',
        title: 'The "Fake Wife" Email',
        hook: 'Someone offered Epstein a fake wife as a PR strategy. The candidate requirements were exactly three things: "50," "Russian," and "Jewish." Nothing about personality or intelligence. A professional business proposal for a human shield.',
        text: 'Someone decided Epstein needed a massive PR makeover, probably because he was a monster. So, they offered him a "fake [noun]" to legitimize his status at fancy [plural noun]. The ideal candidate was hyper-specific: an exactly [number]-year-old, [nationality], [religion] [noun] who wouldn\'t ask too many questions about the [plural noun] in the basement. She also had to be willing to pretend to enjoy eating [food item] while [verb ending in -ing] on a yacht.',
        realQuote: 'Epstein was offered a "fake wife" — ideal candidate described as a 50-year-old, Russian, Jewish woman.',
        sources: [{ name: 'Zeteo', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' }]
    },
    {
        id: 'larry-summers-2017',
        title: 'Larry Summers Gossiping About Trump',
        hook: 'The former United States Treasury Secretary emailed a convicted sex trafficker to gossip about whether the President was guilty of crimes. He did this from his Harvard email account. The brain trust running the country, folks.',
        text: 'A very prominent former Treasury [noun] emailed his old pal with a juicy political scoop: "Just between us," he wrote from his underground [place], "How [adjective] do you really think Donald is?" They casually proceeded to chat like two [plural animal] about whether [country] had orchestrated a massive [noun] to help Trump win the [year] election over [a politician]. "If he goes down, we might lose our access to the [adjective] [noun]," he lamented.',
        realQuote: 'Former Treasury Secretary Summers emailed Epstein: "How guilty is Donald?" — discussing whether Russia helped Trump win in 2016.',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }]
    },
    {
        id: 'kathy-ruemmler-2014',
        title: 'The Kathy Ruemmler Email (2014)',
        hook: "Obama's personal White House Counsel sent Epstein a draft press statement to see if it made her look bad. He was a registered sex offender under federal supervision at the time. She wanted his PR advice. She took his notes.",
        text: 'A former high-ranking White House [noun] was stepping down from consideration for U.S. Attorney General. What did she do first? She fired off a highly [adjective] draft of her public statement directly to the billionaire pedophile using her secure [noun]. She eagerly asked for his [noun] and his [noun] before publishing it to the [adjective] press. "Do you think this makes me look too [adjective]?" she typed, nervously pacing around her [room in a house].',
        realQuote: "Obama's former White House Counsel sent Epstein a draft public statement declining consideration for U.S. Attorney General — and asked Epstein for his feedback.",
        sources: [{ name: 'CNN', url: 'https://edition.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }]
    },
    {
        id: 'spacex-shirt-2013',
        title: 'The SpaceX Shirt Photo (2013)',
        hook: 'An email with no subject. No text. No context. Just a photo of a woman in a SpaceX shirt. Nobody knows who sent it. Nobody knows why. The terrifying part is that Epstein definitely knew why.',
        text: 'A deeply [adjective] contact sent a very strange email at [time] P.M. It contained absolutely no [noun] in the body — completely blank, save for a single attachment: a photo of a [noun] awkwardly posing next to a giant [noun] while wearing a tight [company] t-shirt. "What does this mean?" the billionaire wondered, scratching his [body part]. "Are we going to [planet]? Or is Elon going to build us a [noun]?"',
        realQuote: 'A redacted person sent Epstein an email with no text — just a photo of a female posing in a SpaceX shirt.',
        sources: [{ name: 'CNN', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }]
    },
    {
        id: 'peter-mandelson',
        title: 'The Peter Mandelson Email',
        hook: "Britain's most powerful diplomat was casually sharing classified UK government and EU financial data with a registered sex offender. While actively serving in the Prime Minister's cabinet. Cheers, mate.",
        text: 'Disturbing emails suggest Britain\'s former [job title] reached top-tier treason levels. He point-blank shared highly [adjective] UK government secrets, classified [plural noun], and confidential EU [adjective] data directly with the billionaire financier! And he did all this while officially serving in the Prime Minister\'s [noun]. Rumor has it, he hid the USB drives inside a hollowed-out [food item] and delivered them via a trained [animal].',
        realQuote: "Emails suggest Britain's former Ambassador to the U.S., Peter Mandelson, shared confidential UK government and EU financial information with Epstein while serving in PM Gordon Brown's cabinet.",
        sources: [{ name: 'CBS News', url: 'https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/' }]
    },
    {
        id: 'lawmakers',
        title: 'BONUS: What Lawmakers Actually Saw',
        hook: 'A congressman went into a secure vault to read the unredacted files. He came out looking like he\'d seen a ghost in a trench coat. He kept repeating the words "gruesome" and "nine-year-old." Congress promptly redacted more names.',
        text: 'A prominent Representative stormed out of the vault after reviewing the unredacted files, his face looking very [adjective]. He reported seeing a clear reference to a [noun] as young as [number] years old, describing the entire horrifying nightmare as brutally "[adjective] and [adjective]." While banging his [noun] on a desk, he called out the "tons of completely [adjective] redactions" where powerful names were hidden for what he called "[adjective] or [adjective] or flat out [adjective] reasons!" The government then decided to [verb] the rest of the documents.',
        realQuote: 'Rep. Jamie Raskin saw a reference to a girl as young as 9, calling it "gruesome and grim." He noted "tons of completely unnecessary redactions" with names hidden "for mysterious or baffling or inscrutable reasons."',
        sources: [{ name: 'Full DOJ Repository', url: 'https://www.justice.gov/epstein/doj-disclosures' }]
    },
];

function extractPlaceholders(text) {
    const regex = /\[([^\]]+)\]/g;
    const matches = [...text.matchAll(regex)];
    return matches.map((m, index) => ({ id: index, type: m[1], original: m[0] }));
}

export default function AppAlt() {
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isRevealed, setIsRevealed] = useState(false);
    const [showNamesModal, setShowNamesModal] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [shareCount, setShareCount] = useState(() => parseInt(localStorage.getItem('sadlibs_share_count')) || 1300);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);
    const [glitching, setGlitching] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [musicStarted, setMusicStarted] = useState(false);
    const [shareReady, setShareReady] = useState(false);

    const themeAudioRef = useRef(null);
    const storyContainerRef = useRef(null);
    const storyRevealRef = useRef(null);
    const audioRef = useRef(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [activeAudioUrl, setActiveAudioUrl] = useState(null);
    const [isProcessingMeme, setIsProcessingMeme] = useState(false);
    const [completedGames, setCompletedGames] = useState(0);
    const [showPrizeModal, setShowPrizeModal] = useState(false);
    const [prizeEmail, setPrizeEmail] = useState('');
    const [prizeModalStatus, setPrizeModalStatus] = useState('idle');
    const [exitEmail, setExitEmail] = useState('');
    const [exitModalStatus, setExitModalStatus] = useState('idle');
    const [hasSharedInExitModal, setHasSharedInExitModal] = useState(false);
    const [decipherText, setDecipherText] = useState('');
    const [isDeciphered, setIsDeciphered] = useState(false);

    const RARITY = [2, 3, 4, 2, 3, 2, 5, 3, 4, 2, 3, 4, 2, 3];
    const activeStory = useMemo(() => stories.find(s => s.id === selectedStoryId), [selectedStoryId]);
    const storyRarity = activeStory ? RARITY[stories.indexOf(activeStory) % RARITY.length] : 3;
    const placeholders = useMemo(() => activeStory ? extractPlaceholders(activeStory.text) : [], [activeStory]);
    const allFilled = activeStory && placeholders.every(p => inputs[p.id] && inputs[p.id].trim() !== '');

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        const iv = setInterval(() => {
            setGlitching(true);
            setTimeout(() => setBgIndex(Math.floor(Math.random() * BGS.length)), 150);
            setTimeout(() => setGlitching(false), 400);
        }, 3000);
        return () => { clearTimeout(t); clearInterval(iv); };
    }, []);

    const startMusic = () => {
        const audio = themeAudioRef.current;
        if (!audio || musicStarted) return;
        audio.volume = 0.02;
        audio.play().then(() => setMusicStarted(true)).catch(() => { });
    };

    const toggleMute = () => {
        const next = !isMuted;
        setIsMuted(next);
        if (themeAudioRef.current) themeAudioRef.current.muted = next;
    };

    useEffect(() => {
        if ((selectedStoryId || isGenerating || isRevealed) && storyContainerRef.current) {
            setTimeout(() => storyContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    }, [selectedStoryId, isGenerating, isRevealed]);

    useEffect(() => {
        const handler = (e) => {
            if (e.clientY <= 20 && !document.querySelector('.av2-overlay')) {
                if (!sessionStorage.getItem('exit_triggered')) { setShowExitModal(true); sessionStorage.setItem('exit_triggered', '1'); }
            }
        };
        document.addEventListener('mouseleave', handler);
        return () => document.removeEventListener('mouseleave', handler);
    }, []);

    // Scroll observer for fly-in cards
    useEffect(() => {
        if (selectedStoryId) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const cards = document.querySelectorAll('.av2-fly-in');
        cards.forEach(c => observer.observe(c));

        return () => cards.forEach(c => observer.unobserve(c));
    }, [selectedStoryId, stories]);

    useEffect(() => {
        if (showPrizeModal && !isDeciphered) {
            const msg = "CLASSIFIED LEAK: FREE YEAR OF WISE WOLF MEMBERSHIP UNLOCKED ($80 VALUE FREE)";
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
            let i = 0;
            const iv = setInterval(() => {
                setDecipherText(msg.split('').map((c, idx) => c === ' ' ? ' ' : idx < i / 20 * msg.length ? msg[idx] : chars[Math.floor(Math.random() * chars.length)]).join(''));
                i++;
                if (i > 20) { clearInterval(iv); setDecipherText(msg); setIsDeciphered(true); }
            }, 60);
            return () => clearInterval(iv);
        }
    }, [showPrizeModal, isDeciphered]);

    const startStory = (id) => { setSelectedStoryId(id); setInputs({}); setIsRevealed(false); setShareReady(false); };
    const clearSelection = () => { setSelectedStoryId(null); setInputs({}); setIsRevealed(false); setShareReady(false); };
    const handleInputChange = (id, val) => setInputs(p => ({ ...p, [id]: val }));

    const revealStory = async (e) => {
        e.preventDefault();
        if (!allFilled) return;
        setIsGenerating(true); setIsRevealed(false);
        const messages = [
            "Cross-referencing with classified island guest lists...",
            "Encrypting connection...",
            "Parsing FBI file...",
            "Redacting names so powerful people don't sue us...",
            "Decrypting Maxwell files...",
            "Translating from 'billionaire' to 'English'...",
            "Consulting lawyers...",
            "Contacting our legal team. They said 'publish it and run.'...",
            "Loading sad truths...",
            "Generating audio...",
            "Preparing evidence. Try not to make eye contact with the names."
        ];
        let idx = 0; setLoadingMessage(messages[0]);
        const iv = setInterval(() => { idx++; if (idx < messages.length) setLoadingMessage(messages[idx]); }, 3330);
        let plain = activeStory.text;
        placeholders.forEach(p => { plain = plain.replace(p.original, inputs[p.id]); });
        plain += " Generated by Sad Libs at W W W dot sad libs dot online.";
        let audioToPlay = null;
        const tts = fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: plain }) })
            .then(async r => { if (r.ok) { const b = await r.blob(); const u = URL.createObjectURL(b); setActiveAudioUrl(u); audioToPlay = new Audio(u); audioRef.current = audioToPlay; } })
            .catch(console.error);
        await Promise.all([tts, new Promise(res => setTimeout(res, 20000))]);
        clearInterval(iv); setIsGenerating(false); setIsRevealed(true);
        const nc = completedGames + 1; setCompletedGames(nc);
        if (audioToPlay) {
            audioToPlay.onended = () => { setShareReady(true); if (nc === 1) setShowPrizeModal(true); };
            audioToPlay.play().catch(() => { setShareReady(true); if (nc === 1) setShowPrizeModal(true); });
        } else { setShareReady(true); if (nc === 1) setTimeout(() => setShowPrizeModal(true), 3000); }
    };

    const handleShare = (platform) => {
        const nc = shareCount + 1; setShareCount(nc); localStorage.setItem('sadlibs_share_count', nc); setHasSharedInExitModal(true);
        const url = 'https://sadlibs.vercel.app';
        const t = encodeURIComponent("I just found this Epstein files Mad Libs game and I need someone to suffer with me:");
        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${t}`, '_blank');
        if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'copy') { navigator.clipboard.writeText(`I just found this Epstein files Mad Libs game and I need someone to suffer with me: ${url}`); alert('Copied.'); }
    };

    const handleShareStory = async (platform) => {
        if (!storyRevealRef.current || isProcessingMeme) return;
        setIsProcessingMeme(true);
        let tw = null;
        if (platform === 'twitter') { tw = window.open('', '_blank'); if (tw) tw.document.write('<p style="font-family:monospace;padding:2rem">Preparing your story image...</p>'); }
        try {
            const canvas = await html2canvas(storyRevealRef.current, {
                backgroundColor: '#020617', scale: 2, logging: false,
                ignoreElements: el => el.classList.contains('export-ignore'),
                onclone: d => { const w = d.querySelector('.cta-watermark'); if (w) w.style.display = 'block'; }
            });
            const b64 = canvas.toDataURL('image/png').split(',')[1];
            const up = await fetch('/api/upload-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: b64 }) });
            const ud = await up.json();
            if (!up.ok || !ud.url) throw new Error('upload fail');
            const imgUrl = ud.url;
            const nc = shareCount + 1; setShareCount(nc); localStorage.setItem('sadlibs_share_count', nc); setHasSharedInExitModal(true);
            const sn = activeStory ? activeStory.title : 'an Epstein leak';
            const st = `I just found "${sn}" in the Epstein files and now I need someone to suffer with me:`;
            const appUrl = 'https://sadlibs.vercel.app';
            const cardUrl = `${appUrl}/api/share?img=${encodeURIComponent(imgUrl)}`;
            if (platform === 'twitter') {
                if (navigator.canShare) {
                    canvas.toBlob(async blob => {
                        const f = new File([blob], 'epstein-leak.png', { type: 'image/png' });
                        if (navigator.canShare({ files: [f] })) {
                            if (tw) tw.close();
                            try { await navigator.share({ files: [f], text: st, url: appUrl }); } catch (e) { }
                            setIsProcessingMeme(false); return;
                        }
                        const tu = `https://twitter.com/intent/tweet?text=${encodeURIComponent(st)}&url=${encodeURIComponent(cardUrl)}`;
                        if (tw) tw.location.href = tu; else window.open(tu, '_blank');
                        setIsProcessingMeme(false);
                    }, 'image/png'); return;
                }
                const tu = `https://twitter.com/intent/tweet?text=${encodeURIComponent(st)}&url=${encodeURIComponent(cardUrl)}`;
                if (tw) tw.location.href = tu; else window.open(tu, '_blank');
            } else if (platform === 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`, '_blank');
            } else if (platform === 'native') {
                canvas.toBlob(async blob => {
                    const f = new File([blob], 'epstein-leak.png', { type: 'image/png' });
                    try { await navigator.share({ files: [f], text: st, url: appUrl }); } catch (e) { }
                    setIsProcessingMeme(false);
                }, 'image/png'); return;
            } else if (platform === 'copy') {
                navigator.clipboard.writeText(`${st}\n${cardUrl}`); alert('Copied.');
            }
        } catch (err) { console.error(err); if (tw) tw.close(); alert('Failed to prepare image. Try again.'); }
        finally { setIsProcessingMeme(false); }
    };

    const handleReplayAudio = () => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } };

    const handlePrizeEmail = async (e) => {
        e.preventDefault(); setPrizeModalStatus('loading');
        try {
            const r = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ email: prizeEmail, _subject: 'New VIP Claim!', _captcha: 'false' }) });
            setPrizeModalStatus(r.ok ? 'success' : 'error');
            if (r.ok) setTimeout(() => setShowPrizeModal(false), 3000);
        } catch { setPrizeModalStatus('error'); }
    };

    const handleExitEmail = async (e) => {
        e.preventDefault(); setExitModalStatus('loading');
        try {
            const r = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ email: exitEmail, _subject: 'New VIP Claim!', _captcha: 'false' }) });
            setExitModalStatus(r.ok ? 'success' : 'error');
            if (r.ok) setTimeout(() => setShowExitModal(false), 3000);
        } catch { setExitModalStatus('error'); }
    };

    const renderFinalStory = () => {
        if (!activeStory) return null;
        let r = activeStory.text;
        placeholders.forEach(p => { r = r.replace(p.original, `<span class="av2-inserted">${inputs[p.id]}</span>`); });
        return <p className="av2-story-text" dangerouslySetInnerHTML={{ __html: r }} />;
    };

    return (
        <>
            <audio ref={themeAudioRef} src={themeSong} loop playsInline />

            {/* Mute button — same as main site */}
            <button className="av2-mute-btn" onClick={toggleMute}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {/* ── HERO ─────────────────────────────────── */}
            <section className={`av2-hero ${heroLoaded ? 'loaded' : ''}`}>
                <div className={`av2-hero-bg ${glitching ? 'glitch-anim' : ''}`} style={{ backgroundImage: `url(${BGS[bgIndex]})` }} />
                <div className="av2-hero-vignette" />
                <div className="av2-hero-content">
                    <p className="av2-hero-eyebrow">THE WISE WOLF PRESENTS</p>
                    <img src={logo} alt="SadLibs" className="av2-hero-logo" />

                    <div className="av2-play-container">
                        <span className="av2-play-arrow">➤</span>
                        <button className="av2-cta av2-hero-play-main" onClick={() => { startMusic(); document.getElementById('av2-stories').scrollIntoView({ behavior: 'smooth' }); }}>
                            Play Sad Libs
                        </button>
                        <span className="av2-play-arrow right-arrow">➤</span>
                    </div>

                    <img src={heroCard} alt="SadLibs game" className="av2-hero-card" />

                    <div className="av2-hero-btns" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                        <a href="https://www.wisewolf.club" target="_blank" rel="noopener noreferrer" className="av2-cta av2-wisewolf-btn">
                            <span className="ww-frame ww-1">Hate Bullshit?</span>
                            <span className="ww-frame ww-2">Read The Wise Wolf</span>
                        </a>
                        <button className="av2-ghost-btn" onClick={() => setShowNamesModal(true)}>
                            Names on the File
                        </button>
                    </div>

                    <div className="av2-play-container">
                        <span className="av2-play-arrow">➤</span>
                        <button className="av2-cta av2-hero-play-main" onClick={() => { startMusic(); document.getElementById('av2-stories').scrollIntoView({ behavior: 'smooth' }); }}>
                            Play Sad Libs
                        </button>
                        <span className="av2-play-arrow right-arrow">➤</span>
                    </div>
                </div>
                <div className="av2-scroll-hint">scroll ↓</div>
            </section>

            {/* ── STORY SELECTION ──────────────────────── */}
            <section id="av2-stories" className="av2-stories-section">
                <div className="av2-section-intro">
                    <h2 className="av2-section-title">Choose Your Depressing Adventure</h2>
                    <p className="av2-section-desc">
                        These are real emails from the federally unsealed Epstein document dump. The blanks are where the government put black marker over names that belong to people you definitely recognize. Fill them in with anything. <strong>Donald Trump</strong> will then read the result back to you, adding a layer of dystopian horror we frankly didn't need. Your lawyers cannot help you.
                    </p>
                </div>

                {!selectedStoryId ? (
                    <div className="av2-grid">
                        {stories.map((story, i) => (
                            <button key={story.id} className="av2-card av2-fly-in" style={{ '--av2-card-delay': `${(i % 3) * 0.15}s` }} onClick={() => startStory(story.id)}>
                                <span className="av2-card-num">FILE {String(i + 1).padStart(3, '0')}</span>
                                <h3 className="av2-card-title">{story.title}</h3>
                                <p className="av2-card-hook">{story.hook}</p>
                                <span className="av2-card-cta">Open this file →</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div ref={storyContainerRef} className="av2-active-story">
                        <button className="av2-back" onClick={clearSelection}>← Back to Files</button>

                        {isGenerating ? (
                            <div className="av2-generating">
                                <div className="av2-spinner" />
                                <p className="av2-loading-msg">{loadingMessage}</p>
                                <div className="av2-bar"><div className="av2-bar-fill" /></div>
                            </div>
                        ) : !isRevealed ? (
                            <div className="av2-form-wrap">
                                <div className="av2-form-header">
                                    <div className="av2-clearance-tag">
                                        CLEARANCE LEVEL: TOP SECRET &nbsp;|&nbsp; Only {storyRarity}% of readers accessed this file.
                                    </div>
                                    <h3 className="av2-form-title">{activeStory.title}</h3>
                                    <p className="av2-form-sub">The following was a real email. Some words have been removed by the government, which is fine because they do that. Add your own. The computer will read it back with complete sincerity. Whatever happens next is technically your fault.</p>
                                </div>
                                <form onSubmit={revealStory}>
                                    <div className="av2-inputs">
                                        {placeholders.map(p => (
                                            <div key={p.id} className="av2-field">
                                                <label className="av2-label">{p.type}</label>
                                                <input
                                                    type="text"
                                                    className="av2-input"
                                                    value={inputs[p.id] || ''}
                                                    onChange={e => handleInputChange(p.id, e.target.value)}
                                                    placeholder={`enter ${p.type}...`}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button type="submit" className="av2-submit" disabled={!allFilled}>
                                        {allFilled ? 'Declassify This Document' : 'Fill all fields to proceed'}
                                    </button>
                                    <p className="av2-pro-tip"><strong>Important Note:</strong> The filthier your words, the more historically accurate this becomes. You are performing a public service.</p>
                                </form>
                            </div>
                        ) : (
                            <div className="av2-reveal" ref={storyRevealRef}>
                                <div className="av2-clearance-tag" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
                                    CLEARANCE LEVEL: TOP SECRET &nbsp;|&nbsp; Only {storyRarity}% of readers accessed this file.
                                </div>
                                <div className="av2-joke-section">
                                    <h3 className="av2-reveal-title">THE REDACTED VERSION:</h3>
                                    {renderFinalStory()}
                                </div>
                                <div className="av2-avatar-wrap">
                                    <img src={trumpAvatar} alt="Witness testimony" className="av2-trump" />
                                </div>
                                <div className="av2-watermark cta-watermark">
                                    CREATE YOUR OWN EPSTEIN LEAK AT SADLIBS.VERCEL.APP
                                </div>
                                {/* Share buttons */}
                                <div className="av2-share-section export-ignore">
                                    <p className="av2-share-proof">{shareCount.toLocaleString()} people have shared this. Statistically, at least one of them has their name in the Epstein documents.</p>
                                    <div className={`av2-share-row${shareReady ? ' share-ready' : ''}`}>
                                        {typeof navigator !== 'undefined' && navigator.share && (
                                            <button onClick={() => handleShareStory('native')} className="av2-action-btn native" disabled={isProcessingMeme}>
                                                {isProcessingMeme ? 'Preparing evidence...' : 'Share Image to Any App'}
                                            </button>
                                        )}
                                        <button onClick={() => handleShareStory('twitter')} className="av2-action-btn share-x" disabled={isProcessingMeme}>
                                            {isProcessingMeme ? 'Preparing evidence...' : 'Post to X Before It Gets Redacted'}
                                        </button>
                                        <button onClick={() => handleShareStory('facebook')} className="av2-action-btn share-fb" disabled={isProcessingMeme}>
                                            {isProcessingMeme ? 'Preparing evidence...' : 'Post to Facebook (Wake Up Your Uncle)'}
                                        </button>
                                        <button onClick={handleReplayAudio} className="av2-action-btn replay" disabled={!activeAudioUrl}>
                                            Hear It Again (Seriously Though)
                                        </button>
                                        <button onClick={() => handleShareStory('copy')} className="av2-action-btn copy-ev" disabled={isProcessingMeme}>
                                            Copy Evidence
                                        </button>
                                    </div>
                                </div>
                                {/* Truth section */}
                                <div className="av2-truth export-ignore">
                                    <h4 className="av2-truth-label">The Actual Email. Which Is Real. Which Is Why We Are All Like This.</h4>
                                    <blockquote className="av2-quote">{activeStory.realQuote}</blockquote>
                                    <div className="av2-sources">
                                        {activeStory.sources.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="av2-source">→ {s.name}</a>)}
                                    </div>
                                </div>
                                <button onClick={clearSelection} className="av2-next">Open Another File (There Are 13)</button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* ── FOOTER SHARE ─────────────────────────── */}
            <div className="av2-footer-share">
                <h3>{shareCount.toLocaleString()} people have shared this. Statistically, at least one of them is currently being deposed.</h3>
                <div className="av2-share-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button onClick={() => handleShare('twitter')} className="av2-action-btn share-x">Share on X</button>
                    <button onClick={() => handleShare('facebook')} className="av2-action-btn share-fb">Share on Facebook</button>
                    <button onClick={() => handleShare('copy')} className="av2-action-btn copy-ev">Copy Link</button>
                </div>
            </div>

            <div className="av2-merch">
                <a href="https://www.bonfire.com/store/the-wise-wolf-merch/" target="_blank" rel="noopener noreferrer">
                    <img src={merchImg} alt="Get a tee" className="av2-merch-img" />
                </a>
            </div>

            <footer className="av2-footer">
                <p>Made by The Wise Wolf &copy; {new Date().getFullYear()} &nbsp;·&nbsp; <a href="mailto:douchecoded@gmail.com">douchecoded@gmail.com</a></p>
                <p>Designed by <a href="http://www.acheapdesigner.com" target="_blank" rel="noopener noreferrer">acheapdesigner.com</a> &nbsp;·&nbsp; Not affiliated with the FBI. Yet.</p>
            </footer>

            {/* Corner Decals */}
            <img src={sadGirlImg} alt="Sad Girl Mascot" className="corner-decal left" />
            <img src={funForAllAgesImg} alt="Fun for All Ages" className="corner-decal right" />

            {/* ── NAMES MODAL ───────────────────────────── */}
            {showNamesModal && (
                <div className="av2-overlay" onClick={() => setShowNamesModal(false)}>
                    <div className="av2-modal" onClick={e => e.stopPropagation()}>
                        <h2>Names on the File</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.6 }}>People who appear in the unsealed Epstein documents. Appearing in a court file does not mean you're guilty. It just means you need better judgment about who you email.</p>
                        <div className="av2-names">
                            {NAMES_DATA.map((n, i) => <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="av2-name">{n.name}</a>)}
                        </div>
                        <p className="av2-disclaimer">Appearing in unsealed court documents does not constitute a criminal conviction. It does, however, constitute an interesting Thanksgiving conversation.</p>
                        <button className="av2-close" onClick={() => setShowNamesModal(false)}>Close Archive</button>
                    </div>
                </div>
            )}

            {/* ── EXIT MODAL ────────────────────────────── */}
            {showExitModal && (
                <div className="av2-overlay" onClick={() => setShowExitModal(false)}>
                    <div className="av2-modal" onClick={e => e.stopPropagation()}>
                        <h2>Wait. Before you go.</h2>
                        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1rem' }}>
                            A prominent New York socialite offered to personally acquire Jeffrey Epstein an African baby. As a gift. She then offered to "neutralize" a journalist, also as a gift. This is one email. That she sent. From her real email address. More people need to see this.
                        </p>
                        <img src={babyEmailImg} alt="The baby email" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />
                        {!hasSharedInExitModal ? (
                            <>
                                <p style={{ color: '#f1f5f9', marginBottom: '1rem', fontWeight: 600 }}>Takes two seconds. The government would prefer you didn't.</p>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button onClick={() => handleShare('twitter')} className="av2-action-btn share-x" style={{ flex: 1 }}>Post to X</button>
                                    <button onClick={() => handleShare('facebook')} className="av2-action-btn share-fb" style={{ flex: 1 }}>Post to Facebook</button>
                                </div>
                                <button style={{ display: 'block', width: '100%', marginTop: '0.75rem', background: 'none', border: 'none', color: '#475569', fontSize: '0.8rem', cursor: 'pointer', padding: '0.5rem' }} onClick={() => setShowExitModal(false)}>
                                    No thanks, I support the cover-up.
                                </button>
                            </>
                        ) : exitModalStatus !== 'success' ? (
                            <>
                                <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.7 }}>
                                    Good. Leave your email for a free year of The Wise Wolf ($80 value). We will not sell it to anyone. Probably.
                                </p>
                                <form onSubmit={handleExitEmail} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <input type="email" placeholder="Email address..." value={exitEmail} onChange={e => setExitEmail(e.target.value)} required className="av2-input" style={{ flex: 1 }} />
                                    <button type="submit" className="av2-submit" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                                        {exitModalStatus === 'loading' ? 'Sending...' : 'Claim Free Year'}
                                    </button>
                                </form>
                                <button className="av2-close" style={{ marginTop: '1rem' }} onClick={() => setShowExitModal(false)}>Fine. Close This.</button>
                            </>
                        ) : (
                            <p style={{ color: '#4ade80' }}>Done. We'll be in touch. Don't let anyone redact this email.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ── PRIZE MODAL ───────────────────────────── */}
            {showPrizeModal && (
                <div className="av2-overlay">
                    <div className="av2-modal">
                        {isDeciphered && prizeModalStatus !== 'success' ? (
                            <>
                                <h2 style={{ fontSize: '1rem', letterSpacing: '0.05em', fontFamily: 'var(--mono-family)' }}>{decipherText}</h2>
                                {!hasSharedInExitModal ? (
                                    <>
                                        <p style={{ color: '#94a3b8', margin: '1rem 0', lineHeight: 1.7 }}>
                                            Share this. Your uncle who still forwards chain emails will love it. A free year of The Wise Wolf ($80 value) is waiting. The 60,000 people who already subscribe made an excellent life decision.
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            <button onClick={() => handleShare('twitter')} className="av2-action-btn share-x" style={{ flex: 1 }}>SHARE ON X</button>
                                            <button onClick={() => handleShare('facebook')} className="av2-action-btn share-fb" style={{ flex: 1 }}>SHARE ON FACEBOOK</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ color: '#94a3b8', margin: '1rem 0', lineHeight: 1.7 }}>
                                            Leave your email. We will not sell it to anyone. Probably.
                                        </p>
                                        <form onSubmit={handlePrizeEmail} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                            <input type="email" placeholder="Email address..." value={prizeEmail} onChange={e => setPrizeEmail(e.target.value)} required className="av2-input" style={{ flex: 1 }} />
                                            <button type="submit" className="av2-submit" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                                                {prizeModalStatus === 'loading' ? 'Sending...' : "Claim Free Year (It's Real)"}
                                            </button>
                                        </form>
                                    </>
                                )}
                                <button className="av2-close" onClick={() => setShowPrizeModal(false)} style={{ marginTop: '1rem' }}>Close</button>
                            </>
                        ) : prizeModalStatus === 'success' ? (
                            <p style={{ color: '#4ade80' }}>Done. We'll be in touch. Don't let anyone redact this email.</p>
                        ) : (
                            <p style={{ color: '#94a3b8' }}>Deciphering classified documents...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

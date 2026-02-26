import { useState, useMemo, useEffect, useRef } from 'react'
import './alt.css';
import logo from '../images/logo.png';
import babyEmailImg from '../images/babyemail.webp';
import trumpAvatar from '../images/trumptalking.gif';
import heroCard from '../images/herocard.png';
import sadGirlImg from '../images/sadgirl.png';
import funForAllAgesImg from '../images/fun4allages.png';
import merchImg from '../images/buyatee.png';
import chan4img from '../images/sadlibs4chan.gif';
import bloodImg from '../images/bloodspatter.gif';
import themeSong from '../audio/sad.mp3';
import html2canvas from 'html2canvas';

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
    { id: 'lolita-2017', title: 'The "Lolita" Scouting Email (2017)', text: 'It was a very [adjective] day in the [place] when a confidential, highly-paid [noun] wrote a top-secret message to their billionaire boss. They had just finished dining on a platter of [plural noun] when they decided to send an urgent update. "Boss, I met [person\'s name] today while I was [verb ending in -ing] near the [noun]. Let me tell you, she is exactly like [proper noun] from that famous book about the [adjective] [noun]. She is basically a [adjective] miniature :) I couldn\'t believe my [body part (plural)]. So now, moving forward, as we plan our next [adjective] retreat to [country], should I just send you her specific type of [plural noun] from now on? Please reply [adverb] before the authorities [verb]!"', realQuote: '"I met [REDACTED] today. She is like Lolita from Nabokov, femme miniature :) So now I should send you her type of candidates only?"', sources: [{ name: 'CNN, "13 of the most questionable redactions from the Epstein files"', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'littlest-girl-2014', title: 'The "Littlest Girl" Email (2014)', text: 'A high-profile guest had a very [adjective] evening vacationing on the infamous island of [fictional place]. The next morning, after drinking a tall glass of [liquid], they hastily typed out a thank you note on their customized [noun]: "Dear Jeffrey, Thank you for such a [adjective] night. You are quite the [noun], and your mansion smells like [noun]. By the way, your [adjective] girl was a [adverb] naughty, which made the whole [event] totally [adjective]. We should definitely [verb] her the next time we ride the [mode of transportation] together!" (Note: The sender was confirmed to be a [noun] by Rep. Massie).', realQuote: '"Thank you for a fun night… Your littlest girl was a little naughty." (Rep. Massie confirmed the sender was a woman).', sources: [{ name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'beautiful-little-girl-2014', title: 'The "Beautiful Little Girl" Email (2014)', text: '"I simply can\'t take it anymore!!!!!!!" the frantic email began, sent at exactly [time] in the morning. "I was just walking down [street name] wearing my favorite [article of clothing] to get my morning [noun]. Suddenly, I looked past the [noun] and I saw the most [adjective] [adjective] girl. She had incredibly long, [adjective], [color] hair that flowed like a river of [plural noun]. My heart started [verb ending in -ing] uncontrollably! We need to [verb] her immediately before the [group of people] find out and cancel my [noun] subscription!"', realQuote: '"I can\'t take it anymore!!!!!!! I just saw the most beautiful little girl on Madison with long soft blonde hair."', sources: [{ name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'brazilian-2013', title: 'The "New Brazilian" Modeling Agency Email (2013)', text: 'An enthusiastic agent from the prestigious [adjective] modeling agency fired off a quick, breathless message right after eating a large [food item]: "Good news, boss! A new [nationality] has just arrived in town on a giant [mode of transportation]. She is extremely [adjective] and [adverb] [adjective]. When I asked her age, the paperwork said she was only [number]yo!"', realQuote: '"New Brazilian just arrived, sexy and cute, 19yo." (Formatting glitch replaced "1" with "=" causing some to read it as 9yo. CNN confirmed it said 19).', sources: [{ name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'young-poor-2018', title: 'The "Young Poor" Scouting Email (2018)', text: 'The daily scouting report arrived at midnight: "Boss, I scoured the streets of [city] and found at least [number] very good, young, [adjective] prospects. But honestly, we was so [adjective] from [verb ending in -ing] all day that we couldn\'t even [verb] them." A quick follow-up: "You definitely need to meet this specific one. She\'s not exactly the beauty [noun] of the group, and she talks like a [animal], but we both really likes her a [noun]. Can we send her over in a [mode of transportation]?"', realQuote: '"I found at least 3 very good young poor but we was so tired." Follow-up: "Meet this one, not the beauty queen but we both likes her a lot."', sources: [{ name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'attia-crude', title: "Peter Attia's Crude Exchange", text: 'A well-known doctor emailed the billionaire with the bizarre subject line "[adjective]". In the body: "The [noun] is, indeed, very low carb. It pairs excellently with [food item]. However, I am still waiting on my lab assistant, [name], for the results on the [noun] content." Later, he received a shockingly inappropriate [noun] in reply. He responded: "Please, for the love of [deity], tell me that you found that [noun] online somewhere... you absolute [insult]."', realQuote: 'Subject line "confirmed" — body: "Pussy is, indeed, low carb. Still awaiting results on gluten content." Epstein sent Attia a picture; Attia replied: "Please tell you found that picture on line…bastard."', sources: [{ name: 'NBC News, "Epstein files live updates"', url: 'https://www.nbcnews.com/politics/justice-department/live-blog/epstein-files-trump-doj-release-live-updates-rcna256639' }] },
    { id: 'peggy-african', title: "Peggy Siegal's \"African Baby\" Email", text: 'High-society PR maven Peggy Siegal had a unique offer: she casually offered to procure him an [nationality] [noun], "or maybe two, if you\'d like to fill up the [room in a house]!" To sweeten the deal, she even offered to completely "[verb]" a pesky journalist named Tina Brown. "Just say the word, and she\'ll be swimming with the [plural animal]," Peggy joked, sipping her [liquid].', realQuote: 'PR maven Peggy Siegal offered to get Epstein an African baby "or two" and offered to "neutralize" journalist Tina Brown on his behalf.', sources: [{ name: 'Zeteo, "17 of the Craziest Emails in the Epstein Files"', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' }] },
    { id: 'fake-wife', title: 'The "Fake Wife" Solicitation', text: 'Someone decided Epstein needed a massive PR makeover. So, they offered him a "fake [noun]" to legitimize his status at fancy [plural noun]. The ideal candidate was hyper-specific: an exactly [number]-year-old, [nationality], [religion] [noun] who wouldn\'t ask too many questions about the [plural noun] in the basement. She also had to be willing to pretend to enjoy eating [food item] while [verb ending in -ing] on a yacht.', realQuote: 'Epstein was offered a "fake wife" — ideal candidate described as a 50-year-old, Russian, Jewish woman.', sources: [{ name: 'Zeteo, "17 of the Craziest Emails..."', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' }] },
    { id: 'larry-summers-2017', title: 'Larry Summers Gossiping About Trump (2017)', text: 'A very prominent former Treasury [noun] emailed his old pal with a juicy political scoop: "Just between us," he wrote from his underground [place], "How [adjective] do you really think Donald is?" They casually proceeded to chat like two [plural animal] about whether [country] had orchestrated a massive [noun] to help Trump win the [year] election over [a politician]. "If he goes down, we might lose our access to the [adjective] [noun]," he lamented.', realQuote: 'Former Treasury Secretary Summers emailed Epstein: "How guilty is Donald?" — discussing whether Russia helped Trump win in 2016.', sources: [{ name: 'CNN, "DOJ releases millions of pages..."', url: 'https://www.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }] },
    { id: 'kathy-ruemmler-2014', title: 'The Kathy Ruemmler Email (2014)', text: 'A former high-ranking White House [noun] was stepping down from consideration for U.S. Attorney General. What did she do first? She fired off a highly [adjective] draft of her public statement directly to the billionaire using her secure [noun]. She eagerly asked for his [noun] and his [noun] before publishing it to the [adjective] press. "Do you think this makes me look too [adjective]?" she typed, nervously pacing around her [room in a house].', realQuote: "Obama's former White House Counsel sent Epstein a draft public statement declining consideration for U.S. Attorney General — and asked Epstein for his feedback.", sources: [{ name: 'CNN, "DOJ releases millions of pages..."', url: 'https://edition.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }] },
    { id: 'spacex-shirt-2013', title: 'The SpaceX Shirt Photo (2013)', text: 'A deeply [adjective] contact sent a very strange email at [time] P.M. It contained absolutely no [noun] in the body — completely blank, save for a single attachment: a photo of a [noun] awkwardly posing next to a giant [noun] while wearing a tight [company] t-shirt. "What does this mean?" the billionaire wondered, scratching his [body part]. "Are we going to [planet]?"', realQuote: 'A redacted person sent Epstein an email with no text — just a photo of a female posing in a SpaceX shirt.', sources: [{ name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }] },
    { id: 'peter-mandelson', title: 'The Peter Mandelson Leak', text: 'Disturbing emails suggest Britain\'s former [job title] reached top-tier betrayal levels. He point-blank shared highly [adjective] UK government secrets, classified [plural noun], and confidential EU [adjective] data directly with the billionaire financier! And he did all this while officially serving in the Prime Minister\'s [noun]. Rumor has it, he hid the USB drives inside a hollowed-out [food item] and delivered them via a trained [animal].', realQuote: "Emails suggest Britain's former Ambassador to the U.S., Peter Mandelson, shared confidential UK government and EU financial information with Epstein while serving in PM Gordon Brown's cabinet.", sources: [{ name: 'CBS News, "Massive trove of Epstein files released..."', url: 'https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/' }] },
    { id: 'lawmakers', title: 'BONUS: What Lawmakers Saw', text: 'A prominent Representative stormed out of the vault after reviewing the unredacted files, his face looking very [adjective]. He reported seeing a clear reference to a [noun] as young as [number] years old, describing the entire situation as brutally "[adjective] and [adjective]." While banging his [noun] on a desk, he called out the "tons of completely [adjective] redactions" where powerful names were hidden for what he called "[adjective] or [adjective] or flat out [adjective] reasons!"', realQuote: 'Rep. Jamie Raskin saw a reference to a girl as young as 9, calling it "gruesome and grim." He noted "tons of completely unnecessary redactions" with names hidden "for mysterious or baffling or inscrutable reasons."', sources: [{ name: 'The full DOJ document repository', url: 'https://www.justice.gov/epstein/doj-disclosures' }] },
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
    const [volume, setVolume] = useState(2);
    const [shareCount, setShareCount] = useState(() => parseInt(localStorage.getItem('sadlibs_share_count')) || 1300);
    const [heroLoaded, setHeroLoaded] = useState(false);

    const [isMuted, setIsMuted] = useState(false);
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

    // Hero entrance animation
    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Theme song
    useEffect(() => {
        const audio = themeAudioRef.current;
        if (!audio) return;
        const startOnInteraction = () => {
            if (audio && audio.paused) {
                audio.volume = volume / 100;
                audio.play().then(() => {
                    ['mousemove', 'click', 'keydown', 'touchstart', 'scroll'].forEach(e => window.removeEventListener(e, startOnInteraction));
                }).catch(() => { });
            }
        };
        audio.volume = volume / 100;
        audio.play().catch(() => {
            ['mousemove', 'click', 'keydown', 'touchstart', 'scroll'].forEach(e => window.addEventListener(e, startOnInteraction));
        });
    }, []);

    // Auto-scroll when generating
    useEffect(() => {
        if ((selectedStoryId || isGenerating || isRevealed) && storyContainerRef.current) {
            setTimeout(() => storyContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    }, [selectedStoryId, isGenerating, isRevealed]);

    // Exit intent
    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (e.clientY <= 20 && !document.querySelector('.alt-modal-overlay')) {
                const hasTriggered = sessionStorage.getItem('sadlibs_exit_triggered');
                if (!hasTriggered) {
                    setShowExitModal(true);
                    sessionStorage.setItem('sadlibs_exit_triggered', 'true');
                }
            }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, []);

    // Prize modal decipher
    useEffect(() => {
        if (showPrizeModal && !isDeciphered) {
            const finalMessage = "CLASSIFIED LEAK: FREE YEAR OF WISE WOLF MEMBERSHIP UNLOCKED ($80 VALUE FREE)";
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            let iterations = 0;
            const interval = setInterval(() => {
                setDecipherText(finalMessage.split('').map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iterations / 20 * finalMessage.length) return finalMessage[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(''));
                iterations++;
                if (iterations > 20) { clearInterval(interval); setDecipherText(finalMessage); setIsDeciphered(true); }
            }, 60);
            return () => clearInterval(interval);
        }
    }, [showPrizeModal, isDeciphered]);

    const startStory = (id) => { setSelectedStoryId(id); setInputs({}); setIsRevealed(false); setShareReady(false); };
    const clearSelection = () => { setSelectedStoryId(null); setInputs({}); setIsRevealed(false); setShareReady(false); };
    const handleInputChange = (id, value) => setInputs(prev => ({ ...prev, [id]: value }));

    const revealStory = async (e) => {
        e.preventDefault();
        if (!allFilled) return;
        setIsGenerating(true);
        setIsRevealed(false);

        const messages = [
            "Cross-referencing with classified island guest lists...",
            "Redacting names so powerful people don't sue us...",
            "Translating from 'billionaire' to 'English'...",
            "Contacting our legal team. They said 'publish it and run.'...",
            "Running spell-check. (Epstein's staff could not spell.)...",
            "Preparing evidence. Try not to make eye contact with the names."
        ];
        let msgIndex = 0;
        setLoadingMessage(messages[0]);
        const messageInterval = setInterval(() => {
            msgIndex++;
            if (msgIndex < messages.length) setLoadingMessage(messages[msgIndex]);
        }, 3330);

        let plainText = activeStory.text;
        placeholders.forEach(p => { plainText = plainText.replace(p.original, inputs[p.id]); });
        plainText += " Generated by Sad Libs at W W W dot sad libs dot online.";

        let audioToPlay = null;
        const ttsPromise = fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: plainText })
        }).then(async (res) => {
            if (res.ok) {
                const blob = await res.blob();
                const audioUrl = URL.createObjectURL(blob);
                setActiveAudioUrl(audioUrl);
                audioToPlay = new Audio(audioUrl);
                audioRef.current = audioToPlay;
            }
        }).catch(err => console.error("TTS error:", err));

        const animPromise = new Promise(resolve => setTimeout(resolve, 20000));
        await Promise.all([ttsPromise, animPromise]);

        clearInterval(messageInterval);
        setIsGenerating(false);
        setIsRevealed(true);

        const newCount = completedGames + 1;
        setCompletedGames(newCount);

        if (audioToPlay) {
            audioToPlay.onended = () => { setShareReady(true); if (newCount === 1) setShowPrizeModal(true); };
            audioToPlay.play().catch(() => { setShareReady(true); if (newCount === 1) setShowPrizeModal(true); });
        } else {
            setShareReady(true);
            if (newCount === 1) setTimeout(() => setShowPrizeModal(true), 3000);
        }
    };

    const handleShare = (platform) => {
        const newCount = shareCount + 1;
        setShareCount(newCount);
        localStorage.setItem('sadlibs_share_count', newCount);
        setHasSharedInExitModal(true);
        const shareUrl = 'https://sadlibs.vercel.app';
        const text = encodeURIComponent("I found this insane Epstein leak game and now I need someone to suffer with me:");
        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
        if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        if (platform === 'copy') { navigator.clipboard.writeText(`I found this insane Epstein leak game and now I need someone to suffer with me: ${shareUrl}`); alert('Copied.'); }
    };

    const handleShareStory = async (platform) => {
        if (!storyRevealRef.current || isProcessingMeme) return;
        setIsProcessingMeme(true);

        let twitterWindow = null;
        if (platform === 'twitter') {
            twitterWindow = window.open('', '_blank');
            if (twitterWindow) twitterWindow.document.write('<p style="font-family:monospace;padding:2rem">Preparing your story image...</p>');
        }

        try {
            const canvas = await html2canvas(storyRevealRef.current, {
                backgroundColor: '#0f0a08',
                scale: 2,
                logging: false,
                ignoreElements: (el) => el.classList.contains('export-ignore'),
                onclone: (d) => { const w = d.querySelector('.cta-watermark'); if (w) w.style.display = 'block'; }
            });

            const base64 = canvas.toDataURL('image/png').split(',')[1];
            const uploadRes = await fetch('/api/upload-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64 }) });
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok || !uploadData.url) throw new Error('Upload failed');
            const imageUrl = uploadData.url;

            const newCount = shareCount + 1;
            setShareCount(newCount);
            localStorage.setItem('sadlibs_share_count', newCount);
            setHasSharedInExitModal(true);

            const storyName = activeStory ? activeStory.title : 'an Epstein leak';
            const shareText = `I just found "${storyName}" in the Epstein files and now I need someone to suffer with me:`;
            const appUrl = 'https://sadlibs.vercel.app';
            const shareCardUrl = `${appUrl}/api/share?img=${encodeURIComponent(imageUrl)}`;

            if (platform === 'twitter') {
                if (navigator.canShare) {
                    canvas.toBlob(async (blob) => {
                        const file = new File([blob], 'epstein-leak.png', { type: 'image/png' });
                        if (navigator.canShare({ files: [file] })) {
                            if (twitterWindow) twitterWindow.close();
                            try { await navigator.share({ files: [file], text: shareText, url: appUrl }); } catch (e) { }
                            setIsProcessingMeme(false); return;
                        }
                        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareCardUrl)}`;
                        if (twitterWindow) twitterWindow.location.href = tweetUrl;
                        else window.open(tweetUrl, '_blank');
                        setIsProcessingMeme(false);
                    }, 'image/png');
                    return;
                }
                const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareCardUrl)}`;
                if (twitterWindow) twitterWindow.location.href = tweetUrl;
                else window.open(tweetUrl, '_blank');
            } else if (platform === 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareCardUrl)}`, '_blank');
            } else if (platform === 'native') {
                canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'epstein-leak.png', { type: 'image/png' });
                    try { await navigator.share({ files: [file], text: shareText, url: appUrl }); } catch (e) { }
                    setIsProcessingMeme(false);
                }, 'image/png');
                return;
            } else if (platform === 'copy') {
                navigator.clipboard.writeText(`${shareText}\n${shareCardUrl}`);
                alert('Copied.');
            }
        } catch (err) {
            console.error('Share failed:', err);
            if (twitterWindow) twitterWindow.close();
            alert('Failed to prepare image. Try again.');
        } finally {
            setIsProcessingMeme(false);
        }
    };

    const handleReplayAudio = () => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } };

    const handlePrizeEmailSubmit = async (e) => {
        e.preventDefault();
        setPrizeModalStatus('loading');
        try {
            const res = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ email: prizeEmail, _subject: 'New VIP Claim!', _captcha: 'false' }) });
            setPrizeModalStatus(res.ok ? 'success' : 'error');
            if (res.ok) setTimeout(() => setShowPrizeModal(false), 3000);
        } catch { setPrizeModalStatus('error'); }
    };

    const handleExitEmailSubmit = async (e) => {
        e.preventDefault();
        setExitModalStatus('loading');
        try {
            const res = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ email: exitEmail, _subject: 'New VIP Claim!', _captcha: 'false' }) });
            setExitModalStatus(res.ok ? 'success' : 'error');
            if (res.ok) setTimeout(() => setShowExitModal(false), 3000);
        } catch { setExitModalStatus('error'); }
    };

    const renderFinalStory = () => {
        if (!activeStory) return null;
        let resultText = activeStory.text;
        placeholders.forEach(p => {
            const inserted = `<span class="alt-inserted">${inputs[p.id]}</span>`;
            resultText = resultText.replace(p.original, inserted);
        });
        return <p className="alt-final-story" dangerouslySetInnerHTML={{ __html: resultText }} />;
    };

    return (
        <>
            <audio ref={themeAudioRef} src={themeSong} loop muted={isMuted} playsInline />

            {/* Volume control */}
            <div className="alt-volume">
                <button onClick={() => setIsMuted(!isMuted)} className="alt-mute-btn">{isMuted ? '🔇' : '🔊'}</button>
            </div>

            {/* HERO SECTION */}
            <section className={`alt-hero ${heroLoaded ? 'loaded' : ''}`}>
                <div className="alt-hero-bg" />
                <div className="alt-hero-content">
                    <div className="alt-hero-tag">UNSEALED 2024 — DECLASSIFIED MAD LIBS</div>
                    <h1 className="alt-hero-title">SAD<span>LIBS</span></h1>
                    <p className="alt-hero-sub">The Epstein Files, as read by someone who shouldn't have access to them.</p>
                    <img
                        src={chan4img}
                        alt="SadLibs"
                        className="alt-hero-image"
                        onError={(e) => { e.target.src = heroCard; }}
                    />
                    <div className="alt-hero-actions">
                        <button className="alt-cta-btn" onClick={() => document.getElementById('alt-files').scrollIntoView({ behavior: 'smooth' })}>
                            Open the Files
                        </button>
                        <button className="alt-link-btn" onClick={() => setShowNamesModal(true)}>
                            Names on the File
                        </button>
                    </div>
                    <p className="alt-hero-count">{shareCount.toLocaleString()} people have shared this. Several are no longer welcome at Thanksgiving.</p>
                </div>
                <div className="alt-scroll-hint">scroll down ↓</div>
            </section>

            {/* STORY SELECTION */}
            <section id="alt-files" className="alt-files-section">
                <div className="alt-section-header">
                    <span className="alt-section-tag">DOJ DOCUMENT ARCHIVE</span>
                    <h2 className="alt-section-title">Select a Case File</h2>
                    <p className="alt-section-sub">Each file is a real email from the Epstein document dump. Fill in the blanks. It's technically journalism.</p>
                </div>

                {!selectedStoryId ? (
                    <div className="alt-story-grid">
                        {stories.map((story, i) => (
                            <button
                                key={story.id}
                                className="alt-file-card"
                                onClick={() => startStory(story.id)}
                            >
                                <div className="alt-file-number">[{String(i + 1).padStart(3, '0')}]</div>
                                <div className="alt-file-title">{story.title}</div>
                                <div className="alt-file-footer">
                                    <span className="alt-file-stamp">CLASSIFIED</span>
                                    <span className="alt-file-cta">↗ Open File</span>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div ref={storyContainerRef} className="alt-story-container">
                        <button className="alt-back-btn" onClick={clearSelection}>← Back to Files</button>

                        {isGenerating ? (
                            <div className="alt-generating">
                                <div className="alt-spinner" />
                                <p className="alt-loading-msg">{loadingMessage}</p>
                                <div className="alt-progress-bar"><div className="alt-progress-fill" /></div>
                            </div>
                        ) : !isRevealed ? (
                            <div className="alt-form-container">
                                <div className="alt-form-header">
                                    <div className="alt-clearance-badge">
                                        <span>CLEARANCE LEVEL: TOP SECRET</span>
                                        <span className="alt-rarity">Only {storyRarity}% of readers accessed this file.</span>
                                    </div>
                                    <h3 className="alt-form-title">{activeStory.title}</h3>
                                    <p className="alt-form-instruction">Fill in the blanks. The filthier your answers, the more historically accurate this becomes.</p>
                                </div>
                                <form onSubmit={revealStory} className="alt-form">
                                    <div className="alt-inputs-grid">
                                        {placeholders.map(p => (
                                            <div key={p.id} className="alt-input-group">
                                                <label className="alt-label">{p.type}</label>
                                                <input
                                                    type="text"
                                                    className="alt-input"
                                                    value={inputs[p.id] || ''}
                                                    onChange={e => handleInputChange(p.id, e.target.value)}
                                                    placeholder={`enter ${p.type}...`}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button type="submit" className="alt-submit-btn" disabled={!allFilled}>
                                        {allFilled ? 'DECLASSIFY THIS DOCUMENT' : 'Fill all fields to proceed'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="alt-reveal" ref={storyRevealRef}>
                                <div className="alt-clearance-badge">
                                    <span>CLEARANCE LEVEL: TOP SECRET</span>
                                    <span className="alt-rarity">Only {storyRarity}% of readers accessed this file.</span>
                                </div>

                                <div className="alt-story-paper">
                                    <h3 className="alt-paper-title">The "Redacted" Version:</h3>
                                    {renderFinalStory()}
                                </div>

                                <div className="alt-witness">
                                    <img src={trumpAvatar} alt="Witness testimony" className="alt-trump" />
                                    <span className="alt-witness-label">WITNESS TESTIMONY</span>
                                </div>

                                <div className="alt-cta-watermark cta-watermark" style={{ display: 'none' }}>
                                    CREATE YOUR OWN EPSTEIN LEAK AT SADLIBS.VERCEL.APP
                                </div>

                                {/* Share section */}
                                <div className="alt-share-section export-ignore">
                                    <p className="alt-share-proof">{shareCount.toLocaleString()} people have shared this. Several are no longer welcome at Thanksgiving.</p>
                                    <div className={`alt-share-btns${shareReady ? ' share-ready' : ''}`}>
                                        {typeof navigator !== 'undefined' && navigator.share && (
                                            <button onClick={() => handleShareStory('native')} className="alt-share-btn native" disabled={isProcessingMeme}>
                                                {isProcessingMeme ? 'Preparing evidence...' : 'Share Image to Any App'}
                                            </button>
                                        )}
                                        <button onClick={() => handleShareStory('twitter')} className="alt-share-btn x" disabled={isProcessingMeme}>
                                            {isProcessingMeme ? 'Preparing evidence...' : 'Post to X Before It Gets Redacted'}
                                        </button>
                                        <button onClick={() => handleShareStory('facebook')} className="alt-share-btn fb" disabled={isProcessingMeme}>
                                            {isProcessingMeme ? 'Preparing evidence...' : 'Post to Facebook (Wake Up Your Uncle)'}
                                        </button>
                                        <button onClick={handleReplayAudio} className="alt-share-btn replay" disabled={!activeAudioUrl}>
                                            Hear It Again (Seriously Though)
                                        </button>
                                        <button onClick={() => handleShareStory('copy')} className="alt-share-btn copy" disabled={isProcessingMeme}>
                                            Copy Evidence
                                        </button>
                                    </div>
                                </div>

                                {/* Truth section */}
                                <div className="alt-truth-section export-ignore">
                                    <h4 className="alt-truth-title">The Ugly Truth:</h4>
                                    <blockquote className="alt-real-quote">{activeStory.realQuote}</blockquote>
                                    <div className="alt-sources">
                                        <span className="alt-sources-label">Sources:</span>
                                        {activeStory.sources.map((src, i) => (
                                            <a key={i} href={src.url} target="_blank" rel="noopener noreferrer" className="alt-source-link">{src.name}</a>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={clearSelection} className="alt-next-btn">Open Another File</button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* BOTTOM SHARE SECTION */}
            <section className="alt-bottom-share">
                <div className="alt-4chan-banner">
                    <img src={chan4img} alt="" className="alt-4chan-img" onError={e => e.target.style.display = 'none'} />
                </div>
                <h3 className="alt-bottom-headline">{shareCount.toLocaleString()} people have shared this game. Statistically, one of them regrets it.</h3>
                <div className="alt-bottom-btns">
                    <button onClick={() => handleShare('twitter')} className="alt-share-btn x">Share on X</button>
                    <button onClick={() => handleShare('facebook')} className="alt-share-btn fb">Share on Facebook</button>
                    <button onClick={() => handleShare('copy')} className="alt-share-btn copy">Copy Link</button>
                </div>
            </section>

            {/* MERCH */}
            <section className="alt-merch">
                <a href="https://www.bonfire.com/store/the-wise-wolf-merch/" target="_blank" rel="noopener noreferrer">
                    <img src={merchImg} alt="Buy a Tee" className="alt-merch-img" />
                </a>
            </section>

            {/* FOOTER */}
            <footer className="alt-footer">
                <p>Made by The Wise Wolf &copy; {new Date().getFullYear()} &nbsp;|&nbsp; <a href="mailto:douchecoded@gmail.com">douchecoded@gmail.com</a></p>
                <p className="alt-footer-sub">Website designed by <a href="http://www.acheapdesigner.com" target="_blank" rel="noopener noreferrer">www.acheapdesigner.com</a></p>
                <p className="alt-footer-sub">Not affiliated with the FBI. Yet.</p>
            </footer>

            {/* NAMES MODAL */}
            {showNamesModal && (
                <div className="alt-modal-overlay" onClick={() => setShowNamesModal(false)}>
                    <div className="alt-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="alt-modal-title">Names on the File</h2>
                        <div className="alt-names-list">
                            {NAMES_DATA.map((entry, i) => (
                                <a key={i} href={entry.url} target="_blank" rel="noopener noreferrer" className="alt-name-tag">{entry.name}</a>
                            ))}
                        </div>
                        <p className="alt-disclaimer">Appearing in unsealed court documents does not constitute a criminal conviction. It does, however, constitute an interesting dinner conversation.</p>
                        <button className="alt-close-btn" onClick={() => setShowNamesModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* EXIT MODAL */}
            {showExitModal && (
                <div className="alt-modal-overlay" onClick={() => setShowExitModal(false)}>
                    <div className="alt-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="alt-modal-title">Hold on a second.</h2>
                        <p className="alt-modal-body">A woman in these files offered to procure an African baby for Jeffrey Epstein. As a gift. We are not making this up. More people need to know about this.</p>
                        <img src={babyEmailImg} alt="The baby email" className="alt-evidence-img" />
                        {!hasSharedInExitModal ? (
                            <>
                                <p className="alt-modal-body">Share this before someone redacts it. Takes two seconds.</p>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                    <button onClick={() => handleShare('twitter')} className="alt-share-btn x" style={{ flex: 1 }}>Post to X</button>
                                    <button onClick={() => handleShare('facebook')} className="alt-share-btn fb" style={{ flex: 1 }}>Post to Facebook</button>
                                </div>
                                <button className="alt-skip-btn" onClick={() => setShowExitModal(false)}>No thanks, I don't care about babies.</button>
                            </>
                        ) : (
                            exitModalStatus !== 'success' ? (
                                <>
                                    <p className="alt-modal-body">Thanks. Leave your email for a free year of The Wise Wolf ($80 value). We will not sell it to anyone. Probably.</p>
                                    <form onSubmit={handleExitEmailSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                        <input type="email" placeholder="Email address..." value={exitEmail} onChange={e => setExitEmail(e.target.value)} required className="alt-input" style={{ flex: 1 }} />
                                        <button type="submit" className="alt-submit-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>{exitModalStatus === 'loading' ? 'Sending...' : "Claim It"}</button>
                                    </form>
                                    <button className="alt-close-btn" style={{ marginTop: '1rem' }} onClick={() => setShowExitModal(false)}>Fine. Close This.</button>
                                </>
                            ) : (
                                <p className="alt-modal-body" style={{ color: '#4ade80' }}>Done. We'll be in touch. Don't let anyone redact this email.</p>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* PRIZE MODAL */}
            {showPrizeModal && (
                <div className="alt-modal-overlay">
                    <div className="alt-modal">
                        {isDeciphered && prizeModalStatus !== 'success' ? (
                            <>
                                <h2 className="alt-modal-title" style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>{decipherText}</h2>
                                {!hasSharedInExitModal ? (
                                    <>
                                        <p className="alt-modal-body">Share the leaked document. Your uncle who still forwards chain emails will love this. In exchange: a free year of The Wise Wolf ($80 value).</p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                            <button onClick={() => handleShare('twitter')} className="alt-share-btn x" style={{ flex: 1 }}>SHARE ON X</button>
                                            <button onClick={() => handleShare('facebook')} className="alt-share-btn fb" style={{ flex: 1 }}>SHARE ON FACEBOOK</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="alt-modal-body">Leave your email. We will not sell it to anyone. Probably.</p>
                                        <form onSubmit={handlePrizeEmailSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                            <input type="email" placeholder="Email address..." value={prizeEmail} onChange={e => setPrizeEmail(e.target.value)} required className="alt-input" style={{ flex: 1 }} />
                                            <button type="submit" className="alt-submit-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>{prizeModalStatus === 'loading' ? 'Sending...' : "Claim Free Year (It's Real)"}</button>
                                        </form>
                                    </>
                                )}
                                <button className="alt-close-btn" onClick={() => setShowPrizeModal(false)} style={{ marginTop: '1rem' }}>Close</button>
                            </>
                        ) : prizeModalStatus === 'success' ? (
                            <p className="alt-modal-body" style={{ color: '#4ade80' }}>Done. We'll be in touch. Don't let anyone redact this email.</p>
                        ) : (
                            <p className="alt-modal-body">Deciphering classified documents...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

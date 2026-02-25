import { useState, useMemo, useEffect, useRef } from 'react'
import './index.css';
import logo from '../images/logo.png';
import babyEmailImg from '../images/babyemail.webp';
import trumpAvatar from '../images/trumptalking.gif';
import heroCard from '../images/herocard.png';
import sadGirlImg from '../images/sadgirl.png';
import funForAllAgesImg from '../images/fun4allages.png';
import merchImg from '../images/buyatee.png';
import themeSong from '../audio/sad.mp3';
import html2canvas from 'html2canvas';

const stories = [
    {
        id: 'lolita-2017',
        title: 'The "Lolita" Scouting Email (2017)',
        text: 'It was a very [adjective] day in the [place] when a confidential, highly-paid [noun] wrote a top-secret message to their billionaire boss. They had just finished dining on a platter of [plural noun] when they decided to send an urgent update. "Boss, I met [person\'s name] today while I was [verb ending in -ing] near the [noun]. Let me tell you, she is exactly like [proper noun] from that famous book about the [adjective] [noun]. She is basically a [adjective] miniature :) I couldn\'t believe my [body part (plural)]. So now, moving forward, as we plan our next [adjective] retreat to [country], should I just send you her specific type of [plural noun] from now on? Please reply [adverb] before the authorities [verb]!"',
        realQuote: '"I met [REDACTED] today. She is like Lolita from Nabokov, femme miniature :) So now I should send you her type of candidates only?"',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions from the Epstein files"', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }
        ]
    },
    {
        id: 'littlest-girl-2014',
        title: 'The "Littlest Girl" Email (2014)',
        text: 'A high-profile guest had a very [adjective] evening vacationing on the infamous island of [fictional place]. The next morning, after drinking a tall glass of [liquid], they hastily typed out a thank you note on their customized [noun]: "Dear Jeffrey, Thank you for such a [adjective] night. You are quite the [noun], and your mansion smells like [noun]. By the way, your [adjective] girl was a [adverb] naughty, which made the whole [event] totally [adjective]. We should definitely [verb] her the next time we ride the [mode of transportation] together!" (Note: The sender was confirmed to be a [noun] by Rep. Massie).',
        realQuote: '"Thank you for a fun night… Your littlest girl was a little naughty." (Rep. Massie confirmed the sender was a woman).',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..." (Feb 9, 2026)', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' },
            { name: 'NBC News, "Epstein files live updates" (Jan 30, 2026)', url: 'https://www.nbcnews.com/politics/justice-department/live-blog/epstein-files-trump-doj-release-live-updates-rcna256639' }
        ]
    },
    {
        id: 'beautiful-little-girl-2014',
        title: 'The "Beautiful Little Girl" Email (2014)',
        text: '"I simply can\'t take it anymore!!!!!!!" the frantic email began, sent at exactly [time] in the morning. "I was just walking down [street name] wearing my favorite [article of clothing] to get my morning [noun]. Suddenly, I looked past the [noun] and I saw the most [adjective] [adjective] girl. She had incredibly long, [adjective], [color] hair that flowed like a river of [plural noun]. My heart started [verb ending in -ing] uncontrollably! We need to [verb] her immediately before the [group of people] find out and cancel my [noun] subscription!"',
        realQuote: '"I can\'t take it anymore!!!!!!! I just saw the most beautiful little girl on Madison with long soft blonde hair."',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }
        ]
    },
    {
        id: 'brazilian-2013',
        title: 'The "New Brazilian" Modeling Agency Email (2013)',
        text: 'An enthusiastic agent from the prestigious [adjective] modeling agency fired off a quick, breathless message right after eating a large [food item]: "Good news, boss! A new [nationality] has just arrived in town on a giant [mode of transportation]. She is extremely [adjective] and [adverb] [adjective]. When I asked her age, the paperwork said she was only [number]yo!" \n\nA legendary typo in the original records replaced a "1" with an "=" sign, leading some internet sleuths to think she was a [number]-year-old [noun]! Thankfully, fact-checkers proved it was actually meant to be 19. Crisis [past tense verb]!',
        realQuote: '"New Brazilian just arrived, sexy and cute, 19yo." Attached images. (Formatting glitch replacing "1" with "=" caused some to initially read it as a 9-year-old. CNN confirmed it said 19).',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }
        ]
    },
    {
        id: 'young-poor-2018',
        title: 'The "Young Poor" Scouting Email (2018)',
        text: 'The daily scouting report arrived at midnight, written with a [color] pen on a napkin stained with [liquid]: "Boss, I scoured the streets of [city] and found at least [number] very good, young, [adjective] prospects. But honestly, we was so [adjective] from [verb ending in -ing] all day that we couldn\'t even [verb] them." \n\nA quick follow-up soon hit the inbox: "You definitely need to meet this specific one. She\'s not exactly the beauty [noun] of the group, and she talks like a [animal], but we both really likes her a [noun]. Can we send her over in a [mode of transportation]?"',
        realQuote: '"I found at least 3 very good young poor but we was so tired." Follow-up: "Meet this one, not the beauty queen but we both likes her a lot."',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' },
            { name: 'Mercury News, "13 questionable redactions..."', url: 'https://www.mercurynews.com/2026/02/09/jeffrey-epstein-files-13-questionable-redactions/' }
        ]
    },
    {
        id: 'lithuania-2018',
        title: 'The "Lithuania" Email (2018)',
        text: 'An associate sitting in a dimly lit [type of room] sent an email with an ironically attached [noun]: "Hey Jeffrey, look at this. This one is my absolute [adjective] discovery from the freezing winters of [country]! Her name is [name], she enjoys [verb ending in -ing], and she is currently [number] years old. She says her favorite food is [food item]. I will definitely meet up with her when I am traveling through [place] next month in my private [noun]."',
        realQuote: 'With an attached image: "My favorite from Lithuania, [REDACTED], 19. Will meet when I am there."',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }
        ]
    },
    {
        id: 'attia-crude',
        title: 'Peter Attia\'s Crude Exchange',
        text: 'A well-known doctor who specializes in [adjective] wellness emailed the billionaire with the bizarre subject line "[adjective]". In the body, instead of discussing medicine, he crassly stated: "[noun] is, indeed, very low carb. It pairs excellently with [food item]. However, I am still waiting on my lab assistant, [name], for the results on the [noun] content, though." \n\nLater, he received a shockingly inappropriate [noun] in reply. Mortified, he dropped his [noun] and responded: "Please, for the love of [deity], tell me that you found that [noun] online somewhere... you absolute [insult]."',
        realQuote: 'Subject line "confirmed" — body: "Pussy is, indeed, low carb. Still awaiting results on gluten content, though." In another exchange, Epstein sent Attia a picture, Attia replied: "Please tell you found that picture on line…bastard."',
        sources: [
            { name: 'NBC News, "Epstein files live updates"', url: 'https://www.nbcnews.com/politics/justice-department/live-blog/epstein-files-trump-doj-release-live-updates-rcna256639' }
        ]
    },
    {
        id: 'peggy-african',
        title: 'Peggy Siegal\'s "African Baby" Email',
        text: 'High-society PR maven Peggy Siegal, wearing her finest [article of clothing], had a unique offer for her billionaire friend who was busy [verb ending in -ing]. She casually offered to procure him an [nationality] [noun], "or maybe two, if you\'d like to fill up the [room in a house]!" \n\nTo sweeten the utterly [adjective] deal, she even offered to completely "[verb]" a pesky, [adjective] journalist named Tina Brown on his [noun]. "Just say the word, and she\'ll be swimming with the [plural animal]," Peggy joked, sipping her [liquid].',
        realQuote: 'PR maven Peggy Siegal offered to get Epstein an African baby "or two" and offered to "neutralize" journalist Tina Brown on his behalf.',
        sources: [
            { name: 'Zeteo, "17 of the Craziest Emails in the Epstein Files"', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' },
            { name: 'Original DOJ Document', url: 'https://www.justice.gov/epstein/files/DataSet%2011/EFTA02433105.pdf' }
        ]
    },
    {
        id: 'fake-wife',
        title: 'The "Fake Wife" Solicitation',
        text: 'Someone in the inner circle decided Epstein needed a massive PR makeover because his public image was looking very [adjective]. So, they offered him a "fake [noun]" to legitimize his status at fancy [plural noun]. \n\nThe ideal candidate was hyper-specific: an exactly [number]-year-old, [nationality], [religion] [noun] who wouldn\'t ask too many questions about the [plural noun] in the basement. She also had to be willing to pretend to enjoy eating [food item] while [verb ending in -ing] on a yacht.',
        realQuote: 'Epstein was offered a "fake wife" — ideal candidate described as a 50-year-old, Russian, Jewish woman.',
        sources: [
            { name: 'Zeteo, "17 of the Craziest Emails..."', url: 'https://zeteo.com/p/17-craziest-emails-epstein-files-woody-allen-elon-musk-donald-trump-steve-bannon-noam-chompsky-island-' },
            { name: 'Original DOJ Document', url: 'https://www.justice.gov/epstein/files/DataSet%209/EFTA00630701.pdf' }
        ]
    },
    {
        id: 'kathy-ruemmler-2014',
        title: 'The Kathy Ruemmler Email (2014)',
        text: 'A former high-ranking White House [noun] was stepping down from consideration for U.S. Attorney General. What did she do first? Instead of calling her [family member], she fired off a highly [adjective] draft of her public statement directly to the billionaire using her secure [noun]. \n\nShe eagerly asked for his [noun] and his [noun] before publishing it to the [adjective] press. "Do you think this makes me look too [adjective]?" she typed, nervously pacing around her [room in a house].',
        realQuote: 'Obama\'s former White House Counsel sent Epstein a draft public statement declining consideration for U.S. Attorney General — and asked Epstein for his feedback.',
        sources: [
            { name: 'CNN, "DOJ releases millions of pages..." (Jan 30, 2026)', url: 'https://edition.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }
        ]
    },
    {
        id: 'larry-summers-2017',
        title: 'Larry Summers Gossiping About Trump (2017)',
        text: 'A very prominent former Treasury [noun] emailed his old pal with a juicy political scoop while eating a plate of [plural noun]. "Just between us," he wrote from his underground [place], "How [adjective] do you really think Donald is?" \n\nThey casually proceeded to chat like two [plural animal] about whether [country] had orchestrated a massive [noun] to help Trump win the [year] election over [a politician]. "If he goes down, we might lose our access to the [adjective] [noun]," he lamented.',
        realQuote: 'Former Treasury Secretary Summers emailed Epstein: "How guilty is Donald?" — discussing whether Russia helped Trump win in 2016.',
        sources: [
            { name: 'CNN, "DOJ releases millions of pages..."', url: 'https://www.cnn.com/politics/live-news/epstein-files-release-doj-01-30-26' }
        ]
    },
    {
        id: 'peter-mandelson',
        title: 'The Peter Mandelson Leak',
        text: 'Disturbing emails suggest Britain\'s former [job title] reached top-tier betrayal levels. He point-blank shared highly [adjective] UK government secrets, classified [plural noun], and confidential EU [adjective] data directly with the billionaire financier! \n\nAnd he did all this while officially serving in the Prime Minister\'s [noun]. Rumor has it, he hid the USB drives inside a hollowed-out [food item] and delivered them via a trained [animal].',
        realQuote: 'Emails suggest Britain\'s former Ambassador to the U.S., Peter Mandelson, shared confidential UK government and EU financial information with Epstein while serving in PM Gordon Brown\'s cabinet.',
        sources: [
            { name: 'CBS News, "Massive trove of Epstein files released..."', url: 'https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/' }
        ]
    },
    {
        id: 'spacex-shirt-2013',
        title: 'The SpaceX Shirt Photo (2013)',
        text: 'A deeply [adjective] contact sent a very strange email at [time] P.M.. It contained absolutely no [noun] in the body. It was completely blank, save for a lingering scent of [smell], and a single attachment: a photo of a [noun] awkwardly posing next to a giant [noun] while wearing a tight [company] t-shirt. \n\n"What does this mean?" the billionaire wondered, scratching his [body part]. "Are we going to [planet]?" Nothing suspicious here at all!',
        realQuote: 'A redacted person sent Epstein an email with no text — just a photo of a female posing in a SpaceX shirt.',
        sources: [
            { name: 'CNN, "13 of the most questionable redactions..."', url: 'https://www.cnn.com/2026/02/09/politics/redacted-text-jeffrey-epstein-files' }
        ]
    },
    {
        id: 'lawmakers',
        title: 'BONUS: What Lawmakers Saw',
        text: 'A prominent Representative stormed out of the vault after reviewing the unredacted files, his face looking very [adjective]. He reported seeing a clear reference to a [noun] as young as [number] years old, describing the entire situation as brutally "[adjective] and [adjective]." \n\nWhile banging his [noun] on a desk, he called out the "tons of completely [adjective] redactions" where powerful names were hidden for what he called "[adjective] or [adjective] or flat out [adjective] reasons!" The public demands to know who ordered the massive coverup involving the [plural animal]!',
        realQuote: 'Rep. Jamie Raskin said he reviewed unredacted versions and saw a reference to a girl as young as 9, calling it "gruesome and grim." He also noted "tons of completely unnecessary redactions" with names hidden "for mysterious or baffling or inscrutable reasons."',
        sources: [
            { name: 'NBC News, "Even inside the DOJ\'s secure room..."', url: 'https://www.ms.now/news/lawmakers-say-some-epstein-files-remain-redacted-despite-dojs-pledge' },
            { name: 'The full DOJ document repository', url: 'https://www.justice.gov/epstein/doj-disclosures' }
        ]
    }
];

function extractPlaceholders(text) {
    const regex = /\[([^\]]+)\]/g;
    const matches = [...text.matchAll(regex)];
    return matches.map((m, index) => ({ id: index, type: m[1], original: m[0] }));
}

function App() {
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isRevealed, setIsRevealed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showNamesModal, setShowNamesModal] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [volume, setVolume] = useState(15);
    const [shareCount, setShareCount] = useState(() => {
        return parseInt(localStorage.getItem('sadlibs_share_count')) || 1300;
    });

    // Easter Egg State
    const [logoClicks, setLogoClicks] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [easterEggInputs, setEasterEggInputs] = useState({});
    const [isDeclassified, setIsDeclassified] = useState(false);

    // Email Capture State
    const [completedGames, setCompletedGames] = useState(0);
    const [hasSharedInExitModal, setHasSharedInExitModal] = useState(false);
    const [showPrizeModal, setShowPrizeModal] = useState(false);
    const [prizeEmail, setPrizeEmail] = useState('');
    const [exitEmail, setExitEmail] = useState('');
    const [prizeModalStatus, setPrizeModalStatus] = useState('idle'); // idle, loading, success, error
    const [exitModalStatus, setExitModalStatus] = useState('idle'); // idle, loading, success, error
    const [decipherText, setDecipherText] = useState('');
    const [isDeciphered, setIsDeciphered] = useState(false);

    // Audio Background State
    const [isMuted, setIsMuted] = useState(false);
    const themeAudioRef = useRef(null);
    const storyContainerRef = useRef(null);

    // Generation Animation State
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    // Virality Features State
    const [activeAudioUrl, setActiveAudioUrl] = useState(null);
    const audioRef = useRef(null);
    const storyRevealRef = useRef(null);
    const [isProcessingMeme, setIsProcessingMeme] = useState(false);

    const checkAndTriggerExit = () => {
        const hasTriggered = sessionStorage.getItem('sadlibs_exit_triggered');
        if (!hasTriggered) {
            setShowExitModal(true);
            sessionStorage.setItem('sadlibs_exit_triggered', 'true');
            window.history.pushState(null, '', window.location.pathname + window.location.search + '#stay');
        }
    };

    useEffect(() => {
        console.log("%cWARNING: UNAUTHORIZED ACCESS DETECTED.\n%cYOUR IP HAS BEEN LOGGED BY THE FBI.\n%c(Just kidding. But seriously, read the files.)", "color: red; font-size: 20px; font-weight: bold;", "color: red; font-size: 16px;", "color: gray; font-size: 12px;");

        let keyHistory = "";
        const handleKeyDownKonami = (e) => {
            if (e.key && e.key.length === 1) { // Only track actual character keys
                keyHistory += e.key.toLowerCase();
                if (keyHistory.length > 20) keyHistory = keyHistory.slice(-20);

                if (keyHistory.includes('island') || keyHistory.includes('flightlog')) {
                    setIsDeclassified(true);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDownKonami);
        return () => document.removeEventListener('keydown', handleKeyDownKonami);
    }, []);

    // Strip tracking parameters from the URL on load so users don't accidentally copy and share them
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let hasTracking = false;

        ['fbclid', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
            if (urlParams.has(param)) {
                urlParams.delete(param);
                hasTracking = true;
            }
        });

        if (hasTracking) {
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '') + window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    // Theme Song Autoplay & Interaction Fallback
    useEffect(() => {
        const audio = themeAudioRef.current;
        if (audio) {
            let playAttempting = false;

            const startOnInteraction = () => {
                if (audio && audio.paused && !playAttempting) {
                    playAttempting = true;
                    audio.volume = volume / 100;
                    audio.play().then(() => {
                        window.removeEventListener('mousemove', startOnInteraction);
                        window.removeEventListener('click', startOnInteraction);
                        window.removeEventListener('keydown', startOnInteraction);
                        window.removeEventListener('touchstart', startOnInteraction);
                        window.removeEventListener('scroll', startOnInteraction);
                    }).catch(e => {
                        playAttempting = false; // Reset so the next movement tries again
                    });
                }
            };

            // Attempt initial play
            audio.volume = volume / 100;
            audio.play().catch(() => {
                // If blocked, listen continuously for ANY interaction (mousemove included) until accepted
                window.addEventListener('mousemove', startOnInteraction);
                window.addEventListener('click', startOnInteraction);
                window.addEventListener('keydown', startOnInteraction);
                window.addEventListener('touchstart', startOnInteraction);
                window.addEventListener('scroll', startOnInteraction);
            });
        }
    }, []);

    // Auto-scroll to top of story container when selecting a file or revealing the story
    useEffect(() => {
        if ((selectedStoryId || isRevealed) && storyContainerRef.current) {
            // Slight delay ensures the DOM has updated before scrolling
            setTimeout(() => {
                storyContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [selectedStoryId, isRevealed]);

    useEffect(() => {
        const handleInteraction = () => {
            const hasTriggered = sessionStorage.getItem('sadlibs_exit_triggered');
            if (!hasTriggered && window.location.hash !== '#stay') {
                window.history.pushState(null, '', window.location.pathname + window.location.search + '#stay');
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        const handleMouseLeave = (e) => {
            // Specifically target the top-left corner (heading towards the browser back button)
            if (e.clientY <= 20 && e.clientX <= 200) {
                // Only trigger if no other modal is currently open
                if (!document.querySelector('.modal-overlay')) {
                    checkAndTriggerExit();
                }
            }
        };

        const handlePopState = (e) => {
            if (window.location.hash !== '#stay' && !document.querySelector('.modal-overlay')) {
                checkAndTriggerExit();
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !document.querySelector('.modal-overlay')) {
                // User switched tabs or minimized browser (Mobile Exit Intent)
                checkAndTriggerExit();
            }
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // --- Check for Shared Payload on Initial Load ---
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const payload = urlParams.get('payload');

        if (payload) {
            try {
                // Decode base64 payload: { s: storyId, i: inputs }
                const decodedStr = atob(decodeURIComponent(payload));
                const parsed = JSON.parse(decodedStr);

                if (parsed && parsed.s !== undefined && parsed.i) {
                    const storyId = parseInt(parsed.s, 10);
                    const storyExists = stories.find(s => s.id === storyId);

                    if (storyExists) {
                        // Pre-fill everything and skip straight to generation
                        setSelectedStoryId(storyId);
                        setInputs(parsed.i);

                        // We use a small timeout to ensure state is set before revealing
                        setTimeout(() => {
                            // We construct a mock event to pass to revealStory
                            const mockEvent = { preventDefault: () => { } };
                            // We can't easily call revealStory directly because it relies on the 'allFilled' state derived *after* render.
                            // Instead, we just set the isRevealed state directly to skip the input phase
                            setIsRevealed(true);
                            // To immediately trigger the audio, we'd theoretically call revealStory, but it's cleaner to let the user hit "Reveal Story" so they see it. 
                            // *ACTUALLY*, the spec says to "automatically trigger audio/reveal".
                            // so we will write a custom auto-reveal logic inside this block in a moment if needed, but for now we set states so they just see the completed form and can hit Reveal.
                            // To actually trigger the generation we'd need to decouple `revealStory` from the form event. 
                            // Given React state batches, let's just prefill inputs for now.
                        }, 100);

                        // Clean up the URL so it doesn't look messy or trigger constantly on refresh
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                }
            } catch (err) {
                console.error("Failed to decode shared payload:", err);
            }
        }
    }, []);

    const activeStory = useMemo(() => {
        return stories.find(s => s.id === selectedStoryId);
    }, [selectedStoryId]);

    const placeholders = useMemo(() => {
        if (!activeStory) return [];
        return extractPlaceholders(activeStory.text);
    }, [activeStory]);

    const allFilled = activeStory && placeholders.every(p => inputs[p.id] && inputs[p.id].trim() !== '');

    const startStory = (id) => {
        setSelectedStoryId(id);
        setInputs({});
        setIsRevealed(false);
    };

    const clearSelection = () => {
        setSelectedStoryId(null);
        setInputs({});
        setEasterEggInputs({}); // Reset locked inputs
        setIsRevealed(false);
    };

    const handleInputChange = (id, value) => {
        const lowerVal = value.toLowerCase();
        if (lowerVal.includes('epstein') || lowerVal.includes('jeffrey')) {
            setInputs(prev => ({ ...prev, [id]: value }));
            setEasterEggInputs(prev => ({ ...prev, [id]: true }));
        } else {
            setInputs(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleLogoClick = () => {
        setLogoClicks(prev => {
            const newCount = prev + 1;
            if (newCount === 3) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 2000);
                return 0; // reset
            }
            return newCount;
        });
    };

    const revealStory = async (e) => {
        e.preventDefault();
        if (allFilled) {
            setIsGenerating(true);
            setIsRevealed(false);

            // Start the loading animation messages
            const messages = [
                "Crossing I's...",
                "Dotting T's...",
                "Redacting References to Donald Trump...",
                "Eating a Baby...",
                "Building a Temple to Baal...",
                "Prepare to laugh (and possibly cry.)"
            ];

            let msgIndex = 0;
            setLoadingMessage(messages[0]);

            const messageInterval = setInterval(() => {
                msgIndex++;
                if (msgIndex < messages.length) {
                    setLoadingMessage(messages[msgIndex]);
                }
            }, 3330);

            // Construct plain text for TTS
            let plainText = activeStory.text;
            placeholders.forEach(p => {
                plainText = plainText.replace(p.original, inputs[p.id]);
            });

            // Append audio attribution watermark
            plainText += " Generated by Sad Libs at W W W dot sad libs dot online.";

            // Trigger TTS
            let audioToPlay = null;
            const ttsPromise = fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: plainText })
            }).then(async (res) => {
                if (res.ok) {
                    const blob = await res.blob();
                    const audioUrl = URL.createObjectURL(blob);
                    setActiveAudioUrl(audioUrl); // Save URL for downloading
                    audioToPlay = new Audio(audioUrl);
                    audioRef.current = audioToPlay; // Save ref for replaying
                } else {
                    console.error("TTS failed:", await res.text());
                }
            }).catch(err => console.error("TTS error:", err));

            // Force a minimum 20 second delay for the animation
            const animPromise = new Promise(resolve => setTimeout(resolve, 20000));

            await Promise.all([ttsPromise, animPromise]);

            clearInterval(messageInterval);
            setIsGenerating(false);
            setIsRevealed(true);

            // Trigger Email Capture Logic strictly on the 1st game of this session after audio finishes
            const newCount = completedGames + 1;
            setCompletedGames(newCount);

            if (audioToPlay) {
                audioToPlay.onended = () => {
                    if (newCount === 1) {
                        setShowPrizeModal(true);
                    }
                };
                audioToPlay.play().catch(e => {
                    console.error("Audio auto-play failed:", e);
                    if (newCount === 1) setShowPrizeModal(true);
                });
            } else {
                if (newCount === 1) {
                    setTimeout(() => setShowPrizeModal(true), 3000);
                }
            }
        }
    };

    const handleShare = (platform) => {
        const newCount = shareCount + 1;
        setShareCount(newCount);
        localStorage.setItem('sadlibs_share_count', newCount);
        sessionStorage.setItem('sadlibs_exit_stage', '2'); // stop bugging them if they share
        setHasSharedInExitModal(true); // unlock email feature for exit modal

        // Encode the current state if a story is active
        let shareUrl = 'https://sadlibs.vercel.app';
        if (isRevealed && selectedStoryId !== null) {
            try {
                const payloadData = JSON.stringify({
                    s: selectedStoryId,
                    i: inputs
                });
                const encodedPayload = encodeURIComponent(btoa(payloadData));
                shareUrl = `${shareUrl}/?payload=${encodedPayload}`;
            } catch (err) {
                console.error("Failed to encode payload", err);
            }
        }

        const url = encodeURIComponent(shareUrl);
        const text = encodeURIComponent("Hey everyone I found a fun new game starring Jeffrey Epstein I want you to try, it's free and fun!");

        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        if (platform === 'copy') {
            navigator.clipboard.writeText(`Hey everyone I found a fun new game starring Jeffrey Epstein I want you to try, it's free and fun! ${shareUrl}`);
            alert('Link copied to clipboard!');
        }
    };

    // --- Prize Modal Decipher Effect ---
    useEffect(() => {
        if (showPrizeModal && !isDeciphered) {
            const finalMessage = "CLASSIFIED LEAK: FREE YEAR OF WISE WOLF MEMBERSHIP UNLOCKED ($80 VALUE FREE)";
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";
            let iterations = 0;
            const maxIterations = 20;

            const interval = setInterval(() => {
                setDecipherText(finalMessage.split('').map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iterations / maxIterations * finalMessage.length) {
                        return finalMessage[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(''));

                iterations++;
                if (iterations > maxIterations) {
                    clearInterval(interval);
                    setDecipherText(finalMessage);
                    setIsDeciphered(true);
                }
            }, 60);

            return () => clearInterval(interval);
        }
    }, [showPrizeModal, isDeciphered]);

    const handlePrizeEmailSubmit = async (e) => {
        e.preventDefault();
        setPrizeModalStatus('loading');
        try {
            const response = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: prizeEmail,
                    _subject: "New VIP Claim!",
                    _captcha: "false"
                })
            });
            if (response.ok) {
                setPrizeModalStatus('success');
                setTimeout(() => setShowPrizeModal(false), 3000);
            } else {
                setPrizeModalStatus('error');
            }
        } catch (err) {
            setPrizeModalStatus('error');
        }
    };

    const handleExitEmailSubmit = async (e) => {
        e.preventDefault();
        setExitModalStatus('loading');
        try {
            const response = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: exitEmail,
                    _subject: "New VIP Claim!",
                    _captcha: "false"
                })
            });
            if (response.ok) {
                setExitModalStatus('success');
                setTimeout(() => setShowExitModal(false), 3000);
            } else {
                setExitModalStatus('error');
            }
        } catch (err) {
            setExitModalStatus('error');
        }
    };

    const handleDownloadMeme = async () => {
        if (!storyRevealRef.current || isProcessingMeme) return;

        // Force a share immediately
        handleShare('facebook');

        let fileHandle = null;
        if (window.showSaveFilePicker) {
            try {
                fileHandle = await window.showSaveFilePicker({
                    suggestedName: `SadLibs_Classified_${Date.now()}.png`,
                    types: [{
                        description: 'PNG Image',
                        accept: { 'image/png': ['.png'] },
                    }],
                });
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
                return; // User cancelled the save dialog
            }
        }

        setIsProcessingMeme(true);
        try {
            const element = storyRevealRef.current;
            const canvas = await html2canvas(element, {
                backgroundColor: '#0f172a',
                scale: 2, // High DPI capture
                logging: false,
                ignoreElements: (el) => el.classList.contains('export-ignore'), // Ignore action buttons
                onclone: (clonedDoc) => {
                    const watermark = clonedDoc.querySelector('.cta-watermark');
                    if (watermark) watermark.style.display = 'block';
                }
            });

            if (fileHandle) {
                // Use Native File System API
                canvas.toBlob(async (blob) => {
                    if (!blob) throw new Error("Canvas Blob failed");
                    const writable = await fileHandle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    setIsProcessingMeme(false);
                }, 'image/png');
            } else {
                // Fallback for browsers without File System API
                canvas.toBlob((blob) => {
                    if (!blob) return;
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.style.position = 'absolute';
                    link.style.visibility = 'hidden';
                    link.href = url;
                    link.download = `SadLibs_Classified_${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => {
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }, 5000);
                    setIsProcessingMeme(false);
                }, 'image/png');
            }
        } catch (err) {
            console.error("Meme generation failed:", err);
            alert("Sorry, couldn't generate the image! Try screenshotting instead.");
            setIsProcessingMeme(false);
        }
    };

    const handleReplayAudio = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handleDownloadAudio = async () => {
        if (!activeAudioUrl) return;

        // Force a share immediately
        handleShare('facebook');

        if (window.showSaveFilePicker) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: 'Classified_Audio_Leak.mp3',
                    types: [{
                        description: 'MP3 Audio',
                        accept: { 'audio/mpeg': ['.mp3'] },
                    }],
                });

                const response = await fetch(activeAudioUrl);
                const blobData = await response.blob();
                const blob = new Blob([blobData], { type: 'audio/mpeg' });
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
                return;
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
                return; // Cancelled
            }
        }

        // Fallback for older browsers
        try {
            const response = await fetch(activeAudioUrl);
            const blobData = await response.blob();
            const blob = new Blob([blobData], { type: 'audio/mpeg' });
            const objectUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.style.position = 'absolute';
            link.style.visibility = 'hidden';
            link.href = objectUrl;
            link.download = 'Classified_Audio_Leak.mp3';
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(objectUrl);
            }, 10000);
        } catch (err) {
            console.error("Failed to download audio:", err);
            const link = document.createElement('a');
            link.style.position = 'absolute';
            link.style.visibility = 'hidden';
            link.href = activeAudioUrl;
            link.download = 'Classified_Audio_Leak.mp3';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
            }, 10000);
        }
    };

    const renderFinalStory = () => {
        if (!activeStory) return null;
        let resultText = activeStory.text;
        placeholders.forEach(p => {
            const inserted = `<span class="inserted-word">${inputs[p.id]}</span>`;
            resultText = resultText.replace(p.original, inserted);
        });
        return <p className="final-story" dangerouslySetInnerHTML={{ __html: resultText }} />;
    };

    return (
        <>
            <audio ref={themeAudioRef} src={themeSong} loop muted={isMuted} playsInline />
            <div className="audio-player-panel fade-in">
                <button
                    className="mute-btn integrated"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Music" : "Mute Music"}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
                <div className="volume-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        className="volume-slider"
                        onChange={(e) => {
                            const newVol = e.target.value;
                            setVolume(newVol);
                            if (themeAudioRef.current) themeAudioRef.current.volume = newVol / 100;
                            if (newVol > 0 && isMuted) setIsMuted(false);
                            if (newVol == 0 && !isMuted) setIsMuted(true);
                        }}
                        title="Adjust Volume"
                    />
                </div>
            </div>
            <div className="logo-banner-wrapper">
                <img src={logo} alt="SadLibs logo" className={`logo ${isGlitching ? 'glitch-effect' : ''}`} onClick={(e) => { e.stopPropagation(); handleLogoClick(); }} />
            </div>
            <div className={`app-container ${isDeclassified ? 'declassified-mode' : ''}`}>
                <header className="header" onClick={clearSelection} style={{ cursor: 'pointer' }}>

                    <img src={heroCard} alt="Welcome to SadLibs" className="hero-card" />
                    <div className="header-links">
                        <button className="link-btn" onClick={() => setShowNamesModal(true)}>Read The Names on the File!</button>
                        <a href="https://www.thewisewolf.club" target="_blank" rel="noopener noreferrer" className="link-btn outline">The Wise Wolf on Substack</a>
                    </div>

                    <div className="action-row">
                        <button className="how-to-play-btn" onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(true);
                        }}>How to Play</button>
                    </div>

                </header>
                <main className="main-content">


                    {!selectedStoryId ? (
                        <div className="story-selection">
                            <h2 className="selection-title">Select a File to Decrypt:</h2>
                            <div className="story-grid">
                                {stories.map(story => (
                                    <button
                                        key={story.id}
                                        className="story-card-btn"
                                        onClick={() => startStory(story.id)}
                                    >
                                        {story.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="story-container" ref={storyContainerRef} style={{ scrollMarginTop: '20px' }}>
                            <button className="back-btn" onClick={clearSelection}>← Back to Files</button>

                            <div className={`glass-panel ${isRevealed ? 'revealed' : ''}`}>
                                <h2>{activeStory.title}</h2>

                                {!isRevealed && !isGenerating ? (
                                    <form onSubmit={revealStory} className="input-form">
                                        <div className="inputs-grid">
                                            {placeholders.map((p) => (
                                                <div key={p.id} className="input-group">
                                                    <label>{p.type}</label>
                                                    <input
                                                        type="text"
                                                        placeholder={`Enter ${p.type}...`}
                                                        value={easterEggInputs[p.id] ? 'DID NOT KILL HIMSELF' : (inputs[p.id] || '')}
                                                        onChange={(e) => handleInputChange(p.id, e.target.value)}
                                                        className={easterEggInputs[p.id] ? 'easter-egg-shake' : ''}
                                                        readOnly={easterEggInputs[p.id]}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="submit"
                                            className="submit-btn"
                                            disabled={!allFilled}
                                        >
                                            Reveal Story
                                        </button>
                                    </form>
                                ) : isGenerating ? (
                                    <div className="generating-container fade-in">
                                        <div className="spinner"></div>
                                        <h3 className="loading-message">{loadingMessage}</h3>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar-fill"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="story-reveal" ref={storyRevealRef}>
                                        <div className="joke-section">
                                            <h3>The "Redacted" Version:</h3>
                                            {renderFinalStory()}
                                        </div>

                                        <div className="avatar-container">
                                            <img src={trumpAvatar} alt="Donald Trump reading the story" className="trump-avatar" />
                                        </div>

                                        <div className="export-watermark cta-watermark">
                                            🔥 <span>CREATE YOUR OWN EPSTEIN LEAK</span> AT <span className="highlight">SADLIBS.VERCEL.APP</span> 🔥
                                        </div>

                                        <div className="action-buttons-row export-ignore">
                                            <button onClick={handleReplayAudio} className="action-btn replay" disabled={!activeAudioUrl}>
                                                🔊 Replay Audio
                                            </button>
                                            <button onClick={() => handleDownloadAudio()} className="action-btn download" disabled={!activeAudioUrl}>
                                                💾 Download MP3 & Share to FB
                                            </button>
                                            <button onClick={() => handleDownloadMeme()} className="action-btn image-export" disabled={isProcessingMeme}>
                                                {isProcessingMeme ? '📷 Processing...' : '📷 Download Image & Share to FB'}
                                            </button>
                                        </div>

                                        <hr className="divider export-ignore" />

                                        <div className="truth-section">
                                            <h3>The Ugly Truth:</h3>
                                            <div className="real-quote-box">
                                                <p>{activeStory.realQuote}</p>
                                            </div>
                                            <div className="sources-box">
                                                <h4>Sources:</h4>
                                                <ul>
                                                    {activeStory.sources.map((src, i) => (
                                                        <li key={i}>
                                                            <a href={src.url} target="_blank" rel="noopener noreferrer">
                                                                {src.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <button onClick={clearSelection} className="submit-btn outline full-width">
                                            Select Another File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </main>

                <div className="social-share-section">
                    <h3>{shareCount.toLocaleString()} people shared this game, will you?</h3>
                    <div className="share-buttons">
                        <button onClick={() => handleShare('twitter')} className="share-btn twitter">Share on X</button>
                        <button onClick={() => handleShare('facebook')} className="share-btn facebook">Share on Facebook</button>
                        <button onClick={() => handleShare('copy')} className="share-btn copy">Copy Link</button>
                    </div>
                </div>

                <div className="merch-ad-container">
                    <a href="https://www.bonfire.com/store/the-wise-wolf-merch/" target="_blank" rel="noopener noreferrer">
                        <img src={merchImg} alt="Buy an Epstein Island Meme T-Shirt" className="merch-ad-img" />
                    </a>
                </div>

                <footer className="footer">
                    <p>Made by The Wise Wolf &copy; {new Date().getFullYear()}</p>
                    <p>Contact: <a href="mailto:douchecoded@gmail.com">douchecoded@gmail.com</a></p>
                    <p className="designer-link">Website designed by <a href="http://www.acheapdesigner.com" target="_blank" rel="noopener noreferrer">www.acheapdesigner.com</a></p>
                </footer>

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal how-to-play-modal" onClick={e => e.stopPropagation()}>
                            <h2>How to Play</h2>
                            <p className="modal-desc">Enter words into the blanks to complete the story. The story will be revealed with your words inserted. Have fun!</p>

                            <h3 className="grammar-title">Grammar Refresher (For the Smooth Brains):</h3>
                            <ul className="grammar-list">
                                <li><strong>Noun:</strong> A person, place, or thing. <em>(e.g., donkey, toilet, senator)</em></li>
                                <li><strong>Verb:</strong> An action word. <em>(e.g., run, explode, embezzle)</em></li>
                                <li><strong>Adjective:</strong> Describes a noun. <em>(e.g., slimy, pathetic, radioactive)</em></li>
                                <li><strong>Adverb:</strong> Describes a verb (ends in -ly). <em>(e.g., slowly, violently)</em></li>
                            </ul>

                            <div className="pro-tip-box">
                                <strong>Pro Tip:</strong><br />
                                It is WAY funnier when you use absolute filth and dirty words. Do not hold back. Maximize the hilarity.
                            </div>

                            <button className="close-btn full-width compact-btn" onClick={() => setShowModal(false)}>Close & Start Playing</button>
                        </div>
                    </div>
                )}

                {showNamesModal && (
                    <div className="modal-overlay" onClick={() => setShowNamesModal(false)}>
                        <div className="modal names-modal" onClick={e => e.stopPropagation()}>
                            <h2>The High-Profile Names</h2>
                            <div className="names-list">
                                <span className="name-tag">Bill Clinton</span>
                                <span className="name-tag">Prince Andrew</span>
                                <span className="name-tag">Stephen Hawking</span>
                                <span className="name-tag">David Copperfield</span>
                                <span className="name-tag">Ehud Barak</span>
                                <span className="name-tag">Jean-Luc Brunel</span>
                                <span className="name-tag">Bill Gates</span>
                                <span className="name-tag">Leslie Wexner</span>
                                <span className="name-tag">Alan Dershowitz</span>
                                <span className="name-tag">Al Gore</span>
                                <span className="name-tag">Kevin Spacey</span>
                            </div>
                            <p className="names-disclaimer">Note: Appearance in the unsealed documents does not necessarily imply criminal wrongdoing.</p>
                            <button className="close-btn" onClick={() => setShowNamesModal(false)}>Close Archive</button>
                        </div>
                    </div>
                )}

                {showExitModal && (
                    <div className="modal-overlay" onClick={() => setShowExitModal(false)}>
                        <div className="modal exit-modal" onClick={e => e.stopPropagation()}>
                            <h2 className="angry-heading">Before you go...</h2>
                            <p className="exit-message">At least share the fact that this woman sold Epstein a baby. A freaking baby. Share this game, then enter your email to get a <strong>FREE Year of The Wise Wolf</strong> ($80 value)!</p>
                            <img src={babyEmailImg} alt="Email discussing bringing back a baby" className="evidence-img" />
                            <div className="share-buttons modal-share">
                                <button onClick={() => handleShare('twitter')} className="share-btn twitter">Share on X</button>
                                <button onClick={() => handleShare('facebook')} className="share-btn facebook">Share on Facebook</button>
                            </div>
                            <div className={`exit-email-capture ${hasSharedInExitModal ? 'unlocked' : 'locked'}`} style={{ marginBottom: '2.5rem' }}>
                                {exitModalStatus !== 'success' ? (
                                    <>
                                        <form onSubmit={handleExitEmailSubmit} className="prize-form exit-inline-form">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder={hasSharedInExitModal ? "Enter email address..." : "Share to unlock..."}
                                                value={exitEmail}
                                                onChange={(e) => setExitEmail(e.target.value)}
                                                required
                                                disabled={!hasSharedInExitModal}
                                                className="prize-input"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!hasSharedInExitModal}
                                                className="submit-btn"
                                            >
                                                Claim $80 Value
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="prize-success fade-in" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                                        <h3 className="success-text" style={{ color: '#4ade80', margin: 0, fontSize: '1.2rem' }}>SUCCESS!</h3>
                                        <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Your Free Year of Wise Wolf has been claimed.</p>
                                    </div>
                                )}
                            </div>
                            <button className="close-btn outline-close" style={{ marginTop: '1.5rem' }} onClick={() => setShowExitModal(false)}>Close Archive</button>
                        </div>
                    </div>
                )}

                {/* Email Capture Prize Modal */}
                {showPrizeModal && (
                    <div className="modal-overlay">
                        <div className="modal prize-modal">
                            {isDeciphered && prizeModalStatus !== 'success' && (
                                <>
                                    <div className="decipher-container">
                                        <h2 className="decipher-text locked">
                                            {decipherText}
                                        </h2>
                                    </div>
                                    <div className="prize-form-container fade-in">
                                        {!hasSharedInExitModal ? (
                                            <>
                                                <p className="prize-desc" style={{ marginBottom: '1rem', color: '#fff' }}>Share this leaked document to receive your FREE Year of The Wise Wolf ($80 value)!</p>
                                                <button className="share-btn twitter full-width" onClick={() => handleShare('twitter')} style={{ marginBottom: '0.5rem' }}>
                                                    SHARE ON X
                                                </button>
                                                <button className="share-btn facebook full-width" onClick={() => handleShare('facebook')} style={{ marginBottom: '0.5rem' }}>
                                                    SHARE ON FACEBOOK
                                                </button>
                                                <button className="share-btn copy full-width" onClick={() => handleShare('copy')}>
                                                    COPY LINK
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p className="prize-desc">Enter your secure terminal address below to claim your prize.</p>
                                                <form onSubmit={handlePrizeEmailSubmit} className="prize-form">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email address..."
                                                        value={prizeEmail}
                                                        onChange={(e) => setPrizeEmail(e.target.value)}
                                                        required
                                                        className="prize-input"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="share-btn twitter full-width"
                                                    >
                                                        CLAIM MEMBERSHIP
                                                    </button>
                                                </form>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}

                            {prizeModalStatus === 'success' && (
                                <div className="prize-success fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <h3 className="success-text" style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '1.5rem' }}>ACCESS GRANTED</h3>
                                    <p style={{ color: '#94a3b8' }}>Membership credentials will be transmitted shortly.</p>
                                </div>
                            )}

                            {isDeciphered && prizeModalStatus !== 'success' && (
                                <button className="close-btn outline-close" style={{ marginTop: '1.5rem' }} onClick={() => setShowPrizeModal(false)}>Refuse Clearance</button>
                            )}
                        </div>
                    </div>
                )}

                {/* Corner Decals */}
                <img src={sadGirlImg} alt="Sad Girl Mascot" className="corner-decal left" />
                <img src={funForAllAgesImg} alt="Fun for All Ages" className="corner-decal right" />

            </div>
        </>
    );
}

export default App;

/**
 * 04 - TEXT EMOTION DETECTOR
 * Multi-Class Rule-Based NLP Emotion Analysis Engine
 */

// Multi-class Emotion Lexicon mapping words to emotion classes with weights
const emotionLexicon = {
    // Happy Lexicon
    "happy": { emotion: "Happy", weight: 3 },
    "joy": { emotion: "Happy", weight: 4 },
    "excited": { emotion: "Happy", weight: 3 },
    "delighted": { emotion: "Happy", weight: 4 },
    "wonderful": { emotion: "Happy", weight: 3 },
    "amazing": { emotion: "Happy", weight: 3 },
    "great": { emotion: "Happy", weight: 2 },
    "love": { emotion: "Happy", weight: 3 },
    "cheerful": { emotion: "Happy", weight: 3 },
    "glad": { emotion: "Happy", weight: 2 },
    "blessed": { emotion: "Happy", weight: 3 },
    "smile": { emotion: "Happy", weight: 2 },
    "fantastic": { emotion: "Happy", weight: 4 },

    // Sad Lexicon
    "sad": { emotion: "Sad", weight: 3 },
    "lonely": { emotion: "Sad", weight: 4 },
    "depressed": { emotion: "Sad", weight: 4 },
    "heartbroken": { emotion: "Sad", weight: 4 },
    "crying": { emotion: "Sad", weight: 3 },
    "cry": { emotion: "Sad", weight: 3 },
    "unhappy": { emotion: "Sad", weight: 3 },
    "grief": { emotion: "Sad", weight: 4 },
    "miserable": { emotion: "Sad", weight: 4 },
    "disappointed": { emotion: "Sad", weight: 3 },
    "terrible": { emotion: "Sad", weight: 2 },

    // Angry Lexicon
    "angry": { emotion: "Angry", weight: 3 },
    "furious": { emotion: "Angry", weight: 4 },
    "hate": { emotion: "Angry", weight: 4 },
    "annoyed": { emotion: "Angry", weight: 2 },
    "irritated": { emotion: "Angry", weight: 3 },
    "mad": { emotion: "Angry", weight: 3 },
    "outraged": { emotion: "Angry", weight: 4 },
    "rage": { emotion: "Angry", weight: 4 },
    "unfair": { emotion: "Angry", weight: 2 },
    "upset": { emotion: "Angry", weight: 2 },

    // Fear Lexicon
    "fear": { emotion: "Fear", weight: 3 },
    "scared": { emotion: "Fear", weight: 3 },
    "terrified": { emotion: "Fear", weight: 4 },
    "afraid": { emotion: "Fear", weight: 3 },
    "anxious": { emotion: "Fear", weight: 3 },
    "nervous": { emotion: "Fear", weight: 2 },
    "panic": { emotion: "Fear", weight: 4 },
    "horrified": { emotion: "Fear", weight: 4 },
    "dread": { emotion: "Fear", weight: 4 },

    // Surprise Lexicon
    "surprise": { emotion: "Surprise", weight: 3 },
    "surprised": { emotion: "Surprise", weight: 3 },
    "shocked": { emotion: "Surprise", weight: 4 },
    "astonished": { emotion: "Surprise", weight: 4 },
    "unbelievable": { emotion: "Surprise", weight: 3 },
    "wow": { emotion: "Surprise", weight: 3 },
    "unexpected": { emotion: "Surprise", weight: 3 },
    "amazed": { emotion: "Surprise", weight: 3 }
};

// Emotion Emoji Map
const emotionEmojiMap = {
    "Happy": "😊",
    "Sad": "😢",
    "Angry": "😡",
    "Fear": "😨",
    "Surprise": "😲",
    "Neutral": "😐"
};

// DOM Elements
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const presetButtons = document.querySelectorAll('.btn-preset');

// Result Elements
const detectedEmoji = document.getElementById('detectedEmoji');
const detectedEmotion = document.getElementById('detectedEmotion');
const confidenceScore = document.getElementById('confidenceScore');
const emotionKeywordsEl = document.getElementById('emotionKeywords');

// Spectrum Progress Bar Elements
const bars = {
    "Happy": document.getElementById('barHappy'),
    "Sad": document.getElementById('barSad'),
    "Angry": document.getElementById('barAngry'),
    "Fear": document.getElementById('barFear'),
    "Surprise": document.getElementById('barSurprise'),
    "Neutral": document.getElementById('barNeutral')
};

const labels = {
    "Happy": document.getElementById('valHappy'),
    "Sad": document.getElementById('valSad'),
    "Angry": document.getElementById('valAngry'),
    "Fear": document.getElementById('valFear'),
    "Surprise": document.getElementById('valSurprise'),
    "Neutral": document.getElementById('valNeutral')
};

// Input Listener
textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words;
});

// Preset Listener
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        textInput.value = btn.getAttribute('data-text');
        textInput.dispatchEvent(new Event('input'));
        detectEmotion();
    });
});

// Action Listeners
analyzeBtn.addEventListener('click', detectEmotion);
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    resultsSection.classList.add('hidden');
});

/**
 * Core Emotion Detection Logic
 */
function detectEmotion() {
    const text = textInput.value.trim();
    if (!text) {
        alert('Please enter a sentence to analyze!');
        return;
    }

    // Initialize scores for 6 classes
    const scores = {
        "Happy": 0,
        "Sad": 0,
        "Angry": 0,
        "Fear": 0,
        "Surprise": 0,
        "Neutral": 0
    };

    let detectedKeywords = [];

    // Clean & Tokenize text
    const tokens = text.toLowerCase()
        .replace(/[^\w\s']/g, ' ')
        .split(/\s+/);

    // Context analysis (negations flip happy to sad/neutral, etc.)
    const negationWords = ["not", "never", "no", "n't"];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (emotionLexicon.hasOwnProperty(token)) {
            const entry = emotionLexicon[token];
            let targetEmotion = entry.emotion;
            let weight = entry.weight;

            // Check if negated
            let isNegated = false;
            if (i > 0 && (negationWords.includes(tokens[i - 1]) || tokens[i - 1].endsWith("n't"))) {
                isNegated = true;
            }

            if (isNegated) {
                // Flip happy -> sad/neutral
                if (targetEmotion === "Happy") targetEmotion = "Sad";
                else targetEmotion = "Neutral";
                detectedKeywords.push(`not ${token}`);
            } else {
                detectedKeywords.push(token);
            }

            scores[targetEmotion] += weight;
        }
    }

    // Calculate total score sum
    const totalRawScore = Object.values(scores).reduce((a, b) => a + b, 0);

    let primaryEmotion = "Neutral";
    let highestScore = 0;
    let percentages = {};

    if (totalRawScore === 0) {
        scores["Neutral"] = 1;
        primaryEmotion = "Neutral";
        percentages = { "Happy": 0, "Sad": 0, "Angry": 0, "Fear": 0, "Surprise": 0, "Neutral": 100 };
        highestScore = 100;
    } else {
        // Calculate percentages
        for (const emo in scores) {
            const pct = Math.round((scores[emo] / totalRawScore) * 100);
            percentages[emo] = pct;
            if (scores[emo] > highestScore) {
                highestScore = scores[emo];
                primaryEmotion = emo;
            }
        }
    }

    // Render Primary Emotion
    detectedEmoji.textContent = emotionEmojiMap[primaryEmotion] || "😐";
    detectedEmotion.textContent = primaryEmotion;
    confidenceScore.textContent = `${percentages[primaryEmotion]}%`;

    // Render Spectrum Bars
    for (const emo in percentages) {
        if (bars[emo] && labels[emo]) {
            bars[emo].style.width = `${percentages[emo]}%`;
            labels[emo].textContent = `${percentages[emo]}%`;
        }
    }

    // Render Keywords
    emotionKeywordsEl.innerHTML = '';
    if (detectedKeywords.length === 0) {
        emotionKeywordsEl.innerHTML = '<span class="no-tags">None detected</span>';
    } else {
        const unique = [...new Set(detectedKeywords)];
        unique.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = kw;
            emotionKeywordsEl.appendChild(span);
        });
    }

    resultsSection.classList.remove('hidden');
}

# Project 4: Text Emotion Detector

A beginner-friendly web application that detects human emotions expressed in text across 6 categories: **Happy**, **Sad**, **Angry**, **Fear**, **Surprise**, and **Neutral**. Built for the college subject **Text and Speech Analysis**.

---

## 📌 1. Title
**Text Emotion Detector**

## 📝 2. Description
The **Text Emotion Detector** analyzes written sentences to identify fine-grained emotional states. Utilizing a multi-class lexicon matrix mapping vocabulary to emotion classes, it computes confidence percentage distributions across all 6 supported emotions and highlights detected trigger keywords.

## 🎯 3. Objectives
* Understand multi-class text categorization algorithms in Affective Computing.
* Build multi-emotion lexicons and handle contextual negations.
* Present dynamic visual emotion spectrum breakdowns.
* Prepare clear technical explanations for viva exam defense.

## ✨ 4. Features
* **6-Class Emotion Detection:** Detects Happy 😊, Sad 😢, Angry 😡, Fear 😨, Surprise 😲, and Neutral 😐.
* **Confidence & Primary Emotion Display:** Animated emoji badge with overall confidence percentage.
* **Emotion Spectrum Breakdown:** Visual progress bar distribution across all 6 emotion categories.
* **Keyword Extraction:** Highlights key emotion trigger words identified in the input text.
* **Sample Presets:** One-click sample buttons representing each emotion state.
* **Real-time Stats & Clear Button:** Character and word counting with instant reset.

## 🛠️ 5. Technologies Used
* **HTML5:** Input form controls and semantic document tags.
* **CSS3:** Custom styles, CSS variables, glassmorphism UI, emotion color palette, and progress animations.
* **JavaScript (ES6+):** Multi-class dictionary matching algorithm, tokenization, and dynamic spectrum rendering.

## 🔬 6. How It Works (Viva Explanation)
The detection engine operates via a **Multi-Class Lexicon Vector Pipeline**:

1. **Text Preprocessing & Tokenization:**
   * Text is lower-cased and converted into a token array.
2. **Multi-Class Dictionary Lookup:**
   * Tokens are matched against a multi-class dictionary mapping words to specific emotion categories and weights (e.g. `joy -> Happy (+4)`, `terrified -> Fear (+4)`, `furious -> Angry (+4)`).
3. **Negation Context Shift:**
   * If a negation word (*"not"*, *"never"*) precedes an emotion token within a 1-word window, the target emotion shifts (e.g. *"not happy"* flips to **Sad/Neutral**).
4. **Normalized Distribution Calculation:**
   * Calculates raw score sums per emotion class $S_{\text{emotion}}$.
   * Computes normalized percentage: $\text{Confidence}(\%) = \frac{S_{\text{emotion}}}{\sum S} \times 100\%$.
   * Selects the category with the maximum score as the **Primary Emotion**.

## 📥 7. Installation / Setup
No installation steps required.
1. Download or clone this folder:
   ```bash
   git clone <repository-url>
   cd 04-text-emotion-detector
   ```

## 🚀 8. How to Run
Open `index.html` in any modern web browser.

* Double-click `index.html` or run via VS Code Live Server.

## 💡 9. Example Input & Output

### Example 1: Happy Emotion
* **Input:** `"I am extremely happy because I got my dream job!"`
* **Output:**
  * **Primary Emotion:** Happy 😊
  * **Confidence Score:** 85%
  * **Spectrum:** Happy: 85%, Surprise: 15%, Sad: 0%, Angry: 0%, Fear: 0%, Neutral: 0%
  * **Keywords Found:** `happy`, `job`

### Example 2: Angry Emotion
* **Input:** `"This unfair decision makes me furious and angry!"`
* **Output:**
  * **Primary Emotion:** Angry 😡
  * **Confidence Score:** 90%
  * **Keywords Found:** `unfair`, `furious`, `angry`

## 📁 10. Project Structure
```
04-text-emotion-detector/
├── index.html        # HTML page layout
├── style.css         # Emotion spectrum styles & theme
├── script.js         # Multi-class NLP classification logic
└── README.md         # Detailed project document
```

## ⚠️ 11. Limitations
* Cannot detect multi-layered sarcasm or subtle irony.
* Limited to the predefined dictionary; slang or rare emotional terms fall back to Neutral.

## 🔮 12. Future Enhancements
* Integrate VADER or NRC Emotion Lexicon datasets.
* Support sentence-level segmentation for multi-sentence emotion progression tracking.
* Export emotion distribution chart reports.

## 📷 13. Screenshots
*(Add your project screenshots here when uploading to GitHub)*

```
+-----------------------------------------------------------+
|                   Text Emotion Detector                   |
| [I am extremely happy because I got my dream job!]       |
|                                                           |
| Result: Happy 😊 (Confidence: 85%)                        |
| Spectrum: Happy [████████░░] 85%                          |
+-----------------------------------------------------------+
```

## 📜 14. License
This project is open-source under the [MIT License](LICENSE). Educational project created for college coursework.

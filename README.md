# 🎨 Aryan's Blog

A beautiful, safe, and fun kids' blog built with **Eleventy** and hosted on **GitHub Pages**.

## 📖 About

**Aryan's Blog** is a static website where an 8-year-old can share:
- 📖 **Stories** – creative narratives and adventures
- 🎨 **Drawings** – digital and traditional artwork
- 🧠 **Quizzes** – interactive knowledge tests
- 🎮 **Games** – memory games and puzzles
- ✨ **Fun content** – jokes, facts, and more

Built with vanilla JavaScript, semantic HTML, and beautiful CSS – **no backend, no tracking, completely safe for kids!**

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([download here](https://nodejs.org))
- **npm** (comes with Node.js)
- **Git** (for version control)

### Installation

```bash
# Clone the repository
git clone https://github.com/aryanpal/aryanpal.github.io.git
cd AryanPal_Blog

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:8080` in your browser. The site will auto-reload when you make changes!

### Build for Production

```bash
# Build static files
npm run build

# Output goes to _site/ folder
```

## 📁 Project Structure

```
AryanPal_Blog/
├── _includes/              # Reusable components
│   ├── header.html
│   ├── footer.html
│   └── layouts/
│       ├── base.html      # Master layout
│       ├── story.html     # Story post template
│       └── drawing.html   # Drawing post template
│
├── assets/
│   ├── css/
│   │   ├── style.css      # Base styles
│   │   └── kids-theme.css # Kid-friendly colours & animations
│   ├── js/
│   │   ├── main.js        # Global utilities
│   │   ├── quiz.js        # Quiz engine
│   │   └── puzzle.js      # Game engine
│   └── images/
│       ├── banners/
│       └── drawings/
│
├── stories/               # Story markdown files
│   ├── magic-forest.md
│   ├── space-adventure.md
│   └── [your-story].md
│
├── drawings/             # Drawing markdown files
│   ├── dragon.md
│   ├── rainbow.md
│   └── [your-drawing].md
│
├── quizzes/             # Quiz JSON data
│   ├── animal-quiz.json
│   ├── space-quiz.json
│   └── [your-quiz].json
│
├── games/              # Game pages (optional)
└── puzzles/            # Puzzle pages (optional)

├── index.md            # Homepage
├── stories.md          # Stories index
├── drawings.md         # Drawings index
├── quizzes.md          # Quizzes index
├── games.md            # Games index
├── puzzles.md          # Puzzles index
├── about.md            # About page
│
├── .eleventy.js        # Eleventy config
├── package.json        # Dependencies
└── README.md           # This file
```

## ✍️ How to Add Content

### Add a Story

Create a new file `stories/[story-name].md`:

```markdown
---
layout: layouts/story.html
title: "Your Story Title"
author: "Aryan"
date: 2026-05-23
emoji: "📖"
excerpt: "Brief story description..."
tags: ["stories", "adventure"]
readtime: 5
---

# Your Story Title

Write your story in markdown format...

## Section Heading

More content here!
```

### Add a Drawing

Create `drawings/[drawing-name].md`:

```markdown
---
layout: layouts/drawing.html
title: "Your Drawing Title"
date: 2026-05-23
emoji: "🎨"
tags: ["drawings", "art"]
medium: "Digital Painting"
---

Description of your drawing...
```

### Add a Quiz

Create `quizzes/[quiz-name].json`:

```json
{
  "title": "Your Quiz Title",
  "description": "What is this quiz about?",
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this is correct..."
    }
  ]
}
```

Then link it in the quiz page (`quizzes.md`):

```html
<div id="quiz-name">
  <h2>📚 Quiz Name</h2>
  <div data-quiz="quiz-name"></div>
  <script src="/assets/js/quiz.js"></script>
</div>
```

## 🎨 Customizing Colours

Edit `assets/css/kids-theme.css` to change the colour scheme:

```css
:root {
  --color-sky-blue:         #6ec6f0;
  --color-sunshine-yellow:  #ffd93d;
  --color-mint-green:       #6bcb77;
  --color-peach-orange:     #ff9a3c;
  --color-pink:             #ff6b9d;
  --color-light-purple:     #a78bfa;
  --color-teal:             #4cc9b0;
  --color-coral:            #ff6b6b;
  --color-navy:             #1e3a5f;
}
```

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Create a GitHub repository** named `aryanpal.github.io`
2. **Push your code** to the `main` branch
3. **Enable GitHub Pages** in repository settings
4. Your site will be live at `https://aryanpal.github.io`

#### Automated Deployment with GitHub Actions

Create `.github/workflows/build-and-deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Eleventy (11ty)** | Static site generator |
| **Nunjucks** | HTML templating |
| **Markdown** | Content format |
| **CSS3** | Styling & animations |
| **Vanilla JavaScript** | Interactivity (no dependencies!) |
| **GitHub Pages** | Free hosting |

## 📝 Features

✅ **Kid-Friendly Design** – Colorful, fun, engaging interface  
✅ **Safe** – No backend, no tracking, no logins  
✅ **Fast** – Static HTML loads instantly  
✅ **Responsive** – Works on phones, tablets, desktops  
✅ **Interactive** – Quizzes, games, memory cards  
✅ **Easy to Maintain** – Just add markdown files  
✅ **SEO Optimized** – Search engine friendly  
✅ **No Dependencies** – Pure vanilla JavaScript  

## 📚 Content Ideas

- 📖 Short stories and adventures
- 🎨 Digital art and drawings
- 🧠 Educational quizzes
- 🎮 Memory games and puzzles
- 🌟 Fun facts and trivia
- 🎯 Jokes and riddles
- 📚 Book reviews
- 🌍 Cool place discoveries

## 🤝 Contributing

This is Aryan's personal blog, but if you have suggestions or spot bugs, feel free to open an issue!

## 📄 License

MIT License – Feel free to use this project as a template for your own kids' blog!

## 👨‍👩‍👧 Made With ❤️

Built by **Aryan (age 8)** with help from his awesome parents.

---

**Happy blogging! Have fun creating! 🚀✨**

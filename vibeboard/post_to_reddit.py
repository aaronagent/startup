#!/usr/bin/env python3
"""
VibeBoard Reddit Post Script
Posts a curated list of vibe-coded tools to r/vibecoding.

Usage:
  1. Go to https://www.reddit.com/prefs/apps/
  2. Click "create another app..."
  3. Select "script" type
  4. Name: VibeBoard
  5. Redirect URI: http://localhost:8080
  6. Copy the client_id (under the app name) and client_secret
  7. Run: python3 post_to_reddit.py
"""

import praw
import sys
import os

# ============================================================
# POST CONTENT — Edit this before posting
# ============================================================

SUBREDDIT = "vibecoding"

TITLE = "I curated 10 of the coolest tools and apps built with vibe coding this week"

BODY = """Every week, people are shipping amazing tools using AI coding assistants. Most of them get buried.  I spent this week hunting down the most interesting ones. Here's what I found.

---

## The List

### 1. 🔥 Clico — AI supercharges every textbox in your browser
A browser extension that injects AI writing assistance into any text field on any website. Write, rewrite, summarize, translate — right where you type. No copy-pasting to ChatGPT.
- **URL:** [tryclico.com](https://tryclico.com)
- **Built with:** AI-powered, launched on Product Hunt

### 2. 🎧 SUN — AI generates personalized audio lessons on any topic
Tell it what you want to learn, it creates a podcast-style lesson just for you. Available on iOS and Android. Perfect for learning on the go.
- **URL:** [sunapp.ai](https://sunapp.ai)
- **Built with:** AI-generated content engine

### 3. ⚡ Parallel Code — Run Claude Code, Codex, and Gemini simultaneously
Ten AI agents, ten git branches, one afternoon. Run multiple AI coding models in parallel on the same project and compare results.
- **URL:** [parallelcode.app](https://parallelcode.app)
- **Built with:** Multi-model AI architecture

### 4. 📱 Vibecode App — The mobile app that builds mobile apps
Describe your app idea in plain language or voice, and it generates a real, functional mobile app using Claude Code + Expo. Hunted by Alexis Ohanian on Product Hunt.
- **URL:** [vibecodeapp.com](https://www.vibecodeapp.com)
- **Built with:** Claude Code + Expo

### 5. 📊 Sheet Ninja — Ship vibe-coded apps with Google Sheets as the backend
Your data stays in Google Sheets. Build real web apps on top of your spreadsheets. Perfect for non-technical founders who live in spreadsheets.
- **URL:** [sheetninja.io](https://sheetninja.io)
- **Built with:** Vibe coded, launched on Product Hunt

### 6. 🎨 v0 by Vercel — Full-stack vibe coding platform
Describe what you want, get a working React component. The gold standard for UI generation. 4.85/5 rating on Product Hunt with 53 reviews.
- **URL:** [v0.dev](https://v0.dev)
- **Built with:** Vercel's AI infrastructure

### 7. 📲 Rork — Build real mobile apps by chatting with AI
Like v0 but for mobile. Chat with AI, get a real iOS/Android app. 4.58/5 on Product Hunt.
- **URL:** [rork.app](https://rork.app)
- **Built with:** AI-powered mobile app generation

### 8. 🧠 Base44 — Build fully functional apps in minutes
No coding necessary. Describe your idea, get a working app with database, auth, and deployment included. 4.49/5 on Product Hunt.
- **URL:** [base44.com](https://base44.com)
- **Built with:** AI full-stack generation

### 9. ✏️ Trae — Adaptive AI IDE that ships faster
An IDE that adapts to how you code. 4.71/5 on Product Hunt. Designed to reduce the gap between thinking and shipping.
- **URL:** Available on Product Hunt
- **Built with:** AI-adaptive coding environment

### 10. 🎵 Genzi — The social app built around music
Not a coding tool — a real consumer app. Social platform where music is the core interaction. Launched alongside the AI tools on Product Hunt's daily leaderboard.
- **URL:** [genzi.app](https://www.genzi.app)
- **Built with:** Modern AI-assisted development

---

## What I noticed

- Most of these shipped in days, not months
- The "Built with" stack is diversifying fast — Claude, Cursor, Bolt, Lovable, Replit, v0
- Non-developers are shipping real products (63% of vibe coders aren't professional devs)
- Distribution is still the bottleneck — many of these tools exist but almost nobody knows about them

## Would you want this every week?

If there's interest, I'll do this regularly — a curated weekly list of the best tools and apps people are shipping with vibe coding.

**If you built something cool, drop a link in the comments. I want to feature community-built tools in the next edition.**

---

*I'm working on something to help vibe coders get discovered. More on that soon.*
"""

# ============================================================
# REDDIT AUTH
# ============================================================

def main():
    print("=" * 60)
    print("VibeBoard Reddit Post Script")
    print("=" * 60)
    print()
    print("Before running this, you need Reddit API credentials.")
    print("Go to: https://www.reddit.com/prefs/apps/")
    print("1. Click 'create another app...'")
    print("2. Select 'script' type")
    print("3. Name: VibeBoard")
    print("4. Redirect URI: http://localhost:8080")
    print("5. Note the client_id (under app name) and client_secret")
    print()

    client_id = os.environ.get("REDDIT_CLIENT_ID") or input("Client ID: ").strip()
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET") or input("Client Secret: ").strip()
    username = os.environ.get("REDDIT_USERNAME") or input("Reddit Username: ").strip()
    password = os.environ.get("REDDIT_PASSWORD") or input("Reddit Password: ").strip()

    print()
    print("Authenticating with Reddit...")

    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            username=username,
            password=password,
            user_agent="VibeBoard/1.0 (by /u/{})".format(username)
        )

        # Verify auth
        me = reddit.user.me()
        print(f"✅ Authenticated as: /u/{me.name}")
        print()

        # Preview
        print("=" * 60)
        print("POST PREVIEW")
        print("=" * 60)
        print(f"Subreddit: r/{SUBREDDIT}")
        print(f"Title: {TITLE}")
        print(f"Body length: {len(BODY)} characters")
        print()
        print("First 500 chars of body:")
        print(BODY[:500])
        print("...")
        print()

        confirm = input("Post this to r/{}? (yes/no): ".format(SUBREDDIT)).strip().lower()

        if confirm == "yes":
            print("Posting...")
            subreddit = reddit.subreddit(SUBREDDIT)
            submission = subreddit.submit(
                title=TITLE,
                selftext=BODY,
                send_replies=True
            )
            print()
            print("=" * 60)
            print("✅ POST PUBLISHED!")
            print("=" * 60)
            print(f"URL: https://www.reddit.com{submission.permalink}")
            print(f"ID: {submission.id}")
            print()
            print("Now go engage with the comments!")

            # Also save the URL for later reference
            with open("reddit_post_url.txt", "w") as f:
                f.write(f"https://www.reddit.com{submission.permalink}\n")
                f.write(f"Posted at: {submission.created_utc}\n")
                f.write(f"Subreddit: r/{SUBREDDIT}\n")

            return submission.permalink
        else:
            print("Cancelled. Edit the TITLE and BODY in this script to change the post content.")
            return None

    except Exception as e:
        print(f"❌ Error: {e}")
        print()
        if "invalid_grant" in str(e):
            print("This usually means wrong username/password.")
            print("If you use 2FA, you need to use an app password.")
        elif "Forbidden" in str(e):
            print("Your account might not have enough karma to post in this subreddit.")
        return None

if __name__ == "__main__":
    main()

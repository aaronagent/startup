const { chromium } = require('playwright');

const SUBREDDIT = 'vibecoding';
const TITLE = 'I curated 10 of the coolest tools and apps built with vibe coding this week';
const BODY = `Every week, people are shipping amazing tools using AI coding assistants. Most of them get buried. I spent this week hunting down the most interesting ones. Here's what I found.

1. Clico — AI supercharges every textbox in your browser
A browser extension that injects AI writing assistance into any text field on any website. Write, rewrite, summarize, translate — right where you type.

2. SUN — AI generates personalized audio lessons on any topic
Tell it what you want to learn, it creates a podcast-style lesson just for you. Available on iOS and Android.

3. Parallel Code — Run Claude, Codex, and Gemini simultaneously
Ten AI agents, ten git branches, one afternoon. Run multiple AI coding models in parallel and compare results.

4. Vibecode App — The mobile app that builds mobile apps
Describe your app in plain language or voice, get a real functional mobile app. Powered by Claude Code + Expo. Hunted by Alexis Ohanian on Product Hunt.

5. Sheet Ninja — Ship vibe-coded apps with Google Sheets as backend
Your data stays in Google Sheets. Build real web apps on top of your spreadsheets. Perfect for non-technical founders.

6. v0 by Vercel — Full-stack vibe coding platform
Describe what you want, get a working React component. The gold standard for UI generation.

7. Rork — Build real mobile apps by chatting with AI
Like v0 but for mobile. Chat with AI, get a real iOS/Android app.

8. Base44 — Build fully functional apps in minutes
No coding necessary. Describe your idea, get a working app with database, auth, and deployment.

9. Trae — Adaptive AI IDE that ships faster
An IDE that adapts to how you code. Designed to close the gap between thinking and shipping.

10. Genzi — The social app built around music
Not a coding tool — a real consumer app. Social platform where music is the core interaction.

What I noticed:
Most of these shipped in days, not months. The "Built with" stack is diversifying fast — Claude, Cursor, Bolt, Lovable, Replit, v0. 63% of vibe coders aren't professional devs. And distribution is still the biggest bottleneck — many great tools exist but nobody knows about them.

Want this every week?
If there's interest, I'll do this regularly. A curated weekly list of the best vibe-coded tools and apps. If you built something cool, drop a comment. I want to feature community-built tools next time.`;

(async () => {
  console.log('🚀 Launching browser (visible window)...');
  console.log('');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });

  const page = await context.newPage();

  // Step 1: Go to Reddit login
  console.log('Step 1: Opening Reddit login page...');
  console.log('👉 Please log in with your Reddit account in the browser window.');
  console.log('👉 After logging in, press ENTER here to continue.');
  console.log('');

  await page.goto('https://www.reddit.com/login');

  // Wait for user to log in
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  console.log('Step 2: Navigating to submit page...');
  await page.goto(`https://www.reddit.com/r/${SUBREDDIT}/submit`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Take screenshot to see what we have
  await page.screenshot({ path: '/tmp/reddit-submit-page.png' });
  console.log('📸 Screenshot saved to /tmp/reddit-submit-page.png');

  // Step 3: Try to fill in the title
  console.log('Step 3: Filling in title...');
  try {
    // Try multiple selectors for the title field
    const titleSelectors = [
      'textarea[placeholder*="Title"]',
      'input[placeholder*="Title"]',
      '[data-testid="post-title"]',
      'textarea[name="title"]',
      '#PostTitle--titleText'
    ];

    let titleFilled = false;
    for (const sel of titleSelectors) {
      try {
        const el = await page.waitForSelector(sel, { timeout: 3000 });
        if (el) {
          await el.click();
          await el.fill(TITLE);
          console.log(`  ✅ Title filled using selector: ${sel}`);
          titleFilled = true;
          break;
        }
      } catch(e) {}
    }

    if (!titleFilled) {
      console.log('  ⚠️  Could not find title field automatically.');
      console.log('  👉 Please type the title manually, then press ENTER here.');
      await new Promise(resolve => { process.stdin.once('data', resolve); });
    }
  } catch(e) {
    console.log('  Error with title:', e.message);
  }

  await page.waitForTimeout(1000);

  // Step 4: Fill in the body
  console.log('Step 4: Filling in body...');
  try {
    const bodySelectors = [
      '[data-testid="post-body"]',
      'div[contenteditable="true"]',
      'textarea[placeholder*="body"]',
      'textarea[placeholder*="Text"]',
      '.DraftEditor-root',
      '[role="textbox"]'
    ];

    let bodyFilled = false;
    for (const sel of bodySelectors) {
      try {
        const el = await page.waitForSelector(sel, { timeout: 3000 });
        if (el) {
          await el.click();
          // For contenteditable divs, use keyboard
          await page.keyboard.insertText(BODY);
          console.log(`  ✅ Body filled using selector: ${sel}`);
          bodyFilled = true;
          break;
        }
      } catch(e) {}
    }

    if (!bodyFilled) {
      console.log('  ⚠️  Could not find body field automatically.');
      console.log('  👉 Please paste the body manually (it is in your clipboard).');
      console.log('  👉 Then press ENTER here.');
      await new Promise(resolve => { process.stdin.once('data', resolve); });
    }
  } catch(e) {
    console.log('  Error with body:', e.message);
  }

  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/reddit-filled.png' });
  console.log('📸 Screenshot of filled form saved to /tmp/reddit-filled.png');

  // Step 5: Ask user to confirm before posting
  console.log('');
  console.log('Step 5: Ready to post!');
  console.log('👉 Review the post in the browser window.');
  console.log('👉 Type "post" and press ENTER to submit, or "cancel" to abort.');

  const answer = await new Promise(resolve => {
    process.stdin.once('data', (data) => resolve(data.toString().trim()));
  });

  if (answer.toLowerCase() === 'post') {
    console.log('Submitting...');
    try {
      const postBtn = await page.waitForSelector('button:has-text("Post")', { timeout: 5000 });
      await postBtn.click();
      await page.waitForTimeout(5000);

      const url = page.url();
      console.log('');
      console.log('✅ Post submitted!');
      console.log(`URL: ${url}`);

      await page.screenshot({ path: '/tmp/reddit-posted.png' });
      console.log('📸 Final screenshot saved to /tmp/reddit-posted.png');
    } catch(e) {
      console.log('Could not click Post button automatically.');
      console.log('👉 Please click the Post button manually in the browser.');
      console.log('Press ENTER when done.');
      await new Promise(resolve => { process.stdin.once('data', resolve); });
    }
  } else {
    console.log('Cancelled.');
  }

  console.log('');
  console.log('Browser will stay open for 30 seconds so you can verify...');
  await page.waitForTimeout(30000);

  await browser.close();
  console.log('Done.');
})();

const { chromium } = require('playwright');

const TWEETS = [
  `I spent this week hunting down the 10 coolest tools people built with vibe coding.\n\nMost of them get buried and nobody ever sees them.\n\nHere's the list 🧵👇`,

  `1/ Clico — AI supercharges every textbox in your browser\n\nA browser extension that adds AI writing to any text field. Write, rewrite, summarize, translate — right where you type.\n\ntryclico.com`,

  `2/ SUN — AI generates personalized audio lessons\n\nTell it what you want to learn, it creates a podcast-style lesson just for you. iOS + Android.\n\nsunapp.ai`,

  `3/ Parallel Code — Run Claude, Codex, and Gemini at the same time\n\nTen AI agents. Ten git branches. One afternoon.\n\nparallelcode.app`,

  `4/ Vibecode App — The mobile app that builds mobile apps\n\nDescribe your app in plain language, get a real functional app. Claude Code + Expo.\n\nHunted by @alexisohanian on Product Hunt.`,

  `5/ Sheet Ninja — Vibe-coded apps with Google Sheets as backend\n\nYour data stays in Sheets. Build real web apps on top. Perfect for non-technical founders.\n\nsheetninja.io`,

  `6/ v0 by @vercel — Full-stack vibe coding platform\n\nDescribe what you want, get a working React component. The gold standard.\n\nv0.dev`,

  `7/ Rork — Build real mobile apps by chatting\n\nLike v0 but for mobile. Chat → get a real iOS/Android app.\n\nrork.app`,

  `8/ Base44 — Build fully functional apps in minutes\n\nNo code needed. Describe your idea, get a working app with database, auth, and deployment.\n\nbase44.com`,

  `9/ Trae — Adaptive AI IDE\n\nAn IDE that adapts to how you code. Closes the gap between thinking and shipping.`,

  `10/ Genzi — Social app built around music\n\nNot a dev tool — a real consumer app. Shows what's possible when non-devs start building.\n\ngenzi.app`,

  `63% of vibe coders aren't professional devs. People are shipping real products in days.\n\nThe bottleneck isn't building anymore. It's distribution.\n\nIf you built something cool with AI, reply with a link. I want to feature you next week.\n\n🔁 RT if you want this list every week.`
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function waitForEnter(msg) {
  console.log(msg);
  return new Promise(resolve => {
    process.stdin.once('data', resolve);
  });
}

(async () => {
  console.log('🐦 Twitter Thread Auto-Poster');
  console.log('============================');
  console.log(`Will post ${TWEETS.length} tweets as a thread.`);
  console.log('');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });

  const page = await context.newPage();

  // Step 1: Login
  console.log('Step 1: Opening Twitter...');
  await page.goto('https://x.com/login');
  await waitForEnter('👉 Please log in to Twitter in the browser window.\n👉 After logging in and seeing the home timeline, press ENTER here.');

  // Step 2: Start composing
  console.log('');
  console.log('Step 2: Starting tweet composition...');
  await page.goto('https://x.com/compose/post');
  await sleep(3000);

  for (let i = 0; i < TWEETS.length; i++) {
    const tweet = TWEETS[i];
    console.log(`\nTweet ${i + 1}/${TWEETS.length}: ${tweet.substring(0, 60)}...`);

    try {
      // Find the tweet input area
      const tweetBox = await page.waitForSelector('[data-testid="tweetTextarea_0"] [contenteditable="true"], [role="textbox"][data-testid="tweetTextarea_0"]', { timeout: 10000 });

      if (tweetBox) {
        await tweetBox.click();
        await sleep(500);

        // Type the tweet content
        await page.keyboard.insertText(tweet);
        await sleep(1000);

        if (i < TWEETS.length - 1) {
          // Not the last tweet — click "Add another tweet" / "+" button to continue thread
          console.log('  Adding next tweet to thread...');

          // Try to find the add tweet button
          const addBtnSelectors = [
            '[data-testid="addButton"]',
            'button[aria-label="Add post"]',
            '[aria-label="Add another Tweet"]'
          ];

          let addClicked = false;
          for (const sel of addBtnSelectors) {
            try {
              const btn = await page.waitForSelector(sel, { timeout: 3000 });
              if (btn) {
                await btn.click();
                await sleep(1500);
                addClicked = true;
                console.log('  ✅ Added to thread');
                break;
              }
            } catch(e) {}
          }

          if (!addClicked) {
            console.log('  ⚠️  Could not find "Add tweet" button automatically.');
            await waitForEnter('  👉 Click the "+" button to add another tweet, then press ENTER.');
          }
        }
      } else {
        console.log('  ⚠️ Could not find tweet input box.');
        await waitForEnter('  👉 Please type this tweet manually, then press ENTER.');
      }
    } catch(e) {
      console.log(`  Error: ${e.message}`);
      await waitForEnter('  👉 Please handle this tweet manually, then press ENTER.');
    }
  }

  // Take screenshot before posting
  await page.screenshot({ path: '/tmp/twitter-thread-preview.png' });
  console.log('\n📸 Thread preview screenshot saved to /tmp/twitter-thread-preview.png');

  console.log('');
  const answer = await new Promise(resolve => {
    console.log('Step 3: Ready to post the thread!');
    console.log('👉 Review in the browser. Type "post" + ENTER to submit, or "cancel" to abort.');
    process.stdin.once('data', (data) => resolve(data.toString().trim()));
  });

  if (answer.toLowerCase() === 'post') {
    console.log('Posting thread...');
    try {
      const postBtn = await page.waitForSelector('[data-testid="tweetButton"], [data-testid="tweetButtonInline"]', { timeout: 5000 });
      await postBtn.click();
      await sleep(5000);
      console.log('✅ Thread posted!');
      console.log(`Check your profile: ${page.url()}`);
      await page.screenshot({ path: '/tmp/twitter-posted.png' });
    } catch(e) {
      console.log('Could not click Post button. Please click it manually.');
      await waitForEnter('Press ENTER when done.');
    }
  } else {
    console.log('Cancelled.');
  }

  console.log('\nBrowser stays open for 30 seconds...');
  await sleep(30000);
  await browser.close();
  console.log('Done.');
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Testing Feeling Modal ===\n');
  
  // Go to main page
  await page.goto('https://3in1-any.pages.dev', { waitUntil: 'networkidle' });
  console.log('1. Main page loaded');
  
  // Check for floating heart on main page
  const hasHeart = await page.$('#floating-heart');
  console.log('   Floating heart on main page:', !!hasHeart);
  
  // Check if feeling modal HTML exists
  const html = await page.content();
  console.log('   Feeling modal in HTML:', html.includes('feeling-modal'));
  console.log('   Response section in HTML:', html.includes('feeling-response'));
  console.log('   Back button in HTML:', html.includes('back-to-emojis'));
  console.log('   showResponse function:', html.includes('showResponse'));
  
  await browser.close();
  
  console.log('\n=== Test Complete ===');
})();

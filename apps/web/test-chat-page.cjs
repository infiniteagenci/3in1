const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Testing /chat Page ===\n');
  
  // Go to chat page (will redirect to login)
  await page.goto('https://3in1-any.pages.dev/chat', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);
  
  if (currentUrl.includes('login')) {
    console.log('   Redirected to login (need authentication)');
  } else {
    console.log('   On chat page');
    
    // Check for floating heart
    const hasHeart = await page.$('#floating-heart');
    console.log('   Floating heart:', !!hasHeart);
    
    // Check modal
    const html = await page.content();
    console.log('   Feeling modal:', html.includes('feeling-modal'));
    console.log('   Response section:', html.includes('feeling-response'));
    console.log('   showResponse function:', html.includes('showResponse'));
    console.log('   feelingSelected dispatch:', html.includes('feelingSelected'));
  }
  
  await browser.close();
  
  console.log('\n=== Test Complete ===');
})();

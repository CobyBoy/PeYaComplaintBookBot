import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const options = {
  headless: true,
  defaultViewport: null,
  args: ['--window-size=1500,1080', '--no-sandbox', '--disable-setuid-sandbox'],
};

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 911 });

await page.goto('https://www.pedidosya.com.ar/complaint-book');
await page.waitForSelector(
  'main > div > div > div > div.Homestyle__ButtonContainer-sc-7kzful-3.cCgBFq > div > button > div > span'
);
await page.click(
  'main > div > div > div > div.Homestyle__ButtonContainer-sc-7kzful-3.cCgBFq > div > button > div > span'
);

//await page.goto('https://www.pedidosya.com.ar/complaint-book/register')
await page.waitForTimeout(5000);

await page.waitForSelector('#fenix-input');
await page.click('#fenix-input');

await page.type('#fenix-input', 'tu nombre', { delay: 250 });

const document = await page.$('[id="fenix-input"][name="documentNumber"]');

await document.type('tu DNI', { delay: 150 });

const phone = await page.$('[id="fenix-input"][name="phone"]');

await phone.type('tu celular', { delay: 200 });

const email = await page.$('[id="fenix-input"][name="email"]');

await email.type('tumail@gmail.com', { delay: 250 });

await page.waitForSelector('#fenix-textarea');
await page.type('#fenix-textarea', 'mensaje de queja', { delay: 250 });

await page.waitForSelector(
  'main > div > div > div > form > div.ArgentinaFormstyle__ActionsContainer-sc-u6clmg-4.jOzYnM > div:nth-child(2) > button'
);
await page.waitForTimeout(2000);

await page.click(
  'main > div > div > div > form > div.ArgentinaFormstyle__ActionsContainer-sc-u6clmg-4.jOzYnM > div:nth-child(2) > button',
  { clickCount: 1 }
);

//const waitForNav = page.waitForNavigation({ timeout: 60000, waitUntil: 'networkidle0' });
//await waitForNav;

await page.waitForTimeout(20000);
await browser.close();

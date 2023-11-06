const puppeteer = require("puppeteer");

async function getKeywordRank(domain, keyword) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(keyword)}`
  );

  const results = await page.$$eval("#search a > h3", (elems) => {
    return elems.map((h3) => {
      const title = h3.innerText;
      const link = h3.parentElement.href;
      return {
        title,
        link,
      };
    });
  });

  await page.close();
  await browser.close();

  console.log(results);
  return results.findIndex((resultItem) => resultItem.link.includes(domain));
}

getKeywordRank("github.com", "git").then((pos) => console.log(pos));

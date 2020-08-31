const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require("dotenv").config({ path: '../.env' });

// Set database connection
mongoose
  .connect(process.env.MONGODB_URL_TEST || "mongodb://localhost:27017/polls-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Conected"))
  .catch((error) => console.log(error));
  
beforeEach(async () => {
  for (var i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].deleteMany({});
  }
});

test("user can register and login", async() => {
  let browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=1920,1080`],
  });
  let page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.click('a[href="/signup"]');

  // register
  await page.waitFor("input[id=email]");
  await page.type("input[id=name]", "Diego Cárdenas");
  await page.type("input[id=email]", "diego.cardenasaleg22@gmail.com");
  await page.type("input[id=password]", "123456789");
  const nav = page.waitForNavigation();
  await page.click("button[type=submit]");
  await nav;
  
  // login
  expect(page.url()).toBe("http://localhost:3000/signup");
  await page.waitFor("input[id=email]");
  await page.type("input[id=email]", "diego.cardenasaleg22@gmail.com");
  await page.type("input[id=password]", "123456789");
  await page.click("button[type=submit]");

  expect(page.url()).toBe("http://localhost:3000/signup");

  await mongoose.disconnect();
  await browser.close();
});

import { Injectable, Logger } from "@nestjs/common";
import { SharedEnvService } from "@src/shared/shared-env.service";
// import * as puppeteer from "puppeteer";
import * as pcore from "puppeteer-core";

const log = new Logger("SheinService");

@Injectable()
export class SheinService {
  constructor(private readonly sharedEnvService: SharedEnvService) {}

  async getProducts(productName: string) {
    const sbrWsUrl = this.sharedEnvService.getOrThrow<string>("SBR_WS_URL");

    console.warn("productName", productName);

    productName = decodeURIComponent(productName);

    const browser = await pcore
      .connect({
        browserWSEndpoint: sbrWsUrl,
      })
      .catch((error) => {
        log.error(`Error: ${error}`);
      });

    if (!browser) {
      throw new Error("Browser is not available");
    }

    /**
    const browserP = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    */

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(5 * 60 * 1000); // 2 minutes

      log.debug("Navigating to Shein...");

      await Promise.all([page.waitForNavigation(), page.goto("https://www.shein.com/")]).catch((error) => {
        log.error(`Error: ${error}`);
      });

      log.debug("Searching for products...");

      await Promise.all([
        page.waitForNavigation(),
        page.waitForSelector(".search-input"),
        page.type(".search-input", productName),
        page.click(".search-button"),
      ]).catch((error) => {
        log.error(`Error: ${error}`);
      });

      log.debug("Getting products...");

      return await page.$$eval(".product-list .product-card", this.handleProducts);

      /**
      // .product-card
      return await page.$$eval(".product-list .product-card", (resultItems) => {
        console.warn("resultItems", resultItems);

        return resultItems.map((resultItem) => {
          const url = resultItem?.querySelector("a")?.getAttribute("href");
          const nameFromLabel = resultItem?.ariaLabel;
          const name = resultItem?.querySelector(".product-name")?.textContent;
          const price = resultItem?.querySelector(
            ".normal-price-ctn__sale-price .product-item__camecase-wrap"
          )?.textContent;

          //   const price = resultItem?.querySelector(
          //     ".bottom-wrapper__price-wrapper .product-card__price .product-card__prices-info .normal-price-ctn__prices .normal-price-ctn__sale-price-wrapper .normal-price-ctn__sale-price .product-item__camecase-wrap"
          //   )?.textContent;

          return {
            url,
            nameFromLabel,
            name,
            price,
          };
        });
      });
      */
    } finally {
      await browser.close();
    }
  }

  private readonly handleProducts = (resultItems: Element[]) => {
    console.warn("resultItems", resultItems);

    const formattedProductsArray = resultItems.map(this.formatProducts);

    return {
      productsQuantity: formattedProductsArray.length,
      products: formattedProductsArray,
    };
  };

  private readonly formatProducts = (resultItem: Element) => {
    const url = resultItem?.querySelector("a")?.getAttribute("href");
    const nameFromLabel = resultItem?.ariaLabel;
    const name = resultItem?.querySelector(".product-name")?.textContent;
    const price = resultItem?.querySelector(".normal-price-ctn__sale-price .product-item__camecase-wrap")?.textContent;

    return {
      url,
      nameFromLabel,
      name,
      price,
    };
  };
}

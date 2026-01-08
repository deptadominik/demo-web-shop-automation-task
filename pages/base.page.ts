import { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { TopMenuComponent } from '../components/top-menu.component';

export abstract class BasePage {
  private readonly headerRoot: Locator;
  private readonly topMenuRoot: Locator;
  protected readonly page: Page;
  readonly header: HeaderComponent;
  readonly topMenu: TopMenuComponent;

  constructor(page: Page) {
    this.page = page;
    this.headerRoot = this.page.locator('.header');
    this.topMenuRoot = this.page.locator('.top-menu');
    this.header = new HeaderComponent(this.headerRoot);
    this.topMenu = new TopMenuComponent(this.topMenuRoot);
  }

  async goto(path: string) {
    await this.page.goto(path);
  }
}
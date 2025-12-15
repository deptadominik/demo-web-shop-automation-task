import { Locator } from "@playwright/test";

export class TopMenuComponent {
  private readonly root: Locator;

  private readonly computersMenu: Locator;
  private readonly desktopsSubMenu: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.computersMenu = this.root.locator("text=Computers");
    this.desktopsSubMenu = this.root.locator("text=Desktops");
  }

  async openDesktopsCategory() {
    await this.computersMenu.hover();
    await this.desktopsSubMenu.click();
  }
}

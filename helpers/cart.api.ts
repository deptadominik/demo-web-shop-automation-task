import { Page } from '@playwright/test';

const DEFAULT_PRODUCT_ATTRIBUTES = {
  processor: 52,
  ram: 54,
  hdd: 57,
} as const;

export async function addProductToCart(
  page: Page,
  productId: number,
  quantity: number
) {
  await page.request.post(
    `/addproducttocart/details/${productId}/1`,
    {
      form: {

        product_attribute_72_5_18: DEFAULT_PRODUCT_ATTRIBUTES.processor,
        product_attribute_72_6_19: DEFAULT_PRODUCT_ATTRIBUTES.ram,
        product_attribute_72_3_20: DEFAULT_PRODUCT_ATTRIBUTES.hdd,

        [`addtocart_${productId}.EnteredQuantity`]: quantity,
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
  );
}

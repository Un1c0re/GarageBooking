import { YooCheckout } from "@a2seven/yoo-checkout";

export const yooCheckout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

import { ICreatePayment } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";

import { yooCheckout } from "@/config/yoo.config";

export class YooService {
  async createPayment(orderId: string, userId: string, amount: number) {
    const payload: ICreatePayment = {
      amount: { value: amount.toFixed(2), currency: "RUB" },
      payment_method_data: { type: "bank_card" },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: "https://secondly-worthy-shrimp.cloudpub.ru",
      },
      metadata: { orderId, userId },
    };

    return await yooCheckout.createPayment(payload, uuidv4());
  }
}

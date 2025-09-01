import { Payment } from "@prisma/client";

import { prisma } from "@/db/prisma";

export class PaymentService {
  async savePayment(payment: Payment): Promise<Payment> {
    return prisma.payment.upsert({
      where: { id: payment.id },
      update: { status: payment.status },
      create: {
        id: payment.id,
        orderId: payment.orderId,
        userId: payment.userId,
        amount: payment.amount,
        status: payment.status,
      },
    });
  }

  async getPayments(): Promise<Payment[]> {
    return prisma.payment.findMany({ orderBy: { createdAt: "desc" } });
  }
}

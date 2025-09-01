import { Payment } from "@a2seven/yoo-checkout";
import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";

import { PaymentService } from "@/services/payment.service";
import { YooService } from "@/services/yoo.service";

interface PaymentDto {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: Date;
}

@Route("payment")
export class PaymentController extends Controller {
  private paymentService: PaymentService;
  private yooService: YooService;

  constructor() {
    super();
    this.paymentService = new PaymentService();
    this.yooService = new YooService();
  }

  @Get()
  public async getPayments(): Promise<PaymentDto[]> {
    return await this.paymentService.getPayments();
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createPayment(@Body() body: PaymentDto): Promise<Payment> {
    return await this.yooService.createPayment(body.orderId, body.userId, body.amount);
  }

  @SuccessResponse("200", "OK")
  @Post("notifications")
  public async handleNotification(@Body() body: PaymentDto): Promise<{ status: string }> {
    await this.paymentService.savePayment(body);
    return { status: "OK" };
  }
}

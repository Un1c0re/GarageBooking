import { EventMessage } from "@/types/events";

export function buildEmail(event: EventMessage) {
  let subject = "";
  let text = "";
  let recipient = event.userEmail || event.adminEmail;

  switch (event.type) {
    case "ApplicationCreated":
      subject = "Новая заявка";
      text = `Создана заявка #${event.applicationId} от ${event.userEmail}`;
      recipient = event.adminEmail!;
      break;

    case "ApplicationApproved":
      subject = "Ваша заявка одобрена";
      text = `Заявка #${event.applicationId} одобрена.`;
      recipient = event.userEmail!;
      break;

    case "ApplicationRejected":
      subject = "Ваша заявка отклонена";
      text = `Заявка #${event.applicationId} отклонена.`;
      recipient = event.userEmail!;
      break;

    case "PaymentSucceeded":
      subject = "Оплата прошла успешно";
      text = `Оплата заявки #${event.applicationId} на сумму ${event.amount} прошла успешно.`;
      recipient = [event.userEmail!, event.adminEmail!].join(", ");
      break;
  }

  return { subject, text, recipient };
}

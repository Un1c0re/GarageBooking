export type EventMessage =
  | {
      type: "ApplicationCreated";
      applicationId: number;
      userEmail: string;
      adminEmail: string;
    }
  | {
      type: "ApplicationApproved" | "ApplicationRejected";
      applicationId: number;
      userEmail: string;
      adminEmail: string;
    }
  | {
      type: "PaymentSucceeded";
      applicationId: number;
      userEmail: string;
      adminEmail: string;
      amount: number;
    };

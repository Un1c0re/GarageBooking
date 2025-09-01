/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentController } from './controllers/payment.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "PaymentDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "orderId": {"dataType":"string","required":true},
            "userId": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "status": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"enum","enums":["waiting_for_capture","pending","succeeded","canceled"],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAmount": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMethodType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["bank_card"]},{"dataType":"enum","enums":["apple_pay"]},{"dataType":"enum","enums":["google_pay"]},{"dataType":"enum","enums":["yoo_money"]},{"dataType":"enum","enums":["qiwi"]},{"dataType":"enum","enums":["webmoney"]},{"dataType":"enum","enums":["sberbank"]},{"dataType":"enum","enums":["alfabank"]},{"dataType":"enum","enums":["tinkoff_bank"]},{"dataType":"enum","enums":["b2b_sberbank"]},{"dataType":"enum","enums":["sbp"]},{"dataType":"enum","enums":["mobile_balance"]},{"dataType":"enum","enums":["cash"]},{"dataType":"enum","enums":["installments"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVatDataType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["untaxed"]},{"dataType":"enum","enums":["calculated"]},{"dataType":"enum","enums":["mixed"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVatData": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"IVatDataType","required":true},
            "amount": {"ref":"IAmount"},
            "rate": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMethodData": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"IPaymentMethodType","required":true},
            "login": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "payment_purpose": {"dataType":"string"},
            "vat_data": {"ref":"IVatData"},
            "card": {"dataType":"nestedObjectLiteral","nestedProperties":{"csc":{"dataType":"string","required":true},"cardholder":{"dataType":"string","required":true},"expiry_year":{"dataType":"string","required":true},"expiry_month":{"dataType":"string","required":true},"number":{"dataType":"string","required":true}}},
            "payment_data": {"dataType":"string"},
            "payment_method_token": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRecipient": {
        "dataType": "refObject",
        "properties": {
            "account_id": {"dataType":"string"},
            "gateway_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConfirmationType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["embedded"]},{"dataType":"enum","enums":["external"]},{"dataType":"enum","enums":["qr"]},{"dataType":"enum","enums":["redirect"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConfirmation": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"IConfirmationType","required":true},
            "locale": {"dataType":"string"},
            "confirmation_token": {"dataType":"string"},
            "confirmation_data": {"dataType":"string"},
            "confirmation_url": {"dataType":"string"},
            "enforce": {"dataType":"boolean"},
            "return_url": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPassenger": {
        "dataType": "refObject",
        "properties": {
            "first_name": {"dataType":"string","required":true},
            "last_name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentLeg": {
        "dataType": "refObject",
        "properties": {
            "departure_airport": {"dataType":"string","required":true},
            "destination_airport": {"dataType":"string","required":true},
            "departure_date": {"dataType":"string","required":true},
            "carrier_code": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAirline": {
        "dataType": "refObject",
        "properties": {
            "account_id": {"dataType":"string"},
            "ticket_number": {"dataType":"string"},
            "booking_reference": {"dataType":"string"},
            "passengers": {"dataType":"array","array":{"dataType":"refObject","ref":"IPassenger"}},
            "legs": {"dataType":"array","array":{"dataType":"refObject","ref":"IPaymentLeg"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReceiptStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"enum","enums":["pending","succeeded","canceled"],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITransfer": {
        "dataType": "refObject",
        "properties": {
            "account_id": {"dataType":"string","required":true},
            "amount": {"ref":"IAmount","required":true},
            "status": {"ref":"IPaymentStatus"},
            "platform_fee_amount": {"ref":"IAmount","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICheckoutCustomer": {
        "dataType": "refObject",
        "properties": {
            "full_name": {"dataType":"string"},
            "inn": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentSubject": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["commodity"]},{"dataType":"enum","enums":["excise"]},{"dataType":"enum","enums":["job"]},{"dataType":"enum","enums":["service"]},{"dataType":"enum","enums":["gambling_bet"]},{"dataType":"enum","enums":["gambling_prize"]},{"dataType":"enum","enums":["lottery"]},{"dataType":"enum","enums":["lottery_prize"]},{"dataType":"enum","enums":["intellectual_activity"]},{"dataType":"enum","enums":["payment"]},{"dataType":"enum","enums":["agent_commission"]},{"dataType":"enum","enums":["property_right"]},{"dataType":"enum","enums":["non_operating_gain"]},{"dataType":"enum","enums":["insurance_premium"]},{"dataType":"enum","enums":["sales_tax"]},{"dataType":"enum","enums":["resort_fee"]},{"dataType":"enum","enums":["composite"]},{"dataType":"enum","enums":["another"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPaymentMode": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["full_prepayment"]},{"dataType":"enum","enums":["partial_prepayment"]},{"dataType":"enum","enums":["advance"]},{"dataType":"enum","enums":["full_payment"]},{"dataType":"enum","enums":["partial_payment"]},{"dataType":"enum","enums":["credit"]},{"dataType":"enum","enums":["credit_payment"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IItem.Exclude_keyofIItem.supplier-or-agent_type__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"description":{"dataType":"string","required":true},"quantity":{"dataType":"string","required":true},"amount":{"ref":"IAmount","required":true},"vat_code":{"dataType":"double","required":true},"payment_subject":{"ref":"IPaymentSubject"},"payment_mode":{"ref":"IPaymentMode"},"product_code":{"dataType":"string"},"country_of_origin_code":{"dataType":"string"},"customs_declaration_number":{"dataType":"string"},"excise":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IItem.supplier-or-agent_type_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IItem.Exclude_keyofIItem.supplier-or-agent_type__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IItemWithoutData": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_IItem.supplier-or-agent_type_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReceipt": {
        "dataType": "refObject",
        "properties": {
            "customer": {"ref":"ICheckoutCustomer"},
            "items": {"dataType":"array","array":{"dataType":"refAlias","ref":"IItemWithoutData"},"required":true},
            "tax_system_code": {"dataType":"double"},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Payment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "status": {"ref":"IPaymentStatus","required":true},
            "paid": {"dataType":"boolean","required":true},
            "amount": {"ref":"IAmount","required":true},
            "income_amount": {"ref":"IAmount","required":true},
            "refunded_amount": {"ref":"IAmount","required":true},
            "created_at": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "expires_at": {"dataType":"string","required":true},
            "captured_at": {"dataType":"string","required":true},
            "metadata": {"dataType":"any","required":true},
            "payment_token": {"dataType":"string","required":true},
            "payment_method_id": {"dataType":"string","required":true},
            "payment_method_data": {"ref":"IPaymentMethodData","required":true},
            "payment_method": {"dataType":"nestedObjectLiteral","nestedProperties":{"account_number":{"dataType":"string"},"phone":{"dataType":"string"},"vat_data":{"ref":"IVatData"},"payment_purpose":{"dataType":"string"},"payer_bank_details":{"dataType":"nestedObjectLiteral","nestedProperties":{"account":{"dataType":"string","required":true},"bank_bik":{"dataType":"string","required":true},"bank_branch":{"dataType":"string","required":true},"bank_name":{"dataType":"string","required":true},"kpp":{"dataType":"string","required":true},"inn":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"short_name":{"dataType":"string","required":true},"full_name":{"dataType":"string","required":true}}},"login":{"dataType":"string"},"title":{"dataType":"string"},"card":{"dataType":"nestedObjectLiteral","nestedProperties":{"source":{"dataType":"string"},"issuer_name":{"dataType":"string"},"issuer_country":{"dataType":"string"},"card_type":{"dataType":"string","required":true},"expiry_year":{"dataType":"string","required":true},"expiry_month":{"dataType":"string","required":true},"last4":{"dataType":"string","required":true},"first6":{"dataType":"string","required":true}}},"saved":{"dataType":"boolean","required":true},"id":{"dataType":"string","required":true},"type":{"ref":"IPaymentMethodType","required":true}},"required":true},
            "recipient": {"ref":"IRecipient","required":true},
            "confirmation": {"ref":"IConfirmation","required":true},
            "save_payment_method": {"dataType":"boolean","required":true},
            "capture": {"dataType":"boolean","required":true},
            "client_ip": {"dataType":"string","required":true},
            "airline": {"ref":"IAirline","required":true},
            "refundable": {"dataType":"boolean","required":true},
            "test": {"dataType":"boolean","required":true},
            "receipt_registration": {"ref":"IReceiptStatus","required":true},
            "cancellation_details": {"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true},"party":{"dataType":"string","required":true}},"required":true},
            "authorization_details": {"dataType":"nestedObjectLiteral","nestedProperties":{"rrn":{"dataType":"string","required":true},"auth_code":{"dataType":"string","required":true}},"required":true},
            "transfers": {"dataType":"array","array":{"dataType":"refObject","ref":"ITransfer"},"required":true},
            "receipt": {"ref":"IReceipt","required":true},
            "merchant_customer_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPaymentController_getPayments: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/payment',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getPayments)),

            async function PaymentController_getPayments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getPayments, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getPayments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_createPayment: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"PaymentDto"},
        };
        app.post('/payment',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.createPayment)),

            async function PaymentController_createPayment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_createPayment, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'createPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_handleNotification: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"PaymentDto"},
        };
        app.post('/payment/notifications',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.handleNotification)),

            async function PaymentController_handleNotification(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_handleNotification, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'handleNotification',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

import { Static, Type } from "@sinclair/typebox";

export const TransactBodyObject = Type.Object({
  wallet: Type.String(),
  comment: Type.String(),
  amount: Type.Number(),
});

export const updateStatusSchema = Type.Object({
  wallet: Type.String(),
  status: Type.String(),
  transact_id: Type.String(),
  amount: Type.Number(),
});

export const TransactResponseSchema = Type.Object({
  balance: Type.Number(),
});

export type TransactType = Static<typeof TransactBodyObject>;
export type UpdateStatusType = Static<typeof updateStatusSchema>;

export const transactMoneySchema = {
  schema: {
    body: TransactBodyObject,
    response: {
      201: TransactResponseSchema,
    },
  },
};

export const updatePaymentStatusSchema = {
  schema: {
    body: updateStatusSchema,
    response: {
      200: TransactResponseSchema,
    },
  },
};

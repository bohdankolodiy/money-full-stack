import { Static, Type } from "@sinclair/typebox";

export const HistoryObject = Type.Object({
  id: Type.String(),
  amount: Type.Number(),
  action: Type.String(),
  userid: Type.String(),
  status: Type.String(),
  date: Type.String(),
  comment: Type.String() || Type.Null(),
  card: Type.String() || Type.Null(),
  wallet: Type.String() || Type.Null(),
  transact_id: Type.String() || Type.Null(),
});

export const HistoryResponseArray = Type.Array(
  Type.Object({
    amount: Type.Number(),
    date: Type.String(),
    items: Type.Array(HistoryObject),
  })
);

export const HistoryBodyObject = Type.Object({
  id: Type.String(),
});

export type HistoryRequestType = Static<typeof HistoryBodyObject>;

export const allHistorySchema = {
  schema: {
    response: {
      200: HistoryResponseArray,
    },
  },
};

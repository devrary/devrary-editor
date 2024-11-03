export type ModalType = "payment";

export type ModalParamManager = {
  [key in ModalType]: PaymentModalParam | null;
};

export type PaymentModalParam = {};

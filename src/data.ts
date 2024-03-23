import moment from "moment";
import { ConvertMoney, convertMoneytoTextVietnamese } from "./utils";

export const infoBill = {
  qrCodeZaloOA:
    "https://page-photo-qr.zdn.vn/1700537375/aecd95e081a568fb31b4.jpg",
  address: "số 15 duy tân, cầu giấy, hà nội",
  phone: "1900292959",
  orderCode: "2993249235893432",
  date: moment().locale("vi").format("LL"),
  customerName: "a Quang",
  totalOfOrder: ConvertMoney(890000),
  discount: ConvertMoney(Number(0) * Number(-1)),
  priceServicePack: ConvertMoney(90000),
  totalOfCheckout: ConvertMoney(980000),
  totalCheckoutToText: convertMoneytoTextVietnamese(String(980000)),
};

export const listProduct = [
  {
    productName: "Gói cơ bản vệ sinh toàn",
    price: "200.000",
    qualities: 8,
    totalPrice: "1.600.000",
  },
  {
    productName: "Máy lọc nước nóng nhanh lạnh nguội 10 lõi MUTOSI MP-F1041",
    price: "11.809.091",
    qualities: 1,
    totalPrice: "12.990.000",
  },
];
import express from "express";
import path from "path";
import nodeHtmlToImage from "node-html-to-image";
import { infoBill, listProduct } from "./data";

const app = express();
const port = 3000;

const renderTableBill = () => {
  let html = "";
  listProduct.map((item, index) => {
    html += `<tr>
    <td>${item.productName}</td>
    <td>${item.price}</td>
    <td>${item.qualities}</td>
    <td>${item.totalPrice}</td>
    </tr>`;
  });

  return html;
};

app.get("/", (req, res) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
  <style>
      body {
          font-size: 18px;
          font-family: 'Roboto';
          text-align: center;
          font-weight: 600;
      }
      .panel-bill {
          margin: 0 auto;
          width: 360px;
          padding: 20px 20px 20px 0;
      }
      th {
          border-bottom: 1px dashed #000;
          padding: 5px;
          border-top: 1px dashed #000;
      }
      table {
          border-bottom: 1px dashed #000;
          border-collapse: separate;
          border-spacing: 0px 10px;
      }
      td {
          padding: 5px;
      }
  </style>
  </head>
  <body>
      <div class="panel-bill" id="contentToConvert">
          <p><b>Zalo QA</b></p>
          <img src="${infoBill.qrCodeZaloOA}" alt="" style="max-width: 300px;">
          <h2 style="text-transform: uppercase; font-weight: 700;">
            Store
          </h2>
          <p style="font-size: 20px;">Địa chỉ: ${infoBill.address}</p>
          <p style="font-size: 20px;">Hotline: ${infoBill.phone}</p>
          <h2 style="text-transform: uppercase;">Hóa Đơn bán hàng</h2>
          <p style="font-size: 18px;">Mã HĐ: ${infoBill.orderCode}</p>
          <P style="font-size: 18px;">Ngày ${infoBill.date}</P>
          <h3 style="font-size: 18px;">Khánh hàng: ${infoBill.customerName}</h3>
          <table>
              <tr>
                  <th>Tên hàng</th>
                  <th>Đ. giá</th>
                  <th>SL</th>
                  <th>T.tiền</th>
              </tr>
              ${renderTableBill()}
          </table>
          <div class="price" style="text-align: end;">
              <p style="margin-right: 10px;"> <b>Tổng đơn hàng:</b> <b>${
                infoBill.totalOfOrder
              }</b></p>
              <p style="margin-right: 10px;"> <b>Giá dịch vụ:</b> <b>${
                infoBill.priceServicePack
              }</b></p>
              <p style="margin-right: 10px;"> <b>Khuyến mãi:</b> <b>${
                infoBill.discount
              }</b></p>
              <p style="margin-right: 10px;"> <b>Tổng thanh toán:</b> <b>${
                infoBill.totalOfCheckout
              }</b></p>
              <p style="margin-right: 10px;">Giá đã bao gồm VAT</p>
              <p style="text-align: left;">(${infoBill.totalCheckoutToText})</p>
          </div>
          <h2>Thợ Tốt xin cảm ơn quý khách và hẹn gặp lại</h2>
      </div>
  </body>
  </html>
  `;
  res.send(html);
  nodeHtmlToImage({
    output: path.join(__dirname, "image.png"),
    html: html,
    selector: ".panel-bill",
    quality: 100,
  }).then(() => console.log("The image was created successfully!"));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

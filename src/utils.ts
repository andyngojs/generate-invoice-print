export function ConvertMoney(
  money: number | string | undefined
): string | undefined {
  return money?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const defaultNumbers: string = " hai ba bốn năm sáu bảy tám chín ";
const chuHangDonVi: string[] = ("1 một" + defaultNumbers).split(" ");
const chuHangChuc: string[] = ("lẻ mười" + defaultNumbers).split(" ");
const chuHangTram: string[] = ("không một" + defaultNumbers).split(" ");
const dvBlock: string[] = "1 nghìn triệu tỷ".split(" ");

export const convertMoneytoTextVietnamese = (money: string) => {
  let str = parseInt(money) + "";
  let i = 0;
  let arr = [];
  let index = str.length;
  let result = [];
  let rsString = "";

  if (index === 0 || str === "NaN") {
    return "";
  }

  const convertBlockTwo = (number: string) => {
    let dv = chuHangDonVi[Number(number[1])];
    let chuc = chuHangChuc[Number(number[0])];
    let append = "";

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > "0" && number[1] === "5") {
      dv = "lăm";
    }

    // Nếu số hàng chục lớn hơn 1
    if (number[0] > "1") {
      append = "mươi";

      if (number[1] === "1") {
        dv = "mốt";
      }
    }

    return chuc + " " + append + " " + dv;
  };

  const convertBlockThree = (number: string) => {
    if (number == "000") return "";
    let _a: string = number + ""; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
      case 0:
        return "";
      case 1:
        return chuHangDonVi[Number(_a)];
      case 2:
        return convertBlockTwo(_a);
      case 3:
        let chuc_dv = "";
        if (_a.slice(1, 3) != "00") {
          chuc_dv = convertBlockTwo(_a.slice(1, 3));
        }
        let tram = chuHangTram[Number(_a[0])] + " trăm";
        return tram + " " + chuc_dv;
    }
  };

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== "" && arr[i] !== "000") {
      result.push(convertBlockThree(arr[i]));

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i]);
      }
    }
  }

  result.push("đồng");
  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(" ");

  // Trả về kết quả kèm xóa những ký tự thừa
  return rsString.replace(/[0-9]/g, "").replace(/ /g, " ").replace(/ $/, "");
};

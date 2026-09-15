// Danh sách cây cảnh
let danhSachCay = [
    {
        ma: "C01",
        ten: "Kim Tiền",
        loai: "Cây phong thủy",
        gia: 150000,
        soLuong: 10
    },
    {
        ma: "C02",
        ten: "Lưỡi Hổ",
        loai: "Cây nội thất",
        gia: 120000,
        soLuong: 8
    },
    {
        ma: "C03",
        ten: "Trầu Bà",
        loai: "Cây nội thất",
        gia: 80000,
        soLuong: 15
    },
    {
        ma: "C04",
        ten: "Sen Đá",
        loai: "Cây mini",
        gia: 35000,
        soLuong: 20
    }
];


// HIỂN THỊ DANH SÁCH CÂY
function hienThiDanhSach(ds = danhSachCay) {

    const bang = document.getElementById("danhSachCay");

    bang.innerHTML = "";

    ds.forEach((cay, index) => {

        const dong = document.createElement("tr");

        dong.innerHTML = `
            <td>${index + 1}</td>
            <td>${cay.ma}</td>
            <td>${cay.ten}</td>
            <td>${cay.loai}</td>
            <td>${cay.gia.toLocaleString("vi-VN")}đ</td>
            <td>${cay.soLuong}</td>

            <td>
                <button class="btn-edit"
                    onclick="suaCay(${index})">
                    Sửa
                </button>

                <button class="btn-delete"
                    onclick="xoaCay(${index})">
                    Xóa
                </button>
            </td>
        `;

        bang.appendChild(dong);
    });

    capNhatThongKe();
}


// THÊM CÂY
function themCay() {

    const ma = document.getElementById("maCay").value.trim();
    const ten = document.getElementById("tenCay").value.trim();
    const loai = document.getElementById("loaiCay").value.trim();
    const gia = Number(document.getElementById("giaCay").value);
    const soLuong = Number(document.getElementById("soLuong").value);

    if (!ma || !ten || !loai || gia <= 0 || soLuong < 0) {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;
    }

    const cayMoi = {
        ma: ma,
        ten: ten,
        loai: loai,
        gia: gia,
        soLuong: soLuong
    };

    danhSachCay.push(cayMoi);

    hienThiDanhSach();

    xoaForm();
}


// XÓA CÂY
function xoaCay(index) {

    const xacNhan = confirm(
        "Bạn có chắc muốn xóa cây này không?"
    );

    if (xacNhan) {

        danhSachCay.splice(index, 1);

        hienThiDanhSach();
    }
}


// SỬA CÂY
function suaCay(index) {

    const cay = danhSachCay[index];

    const tenMoi = prompt(
        "Nhập tên cây mới:",
        cay.ten
    );

    if (tenMoi === null || tenMoi.trim() === "") {
        return;
    }

    const giaMoi = prompt(
        "Nhập giá mới:",
        cay.gia
    );

    if (giaMoi === null || Number(giaMoi) <= 0) {
        return;
    }

    const soLuongMoi = prompt(
        "Nhập số lượng mới:",
        cay.soLuong
    );

    if (soLuongMoi === null || Number(soLuongMoi) < 0) {
        return;
    }

    cay.ten = tenMoi;
    cay.gia = Number(giaMoi);
    cay.soLuong = Number(soLuongMoi);

    hienThiDanhSach();
}


// TÌM KIẾM CÂY
function timKiemCay() {

    const tuKhoa = document
        .getElementById("timKiem")
        .value
        .toLowerCase();

    const ketQua = danhSachCay.filter(cay =>

        cay.ma.toLowerCase().includes(tuKhoa) ||
        cay.ten.toLowerCase().includes(tuKhoa) ||
        cay.loai.toLowerCase().includes(tuKhoa)

    );

    hienThiDanhSach(ketQua);
}


// SẮP XẾP GIÁ TĂNG DẦN
function sapXepGiaTang() {

    danhSachCay.sort((a, b) => a.gia - b.gia);

    hienThiDanhSach();
}


// SẮP XẾP GIÁ GIẢM DẦN
function sapXepGiaGiam() {

    danhSachCay.sort((a, b) => b.gia - a.gia);

    hienThiDanhSach();
}


// CẬP NHẬT THỐNG KÊ
function capNhatThongKe() {

    const tongCay = danhSachCay.length;

    document.getElementById("tongCay").textContent = tongCay;

    if (tongCay === 0) {

        document.getElementById("giaCaoNhat").textContent = "0đ";
        document.getElementById("giaThapNhat").textContent = "0đ";
        document.getElementById("giaTrungBinh").textContent = "0đ";

        return;
    }

    const giaCaoNhat = Math.max(
        ...danhSachCay.map(cay => cay.gia)
    );

    const giaThapNhat = Math.min(
        ...danhSachCay.map(cay => cay.gia)
    );

    const tongGia = danhSachCay.reduce(
        (tong, cay) => tong + cay.gia,
        0
    );

    const giaTrungBinh = tongGia / tongCay;

    document.getElementById("giaCaoNhat").textContent =
        giaCaoNhat.toLocaleString("vi-VN") + "đ";

    document.getElementById("giaThapNhat").textContent =
        giaThapNhat.toLocaleString("vi-VN") + "đ";

    document.getElementById("giaTrungBinh").textContent =
        Math.round(giaTrungBinh).toLocaleString("vi-VN") + "đ";
}


// XÓA NỘI DUNG FORM
function xoaForm() {

    document.getElementById("maCay").value = "";
    document.getElementById("tenCay").value = "";
    document.getElementById("loaiCay").value = "";
    document.getElementById("giaCay").value = "";
    document.getElementById("soLuong").value = "";
}


// CHẠY KHI MỞ TRANG
hienThiDanhSach();
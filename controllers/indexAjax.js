// console.log(axios);

// var opjectAjax = {
//     url: './data/arrSinhVien.json',//đường dẫn file chứa dữ liệu hoặc api do backend cung cấp
//     method: 'GET',//do backend cung cấp
//     responseType: 'json',
//     //kiểu dữ liệu trả về do backend cung cấp


// }
// //gọi ajax= axios => trả về promise
// var promise = axios(opjectAjax);

// //xử lý repuest thành công 
// promise.then(function (result) {
//     console.log(result.data);
//     document.querySelector('#data').innerHTML = result.data[0].tenSV;
// });


// //xử lý repuest thất bại
// promise.then(function (err) {
//     console.log(err);
// })

var arrSinhVien = [];
var renderTable = function (arrSinhvien) {
    var content = '';
    for (var i = 0; i < arrSinhvien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
        var sinhVien = arrSinhvien[i];
        var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen, sinhVien.email, sinhVien.soDienThoai);

        content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                
                <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button>
                
                <button class="btn btn-danger" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tblSinhVien').innerHTML = content;

}

var renderSinhVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',//Backend cung cap api
        method: 'GET',//Backend cung cấp method
        responseType: 'JSON'//Backend cung cấp kiểu dữ liệu trả về
    });

    //xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //hiển thi tên sv
        renderTable(result.data);

    });

    //xử lý thất bại
    promise.catch(function (error) {
        console.log('2');
    })
}
//gọi hàm thực thi ajax
renderSinhVien();


//POST: thêm sinh viên qua api do backend cung cấp

document.querySelector('#btnXacNhan').onclick = function () {
    //lấy thông tin từ người dùng nhập vào

    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;

    console.log('sinhvien', sinhVien);

    //gọi api để đưa dữ liệu về server lưu trữ
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',//Backend cung cap api
        method: 'POST',//Backend cung cấp method
        data: sinhVien,//format data phải đúng định dạng backend cần
        responseType: 'JSON'
    });
    promise.then(function (result) {
        console.log('xử lý thành công', result.data);
        renderSinhVien();
    });

    promise.catch(function (error) {
        console.log('xử lý thành công', error.response.data);
    });
}

// DELETE: với api

window.xoaSinhVien = function (maSinhVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
        method: 'DELETE',

    });

    promise.then(function (result) {
        console.log('xử lý thành công', result.data);
        renderSinhVien();
    });

    promise.catch(function (error) {
        console.log('xử lý thành công', error.response.data);
    });

}

//UPDATE: với api

window.chinhSua = function (maSinhVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
        method: 'GET'
    }).then(function (result) {
        console.log('thành công', result);
        var sv = result.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
    }).catch(function (error) {
        console.log('error', error);
    })
}

//PUT: cập nhật
document.querySelector('#btnCapNhatSinhVien').onclick = function () {
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;


    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
        method: 'PUT',
        data: sinhVien
    });
    promise.then(function (result) {
        console.log('result', result.data);
        renderSinhVien();
    })

    promise.catch(function (error) {
        console.log('result', error.reponse.data);
    })
}
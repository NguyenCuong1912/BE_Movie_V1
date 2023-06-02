const contentQRcode = (img) => {
  const content = ` <div style="text-align: center; text-transform: uppercase; color: red; text-shadow: transparent;">Tix Movie xin gửi bạn thông tin vé</div>
    <div style="display: flex; gap: 50px;height: 200px;">
        <img  src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/r/s/rsz_spiderverse2_poster_4.jpg" />
        <div>
            <p>Tên phim Nobita and Doreamon</p>
            <p>Cụm rạp : BHD</p>
            <p>Rạp chiếu : BHD Phạm Hùng</p>
            <p>Thời gian : 02/06/2023 20:00 PM</p>
        </div>
    </div>
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="${img}">'
    </div>`;

  return content;
};
module.exports = {
  contentQRcode,
};

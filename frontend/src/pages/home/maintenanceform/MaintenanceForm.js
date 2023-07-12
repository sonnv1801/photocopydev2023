import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const MaintenanceForm = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [machineCode, setMachineCode] = useState("");
  const [machineLocation, setMachineLocation] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("token"));

    if (customerData) {
      setCustomerId(customerData._id);
      setFullname(customerData.fullname);
      setPhone(customerData.phone);
      setAddress(customerData.address);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      nameProduct === "" ||
      machineCode === "" ||
      machineLocation === "" ||
      fullname === "" ||
      phone === "" ||
      address === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const maintenanceData = {
      nameProduct,
      customerId,
      fullname,
      phone,
      address,
      machineCode,
      machineLocation,
      note,
    };

    try {
      // Tiếp tục xử lý khi các trường đều đã được nhập
      const response = await fetch("http://localhost:8000/v1/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maintenanceData),
      });

      const data = await response.json();

      console.log("Saved Maintenance:", data);
      // Hiển thị thông báo thành công
      toast.success("Maintenance form submitted successfully!");
      navigate("/maintenance-list-customer");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="maintenance-form-container container">
      <h1 className="maintenance-form-heading">Dịch Vụ Bảo Trì</h1>
      <form className="maintenance-form" onSubmit={handleSubmit}>
        <label htmlFor="nameProduct" className="maintenance-form-label">
          Tên Máy:
          <input
            type="text"
            id="nameProduct"
            placeholder="Nhập Tên Máy Của Bạn..."
            className="maintenance-form-input"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </label>
        <br />

        <label htmlFor="machineCode" className="maintenance-form-label">
          Mã Máy:
          <input
            type="text"
            placeholder="Nhập Mã Máy Của Bạn..."
            id="machineCode"
            className="maintenance-form-input"
            value={machineCode}
            onChange={(e) => setMachineCode(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="machineLocation" className="maintenance-form-label">
          Vị Trí Máy:
          <input
            type="text"
            placeholder="Vị Trí Chỗ Để Máy..."
            id="machineLocation"
            className="maintenance-form-input"
            value={machineLocation}
            onChange={(e) => setMachineLocation(e.target.value)}
          />
        </label>
        <input type="hidden" id="customerId" value={customerId} />
        <label htmlFor="fullname" className="maintenance-form-label">
          Tên Khách Hàng:
          <input
            type="text"
            placeholder="Tên Khách Hàng..."
            id="fullname"
            className="maintenance-form-input"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="phone" className="maintenance-form-label">
          Số Điện Thoại:
          <input
            type="text"
            placeholder="Số Điện Thoại Khách Hàng..."
            id="phone"
            className="maintenance-form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="address" className="maintenance-form-label">
          Địa Chỉ:
          <input
            type="text"
            placeholder="Địa Chỉ Khách Hàng..."
            id="address"
            className="maintenance-form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <br />
        <label htmlFor="note" className="maintenance-form-label">
          Ghi Chú Sửa Chữa:
          <textarea
            id="note"
            placeholder="Ghi Chú Máy Hư Gì.."
            className="maintenance-form-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </label>
        <br />
        {user === null ? (
          <Link to="/login">
            <Button variant="contained" endIcon={<ArrowRightIcon />}>
              Đăng nhập ngay?
            </Button>
          </Link>
        ) : (
          <button type="submit" className="maintenance-form-btn">
            Tiến Hành
          </button>
        )}
      </form>
    </div>
  );
};

export default MaintenanceForm;

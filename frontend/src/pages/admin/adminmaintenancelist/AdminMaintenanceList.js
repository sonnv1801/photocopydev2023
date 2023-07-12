import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const AdminMaintenanceList = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [selectedSuppliesId, setSelectedSuppliesId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffName, setStaffName] = useState("");
  const [supplies, setSupplies] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [suppliesOptions, setSuppliesOptions] = useState([]);

  useEffect(() => {
    fetchMaintenanceList();
    fetchStaffOptions();
    fetchSuppliesOptions();
  }, []);

  const fetchMaintenanceList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/maintenance");
      setMaintenanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStaffOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/user");
      const filteredOptions = response.data.filter((user) => user.role === "1");
      setStaffOptions(filteredOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliesOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/maintenanceSupplies"
      );
      setSuppliesOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaintenance = async (maintenanceId) => {
    try {
      const maintenanceToUpdate = {
        staffId,
        staff: staffName,
        supplies,
      };

      const response = await axios.put(
        `http://localhost:8000/v1/maintenance/${maintenanceId}`,
        maintenanceToUpdate
      );
      console.log(response.data);
      toast.success("Đã Cập Nhập Thành Công!");
    } catch (error) {
      console.error(error);
      toast.error("Thất bại");
    }
  };

  const handleStaffChange = (e) => {
    const selectedStaffId = e.target.value;
    setSelectedStaffId(selectedStaffId);

    const selectedStaff = staffOptions.find(
      (staff) => staff._id === selectedStaffId
    );
    if (selectedStaff) {
      setStaffId(selectedStaff._id);
      setStaffName(selectedStaff.fullname);
    } else {
      setStaffId("");
      setStaffName("");
    }
  };

  const handleSuppliesChange = (e) => {
    const selectedSuppliesId = e.target.value;
    setSelectedSuppliesId(selectedSuppliesId);
    const selectedSupplies = suppliesOptions.find(
      (supplies) => supplies._id === selectedSuppliesId
    );
    if (selectedSupplies) {
      setSupplies(selectedSupplies.name);
    } else {
      setSupplies("");
    }
  };

  return (
    <div className="admin-maintenance-list-container">
      <h1 className="admin-maintenance-list-title">
        Tất Cả Danh Sách Bảo Trì Của Khách
      </h1>
      <table className="admin-maintenance-table">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Mã Máy</th>
            <th>Vị Trí Máy</th>
            <th>Tên Khách Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Ghi Chú Của Khách</th>
            <th>Nhân Viên Tiếp Nhận</th>
            <th>Vật Tư Cấp Cho Nhân Viên</th>
            <th>Trạng Thái Sửa Máy</th>
            <th>Lịch Sử Sửa Máy</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceList.map((maintenance) => (
            <tr key={maintenance._id}>
              <td>{maintenance.nameProduct}</td>
              <td>{maintenance.machineCode}</td>
              <td>{maintenance.machineLocation}</td>
              <td>{maintenance.fullname}</td>
              <td>{maintenance.phone}</td>
              <td>{maintenance.address}</td>
              <td>{maintenance.note}</td>
              <td>{maintenance.staff}</td>
              <td>{maintenance.supplies}</td>
              <td>{maintenance.repairStatus}</td>
              <td>
                <ul>
                  {maintenance.repairHistory.map((history, index) => (
                    <>
                      <li key={index}>Đã Sửa: {history.repairNote},</li>
                      <li>
                        Vật Tư Đã Thay:
                        {history.replacedSupplies},
                      </li>
                      <li>
                        Tổng Tiền:
                        {history.totalCost},
                      </li>
                      <li>
                        Hoàn Thành Vào Lúc:
                        <br />
                        {moment(history.repairTime).format(
                          "HH:mm:ss DD-MM-YYYY"
                        )}
                      </li>
                    </>
                  ))}
                </ul>
              </td>
              <td>
                <div className="admin-maintenance-action">
                  <label>
                    Nhân Viên Tiếp Nhận:
                    <select
                      value={selectedStaffId}
                      onChange={handleStaffChange}
                    >
                      <option value="">Chọn Nhân Viên</option>
                      {staffOptions.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.fullname}
                        </option>
                      ))}
                    </select>
                  </label>
                  {selectedStaffId !== "" && (
                    <>
                      <label>
                        Vật Tư Cấp Cho Nhân Viên:
                        <select
                          value={selectedSuppliesId}
                          onChange={handleSuppliesChange}
                        >
                          <option value="">Chọn Vật Tư</option>
                          {suppliesOptions.map((supplies) => (
                            <option key={supplies._id} value={supplies._id}>
                              {supplies.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        className="admin-maintenance-update-button"
                        onClick={() => handleUpdateMaintenance(maintenance._id)}
                      >
                        Cập Nhập
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMaintenanceList;

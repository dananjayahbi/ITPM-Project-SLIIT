import React from "react";
import { Modal, Button } from "antd";

const ViewActionHistoryModal = ({ activityRecord, visible, onCancel, onView }) => {

return (
    <>
        <Modal
            title="View Action"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="close" onClick={onCancel}>
                    Close
                </Button>,
            ]}
        >
            {activityRecord && (
                <div>
                    <p style={{marginBottom: "10px", marginTop: "30px"}}><b>Date :</b> {new Date(activityRecord.date).toLocaleDateString()}</p>
                    <p style={{marginBottom: "10px"}}><b>Type :</b> {activityRecord.type}</p>
                    <p><b>Credits (Cr) : </b> {activityRecord.amount}</p>
                </div>
            )}
        </Modal>
    </>
);
};

export default ViewActionHistoryModal;

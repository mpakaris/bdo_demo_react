import React from "react";
import { Button, Modal } from "react-bootstrap";

function ViewTaskDetails({ showViewModal, handleViewModal, activeTask }) {
  return (
    <Modal show={showViewModal} onHide={handleViewModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Title | {activeTask ? activeTask.taskTitle : ""}</h4>
        <h5>Description | {activeTask ? activeTask.taskDescription : ""}</h5>
        <h6>
          Assignee | {activeTask && activeTask.user ? activeTask.user.name : ""}
        </h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTaskDetails;

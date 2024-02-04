import React from "react";
import { Button, Modal } from "react-bootstrap";

function ViewUserDetails({ showViewModal, handleViewModal, activeUser }) {
  return (
    <Modal show={showViewModal} onHide={handleViewModal}>
      <Modal.Header closeButton>
        <Modal.Title>View User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {activeUser ? (
          <div>
            <h4>User | {activeUser.name}</h4>
            {activeUser.tasks && activeUser.tasks.length > 0 ? (
              <ul>
                {activeUser.tasks.map((task) => (
                  <li key={task.id}>{task.taskTitle}</li>
                ))}
              </ul>
            ) : (
              <p>Currently No Tasks assigned to User.</p>
            )}
          </div>
        ) : (
          <div>
            <p>No User Selected.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewUserDetails;

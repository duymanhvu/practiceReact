import {Modal, Button, Form} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { putUpdateUser} from '../Services/UserService';
import {  toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
       let res = await putUpdateUser(name, job)
       if(res && res.updatedAt) {
        //success
        handleEditUserFromModal({
            first_name: name,
            id: dataUserEdit.id
        })

        handleClose();
        toast.success("Edit User Success!");
       }
    }


    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit] )
    

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit A Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                    
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" 
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </Form.Group>
                
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        
        
        </>
    )
}

export default ModalEditUser
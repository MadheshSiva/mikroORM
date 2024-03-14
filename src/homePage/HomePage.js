import axios from "axios";
import React, { useEffect, useState } from "react";
import { endPoints } from '../API'
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './table.css';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const HomePage = () => {
    const [listData, setListData] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [sinList, setSinList] = useState([]);
    const [openDilog, setOpenDialog] = useState(false);
    const [deleteList , setDeleteList] = useState([])
    const list = useSelector((state) => state.students);
   
    console.log(list, "list12")
    const listRecord = async () => {
        await axios.get(endPoints.list_records).then((res) => {
            console.log(res.data, "res09")
            setListData(res?.data)
        }).catch((err) => {
            console.log({ message: err.message })
        })
    }
    useEffect(() => {

        listRecord()
    }, [])
    

    const onEdit = (data) => {
        navigate('/form/update', { state: { id: data, type: 'edit' } })

    }

    const handleOpen = async (data) => {

        await axios.get(`${endPoints.list_records}/${data.id}`).then((res) => {
            setSinList(res.data)
            setOpen(true);
            console.log()
        }).catch((err) => {
            console.log({ message: err.message })
        })


    }
    console.log(deleteList,"deleteList72")
    const handleClickOpen = (res) => {
        setDeleteList(res)
        setOpenDialog(true);

    };
    const onDelete = async (res) => {
        // console.log(res.id, "resId22")
        await axios.delete(`${endPoints.delete_record}/${deleteList.id}`).then((response) => {
            if (response) {
                setOpenDialog(false)
                listRecord()
            }
        }).catch((err) => {
            console.log({ message: err.message })
        })
    }
    const handleClickClose = () => {
        setOpenDialog(false);
    };
    console.log(sinList, "sinList73")
    const handleClose = () => setOpen(false);
    return (<>

        <h1 className="text-center font-bold text-3xl mt-6">Students List Database</h1>
        <div className="w-[95%] mt-10 flex justify-end">
            <button onClick={() => navigate('/form/create')} className=" border px-6 py-2 rounded-lg shadow-lg text-lg font-semibold bg-[#333330] text-[#e4e80e] transition-all transform duration-200 hover:border-[#e4e80e] hover:bg-white hover:text-[#333330]  hover:shadow-[#e4e80e]">New List</button>
        </div>
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={openDilog}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to remove your data?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Click (Remote) to removed your data from databse
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>NO</Button>
                    <Button onClick={ () => onDelete()} autoFocus>
                        REMOVE
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        <h1 className="font-semibold text-lg capitalize">Student List for {sinList.student_name}</h1>
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <div className="grid grid-cols-2 gap-2 capitalize">
                            <h1 className="text-right">Name : </h1> <h1>{sinList.student_name}</h1>
                            <h1 className="text-right">Age : </h1> <h1>{sinList.age}</h1>
                            <h1 className="text-right">DOB : </h1> <h1>{sinList.dob}</h1>
                            <h1 className="text-right">Subject 1 : </h1> <h1>{sinList.subject_1}</h1>
                            <h1 className="text-right">Mark 1 : </h1> <h1>{sinList.mark_1}</h1>
                            <h1 className="text-right">Subject 2 : </h1> <h1>{sinList.subject_2}</h1>
                            <h1 className="text-right">Mark 2 : </h1> <h1>{sinList.mark_2}</h1>
                        </div>
                    </Typography>
                </Box>
            </Fade>
        </Modal>
        <div className="w-[95%] mx-auto mt-10">
            <table style={{ borderCollapse: 'collapse', width: '100%' }} >
                <tr>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Student Name</th>
                    <th>DOB</th>
                    <th>Age</th>
                    <th>Created User Name</th>
                    <th>Updated User Name</th>
                    <th>Subject 1</th>
                    <th>Mark 1</th>
                    <th>SUbject 2</th>
                    <th>Mark 2</th>
                </tr>

                {listData.map((res) => (
                    <tr style={{ textAlign: "center" }}>
                        <td onClick={() => handleOpen(res)} className="cursor-pointer"><Visibility /></td>
                        <td onClick={() => onEdit(res)}><Edit className="text-blue-500 cursor-pointer" /></td>
                        <td onClick={() => handleClickOpen(res)}><Delete className="text-red-500 cursor-pointer" /></td>
                        <td>{res?.student_name}</td>
                        <td>{res?.dob}</td>
                        <td>{res?.age}</td>
                        <td>{res?.created_user == null ? '-' : res?.created_user}</td>
                        <td>{res?.updated_user == null ? '-' : res?.updated_user}</td>
                        <td>{res?.subject_1}</td>
                        <td>{res?.mark_1}</td>
                        <td>{res?.subject_2}</td>
                        <td>{res?.mark_2}</td>
                    </tr>
                ))}

            </table>

        </div>
    </>)
}

export default HomePage;
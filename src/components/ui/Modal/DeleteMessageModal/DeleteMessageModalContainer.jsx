import { useState } from 'react';
import DeleteMessageModalPresentational from './DeleteMessageModalPresentational'

function DeleteMessageModalContainer({ close, message, currentUser, onDelete }) {
    const [deleteOption, setDeleteOption] = useState('forMe');

    const canDeleteForEveryone = () => {
        if (!message || !currentUser) return false;
        if (message.user.userId !== currentUser.id) return false;

        const messageTime = message.timestamp?.toDate() || new Date(message.timestamp);
        const now = new Date();
        const hoursDifference = (now - messageTime) / 1000 / 60 / 60;

        return hoursDifference <= 48;
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(message.id, deleteOption);
        }
        close();
    };

    const showRadioOptions = canDeleteForEveryone();

    return (
        <DeleteMessageModalPresentational
            close={close}
            deleteOption={deleteOption}
            setDeleteOption={setDeleteOption}
            handleDelete={handleDelete}
            showRadioOptions={showRadioOptions}
        />
    )
}

export default DeleteMessageModalContainer

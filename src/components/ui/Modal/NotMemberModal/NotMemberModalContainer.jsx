import NotMemberModalPresentational from "./NotMemberModalPresentational"

function NotMemberModalContainer({ onClose }) {
    return (
        <>
            <NotMemberModalPresentational onClose={onClose} />
        </>
    )
}

export default NotMemberModalContainer

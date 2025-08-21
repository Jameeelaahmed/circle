export const useOnlinePresence = () => {
    return {
        onlineUsers: {},
        isUserOnline: () => false,
        getUserLastSeen: () => null
    };
};

export default useOnlinePresence;
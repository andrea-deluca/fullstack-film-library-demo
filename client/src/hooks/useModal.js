import { useState } from "react";

const useModal = (callback) => {
    const [modal, setModal] = useState({
        show: false,
    });

    const onShow = () => {
        setModal({ show: true });
    }

    const onHide = () => {
        setModal({ show: false });
    }

    const onConfirm = () => {
        callback();
        onHide();
    };

    return [modal, onShow, onHide, onConfirm];
}

export default useModal;
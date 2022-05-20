import { useState } from "react"

const useMessage = () => {
    const [message, setMessage] = useState({
        show: false,
        response: ''
    });

    const hideMessage = () => {
        setMessage({ show: false, response: '' })
    }

    const showMessage = (res) => {
        setMessage({ show: true, response: res })
    }

    return [message, hideMessage, showMessage];
}

export default useMessage;
import { toast } from "react-toastify";

const Message = ({ response }) => {
    return (
        <div className="ms-2">
            <h6 className="fw-bold">{response.status} {response.statusText}</h6>
            <p className="">{response.message}</p>
        </div>
    );
}

const useNotification = () => {
    const notification = {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        draggable: false,
        draggableDirection: 'x',
        progress: undefined,
    }

    const notify = {
        error: (error) => {
            toast.error(<Message response={error} />, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notification,
            });
        },

        success: (response) => {
            toast.success(<Message response={response} />, {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notification,
            });
        }
    }

    return notify;
}

export default useNotification;
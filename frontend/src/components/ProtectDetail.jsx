import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";

const ProtectDetail = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null ) {
            navigate("/");
            toast.error("First Login ☝🏻");
        }

    })

    return (
        <>
            {children}
        </>
    )
}

export default ProtectDetail;
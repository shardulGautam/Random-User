import { useState, useEffect  } from "react";
import Loading from "../../utils";
import {Error} from "../../utils";
import DisplayUser from "../displayuser";

const url = "https://randomuser.me/api/";

const FetchUser = () => {
    const [userData, setUserData] = useState(null)
    const [refresh, setRefresh] = useState(0)   
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState("")

    const handleRefreshButton = () => {
       setRefresh(refresh + 1)
    };

    useEffect(()=>{
        let ignore = true;
        setError("")
        setLoading(true)
        
        const fetchUserData = async () => {
            try{
                setError("")
                const response = await fetch(url);
                const data = await response.json()

                if (ignore){
                    setUserData(data.results)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error.message)
                setError(error.message)
            } 
        }

        fetchUserData();

        return () => ignore=false;
    },[refresh])

    return (
        <div>
            {loading && <Loading />}
            {error && <Error errorMessage = {error}/>}
            {!loading && <button type="button" disabled={loading ? "disabled" : ""} className="refresh-btn" onClick={handleRefreshButton}>
                GET NEW USER <i className="fa-solid fa-plus"></i>
            </button>}
            {!loading && <DisplayUser userData={userData} />}
        </div>
    );
}
 
export default FetchUser;

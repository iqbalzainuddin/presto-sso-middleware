import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const user = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        setUserData(JSON.parse(Cookies.get('userData')))
    }, []);

    return (
        <div>
            <p>username: {userData?.audience.username || ''}</p>
            <p>display name: {userData?.audience.display_name || ''}</p>
            <p>email: {userData?.audience.email || ''}</p>
            <p>mobile: {userData?.audience.mobile || ''}</p>
        </div>
    )
}

export default user
import { Button, Popover } from '@mui/material'
import React, { useState } from 'react'
import { isUserLoggedIn, removeAccessToken } from '../../helper/authFunctions';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/slice';

const ProfilePopup = ({profileData}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch()
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const makeLogoutUser = () => {
        removeAccessToken()
        // dispatch(logoutUser())
    }
    return (<>

        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            horizontal:"right",
            vertical:"top"
        }}
        >
            <div className='px-3 py-3'>
                <Link className='block w-full px-6 py-3 mb-1 font-semibold hover:bg-gray/60' to="/my-product">My product</Link>
                {
                    isUserLoggedIn() &&
                    <button className='block w-full px-6 py-3 font-semibold hover:bg-gray/60' onClick={makeLogoutUser}>Log out</button>
                }
            </div>
        </Popover>
    </>
    )
}

export default ProfilePopup
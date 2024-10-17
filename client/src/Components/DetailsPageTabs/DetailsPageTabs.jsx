import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CommentModal from '../CommentModal/CommentModal';
import { Link } from 'react-router-dom';
import ChatBox from '../ChatBox/ChatBox';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DetailsPageTabs = ({ vendorInfo, description, commnetDetails }) => {
    const { photo, createdTime, email, lastLogin, name } = vendorInfo[0];
    const [value, setValue] = React.useState(0);
    const [isChatBoxOpen, setIsChatBoxOpen] = React.useState(false); // ChatBox state

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSendMessageClick = () => {
        setIsChatBoxOpen(true); // Open ChatBox when the button is clicked
    };

    return (
        <div className='text-black dark:text-white'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value} onChange={handleChange}
                        indicatorColor="primary"
                        aria-label="">
                        <Tab className='text-black dark:text-white' label="Description" {...a11yProps(0)} />
                        <Tab className='text-black dark:text-white' label="Vendor Details" {...a11yProps(1)} />
                        <Tab className='text-black dark:text-white' label="Reviews" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel className="text-black dark:text-white" value={value} index={0}>
                    {description}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="my-10 items-center space-x-3">
                        <div className='avatar'>
                            <div className="mask mask-squircle max-w-44">
                                <img src={photo} alt="Vendor" />
                            </div>
                        </div>

                        <div className='text-black dark:text-gray-400'>
                            <h1 className="text-lg mt-5 font-semibold">Vendor Name: {name}</h1>
                            <p className="text-lg mt-2 font-semibold">Email: {email}</p>
                            <p className="text-lg mt-2">Vendor Since: {createdTime}</p>
                            <p className="text-lg mt-2">Last Login: {lastLogin}</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <Link className="btn bg-[#775050] border-none text-white mt-3">
                            Visit Vendor Store
                        </Link>
                        <button
                            className="btn bg-[#775050] border-none text-white mt-3"
                            onClick={handleSendMessageClick} // Open chatbox on click
                        >
                            Send Message
                        </button>
                    </div>

                    {/* Conditionally render ChatBox when isChatBoxOpen is true */}
                    <div className='mt-10'>
                        {isChatBoxOpen &&
                            <ChatBox
                                setIsChatBoxOpen={setIsChatBoxOpen}
                                vendorInfo={vendorInfo} />}
                    </div>

                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <CommentModal commnetDetails={commnetDetails} />
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default DetailsPageTabs;

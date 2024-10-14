import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CommentModal from '../CommentModal/CommentModal';

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


const DetailsPageTabs = ({ vendorInfo, description , commnetDetails }) => {
    const { vendorEmail, companyName } = vendorInfo

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        <Tab className='text-black dark:text-white' label="Reviwes" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel className="text-black dark:text-white"
                    value={value} index={0}>
                    {description}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <h1>Verdor Email : {vendorEmail}</h1>
                    <h1>Company : {companyName}</h1>
                    <button className='btn btn-primary mt-5'> View Vendor Store</button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <CommentModal commnetDetails={commnetDetails} />
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default DetailsPageTabs;
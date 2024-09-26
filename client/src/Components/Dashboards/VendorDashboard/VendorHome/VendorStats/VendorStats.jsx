import { Card, CardContent, Typography } from '@mui/material';

const VendorStats = ({ title, value, percentage, icon }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h3" color="textPrimary">
                    {value}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color={percentage > 0 ? 'success.main' : 'error.main'}
                >
                    {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default VendorStats;
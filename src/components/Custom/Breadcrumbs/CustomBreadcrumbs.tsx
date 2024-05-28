import Typography from '@mui/material/Typography';
import { Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export type CustomBreadCrumbItem = {
    label: string;
    url: string;
}

export interface CustomBreadcrumbsProps {
    items: Array<CustomBreadCrumbItem> 
}

export default function CustomBreadcrumbs({ 
    items
}: CustomBreadcrumbsProps) {

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
            { items.length && items.slice(0, -1).map((item: CustomBreadCrumbItem, index: number) => (
                <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    href={item.url}
                >
                    {item.label}
                </Link>
            ))}
            { items.length && (<>                
                <Typography color="text.primary">{items[items.length - 1].label}</Typography>
            </>)}
        </Breadcrumbs>
    );
}

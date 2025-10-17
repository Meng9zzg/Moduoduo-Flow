import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

const NodeTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme?.customization?.isDarkMode ? 'rgba(150, 169, 255, 0.25)' : 'rgba(177, 191, 255, 0.25)',
        color: theme?.customization?.isDarkMode ? '#fafafa' : theme.colors?.grey700,
        fontSize: '0.875rem',
        borderRadius: '12px',
        padding: '8px 14px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: theme.shadows[1]
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme?.customization?.isDarkMode ? 'rgba(150, 169, 255, 0.25)' : 'rgba(177, 191, 255, 0.25)'
    }
}))

export default NodeTooltip

import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

export const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    color: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : 'white', // 暗色模式：黑色文字，亮色模式：白色文字
    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.highlightYellow : theme.palette[color].main, // 暗色模式：黄色背景，亮色模式：主色调
    '&:hover': {
        backgroundColor: theme?.customization?.isDarkMode 
            ? `${theme.colors?.highlightYellow}E6` // 暗色模式：黄色背景90%透明度
            : theme.palette[color].main,
        backgroundImage: theme?.customization?.isDarkMode 
            ? 'none' // 暗色模式：无渐变
            : `linear-gradient(rgb(0 0 0/10%) 0 0)` // 亮色模式：保持原渐变
    }
}))

export const StyledToggleButton = styled(MuiToggleButton)(({ theme, color = 'primary' }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : 'white', // 暗色模式：黑色文字，亮色模式：白色文字
        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.highlightYellow : theme.palette[color].main // 暗色模式：黄色背景，亮色模式：主色调
    }
}))

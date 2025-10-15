import { useState, useEffect, useRef, useCallback } from 'react'
import { ButtonBase, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconCheck } from '@tabler/icons-react'
import { styled } from '@mui/material/styles'
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: '160px',
        borderRadius: '12px',
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`
    }
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    margin: '4px 8px',
    minHeight: '40px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main + '20',
        '&:hover': {
            backgroundColor: theme.palette.primary.main + '30'
        }
    }
}))

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
]

// 动画变体
const pathVariants = {
    normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
    animate: (custom) => ({
        opacity: [0, 1],
        pathLength: [0, 1],
        pathOffset: [1, 0],
        transition: {
            opacity: { duration: 0.01, delay: custom * 0.1 },
            pathLength: {
                type: 'spring',
                duration: 0.5,
                bounce: 0,
                delay: custom * 0.1
            }
        }
    })
}

const svgVariants = {
    normal: { opacity: 1 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

// 语言切换图标组件
const LanguagesIcon = ({ size = 20, color = 'currentColor' }) => {
    const svgControls = useAnimation()
    const pathControls = useAnimation()
    const isControlledRef = useRef(false)

    const handleMouseEnter = useCallback(() => {
        if (!isControlledRef.current) {
            svgControls.start('animate')
            pathControls.start('animate')
        }
    }, [pathControls, svgControls])

    const handleMouseLeave = useCallback(() => {
        if (!isControlledRef.current) {
            svgControls.start('normal')
            pathControls.start('normal')
        }
    }, [svgControls, pathControls])

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
            }}
        >
            <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                style={{
                    display: 'block'
                }}
                variants={svgVariants}
                animate={svgControls}
            >
                <motion.path d='m5 8 6 6' variants={pathVariants} custom={3} animate={pathControls} />
                <motion.path d='m4 14 6-6 3-3' variants={pathVariants} custom={2} animate={pathControls} />
                <motion.path d='M2 5h12' variants={pathVariants} custom={1} animate={pathControls} />
                <motion.path d='M7 2h1' variants={pathVariants} custom={0} animate={pathControls} />
                <motion.path d='m22 22-5-10-5 10' variants={pathVariants} custom={3} animate={pathControls} />
                <motion.path d='M14 18h6' variants={pathVariants} custom={3} animate={pathControls} />
            </motion.svg>
        </div>
    )
}

LanguagesIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
}

const LanguageSwitch = () => {
    const theme = useTheme()
    const { i18n, t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'zh')
    const open = Boolean(anchorEl)

    useEffect(() => {
        // 同步i18n的当前语言到组件状态
        setCurrentLanguage(i18n.language)
    }, [i18n.language])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLanguageChange = (languageCode) => {
        // 使用i18n的changeLanguage方法
        i18n.changeLanguage(languageCode)
        setCurrentLanguage(languageCode)
        localStorage.setItem('language', languageCode)
        handleClose()
    }

    return (
        <>
            <Tooltip title={t('switchLanguage', '切换语言 / Switch Language')} arrow>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant='rounded'
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleClick}
                        color='inherit'
                    >
                        <LanguagesIcon size={18} color='currentColor' />
                    </Avatar>
                </ButtonBase>
            </Tooltip>

            <StyledMenu
                id='language-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                {languages.map((language) => (
                    <StyledMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={language.code === currentLanguage}
                    >
                        <ListItemIcon sx={{ minWidth: '32px' }}>
                            <span style={{ fontSize: '18px' }}>{language.flag}</span>
                        </ListItemIcon>
                        <ListItemText
                            primary={language.name}
                            primaryTypographyProps={{
                                fontSize: '14px',
                                fontWeight: language.code === currentLanguage ? 600 : 400
                            }}
                        />
                        {language.code === currentLanguage && <IconCheck size={16} style={{ marginLeft: '8px' }} />}
                    </StyledMenuItem>
                ))}
            </StyledMenu>
        </>
    )
}

export default LanguageSwitch

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Alert, AlertTitle, IconButton, Stack, Typography, useTheme, Tooltip } from '@mui/material'
import { AlertCircle, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import WrongImg from '@/assets/images/wrong.svg'

const ErrorBoundary = ({ error }) => {
    const { t } = useTranslation('error')
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)
    const [copied, setCopied] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const copyToClipboard = () => {
        const errorMessage = `${t('boundary.statusLabel')} ${error.response.status}\n${error.response.data.message}`
        navigator.clipboard.writeText(errorMessage)
        setCopied(true)
        setTooltipOpen(false) // 关闭原来的 tooltip
        setTimeout(() => {
            setCopied(false)
        }, 2000) // 2秒后恢复
    }

    const handleTooltipOpen = () => {
        if (!copied) {
            setTooltipOpen(true)
        }
    }

    const handleTooltipClose = () => {
        setTooltipOpen(false)
    }

    return (
        <Box sx={{ border: 1, borderColor: theme.palette.grey[900] + 25, borderRadius: 2, padding: '20px', maxWidth: '1280px' }}>
            <Stack flexDirection='column' sx={{ alignItems: 'center', gap: 3 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Box component='img' src={WrongImg} alt='Error' sx={{ width: '240px', height: '240px' }} />
                </motion.div>

                <Alert
                    severity='error'
                    icon={<AlertCircle size={24} />}
                    sx={{
                        minWidth: '400px',
                        maxWidth: '600px',
                        backgroundColor: customization.isDarkMode ? 'rgba(198, 20, 0, 0.25)' : '#fef2f2',
                        border: '1.5px solid #FF3E2D',
                        '& .MuiAlert-icon': {
                            fontSize: '24px',
                            color: customization.isDarkMode ? '#FDFFAF' : '#C61400'
                        }
                    }}
                    action={
                        <Tooltip
                            title={copied ? t('boundary.copied') || 'Copied' : t('boundary.copyTooltip') || 'Copy error status'}
                            placement='top'
                            arrow
                            open={copied || tooltipOpen}
                            onOpen={handleTooltipOpen}
                            onClose={handleTooltipClose}
                        >
                            <IconButton onClick={copyToClipboard} size='small' sx={{ color: theme.palette.grey[600] }}>
                                <Copy size={18} />
                            </IconButton>
                        </Tooltip>
                    }
                >
                    <AlertTitle
                        sx={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: customization.isDarkMode ? '#FDFFAF' : '#C61400'
                        }}
                    >
                        {`${t('boundary.statusLabel')} ${error.response.status}`}
                    </AlertTitle>
                    <Typography variant='body2' sx={{ mt: 1, color: theme.palette.text.primary }}>
                        {t('boundary.message')}
                    </Typography>
                    {error.response.data?.message && (
                        <Typography variant='body2' sx={{ mt: 1, opacity: 0.7, fontSize: '0.875rem', color: theme.palette.text.secondary }}>
                            {error.response.data.message}
                        </Typography>
                    )}
                </Alert>
            </Stack>
        </Box>
    )
}

ErrorBoundary.propTypes = {
    error: PropTypes.object
}

export default ErrorBoundary

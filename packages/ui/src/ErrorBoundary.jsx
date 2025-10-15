import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Box, Card, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { IconCopy } from '@tabler/icons-react'
import WrongImg from '@/assets/images/wrong.svg'

const ErrorBoundary = ({ error }) => {
    const { t } = useTranslation('error')
    const theme = useTheme()

    const copyToClipboard = () => {
        const errorMessage = `${t('boundary.statusLabel')} ${error.response.status}\n${error.response.data.message}`
        navigator.clipboard.writeText(errorMessage)
    }

    return (
        <Box sx={{ border: 1, borderColor: theme.palette.grey[900] + 25, borderRadius: 2, padding: '20px', maxWidth: '1280px' }}>
            <Stack flexDirection='column' sx={{ alignItems: 'center', gap: 3 }}>
                <Box component='img' src={WrongImg} alt='Error' sx={{ width: '120px', height: '120px' }} />
                <Card variant='outlined' sx={{ minWidth: '250px' }}>
                    <Box sx={{ position: 'relative', px: 3, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='body1' sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
                            {`${t('boundary.statusLabel')} ${error.response.status}`}
                        </Typography>
                        <IconButton
                            onClick={copyToClipboard}
                            size='small'
                            sx={{ position: 'absolute', right: 8, color: theme.palette.grey[900] + 25 }}
                        >
                            <IconCopy />
                        </IconButton>
                    </Box>
                </Card>
                <Typography variant='body1' sx={{ fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.5' }}>
                    {t('boundary.message')}
                </Typography>
            </Stack>
        </Box>
    )
}

ErrorBoundary.propTypes = {
    error: PropTypes.object
}

export default ErrorBoundary

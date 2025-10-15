import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Box, Card, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { IconCopy } from '@tabler/icons-react'

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
                <Typography variant='h2'>{t('boundary.title')}</Typography>
                <Card variant='outlined'>
                    <Box sx={{ position: 'relative', px: 2, py: 3 }}>
                        <IconButton
                            onClick={copyToClipboard}
                            size='small'
                            sx={{ position: 'absolute', top: 1, right: 1, color: theme.palette.grey[900] + 25 }}
                        >
                            <IconCopy />
                        </IconButton>
                        <pre style={{ margin: 0, overflowWrap: 'break-word', whiteSpace: 'pre-wrap', textAlign: 'center' }}>
                            <code>{`${t('boundary.statusLabel')} ${error.response.status}`}</code>
                        </pre>
                    </Box>
                </Card>
                <Typography variant='body1' sx={{ fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.5' }}>
                    {t('boundary.retryMessage')}
                    <br />
                    {t('boundary.githubMessage')}
                </Typography>
            </Stack>
        </Box>
    )
}

ErrorBoundary.propTypes = {
    error: PropTypes.object
}

export default ErrorBoundary

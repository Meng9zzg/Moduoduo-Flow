import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogTitle, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const AboutDialog = ({ show, onCancel }) => {
    const portalElement = document.getElementById('portal')
    const { t } = useTranslation('dialog')

    const [data, setData] = useState({})

    useEffect(() => {
        if (show) {
            // 使用固定的版本信息
            const finalData = {
                currentVersion: 'V1.0 Beta',
                name: 'V1.0 Beta',
                html_url: '#',
                published_at: new Date().toISOString()
            }
            setData(finalData)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    const component = show ? (
        <Dialog
            onClose={onCancel}
            open={show}
            fullWidth
            maxWidth='sm'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {t('about.title')}
            </DialogTitle>
            <DialogContent>
                {data && (
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('about.currentVersion')}</TableCell>
                                    <TableCell>{t('about.latestVersion')}</TableCell>
                                    <TableCell>{t('about.publishedAt')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {data.currentVersion}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {data.name}
                                    </TableCell>
                                    <TableCell>{moment(data.published_at).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

AboutDialog.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func
}

export default AboutDialog

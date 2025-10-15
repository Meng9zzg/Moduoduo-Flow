import { Box, FormControl, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export const DEFAULT_ITEMS_PER_PAGE = 12

const TablePagination = ({ currentPage, limit, total, onChange }) => {
    const { t } = useTranslation('common')
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)
    const borderColor = theme.palette.grey[900] + 25

    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)
    const [activePage, setActivePage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setTotalItems(total)
    }, [total])

    useEffect(() => {
        setItemsPerPage(limit)
    }, [limit])

    useEffect(() => {
        setActivePage(currentPage)
    }, [currentPage])

    const handlePageChange = (event, value) => {
        setActivePage(value)
        onChange(value, itemsPerPage)
    }

    const handleLimitChange = (event) => {
        const itemsPerPage = parseInt(event.target.value, 10)
        setItemsPerPage(itemsPerPage)
        setActivePage(1)
        onChange(1, itemsPerPage)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant='body2'>{t('itemsPerPage')}</Typography>
                <FormControl
                    variant='outlined'
                    size='small'
                    sx={{
                        minWidth: 80,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: borderColor
                        },
                        '& .MuiSvgIcon-root': {
                            color: customization.isDarkMode ? '#fff' : 'inherit'
                        }
                    }}
                >
                    <Select value={itemsPerPage} onChange={handleLimitChange} displayEmpty>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={48}>48</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {totalItems > 0 && (
                <Typography variant='body2'>
                    {t('paginationInfo', {
                        from: activePage * itemsPerPage - itemsPerPage + 1,
                        to: activePage * itemsPerPage > totalItems ? totalItems : activePage * itemsPerPage,
                        total: totalItems
                    })}
                </Typography>
            )}
            <Pagination count={Math.ceil(totalItems / itemsPerPage)} onChange={handlePageChange} page={activePage} color='primary' />
        </Box>
    )
}

TablePagination.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number
}

export default TablePagination

import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'
import { useTranslation } from 'react-i18next'

// Material
import { Box, Typography, OutlinedInput, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

// Project imports
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'

// Icons
import { IconX, IconUser } from '@tabler/icons-react'

// API
import authApi from '@/api/auth'
import roleApi from '@/api/role'

// Hooks
import useApi from '@/hooks/useApi'
import { useConfig } from '@/store/context/ConfigContext'

// utils
import useNotifier from '@/utils/useNotifier'

// const
import { HIDE_CANVAS_DIALOG, SHOW_CANVAS_DIALOG } from '@/store/actions'

import './CreateEditRoleDialog.css'

const CreateEditRoleDialog = ({ show, dialogProps, onCancel, onConfirm, setError }) => {
    const portalElement = document.getElementById('portal')

    const dispatch = useDispatch()
    const { isEnterpriseLicensed } = useConfig()
    const { t } = useTranslation('dialog')

    // ==============================|| Snackbar ||============================== //

    useNotifier()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const [roleName, setRoleName] = useState('')
    const [roleDescription, setRoleDescription] = useState('')
    const [selectedPermissions, setSelectedPermissions] = useState({})
    const [permissions, setPermissions] = useState({})
    const [dialogData, setDialogData] = useState({})

    const getAllPermissionsApi = useApi(authApi.getAllPermissions)
    const currentUser = useSelector((state) => state.auth.user)

    const handleRoleNameChange = (event) => {
        setRoleName(event.target.value)
    }
    const handleRoleDescChange = (event) => {
        setRoleDescription(event.target.value)
    }

    const handlePermissionChange = (category, key) => {
        setSelectedPermissions((prevPermissions) => {
            const updatedCategoryPermissions = {
                ...prevPermissions[category],
                [key]: !prevPermissions[category]?.[key]
            }

            if (category === 'templates') {
                if (key !== 'templates:marketplace' && key !== 'templates:custom') {
                    updatedCategoryPermissions['templates:marketplace'] = true
                    updatedCategoryPermissions['templates:custom'] = true
                }
            } else {
                const viewPermissionKey = `${category}:view`
                if (key !== viewPermissionKey) {
                    const hasEnabledPermissions = Object.keys(updatedCategoryPermissions).some(
                        ([permissionKey, isEnabled]) => permissionKey !== viewPermissionKey && isEnabled
                    )
                    if (hasEnabledPermissions) {
                        updatedCategoryPermissions[viewPermissionKey] = true
                    }
                } else {
                    const hasEnabledPermissions = Object.keys(updatedCategoryPermissions).some(
                        ([permissionKey, isEnabled]) => permissionKey === viewPermissionKey && isEnabled
                    )
                    if (hasEnabledPermissions) {
                        updatedCategoryPermissions[key] = true
                    }
                }
            }

            return {
                ...prevPermissions,
                [category]: updatedCategoryPermissions
            }
        })
    }

    const isCheckboxDisabled = (permissions, category, key) => {
        if (category === 'templates') {
            // For templates, disable marketplace and custom view if any other permission is enabled
            if (key === 'templates:marketplace' || key === 'templates:custom') {
                return Object.entries(permissions[category] || {}).some(
                    ([permKey, isEnabled]) => permKey !== 'templates:marketplace' && permKey !== 'templates:custom' && isEnabled
                )
            }
        } else {
            const viewPermissionKey = `${category}:view`
            if (key === viewPermissionKey) {
                // Disable the view permission if any other permission is enabled
                return Object.entries(permissions[category] || {}).some(
                    ([permKey, isEnabled]) => permKey !== viewPermissionKey && isEnabled
                )
            }
        }

        // Non-view permissions are never disabled
        return false
    }

    const handleSelectAll = (category) => {
        const allSelected = permissions[category].every((permission) => selectedPermissions[category]?.[permission.key])
        setSelectedPermissions((prevPermissions) => ({
            ...prevPermissions,
            [category]: Object.fromEntries(permissions[category].map((permission) => [permission.key, !allSelected]))
        }))
    }

    useEffect(() => {
        if ((dialogProps.type === 'EDIT' || dialogProps.type === 'VIEW') && dialogProps.data) {
            setDialogData(dialogProps.data)
        }
        getAllPermissionsApi.request()
        return () => {
            setRoleName('')
            setRoleDescription('')
            setSelectedPermissions({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogProps])

    useEffect(() => {
        if (getAllPermissionsApi.error) {
            setError(getAllPermissionsApi.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllPermissionsApi.error])

    useEffect(() => {
        if (show) dispatch({ type: SHOW_CANVAS_DIALOG })
        else dispatch({ type: HIDE_CANVAS_DIALOG })
        return () => dispatch({ type: HIDE_CANVAS_DIALOG })
    }, [show, dispatch])

    useEffect(() => {
        if (getAllPermissionsApi.data) {
            setRoleName(dialogData.name)
            setRoleDescription(dialogData.description)
            const permissions = getAllPermissionsApi.data
            // Filter out enterprise permissions if not licensed
            if (!isEnterpriseLicensed) {
                Object.keys(permissions).forEach((category) => {
                    permissions[category] = permissions[category].filter((permission) => !permission.isEnterprise)
                })
                // Remove categories that have no permissions left
                Object.keys(permissions).forEach((category) => {
                    if (permissions[category].length === 0) {
                        delete permissions[category]
                    }
                })
            }
            setPermissions(permissions)
            if ((dialogProps.type === 'EDIT' || dialogProps.type === 'VIEW') && dialogProps.data) {
                const dialogDataPermissions = JSON.parse(dialogData.permissions)
                if (dialogDataPermissions && dialogDataPermissions.length > 0) {
                    Object.keys(permissions).forEach((category) => {
                        Object.keys(permissions[category]).forEach((key) => {
                            dialogDataPermissions.forEach((perm) => {
                                if (perm === permissions[category][key].key) {
                                    if (!selectedPermissions[category]) {
                                        selectedPermissions[category] = {}
                                    }
                                    selectedPermissions[category][perm] = true
                                }
                            })
                        })
                    })
                    setSelectedPermissions(selectedPermissions)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllPermissionsApi.data])

    const createRole = async () => {
        try {
            // if roleName has a space, raise an error
            if (roleName.indexOf(' ') > -1) {
                enqueueSnackbar({
                    message: t('createEditRole.spaceError'),
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        persist: true,
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                return
            }
            const saveObj = {
                name: roleName,
                description: roleDescription,
                createdBy: currentUser.id,
                organizationId: currentUser.activeOrganizationId
            }
            const tempPermissions = Object.keys(selectedPermissions)
                .map((category) => {
                    return Object.keys(selectedPermissions[category]).map((key) => {
                        if (selectedPermissions[category][key]) {
                            return key
                        }
                    })
                })
                .flat()
            saveObj.permissions = JSON.stringify(tempPermissions)
            let saveResp
            if (dialogProps.type === 'EDIT') {
                saveObj.id = dialogProps.data.id
                saveObj.updatedBy = currentUser.id
                saveResp = await roleApi.updateRole(saveObj)
            } else {
                saveResp = await roleApi.createRole(saveObj)
            }
            if (saveResp.data) {
                enqueueSnackbar({
                    message: dialogProps.type === 'EDIT' ? t('createEditRole.updateSuccess') : t('createEditRole.createSuccess'),
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onConfirm(saveResp.data.id)
            }
        } catch (error) {
            const errorMessage = typeof error.response.data === 'object' ? error.response.data.message : error.response.data
            enqueueSnackbar({
                message: t('createEditRole.saveError', { error: errorMessage }),
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const checkDisabled = () => {
        if (dialogProps.type === 'VIEW') {
            return true
        }
        if (!roleName || roleName === '') {
            return true
        }
        if (!Object.keys(selectedPermissions).length || !ifPermissionContainsTrue(selectedPermissions)) {
            return true
        }
        return false
    }

    const ifPermissionContainsTrue = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursively check nested objects
                if (ifPermissionContainsTrue(obj[key])) {
                    return true
                }
            } else if (obj[key] === true) {
                return true
            }
        }
        return false
    }

    const component = show ? (
        <Dialog
            fullWidth
            maxWidth='md'
            open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconUser style={{ marginRight: '10px' }} />
                    {dialogProps.type === 'EDIT'
                        ? t('createEditRole.titleEdit')
                        : dialogProps.type === 'VIEW'
                        ? t('createEditRole.titleView')
                        : t('createEditRole.titleCreate')}
                </div>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: 'transparent' }}>
                <div className='role-editor'>
                    <Box>
                        <Typography sx={{ mb: 1 }} variant='h5'>
                            <span style={{ color: 'red' }}>*&nbsp;&nbsp;</span>
                            {t('createEditRole.roleNameLabel')}
                        </Typography>
                        <OutlinedInput
                            id='roleName'
                            type='string'
                            size='small'
                            fullWidth
                            disabled={dialogProps.type === 'EDIT' || dialogProps.type === 'VIEW'}
                            placeholder={t('createEditRole.roleNamePlaceholder')}
                            value={roleName}
                            name='roleName'
                            onChange={handleRoleNameChange}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ mb: 1 }} variant='h5'>
                            {t('createEditRole.roleDescriptionLabel')}
                        </Typography>
                        <OutlinedInput
                            id='roleDesc'
                            type='string'
                            size='small'
                            fullWidth
                            disabled={dialogProps.type === 'VIEW'}
                            placeholder={t('createEditRole.roleDescriptionPlaceholder')}
                            value={roleDescription}
                            name='roleDesc'
                            onChange={handleRoleDescChange}
                        />
                    </Box>
                    <div className='permissions-container'>
                        <p>{t('createEditRole.permissionsLabel')}</p>
                        <div className='permissions-list-wrapper'>
                            {permissions &&
                                Object.keys(permissions).map((category) => (
                                    <div key={category} className='permission-category'>
                                        <div className='category-header'>
                                            <h3>
                                                {category
                                                    .replace(/([A-Z])/g, ' $1')
                                                    .trim()
                                                    .toUpperCase()}
                                            </h3>
                                            <button
                                                type='button'
                                                hidden={dialogProps.type === 'VIEW'}
                                                onClick={() => handleSelectAll(category)}
                                            >
                                                {t('createEditRole.selectAllButton')}
                                            </button>
                                        </div>
                                        <div className='permissions-list'>
                                            {permissions[category].map((permission, index) => (
                                                <div
                                                    key={permission.key}
                                                    className={`permission-item ${index % 2 === 0 ? 'left-column' : 'right-column'}`}
                                                >
                                                    <label>
                                                        <input
                                                            type='checkbox'
                                                            checked={selectedPermissions[category]?.[permission.key] || false}
                                                            disabled={
                                                                dialogProps.type === 'VIEW' ||
                                                                isCheckboxDisabled(selectedPermissions, category, permission.key)
                                                            }
                                                            onChange={() => handlePermissionChange(category, permission.key)}
                                                        />
                                                        {permission.value}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onCancel}>
                    {dialogProps.type !== 'VIEW' ? t('createEditRole.cancelButton') : t('createEditRole.closeButton')}
                </Button>
                {dialogProps.type !== 'VIEW' && (
                    <StyledButton disabled={checkDisabled()} variant='contained' onClick={createRole}>
                        {dialogProps.type !== 'EDIT' ? t('createEditRole.createButton') : t('createEditRole.updateButton')}
                    </StyledButton>
                )}
            </DialogActions>
            <ConfirmDialog />
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

CreateEditRoleDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    setError: PropTypes.func
}

export default CreateEditRoleDialog

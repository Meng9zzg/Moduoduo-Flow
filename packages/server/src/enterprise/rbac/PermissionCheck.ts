import { NextFunction, Request, Response } from 'express'
import { ErrorMessage } from '../Interface.Enterprise'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'

// Check if the user has the required permission for a route
export const checkPermission = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if running in open source mode - bypass permission check
        const appServer = getRunningExpressApp()
        const isOpenSource = appServer.identityManager.isOpenSource()
        const platformType = appServer.identityManager.getPlatformType()

        console.log(
            `[PermissionCheck] Permission: ${permission}, isOpenSource: ${isOpenSource}, platform: ${platformType}, user: ${
                req.user ? 'exists' : 'null'
            }`
        )

        if (isOpenSource) {
            console.log('[PermissionCheck] Open source mode detected - bypassing permission check')
            return next()
        }

        const user = req.user
        // if the user is not logged in, return forbidden
        if (user) {
            if (user.isApiKeyValidated || user.isOrganizationAdmin) {
                return next()
            }
            const permissions = user.permissions
            if (permissions && permissions.includes(permission)) {
                return next()
            }
        }
        // else throw 403 forbidden error
        return res.status(403).json({ message: ErrorMessage.FORBIDDEN })
    }
}

// checks for any permission, input is the permissions separated by comma
export const checkAnyPermission = (permissionsString: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if running in open source mode - bypass permission check
        const appServer = getRunningExpressApp()
        if (appServer.identityManager.isOpenSource()) {
            return next()
        }

        const user = req.user
        // if the user is not logged in, return forbidden
        if (user) {
            if (user.isApiKeyValidated || user.isOrganizationAdmin) {
                return next()
            }
            const permissions = user.permissions
            const permissionIds = permissionsString.split(',')
            if (permissions && permissions.length) {
                // split permissions and check if any of the permissions are present in the user's permissions
                for (let i = 0; i < permissionIds.length; i++) {
                    if (permissions.includes(permissionIds[i])) {
                        return next()
                    }
                }
            }
        }
        // else throw 403 forbidden error
        return res.status(403).json({ message: ErrorMessage.FORBIDDEN })
    }
}

import { NextFunction, Request, Response } from 'express'
import { ErrorMessage } from '../Interface.Enterprise'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { QueryRunner } from 'typeorm'
import { Organization } from '../database/entities/organization.entity'
import { Workspace } from '../database/entities/workspace.entity'
import { v4 as uuidv4 } from 'uuid'

// Populate default user context for open source mode
const populateDefaultUserContext = async (req: Request) => {
    const appServer = getRunningExpressApp()
    let queryRunner: QueryRunner | undefined
    try {
        queryRunner = appServer.AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        // Get or create organization
        let organization = await queryRunner.manager
            .createQueryBuilder(Organization, 'organization')
            .orderBy('organization.createdDate', 'ASC')
            .getOne()

        if (!organization) {
            // console.log('[PermissionCheck] No organization found, creating default organization...')
            organization = new Organization()
            organization.id = uuidv4()
            organization.name = 'Default Organization'
            organization.createdDate = new Date()
            organization.updatedDate = new Date()
            // Leave createdBy and updatedBy as NULL for open source mode
            await queryRunner.manager.save(Organization, organization)
            // console.log(`[PermissionCheck] Created default organization: ${organization.id}`)
        }

        // Get or create workspace
        let workspace = await queryRunner.manager
            .createQueryBuilder(Workspace, 'workspace')
            .where('workspace.organizationId = :orgId', { orgId: organization.id })
            .orderBy('workspace.createdDate', 'ASC')
            .getOne()

        if (!workspace) {
            // console.log('[PermissionCheck] No workspace found, creating default workspace...')
            workspace = new Workspace()
            workspace.id = uuidv4()
            workspace.name = 'Default Workspace'
            workspace.organizationId = organization.id
            workspace.createdDate = new Date()
            workspace.updatedDate = new Date()
            // Leave createdBy and updatedBy as NULL for open source mode
            await queryRunner.manager.save(Workspace, workspace)
            // console.log(`[PermissionCheck] Created default workspace: ${workspace.id}`)
        }

        await queryRunner.commitTransaction()

        // Populate req.user with default context
        req.user = {
            id: 'opensource-user',
            email: 'opensource@local',
            name: 'Open Source User',
            activeOrganizationId: organization.id,
            activeWorkspaceId: workspace.id,
            isApiKeyValidated: true,
            isOrganizationAdmin: true,
            permissions: [],
            features: {}
        } as any

        // console.log(`[PermissionCheck] Populated default user context - org: ${organization.id}, workspace: ${workspace.id}`)
    } catch (error) {
        // console.error('[PermissionCheck] Error populating default user context:', error)
        if (queryRunner && queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction()
        }
    } finally {
        if (queryRunner) {
            if (!queryRunner.isReleased) {
                await queryRunner.release()
            }
        }
    }
}

// Check if the user has the required permission for a route
export const checkPermission = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Check if running in open source mode - bypass permission check
        const appServer = getRunningExpressApp()
        const isOpenSource = appServer.identityManager.isOpenSource()
        const platformType = appServer.identityManager.getPlatformType()

        // console.log(
        //     `[PermissionCheck] Permission: ${permission}, isOpenSource: ${isOpenSource}, platform: ${platformType}, user: ${
        //         req.user ? 'exists' : 'null'
        //     }`
        // )

        if (isOpenSource) {
            // console.log('[PermissionCheck] Open source mode detected - bypassing permission check')
            // Populate default user context if not already present
            if (!req.user) {
                await populateDefaultUserContext(req)
            }
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
    return async (req: Request, res: Response, next: NextFunction) => {
        // Check if running in open source mode - bypass permission check
        const appServer = getRunningExpressApp()
        if (appServer.identityManager.isOpenSource()) {
            // Populate default user context if not already present
            if (!req.user) {
                await populateDefaultUserContext(req)
            }
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

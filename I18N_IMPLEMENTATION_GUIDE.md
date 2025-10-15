# 国际化实施指南 - 剩余组件修改

## 已完成工作

### 1. 翻译文件 ✅

-   users.json (en/zh)
-   roles.json (en/zh)
-   organization.json (en/zh)
-   workspace.json (en/zh) - 已更新

### 2. 配置文件 ✅

-   i18n/config.js - 已添加新命名空间

### 3. 组件文件

-   ✅ users/index.jsx - 完全实现
-   ⚠️ roles/index.jsx - 需要完成
-   ⚠️ workspace/index.jsx - 需要完成
-   ⚠️ organization/index.jsx - 需要完成

---

## Roles 页面 (roles/index.jsx) - 修改清单

### 1. 添加翻译钩子 ✅

```javascript
// 已添加导入
import { useTranslation } from 'react-i18next'
```

### 2. ViewPermissionsDrawer 组件修改

**在组件开头添加:**

```javascript
const { t } = useTranslation(['roles', 'common'])
```

**需要替换的文本:**

-   行 135: `'Permissions'` → `{t('permissions')}`

### 3. ShowRoleRow 组件修改

**在组件开头添加:**

```javascript
const { t } = useTranslation(['roles', 'common'])
```

**需要替换的文本:**

-   行 244: `'View'` → `{t('common:view')}`
-   行 269: `'Edit'` → `{t('common:edit')}`
-   行 279: `'Remove users...'` → `{t('deleteDisabledTooltip')}` (tooltip)
-   行 279: `'Delete'` → `{t('common:delete')}` (tooltip)
-   行 289: `'Assigned Users'` → `{t('assignedUsersDrawerTitle')}`
-   行 304: `'User'` → `{t('user')}`
-   行 305: `'Workspace'` → `{t('workspace')}`

### 4. Roles 主组件修改

**在组件开头添加:**

```javascript
const { t } = useTranslation(['roles', 'common'])
```

**addNew 函数 (行 371-380):**

```javascript
const addNew = () => {
    const dialogProp = {
        type: 'ADD',
        cancelButtonName: t('common:cancel'),
        confirmButtonName: t('common:add'), // 注意：这里改为add
        data: {}
    }
    setDialogProps(dialogProp)
    setShowCreateEditDialog(true)
}
```

**edit 函数 (行 382-393):**

```javascript
const edit = (role) => {
    const dialogProp = {
        type: 'EDIT',
        cancelButtonName: t('common:cancel'),
        confirmButtonName: t('common:save'),
        data: {
            ...role
        }
    }
    setDialogProps(dialogProp)
    setShowCreateEditDialog(true)
}
```

**deleteRole 函数 (行 408-453):**

```javascript
const deleteRole = async (role) => {
    const confirmPayload = {
        title: t('deleteTitle'),
        description: t('deleteDescription', { name: role.name }),
        confirmButtonName: t('common:delete'),
        cancelButtonName: t('common:cancel')
    }
    const isConfirmed = await confirm(confirmPayload)

    if (isConfirmed) {
        try {
            const deleteResp = await roleApi.deleteRole(role.id, currentUser.activeOrganizationId)
            if (deleteResp.data) {
                enqueueSnackbar({
                    message: t('deleteSuccess')
                    // ... rest of code
                })
                onConfirm()
            }
        } catch (error) {
            const errorMsg = typeof error.response.data === 'object' ? error.response.data.message : error.response.data
            enqueueSnackbar({
                message: t('deleteError', { message: errorMsg })
                // ... rest of code
            })
        }
    }
}
```

**ViewHeader 和 UI 文本 (行 488-509):**

```javascript
<ViewHeader onSearchChange={onSearchChange} search={true} searchPlaceholder={t('searchPlaceholder')} title={t('pageTitle')}>
    <StyledPermissionButton>
        {t('addRole')}
    </StyledPermissionButton>
</ViewHeader>

// Empty state
<div>{t('noRolesYet')}</div>

// Table headers (行530-534)
<StyledTableCell>{t('name')}</StyledTableCell>
<StyledTableCell>{t('description')}</StyledTableCell>
<StyledTableCell>{t('permissions')}</StyledTableCell>
<StyledTableCell>{t('assignedUsers')}</StyledTableCell>
```

---

## Workspace 页面 (workspace/index.jsx) - 修改清单

### 1. 添加导入和翻译钩子

```javascript
import { useTranslation } from 'react-i18next'

// 在ShowWorkspaceRow组件中
const { t } = useTranslation(['workspace', 'common'])

// 在Workspaces主组件中
const { t } = useTranslation(['workspace', 'common'])
```

### 2. ShowWorkspaceRow 组件修改

**需要替换的文本:**

-   行 108: `'Active'` → `{t('active')}`
-   行 130: `'Default Workspace'` → `{t('defaultWorkspace')}`
-   行 133: `'Edit'` → `{t('common:edit')}` (tooltip)
-   行 141: `'Workspace Users'` → `{t('workspaceUsersTooltip')}` (tooltip)
-   行 147: `'Delete'` → `{t('common:delete')}` (tooltip)
-   行 153: `'Delete'` → `{t('common:delete')}` (tooltip)
-   行 165: `'Users'` → `{t('usersDrawerTitle')}`
-   行 180: `'User'` → `{t('user')}`
-   行 181: `'Role'` → `{t('role')}`
-   行 192: `'ORGANIZATION OWNER'` → `{t('organizationOwner')}`
-   行 194: `'PERSONAL WORKSPACE'` → `{t('personalWorkspace')}`

### 3. Workspaces 主组件修改

**addNew 函数:**

```javascript
const addNew = () => {
    const dialogProp = {
        type: 'ADD',
        cancelButtonName: t('common:cancel'),
        confirmButtonName: t('common:add'),
        data: {}
    }
    setWorkspaceDialogProps(dialogProp)
    setShowWorkspaceDialog(true)
}
```

**edit 函数:**

```javascript
const edit = (workspace) => {
    const dialogProp = {
        type: 'EDIT',
        cancelButtonName: t('common:cancel'),
        confirmButtonName: t('common:save'),
        data: workspace
    }
    setWorkspaceDialogProps(dialogProp)
    setShowWorkspaceDialog(true)
}
```

**deleteWorkspace 函数:**

```javascript
const deleteWorkspace = async (workspace) => {
    const confirmPayload = {
        title: t('deleteTitle', { name: workspace.name }),
        description: t('deleteDescription'),
        confirmButtonName: t('common:delete'),
        cancelButtonName: t('common:cancel')
    }
    // ... rest with t('deleteSuccess') and t('deleteError', { message: errorMsg })
}
```

**ViewHeader 和 UI 文本:**

```javascript
<ViewHeader title={t('pageTitle')} searchPlaceholder={t('searchPlaceholder')}>
    <StyledPermissionButton>
        {t('addNew')}
    </StyledPermissionButton>
</ViewHeader>

// Empty state
<div>{t('noWorkspacesYet')}</div>

// Table headers
<TableCell>{t('name')}</TableCell>
<TableCell>{t('description')}</TableCell>
<TableCell>{t('users')}</TableCell>
<TableCell>{t('lastUpdated')}</TableCell>

// Loading dialogs
<Typography>{t('switchingWorkspace')}</Typography>
<Typography>{t('deletingWorkspace')}</Typography>
```

---

## Organization 页面 (organization/index.jsx) - 修改清单

### 1. 添加导入和翻译钩子

```javascript
import { useTranslation } from 'react-i18next'

const OrganizationSetupPage = () => {
    const { t } = useTranslation(['organization', 'common'])
    // ... rest of component
}
```

### 2. 表单字段标签修改

**所有 Typography 标签:**

-   行 273: `'Setup Account'` → `{t('setupAccount')}`
-   行 276: Alert text → `{t('authenticationRequired')}`
-   行 281-283: Caption → `{t('dataSecurityNote')}`
-   行 292: `'Existing Username'` → `{t('existingUsername')}`
-   行 298: `'Existing Username'` → placeholder
-   行 303: Caption → `{t('existingUsernameHelp')}`
-   行 309: `'Existing Password'` → `{t('existingPassword')}`
-   行 316: `'Existing Password'` → placeholder
-   行 321: Caption → `{t('existingPasswordHelp')}`
-   行 325: `'New Account Details'` → `{t('newAccountDetails')}`
-   行 334: `'Organization Name:'` → `{t('organizationName')}:`
-   行 348: `'Account Administrator'` → `{t('accountAdministrator')}`
-   行 356: `'Administrator Name'` → `{t('administratorName')}`
-   行 368: Caption → `{t('displayNameHelp')}`
-   行 374: `'Administrator Email'` → `{t('administratorEmail')}`
-   行 386: Caption → `{t('validEmailHelp')}`
-   行 392: `'Password'` → `{t('password')}`
-   行 397-401: Caption → `{t('passwordRequirements')}`
-   行 407: `'Confirm Password'` → `{t('confirmPassword')}`
-   行 417: Caption → `{t('confirmPasswordHelp')}`
-   行 426: `'Sign Up'` → `{t('signUp')}`
-   行 445: `'Sign Up With Microsoft'` → `{t('signUpWithMicrosoft')}`
-   行 464: `'Sign Up With Google'` → `{t('signUpWithGoogle')}`
-   行 483: `'Sign Up With Auth0 by Okta'` → `{t('signUpWithAuth0')}`

### 3. 错误消息修改

**所有错误相关文本:**

-   行 132-139: `'Authentication failed...'` → `{t('authenticationFailed')}`
-   行 174: `'Error in registering organization...'` → `{t('registrationError', { message: errMessage })}`
-   行 176: `'Error in registering account...'` → `{t('registrationErrorAccount', { message: errMessage })}`

### 4. 所有 required 标记

-   `<span style={{ color: 'red' }}>&nbsp;*</span>` → `{t('required')}`

---

## 修改统计

### Users 页面 ✅

-   **硬编码文本数量:** 约 25 处
-   **状态:** 已完成

### Roles 页面 ⚠️

-   **硬编码文本数量:** 约 18 处
-   **状态:** 需要完成(已添加 useTranslation 导入)

### Workspace 页面 ⚠️

-   **硬编码文本数量:** 约 22 处
-   **状态:** 需要完成

### Organization 页面 ⚠️

-   **硬编码文本数量:** 约 30 处
-   **状态:** 需要完成

---

## 测试检查清单

完成所有修改后,请测试:

1. ✅ 语言切换功能正常工作
2. ✅ 所有页面的标题、按钮、表格列头正确显示翻译
3. ✅ 对话框消息(成功、错误)正确翻译
4. ✅ Drawer 中的内容正确翻译
5. ✅ 空状态提示正确翻译
6. ✅ 工具提示(tooltip)正确翻译
7. ✅ 占位符文本正确翻译
8. ✅ 验证消息正确翻译

## 常见问题

1. **如何处理带参数的翻译?**

    ```javascript
    t('deleteDescription', { name: user.name })
    ```

2. **如何使用其他命名空间的翻译?**

    ```javascript
    t('common:delete') // 使用common命名空间的delete
    ```

3. **技术术语是否翻译?**
    - API, SSO, SAML 等保持英文
    - User→ 用户, Role→ 角色, Workspace→ 工作区, Organization→ 组织

---

## 文件修改汇总

### 已完成 (9 个文件)

1. packages/ui/public/locales/en/users.json
2. packages/ui/public/locales/zh/users.json
3. packages/ui/public/locales/en/roles.json
4. packages/ui/public/locales/zh/roles.json
5. packages/ui/public/locales/en/organization.json
6. packages/ui/public/locales/zh/organization.json
7. packages/ui/public/locales/en/workspace.json
8. packages/ui/public/locales/zh/workspace.json
9. packages/ui/src/i18n/config.js

### 部分完成 (1 个文件)

10. packages/ui/src/views/users/index.jsx ✅

### 待完成 (3 个文件)

11. packages/ui/src/views/roles/index.jsx (已添加导入)
12. packages/ui/src/views/workspace/index.jsx
13. packages/ui/src/views/organization/index.jsx

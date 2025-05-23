# \:receipt: Expenses / Reimbursements – Tech Design

## \:office: Org Level

We will introduce a new collection in DynamoDB called **expenses**, allowing org admins to manually define expense types (e.g., Travel, Internet, Mobile Reimbursement) with default configurations.

### \:white\_check\_mark: Org-Level DB Model

```
pk: string
sk: string
id: string
name: string
amount: number
showOnPayslip: boolean
taxRate: number
createdAt: number
updatedAt: number
```

### \:receipt: Example Record

```json
{
  "pk": "org_1fa3a3db#expenses",
  "sk": "expense_0ae89f83",
  "id": "0ae89f83",
  "name": "Travel",
  "amount": 50,
  "showOnPayslip": false,
  "taxRate": 0,
  "createdAt": 1744620134563,
  "updatedAt": 1747891236574
}
```

### \:package: APIs for Org-Level Expense Items

1. `POST /organizations/{orgId}/expense-item`

   * Create a new expense item (e.g., Travel, Internet) for the organization.

2. `GET /organizations/{orgId}/expense-items`

   * Fetch all expense items defined by the organization.

3. `PUT /organizations/{orgId}/expense-item`

   * Update an existing expense item (e.g., amount or name change).

4. `DELETE /organizations/{orgId}/expense-item/{expenseId}`

   * Delete an expense item from the organization list.

---

## \:busts\_in\_silhouette: Employee Level

Org admins can assign expenses to eligible employees. Once assigned, the expense appears under `employeePayItems.expenses` in the org user record. These expenses are also included in the payrun calculation.

### \:white\_check\_mark: Employee-Level DB Model (`employeePayItems.expenses[]`)

```
name: string
amount: number
showOnPayslip: boolean
taxRate: number
```

### \:receipt: Example Entry in employeePayItems

```json
"employeePayItems": {
  "allowances": [],
  "deductions": [],
  "earnings": [],
  "leaves": [],
  "expenses": [
    {
      "name": "Travel",
      "amount": 50,
      "showOnPayslip": false,
      "taxRate": 0
    }
  ]
}
```

---

## \:outbox\_tray: Expense Requests

Employees can submit reimbursement requests based on their assigned expenses. Employers can also initiate a request on behalf of an employee. Requests include proof (attachments), amount, description, and status for review.

### \:white\_check\_mark: Expense Request DB Model

```
pk: string
sk: string
id: string
expenseId: string
employeeId: string
organizationId: string
amount: number
description: string
attachments: array
status: string
date: number
createdBy: string
createdAt: number
updatedAt: number
```

### \:receipt: Example Record

```json
{
  "pk": "org_1fa3a3db#expense_requests",
  "sk": "user_2b38e6c7#expense_request_d6c9a6ee",
  "id": "d6c9a6ee",
  "expenseId": "0ae89f83",
  "employeeId": "2b38e6c7",
  "organizationId": "1fa3a3db",
  "amount": 120,
  "description": "Client site visit in Melbourne",
  "attachments": [],
  "status": "Pending",
  "date": 1747300000000,
  "createdBy": "2b38e6c7",
  "createdAt": 1747389327414,
  "updatedAt": 1747751813711
}
```

### \:receipt: APIs for Expense Requests

1. `POST /organizations/{orgId}/expense-requests`

   * Create a new expense reimbursement request (by employee or employer).

2. `GET /organizations/{orgId}/expense-requests`

   * Fetch all expense requests within the organization.

3. `PUT /organizations/{orgId}/expense-requests`

   * Update an existing request (e.g., approve, reject, edit details).

4. `DELETE /organizations/{orgId}/expense-requests/{requestId}`

   * Delete or cancel an expense request.

# Security Spec: Opportunities Collection

## 1. Data Invariants
- An opportunity must belong to a valid user ID.
- An opportunity status must be one of: 'open', 'clicked', 'converted', 'closed'.
- Type must be one of: 'upgrade', 'activation_agents', 'conversion_optimization'.
- Opportunities cannot be created by clients (only server-side via `opportunityEngine`).
- Owners can only update status (e.g., clicked/converted).

## 2. The Dirty Dozen Payloads (Security Tests)
1.  **Inject Ghost Field**: `{ "userId": "...", "type": "upgrade", "status": "open", "value": 100, "impact": 10, "isVerified": true }`
2.  **Invalid Type**: `{ "userId": "...", "type": "invalid", ... }`
3.  **Invalid Status**: `{ "userId": "...", "type": "upgrade", "status": "unknown", ... }`
4.  **Negative Value**: `{ "value": -100, ... }`
5.  **Inject Arbitrary UID**: `{ "userId": "hacker_uid", ... }`
6.  **Create from Client**: Attemping `addDoc` from authorized user (Should fail).
7.  **Update OwnerId**: Attemping to modify `userId` (Should fail).
8.  **Huge String ID**: ID as 1.5KB string (Should fail).
9.  **Huge Value Int**: 1 quadrillion (Should fail, or be within range).
10. **Partial Update (Missing field)**: Status update without required type check (Should fail).
11. **Spoof Admin**: Trying to edit without being owner or admin.
12. **Read others opportunities**: Trying to `get` or `list` another user's opportunities.

## 3. The Test Runner
(Will implement in `firestore.rules.test.ts`)

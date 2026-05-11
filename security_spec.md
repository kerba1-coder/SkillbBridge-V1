# Security Specification

## Data Invariants
1. A user can only edit their own profile.
2. Only Gig Posters can create gigs.
3. A user can only edit a gig if they are the one who posted it.
4. Learners can only create applications for active gigs.
5. Learners can only view their own applications.
6. Gig Posters can view all applications for gigs they posted.
7. Only Gig Posters can give feedback for a completed gig they posted.
8. Feedback is immutable once created.
9. Gig status can only be transitioned in specific orders (Draft -> Active -> Completed).

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempt to create a user profile with a different `userId` than the authenticated user.
2. **Privilege Escalation**: Attempt to update own `role` from 'learner' to 'poster' (if role-based logic is strictly enforced).
3. **Gig Hijacking**: Attempt to update a gig `postedBy` field or other fields for a gig the user does not own.
4. **Invalid State Transition**: Attempt to move a gig from 'Draft' to 'Completed' directly.
5. **Orphaned Application**: Attempt to create an application for a non-existent `gigId`.
6. **Shadow Field Injection**: Attempt to create a gig with extra fields not defined in the schema (e.g., `isVerifiedAdmin: true`).
7. **PII Leak**: Attempt to read another user's private data (if any was stored).
8. **Feedback Forging**: Attempt to create feedback for a gig the user did not post.
9. **Spam Applications**: Attempt to create multiple identical applications.
10. **Resource Exhaustion**: Attempt to write a 1MB string into the `title` field of a gig.
11. **Client-Side Timestamp Spoofer**: Attempt to set `createdAt` manually instead of using `request.time`.
12. **Unauthorized Deletion**: Attempt to delete another user's gig or application.

## Test Plan
I will generate `firestore.rules` and run ESLint to verify basic security. A full test runner `firestore.rules.test.ts` will be implemented if requested, but I will focus on the hardened rules first.

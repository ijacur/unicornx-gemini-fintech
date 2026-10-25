# [VERIFY] Quality Gate & Verification Matrix: {{FEATURE_NAME}}

- **Spec ID**: SPEC-{{ID}}
- **Status**: TESTING (Verify)

---

## 1. Automated Quality Gates

| Verification Gate | Command | Expected Result | Pass / Fail |
|-------------------|---------|-----------------|-------------|
| Linting Check     | `npm run lint` | 0 errors | [ ] |
| Typecheck & Build | `npm run build` | Clean dist bundle | [ ] |
| CodeRabbit Review | `./scripts/coderabbit-review.sh` | Clean pre-review | [ ] |

## 2. Manual / Edge-Case Verification Matrix
- [ ] Edge Case 1: Empty state handling
- [ ] Edge Case 2: Network failure / timeout resilience
- [ ] Edge Case 3: Mobile responsiveness / small viewport

## 3. Exit Criteria for Verify Phase
- [ ] All automated quality gates green
- [ ] CodeRabbit review feedback addressed
- [ ] Ready to transition to `05-ship`

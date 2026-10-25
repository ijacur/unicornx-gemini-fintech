# [SHIP] Release & Deployment Checklist: {{FEATURE_NAME}}

- **Spec ID**: SPEC-{{ID}}
- **Status**: READY TO SHIP (Ship)
- **Release Version**: v{{VERSION}}

---

## 1. Deployment Checklist
- [ ] PR created and approved: `gh pr view`
- [ ] Automated CodeRabbit PR review passed
- [ ] Clean git status, no untracked artifacts
- [ ] Vercel / Cloud deployment preview verified

## 2. Changelog & Release Notes
### Highlights:
- Summary of feature additions

### Bug Fixes / Improvements:
- Summary of improvements

## 3. Rollback Strategy
- Steps to revert if a regression is detected in production.

## 4. Post-Ship Actions
- [ ] Merge PR to main
- [ ] Move spec file to `gsd/archive/`
- [ ] Update `gsd/BOARD.md` to SHIPPED

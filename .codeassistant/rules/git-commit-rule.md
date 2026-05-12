---
name: git-commit-message-auto
alwaysApply: true
---

# AI Agent Rule: Git Commit Message Generation (Auto-Applied)

## Trigger
**AUTOMATIC APPLICATION**: After completing ANY code change task, the AI agent MUST generate an appropriate git commit message following the specified format **WITHOUT being explicitly asked**.

## Commit Message Format Specification

### Structure
```
<type>(<scope>): <subject>

- <detailed change 1>
- <detailed change 2>
- <detailed change 3>
```

### Components

#### 1. **Type** (required)
- `feat` - New feature or functionality
- `fix` - Bug fix
- `refactor` - Code restructuring without behavior changes
- `docs` - Documentation updates
- `style` - Code style changes (formatting, semicolons, etc.)
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependency updates
- `perf` - Performance improvements
- `ci` - CI/CD configuration changes

#### 2. **Scope** (required)
Use lowercase with hyphens if needed. Examples:
- `layouts`, `components`, `utils`, `hooks`, `store`, `api`
- `button`, `nav-menu`, `header`, `footer`
- Specific feature names: `auth`, `cart`, `checkout`

#### 3. **Subject** (required)
- Imperative mood, present tense ("add" not "added")
- No period at the end
- Maximum 72 characters
- First letter lowercase

#### 4. **Detailed Bullet Points** (required)
- Minimum 2, maximum 6 bullet points
- Each bullet starts with a verb in present tense
- Explain WHAT was changed, not WHY (unless necessary)
- Use hyphens at the start of each line
- No empty lines between bullet points
- First letter capitalized in each bullet
- No period at the end of bullets

### AI Agent Implementation Instructions

#### Automatic Detection of Changes
The AI agent MUST analyze changes made during the task to determine:
1. **Type** based on the nature of changes
2. **Scope** based on modified files/folders
3. **Subject** summarizing the main change
4. **Bullet points** listing specific actions

#### Workflow for AI Agent
```
AFTER completing code changes:
1. Analyze all modified/created files
2. Determine appropriate type and scope
3. Write subject line (max 72 chars, no period)
4. Create 2-6 bullet points of specific changes
5. Output in code block with bash language identifier
6. Include validation check
```

#### Output Format
The AI agent MUST output the commit message in a code block with bash language identifier:

```bash
git commit -m "<type>(<scope>): <subject>

- <detailed change 1>
- <detailed change 2>
- <detailed change 3>"
```

#### Validation Rules (AI Self-Check)
Before outputting, the AI agent MUST verify:
- [ ] All components (type, scope, subject, bullets) are present
- [ ] Type is from allowed list
- [ ] Subject has no period at end
- [ ] Subject is under 72 characters
- [ ] Each bullet starts with a verb in present tense
- [ ] Each bullet has capital first letter
- [ ] Each bullet has no period at end
- [ ] Bullet count is between 2 and 6
- [ ] No empty lines between bullets

### Examples for Reference

#### Example 1: New Feature
```bash
git commit -m "feat(ui): add scroll-to-top button with threshold visibility

- Create ScrollToTopButton component with smooth scroll functionality
- Implement useScrollToTop custom hook for scroll tracking
- Add responsive CSS module with animations and accessibility support
- Integrate component into main layout for global availability
- Configure 540px threshold for button visibility as required"
```

#### Example 2: Bug Fix
```bash
git commit -m "fix(cart): resolve quantity update race condition

- Add debounce to quantity update handler
- Implement optimistic updates for better UX
- Fix state synchronization with backend
- Remove unnecessary re-renders in cart items"
```

#### Example 3: Refactoring
```bash
git commit -m "refactor(layouts): extract NavListProps interface

- Create NavMenu.types.ts with proper JSDoc documentation
- Import type from new location in NavMenu component
- No functional changes, pure code organization"
```

### Special Cases

#### Multiple Scopes
Use comma separation:
```bash
git commit -m "feat(auth,profile): add avatar upload functionality

- Create avatar upload component with preview
- Implement backend API integration for file storage
- Add validation for image size and format
- Update user profile to display uploaded avatar"
```

#### No Scope (Global Changes)
Only when truly global:
```bash
git commit -m "chore: update development dependencies

- Upgrade TypeScript to version 5.4
- Update ESLint plugins to latest versions
- Add new dev dependency for testing utilities"
```

### Enforcement Mechanism
This rule is marked as `alwaysApply: true` in the rule system. The AI agent MUST:
1. Apply this rule automatically after every code change task
2. Not wait for explicit user request
3. Include commit message as part of final completion output
4. If no code changes were made (e.g., analysis only), skip commit generation

### Integration with Existing Rules
This rule supersedes any previous git commit rules. The AI agent should reference this file for the definitive specification.
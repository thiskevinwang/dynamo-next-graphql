### API Template

```bash
yarn add -D @types/node @types/jest jest husky lint-staged prettier shell-quote tslint tslint-config-prettier typescript
```

### UI Template

```bash
yarn add react react-dom next react-spring styled-components swr @material-ui/core @material-ui/lab dotenv
```

```bash
yarn add -D @types/node @types/react @types/next @types/react @types/react-dom @types/styled-components babel-plugin-styled-components husky lint-staged prettier shell-quote tslint tslint-config-prettier typescript
```

### Things I always forget

Increment patch, and create a commit: `npm version patch`
Delete a local tag: `git tag -d v0.0.2`
Delete a remote tag: `git push --delete origin v0.0.2`
Fix _‘would clobber existing tag’_: `git fetch --tags -f`

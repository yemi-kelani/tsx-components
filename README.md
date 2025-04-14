# tsx-components

tsx-components is a repository that houses custom React components written in TypeScript.

### Setup

```shell
npm install
```

### Development

Ladle allows for the creation of `<component>.stories.tsx` files. Each of these files can export a `World` component the showcases the component being worked on. To launch the ladle server and develop/debug in real time, run the following command:

```shell
npx ladle serve
```

### Format

Format all files with `prettier`:

```shell
npx prettier . --write
```

Check formatting on all files:

```shell
npx prettier . --check
```


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

or use:

```shell
npm run serve
```

#### Class Names

All class names should begin with the `tsx-cmpnt-` prefix followed by the name of the component (i.e. `typewriter`), and finally the element belonging to the component.

### Formatting

Format all files with `prettier`:

```shell
npx prettier . --write
```

Check formatting on all files:

```shell
npx prettier . --check
```


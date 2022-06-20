# How I Created This Website

## The beggining

So, as you can see, this website mainly serves as a place where I put up some
blog posts and show off my skills and experience. I knew I wanted to do this for
a while, and the time finally came.

## The process

The first thing I decided was the technologies I wanted to use. I knew that I
wanted this website to use Next.js, mainly because it is a really good React
framework (which I wanted to use in a more serious setting) and it is really
helpful at creating websites with good SEO and good performance. I also knew
that I wanted to use Prisma.js. Prisma.js was that technology that I had heard
lots of wonderful stuff, but never got to work with it, so this was my chance.
As for the database of the website, planetscale looked really good with 5GB of
free space, but Supabase was also a really good option. Regarding the styling of
the frontend, my choice was set from the start and it was tailwindcss. I
absolutely love it!

For starters, we simply create a new next project using

```sh
yarn create next-app limwa.pt --typescript
```

Now, let's install our other dependencies:

1. Tailwind CSS

Initialize the tailwindcss project using

```sh
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

Now, we'll go on `tailwind.config.js` and change the `content` property to
include our React component files

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
};
```

Where are we at now? Well, we have tailwindcss installed, but if we keep going
and use its utility classes, nothing will happen. This is becuase Next is not
using Tailwind's styles

To solve this, we could either add tailwind's directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

to the global stylesheet (`styles/globals.css`) or, since I'll only be using
utility classes and no custom CSS, you can simply change the style imports in
`pages/_app.tsx` from

```js
import "../styles/globals.css";
```

to

```js
import "tailwindcss/tailwind.css";
```

This finishes up the setup for Tailwind CSS. You can now run `yarn run dev` and
mess around with tailwind's awesome utility classes.

2. Prisma

I'll cover the installation of prisma later, when I have an actual need to
install it and integrate it into the project.

3. ...

Let's install some other things to make our developer experience as good as
possible

First: prettier

```sh
yarn add -D prettier
```

Create a .prettierrc.json

```json
{
  "proseWrap": "always"
}
```

I really like Prettier's defaults, so this line is my only configuration for
prettier that's needed. Now, I want to add a .gitattributes file so that Windows
users that want to make pull requests on my website can do so without the fear
of comitting 10000 line changes which consist of only changing CRLF for LF. This
is what the file looks like:

```gitattributes
* text=auto eol=lf
```

And to finish it all off, we'll also add a pre-commit hook that checks if the
staged files are all formatted properly. For this, we'll use husky and is as
easy to setup as simply running

```sh
yarn add -D mrm
yarn mrm lint-staged
```

and change the package.json from

```json
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.{js,css,md}": "prettier --write"
  }
```

to

```json
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": "eslint --fix",
    "*.{js,ts,jsx,tsx,md,mdx}": "prettier --write"
  }
```

Now, we don't want prettier formatting files which are not in the repository,
thus, we need to create a .prettierignore file whose contents are equal to
.gitignore

The easiest way to do this is by creating a symbolic link.

```sh
ln -T .gitignore .prettierignore
```

and change the .husky/pre-commit's last line from

```sh
npx lint-staged
```

to

```sh
npx lint-staged --concurrent false
```

Second: local-ssl-proxy

```sh
yarn add -D local-ssl-proxy
```

add this to package.json

```json
{
  // ...
  "scripts": {
    // ...
    "dev": "npm run dev:proxy & next dev -p 1234 -H limwa.test",
    "dev:proxy": "local-ssl-proxy --config proxy.json",
    "dev:http": "next dev",
    // ...
    "certificates": "mkcert -install && mkdir -p certificates && cd certificates && mkcert limwa.test"
  }
}
```

and add proxy.json

```json
{
  "Next.js Proxy": {
    "source": 3000,
    "target": 1234,
    "cert": "certificates/limwa.test.pem",
    "key": "certificates/limwa.test-key.pem",
    "hostname": "limwa.test"
  }
}
```

and run

```sh
yarn certificates
```

Third: add root path to typescript

add this to tsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "@/*": ["*"]
    }
  }
  //...
}
```

4. Since we won't be needing custom styles, we can delete the `styles/` folder

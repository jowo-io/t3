## Todo

Below are some personal TODOs I'd like to complete on this project before moving on to other things.

#### investigate:

- upstash
- clerk.com
- axiom.co
- radix-ui.com
- ui.shadcn.com
- planetscale migrations
- next i18n for multi language support

#### actions:

- add jest
- add search input/filters in posts page
- move shared `validationSchema` to a more sensible location
- add lightning auth: https://github.com/silencesoft/lightning-next-auth-example
- general tidy-up of the code ensuring everything is neat, commented and in the correct place

---

## About

This is my dream stack. It's my personal iteration on/flavour of the [T3](t3.gg) stack. I've experimented, taken from various other public OSS projects, pulled snippets of code from various places, and written a lot myself. Finally landing upon the current configuration you see here as my preferred setup.

### Tech-stack

- [NextJS](https://nextjs.org/) - A React framework that is ahead of the rest and has proven itself over the years and come out on top.
- [TypeScript]() - For type safety and prop type definition.
- [MySQL](https://www.mysql.com/) - A tried, tested and battle hardened database.
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) - A bleeding edge TypeScript ORM, designed with maximum type safety in mind.
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs made easy.
- [Tailwind](https://tailwindcss.com/) - A composable, utility-first CSS framework.
- [class-variance-authority]() - For implementing and maintaining a Tailwind design system and component library.
- [Storybook](https://cva.style/docs) - For development and testing of UI components.
- [Jest](https://jestjs.io/) - For unit testing.

### Patterns

This app is opinionated. It implements some code and design patterns that I love.

- **Atomic design system** - In the `src/ui` folder, you'll see the components subdivided into `atoms/`, `molecules/`, `organisms/` etc. This is based on the [atomic design system](https://atomicdesign.bradfrost.com/)
- **page/screen separation** - In this app you will find the `src/pages` to be logic heavy, importing all the necesary hooks and configuring all the relevant business logic. And you will find the `src/screens` to be light on logic but heavy on UI.

### Service providers

After experimenting with many service and hosting providers, I found the following to be the best combo I could find for ease of use, price, reliability and dev experience:

- [Vercel](https://vercel.com/) - For SSR and static hosting of the Frontend next app.
- [PlanetScale](https://planetscale.com/) - For an infinitely scalable MySQL database.
- [Cloudflare](https://www.cloudflare.com/en-gb/) - For S3 compatible object storage.
- [MailJet](https://www.mailjet.com/) - For sending magic link authentication emails.
- [Chromatic](https://chromatic.com) - For hosting Storybook builds and managing UI changes.

## Get started

1. Install

```bash
npm i
```

2. Copy and fill secrets

```bash
cp .env.example .env
```

> `NEXTAUTH_SECRET` can be generated by running `openssl rand -base64 32`

3. Generate the MySQL schema

```bash
npm run db:generate
```

4. Start developing

```bash
# For the next app:
npm run dev
# For the storybook ui:
npm run storybook
```

## Database

To run this app locally you'll need to install MySQL, and optionally the MySQL Workbench:

[https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

## Local network

The `npm run dev` development script is made available on the local IP, so it can be easily be tested on other devices that are connected to the same network.

You can find the local IP by running `ipconfig` (on Windows) in the command line.

```bash
ipconfig
```

Then look for the `Wireless LAN adapter Wi-Fi` section under the `IPv4 Address` section.

Be sure to update the `NEXT_PUBLIC_SITE_URL` in the `.env` file too!

## Object Storage

### Local emulator

I've yet to find a local emulator for s3 compatible object storage, that's currently all that's missing to make this stack a 100% local dev experience.

There are several possible solutions when using Docker, so that may be necessary. However, Docker is currently NOT configured.

### Cloudflare CORS

Cloudflare requires you set CORs rules. These rules can be added in the Cloudflare dashboard under your bucket settings tab.

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "http://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"]
  }
]
```

## Get started

1. Copy and fill secrets

```bash
pnpm i
cp .env.example .env
```

2. Generate the MySQL queries (and run them in your local MySQL server)

```bash
npm run db:generate
```

3. Start developing

```bash
pnpm dev
```

# Service providers

cloudflare
vercel
planetscale
github
mailjet

# Current stack

nextjs
tailwind
eslint/prettier
typescript
mysql
drizzle
tRPC
aws/s3-client

### To add:

jest
gitlab
docker
s3ninja / localstack

### To investigate:

upstash
clerk.com
axiom.co

radix-ui.com
ui.shadcn.com

migrations

##### To do

read clean code
storybook
atomic ui kit
next i18n
next-auth roles (see UserRole type)
page templates
loading states
SEO
boolean names (post.published)
shared validationSchema
nanoid vs cuid
add dates to posts (date formatting)
lightning auth: https://github.com/silencesoft/lightning-next-auth-example

# Install

To run this app entirely on localhost, you'll need to install a few bits and bobs. Docker is currently NOT configured.

### MySQL

https://dev.mysql.com/downloads/

### MySQL Workbench (optional)

https://dev.mysql.com/downloads/

# Env vars

`NEXTAUTH_SECRET` can be generated by running:

```bash
openssl rand -base64 32
```

# CloudFlare

Cors rules must be added (WIP):

```
[
  {
    "AllowedOrigins": [
      "http://localhost:3000"
    ],
    "AllowedMethods": [
      "GET",
      "PUT"
    ],
    "AllowedHeaders": [
      "*"
    ]
  }
]
```

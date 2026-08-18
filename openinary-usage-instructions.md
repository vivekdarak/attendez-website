# Openinary Usage Instructions

Openinary is available at:

```text
https://media.goodtimesco.in
```

Confirmed public test asset:

```text
https://media.goodtimesco.in/t/goodtimesco/hero-image-homepage.webp
```

This URL returns `200 OK` with `Content-Type: image/webp`, so the `/t/...` delivery route is publicly usable.

## URL Syntax

Use path-based transformations:

```text
https://media.goodtimesco.in/t/{transforms}/{bucket-or-folder}/{file}
```

Examples:

```text
Original/default:
https://media.goodtimesco.in/t/goodtimesco/hero-image-homepage.webp

Resize to 800px wide:
https://media.goodtimesco.in/t/w_800/goodtimesco/hero-image-homepage.webp

Resize + WebP:
https://media.goodtimesco.in/t/w_800,f_webp/goodtimesco/hero-image-homepage.webp

Resize + AVIF:
https://media.goodtimesco.in/t/w_800,f_avif/goodtimesco/hero-image-homepage.webp

Resize + quality:
https://media.goodtimesco.in/t/w_800,q_75,f_webp/goodtimesco/hero-image-homepage.webp

Resize + crop:
https://media.goodtimesco.in/t/w_800,h_450,c_fill,f_webp/goodtimesco/hero-image-homepage.webp
```

## Recommended Website Usage

Use a Vite public environment variable for the base URL:

```env
VITE_OPENINARY_BASE_URL=https://media.goodtimesco.in
```

Recommended long-term media domain:

```env
VITE_OPENINARY_BASE_URL=https://media.goodtimesco.in
```

Recommended hero image pattern:

```text
https://media.goodtimesco.in/t/w_1600,q_75,f_webp/goodtimesco/hero-image-homepage.webp
```

Recommended responsive widths:

```text
/t/w_640,q_75,f_webp/goodtimesco/hero-image-homepage.webp
/t/w_960,q_75,f_webp/goodtimesco/hero-image-homepage.webp
/t/w_1280,q_75,f_webp/goodtimesco/hero-image-homepage.webp
/t/w_1600,q_75,f_webp/goodtimesco/hero-image-homepage.webp
/t/w_1920,q_75,f_webp/goodtimesco/hero-image-homepage.webp
```

## What Not To Use

Query parameters were tested and ignored:

```text
?w=800
?width=800
?format=avif
?f=avif
```

Do not use `f_auto` for now. It returned:

```http
Content-Type: image/auto
```

It also produced a much larger file in testing. Use explicit `f_webp` or `f_avif` instead.

## Notes

- `w_800`, `h_450`, `c_fill`, `q_75`, `f_webp`, and `f_avif` are confirmed to be parsed by Openinary.
- The response `ETag` includes parsed transform values, which confirms the path transform syntax is active.
- Current cache header is `Cache-Control: public, max-age=31536000, must-revalidate`.
- For versioned media URLs, `immutable` would be preferable if Openinary or the reverse proxy allows it.
- The tested responses include `X-Ratelimit-*` headers.

## Official Docs Notes

Openinary's docs describe `/t/{transformations}/{path}` as a public media transform endpoint. Browser-facing website images should use this public endpoint and should not include API keys.

Protected API endpoints use:

```http
Authorization: Bearer <api_key>
```

Use an API key for server-side/admin operations such as:

- uploading files with `POST /upload`
- prewarming transformation variants during upload
- listing storage
- deleting files
- invalidating cached variants
- queue/video management
- API key management

Do not expose an Openinary API key in Vite client-side code. Any variable prefixed with `VITE_` is public in the browser.

On this deployment, public delivery and authenticated API routes use different URL prefixes:

```text
Public image delivery:
https://media.goodtimesco.in/t/...

Authenticated API:
https://media.goodtimesco.in/api/...
```

Examples:

```text
GET  https://media.goodtimesco.in/api/storage
POST https://media.goodtimesco.in/api/upload
```

Do not use these API paths for uploads on this deployment:

```text
https://media.goodtimesco.in/upload
https://media.goodtimesco.in/storage
```

Those routes may hit the Openinary web app and redirect to `/login`.

Public routes are rate-limited by Openinary itself, not necessarily Cloudflare. Relevant server env vars from the docs:

```env
PUBLIC_RATE_LIMIT_MAX=100
PUBLIC_RATE_LIMIT_WINDOW_MS=60000
```

The defaults are 100 requests per 60 seconds. Increase these on the Openinary server for production media delivery if needed.

Openinary also supports signed URLs via `API_SECRET` and the `/authenticated/...` route. Use signed URLs only if media transformations need to be restricted. Public SEO images should normally remain on `/t/...` so browsers, crawlers, and social preview bots can fetch them without backend URL signing.

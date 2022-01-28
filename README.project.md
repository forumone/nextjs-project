# <Project Name> [![Build status](<url-from-buildkite)](https://buildkite.com/forum-one/<project-uri>)

## Local URLs

https://js-onboarding.ddev.site/ : WordPress site

https://js-onboarding.ddev.site:3000/ : Next.js app (`svc-next/`) displaying content from WP.

https://js-onboarding.ddev.site:8080/ : Embedded React app (`scv-embed/`) previewed inside static WP content.

## TODO

- Display WP content within the Next page.
- Allow building/depositing embedded app assets into the web container (like gesso).
- Allow build with watch mode for cases where static WP content isn't good enough.

## Development Branch Naming & Workflow

- Always create Feature and Bugfix branches from the `main` branch.
- When needed, create Hotfix branches from `live`.
- Merge, or submit a Pull Request, from Feature/Bugfix/Hotfix branches to `integration` for Development/Integration environment deployments.
- Submit a Pull Request from Feature/Bugfix branches to `main` for QA/Staging environment deployments.
- Submit a Pull Request from Hotfix branches to `live` for Production environment deployments.
- Submit a Pull Request from `main` to `live` for all regular Production releases.

## Project Setup Instructions

To set up the local environment, do the following:

1. Install [`docker`](https://docs.docker.com/install/) and [`docker-compose`](https://docs.docker.com/compose/install/), if not already installed.

2. Install [`DDEV`](https://ddev.readthedocs.io/en/stable/#installation)

3. Clone this repository.
```
git clone [INSERT git repo URL]
```

4. Create a `.env` in the project root directory for local development. See the `.env.local` file for an example. (NOTE: You will need to supply valid license keys and/or download URLS in the *PLUGIN LICENSE KEYS* section for premium plugins to install.)

5. Private Composer repository access.

    1. Get an API Token for the repository.
        - Forum One Developer: Find the "F1 WP Composer Repo Key" entry in Bitwarden for API token.
        - Vendor/Client: Get the API token from your Forum One point of contact.
    2. Create an `auth.json` file in the project root directory.
    3. Enter the access detail into the `auth.json` file.

        ```
        {
            "http-basic": {
                "satispress.forumone.dev": {
                    "username": "<API Token>",
                    "password": "<API Token Password>"
                }
            }
        }
        ```

    4. Confirm the `auth.json` file is listed in the `.gitignore` file in the project root directory to ensure that it doesn’t get committed to the git repository.

6. Run:
```
ddev start
```

7. Install WordPress core and plugins.
```
ddev composer install
```

8. Install theme development dependencies.
```
ddev gesso install
```

9. Retrieve a copy of an environment(Dev/Stage/Live) database and unpack to `./export.sql` The database file can be named anything, but you'll need to know the file name for the next step.

10. Import the database.
```
ddev wp db import export.sql
```

11. Fix local DB URLs.
```
ddev wp search-replace '<environment domain>' '[DDEV Site URL].ddev.site' --all-tables
```

12. Flush the cache.
```
ddev wp cache flush
```

13. Load the environment configuration.
```
ddev wp config pull all
```

## Building/Watching Theme File Changes
1. Build the theme assets.
```
ddev gesso build
```
2. Watch for changes
```
ddev gesso watch
```

## Environments

 * Dev:
 * Stage:
 * Prod:


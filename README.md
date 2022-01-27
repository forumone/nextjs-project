# WordPress Project Template

This is a build guide to help walk you through setting up a new WordPress project.

## Requirements

* [Tiged](https://www.npmjs.com/package/tiged) - `npm install -g tiged`
* [DDev](https://forumone.atlassian.net/wiki/spaces/TECH/pages/2859270145/Installing+DDev)
* [Docker & Docker Compose/Docker Desktop](https://forumone.atlassian.net/wiki/spaces/TECH/pages/2859270145/Installing+DDev#Requirements%3A)

## Getting started...

1. Clone this repository using Tiged/Degit.
```shell
degit --mode=git git@github.com:forumone/wordpress-project.git [project-name]
```
_Note: If you have an issue with that command try without the `--mode=git` option_

2. Initialize the new project as a Git repository.
```shell
cd [project-name]
git init
```
3. Add the git remote for the new repository.
```shell
git remote add origin git@github.com:forumone/[project-name].git
```
6. Please run `ddev config`
* Project name (`[project-name]`): `[project-name]<ENTER>`
* Docroot Location (...): `web<ENTER>`
* Project Type [...]: `wordpress<ENTER>`

5. Go through the rest of the `build process`

## Is this a Forum One hosted project or a Pantheon hosted project?

### Forum One hosted project,

* Rename `.buildkite/pipeline.f1.yml` to `.buildkite/pipeline.yml`.
* Delete `.buildkite/pipeline.pantheon.yml`.
* Delete `.ddev/providers/pantheon.yml`.
* Delete `pantheon.yml` _(**Note**: this must be deleted otherwise univeral hosting setup will incorrectly identify this project as a Pantheon project.)_
* Delete the `web/private` directory.
* Delete Pantheon specific WordPress Plugins from the `composer.json`:
  * `wpackagist-plugin/pantheon-advanced-page-cache`
  * `wpackagist-plugin/pantheon-hud`
  * `wpackagist-plugin/wp-native-php-sessions`

#### Configuring Capistrano

Configuring Capistrano deployments requires editing of the following files:

* `capistrano/deploy.rb`
* `capistrano/deploy/dev.rb`
* `capistrano/deploy/stage.rb`
* `capistrano/deploy/prod.rb`

If additional environments are required you can copy `capistrano/deploy/dev.rb` to a new stage file and make the required changes.

##### `capistrano/deploy.rb`

Configuring the general deployment settings happens in `capistrano/deploy.rb` and requires replacing the
following placeholder tokens in the settings:

###### `APP_NAME`

This is simply a name for the application that will be used as a directory name. Replace it with a relevant
string to be used to identify your application.

###### `HTTPS_REPO_URL`

This should be the HTTPS clone URL for your repo to be deployed. You may access this from the GitHub UI.

##### `capistrano/deploy/<dev|stage|prod>.rb`

The files located at `capistrano/deploy/*.rb` define deployment targets for the application to be released to.
For each environment the application is being deployed to there should be one matching file with the
environment-specific configuration defined. To create a new deployment environment, the
`capistrano/deploy/dev.rb` file may be duplicated and renamed to match the name of the new environment. Then
the same configuration process described below should be followed by customizing each of the following tokens
in the file settings:

###### `stage`

The stage name should match that of the containing file. For example, the `dev.rb` file should set this to `:dev`.

###### `SITE_URL`

This is the URL used to access the site being deployed.

###### `ENVIRONMENT_NAME`

This is the name of the environment's vhost directory where the application will be deployed to. Usually this
is a combination of a short application name followed by the environment name, e.g., `wordpress.dev`. By replacing
this token in the full path, the setting would look like this:

```ruby
# The path to the project on the server
set :deploy_to, '/var/www/vhosts/wordpress.dev'
```

###### `BRANCH`

This is the specific git branch to be deployed to this environment from the repository. Typically these follow the pattern in the following table.

| Environment | Branch        |
| ----------- | ------------- |
| dev         | `integration`   |
| stage       | `main`          |
| prod        | `live`          |

###### `SERVER_LOGIN`

This defines the servers to be deployed to and the logins to be used for access. In most use cases, each
instance of this token will use the same login. An example login would look like:

```ruby
# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
role :app, %w{wordpress@wordpress.byf1.dev}, :primary => true
role :web, %w{wordpress@wordpress.byf1.dev}
role :db,  %w{wordpress@wordpress.byf1.dev}
```

### Pantheon hosted project,

* Rename `.buildkite/pipeline.pantheon.yml` to `.buildkite/pipeline.yml`.
  * Modify the following variables:
    * `.buildkite/pipeline.yml` > `[SSH_REPO_FROM_PANTHEON]`
    * `.buildkite/pipeline.yml` > `[PANTHEON_HOST]`
    * `.ddev/providers/pantheon.yaml` > `[PROJECT.KEY]`, see the instructions in the `pantheon.yml` file.
* Delete `.buildkite/pipeline.f1.yml`.
* Delete the `web/wp-content/config` directory.
* Delete the `capistrano` directory.
* Delete the `Capfile` file
* Delete the `Gemfile` file
* Delete Forum One specific WordPress Plugins from the `composer.json`:
  * `wpackagist-plugin/display-environment-type`

## Is gesso theme going to be used?

### If Yes,

* Please add the latest [Gesso Starter Theme](https://github.com/forumone/gesso-wp) to the `web/wp-content/themes` folder using the latest [GitHub Release] tag.
```shell
cd web/wp-content/themes
degit --mode=git git@github.com:forumone/gesso-wp.git#v<latest release tag> gesso
```

[GitHub Release]:https://github.com/forumone/gesso-wp/releases

### If No,

_Note: If you will be using a theme that will still require a build process then you shouldn't delete the gesso-related files but rename the `gesso` references to `theme`. For example rename `.ddev/docker-compose.gesso.yml` to `.ddev/docker-compose.theme.yml`_

* Delete the following files:
  * `.ddev/docker-compose.gesso.yml`
  * `.ddev/commands/gesso/gesso`
* Edit the following files:
  * `Dockerfile` and delete any references to `gesso`

## Are you using redis?

### If No,

Then please delete the following:

* `.ddev/redis`
* `.ddev/commands/redis`
* `.ddev/docker-compose.redis.yml`
* `"wpackagist-plugin/wp-redis": "*"` from the `composer.json`

### If Yes,

1. Create a new file named `web/wp-content/object-cache.php` that contains the following:
```php
<?php
# This is a Windows-friendly symlink
if ( ! empty( $_ENV['CACHE_HOST'] ) ) {
  require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
}
```
2. Configure the local `.env` file with the following:
```yaml
WP_CACHE=true
CACHE_HOST=redis
CACHE_PORT=6379
CACHE_DB=0
CACHE_PASSWORD=web
WP_CACHE_KEY_SALT=<salt-prefix>
WP_REDIS_USE_CACHE_GROUPS=true
```

#### If you using redis on the pantheon environment.

[Pantheon Redis]:https://pantheon.io/docs/object-cache
Please make the changes referenced for [Pantheon Redis].

## Project README

Remove this `README.md` file and rename the `README.project.md` file to `README.md`. Update the `README.md` with the correct details for your projects. Take note of the Project Name at the top as well as the Buildkite badge setup. _(**Note**: The Buildkite build status badge can be found in the Buildkite pipeline settings online.)_

## Additional optional resources

### Adding composer install upon starting a project

If you want to have Composer run `composer install` every time a project is started, add the following in the `.ddev/config.yaml`. (*NOTE*: This will increase the time it takes to start up a project every time.)

```yaml
hooks:
  post-start:
    - exec: "composer install"
```

### Do you need to include any more branches for multidev on Pantheon?

If yes, that would be done in the `.buildkite/pipeline.yml`

```yaml
branches:
  - match: live
    target: master
  ...
  - match: [branch name on f1 github]
    target: [multi-dev name]
```
```yaml
branches:
  - live
  - main
  - integration
  - [branch name on f1 github]
  plugins:
  ...
```


<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

# Converge
Event registration and management application for [Convergefest](https://convergefest.com). Built with Laravel and React.

## Prerequisite

- [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Environment setup

1. Initialize Environment
```bash
# Run this once to initialize project
# Must run with "bash" until initialized
bash vessel init

# Start vessel
./vessel start
```
2. Ask adminstrator for `.env`

## Useful commands

For more commands, go to [Vessel](https://vessel.shippingdocker.com/docs/everyday-usage/)
```bash
# Use composer
./vessel composer <cmd>

# Artisan commands
./vessel art

# Queue workers
./vessel art queue:work

## Watch for file changes
./vessel yarn watch
```



## Other commands

`mysqldump -u username -p database_to_backup > backup_name.sql`

`scp -r root@0.0.0.0:/path/on/remote/droplet /path/to/my/files`


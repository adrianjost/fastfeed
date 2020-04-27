# <i>Fast</i><b>Feed</b>

A beautiful fast RSS-Reader with modern Webtechnology to improve mobile use on realy slow networks

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=adrianjost/fastfeed)](https://dependabot.com)
[![Dependency Status](https://david-dm.org/adrianjost/fastfeed.svg)](https://david-dm.org/adrianjost/fastfeed)
[![Dependency Status](https://david-dm.org/adrianjost/fastfeed/dev-status.svg)](https://david-dm.org/adrianjost/fastfeed?type=dev)

## /client

`cd ./client`

- Setup: `npm i`
- Development: `npm run dev`
- Build: `npm run build`
  - before running the command, set the following env variables:
    - `API_URL=https://fastfeed.hackedit.de/server`
  - build output is located at `/dist`

## /server

1. create a file at `./server/config.php` and put in your credentials:
```php
<?php
  $db_prefix = "...";
  $db_host = "...";
  $db_user = "..." ;
  $db_pw = "...";
  $db_name = "..." ;
?>
```
2. deploy the `./server` directory

Note: An example database sql file is located at /server/database

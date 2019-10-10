# <i>Fast</i><b>Feed</b>
A beautiful fast RSS-Reader with modern Webtechnology to improve mobile use on realy slow networks

## How to name your branch
#(id of the issue) + title of the issue </br>
e.g. "#1 database is missing" for https://github.com/adrianjost/fastfeed/issues/1

## Client Setup

1. Adjust the Server Path at `inc/js/script.js:274`
1. Adjust the Service Worker Path at `sw.js:6` to the frontend deplyoment url
1. run `sh ./build.sh`
1. deploy the `./dist/client` directory


## Server Setup

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
1. run `sh ./build.sh`
1. deploy the `./dist/server` directory
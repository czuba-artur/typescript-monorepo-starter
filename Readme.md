# Typescript monorepo starter
Use this repository if you need to have an universal way to work with shared Typescript code between Node packages. This repository uses the file protocol to share Typescript code between code bases, so you may have sure that your code will be always type-safe between packages.

## Development mode
You can simply run `docker compose up` command to develop applications locally. This will work with hot-reload (in case of NextJS) and it uses Nodemon (in case of ExpressJS). Every change made in shared directory will be reflected in both code bases (make sure that you fire API request again in case of ExpressJS).

## Production mode
You can run `sh build.sh <image-tag>` to build all images at once. This will copy the shared code to docker images and build image from it. Tag name will have a suffix `api` or `web` for both images (in this example).

## Using this repository in own code base
This is an example repository how to use `file` protocol to share TypeScript code between codebases. You can simply check how it was configured and reuse it in the existing codebase. Or you may act this as a starting point for fresh projects.

You can follow the existing patterns to add more than `shared` package. The `api` package was build using `commonJS`, so without bundling it you may to include required files to the Docker image. If you will use any bundler, then this step may be done in the build step which is missing in case of `api` package. 

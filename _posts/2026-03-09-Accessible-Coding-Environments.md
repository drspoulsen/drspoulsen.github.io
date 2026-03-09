---
layout: post
title: Accessible Coding Environments with Docker, Dev Containers, and GitHub Codespaces
---

*AI disclosure: This post is based off a voice memo by the author that was subsequently edited using Claude Opus 4.6 and manual editing.*

The setup I describe here has become central to how I teach data science, and I want to share it so that others can put it into practice themselves. But first, I want to talk about why we, as educators who ask their students to code, should make the effort. 

## The Ethical Case for Accessible Coding Environments

Many of my students come into class with older technology. Some have loaner laptops that they have to keep trading out and therefore cannot install software on. Some only have a phone or an iPad. Some can only use library or lab computers to do their work. For these students, it is unreasonable and inaccessible to require them to install software in order to do their homework.

Data science education, homework, and code should be accessible first and foremost. This is not a nice-to-have; it is an ethical responsibility. If a student can run and see the results of their code, alter it, and test it -- all without owning their own hardware or going through a complicated installation process -- then we have removed a barrier that can otherwise demotivate and keep students from doing their work.

I have seen firsthand how a botched installation process can take the wind out of a student's sails before they even write their first line of code. The focus should be on getting to work, not fussing with tooling. So, if you are convinced that this is a worthwhile pursuit, let's look into the details of how to do this.

## The Setup: What We Need

I am teaching from Richard McElreath's excellent *Statistical Rethinking* (second edition). Richard has an R package, `rethinking`, that runs on top of R and calls Stan in the background to perform Markov chain Monte Carlo calculations. My course notes are all written in Quarto. So, in order to have our environment ready to go, we need:

1. Base R
2. Quarto
3. Stan (compiled)
4. The `rethinking` package
5. VS Code extensions for R and Quarto

This is a non-trivial installation process. But the good news is that we only have to do it once, and then every student benefits all semester.

## Step 1: Build the Docker Image

The idea is to create a Docker image that has everything installed and configured. A Dockerfile for an environment like this will typically start from a base image that includes R (such as `rocker/rstudio`), then layer on the installations of Quarto, CmdStan, and R packages. The details of compiling Stan are worth noting: CmdStan needs to be compiled in the image, and the `rethinking` package needs to be installed from GitHub since it is not on CRAN. This can take a while to build, but we only do it once.

Once you have your Dockerfile ready, you build the image, tag it for the GitHub Container Registry, and push it:

```bash
docker build -t mat-209-gp06 .
docker tag mat-209-gp06 ghcr.io/washington-college/mat-209-gp06:latest
docker push ghcr.io/washington-college/mat-209-gp06:latest
```

Before pushing, you need to authenticate with the container registry. You can create a Personal Access Token with the `write:packages` scope at [github.com/settings/tokens](https://github.com/settings/tokens), then log in:

```bash
echo $YOUR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

Alternatively, if you build the image using a GitHub Actions workflow, the built-in `GITHUB_TOKEN` can handle authentication for you.

One more thing: by default, newly pushed packages are **private**. If you want Codespaces to be able to pull the image without additional authentication, go to the package settings on GitHub and change its visibility to public.

The image I built and pushed is hosted at:

```
ghcr.io/washington-college/mat-209-gp06:latest
```

## Step 2: The `devcontainer.json` File

With the Docker image built and hosted, we need a `devcontainer.json` file that tells GitHub Codespaces how to set up the environment. This file lives in a `.devcontainer` directory in the repository. Here is the one I use:

```json
{
  "name": "MAT 209 – GP 06 MCMC",
  "image": "ghcr.io/washington-college/mat-209-gp06:latest",

  "remoteUser": "rstudio",

  "customizations": {
    "vscode": {
      "extensions": [
        "REditorSupport.r",
        "REditorSupport.r-markdown",
        "quarto.quarto"
      ],
      "settings": {
        "r.rterm.linux": "/usr/local/bin/R",
        "r.bracketedPaste": true,
        "r.plot.useHttpgd": true,
        "r.plot.defaults.plotWidth": 800,
        "r.plot.defaults.plotHeight": 600
      }
    }
  }
}
```

Let's walk through this. The `"image"` field points to the Docker image we built in Step 1. The `"remoteUser"` is set to `rstudio`, which is the default user in the rocker-based images. Under `"customizations"`, we install VS Code extensions for R, R Markdown, and Quarto so that students have syntax highlighting, code execution, and document rendering out of the box. The `"settings"` block configures R to use `httpgd` for plotting and sets sensible default plot dimensions.

That's it. When a student opens this repository in a Codespace, the Docker image is pulled, the extensions are installed, and the environment is ready.

## Step 3: Prebuilds

There is a catch. Pulling and initializing the Docker image can take upwards of 15 minutes, which is too long. In the spirit of our ethical responsibility to make things accessible, we can do better.

GitHub Codespaces supports *prebuilds*, which do the heavy computation of setting up the environment in advance. To set up a prebuild:

1. Go to the repository **Settings**.
2. In the left sidebar, under **Code and automation**, click **Codespaces**.
3. Click **Set up prebuild**.
4. Select the branch and the dev container configuration.
5. Restrict the region to where your students are located. All of my students access this from the US East region, so I restrict the prebuild to that region.
6. Click **Create**.

This kicks off a GitHub Action that takes about 15 minutes to run. Once it completes, when a student opens a Codespace, the environment is ready within three or so minutes. The heavy lifting has already been done.

## Step 4: GitHub Classroom

With the dev container configured and the prebuild complete, the last step is to create the assignment in GitHub Classroom:

1. First, make your repository a **template repository**. Go to the repository **Settings**, and under **General**, check **Template repository**. This is required for GitHub Classroom to use it as starter code.
2. Go to **GitHub Classroom** and create a new assignment.
3. Select your template repository as the starter code.
4. Choose **GitHub Codespaces** as the supported editor.
5. I tend to make student repositories **private** to respect their privacy.
6. I give students **write access** (not admin access) to their repos.

That's it. When a student accepts the assignment, they get their own copy of the repository, and clicking "Open in Codespace" gives them a fully configured environment with R, Quarto, Stan, and the `rethinking` package -- ready to go.

## Try It Yourself

If you want to see the end result from the student's perspective, I have set up an assignment you can try: [click here to accept the assignment](https://classroom.github.com/a/1vtNlby1). When you click the link, you will be asked to select your name on a roster. Click **Skip this step**. Then, click the **Open in GitHub Codespaces** option. Within a few minutes, you should have a fully configured environment in your browser.

## It Can Be Simpler Than This

I showed you a rather complicated case: compiling Stan and installing a package that is not on CRAN. For many projects, it will not be this complicated. If you are teaching a class where students need to code in Python, you can set up a virtual environment that automatically installs NumPy, Pandas, and Matplotlib. You could install the Microsoft Data Science tools for VS Code. The complexity can be as simple or as involved as your course requires, but the process is the same.

## Why This Matters

By running this setup once, my students are set up all semester to benefit from easy access to a coding environment where they can explore, alter, and run code. As data science instructors, how many times do we tell students to change a parameter and see what happens? In statistics, we might generate synthetic data with a mean of 50, then change it to 75, and check whether the model tracks the change. The only way to build that intuition is to actually change the code and run it yourself.

My view is that we should not necessarily ask our students to write everything from scratch, but instead to alter the code they see, to change what is necessary to accomplish a goal, and to diagnose when the code is not working. An accessible coding environment makes all of this possible, regardless of what hardware a student owns.

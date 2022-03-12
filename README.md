# Gitlab Manager

App that uses [this](https://github.com/ejanerop/gitlab-back.git) API to display the projects inside a group that a user owns in Gitlab, and to remove members from them and from the group.

## Installation

Clone the repository:

```
git clone https://github.com/ejanerop/gitlab-front.git
cd gitlab-front
```

Install dependencies:

```
npm install
```

Modify the environment variables in `enviroments/enviroment.ts` and `enviroments/enviroment.prod.ts`:

```
export const environment = {
  production: false,
  api_url: 'http://localhost:8000/api', // The URL of the Gitlab API
  group_id: '12345678' // The ID of the group that the user owns
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Course Admin – Entra ID RBAC demonstration

The application uses Entra ID for sign-in and demonstrates role-based access control (RBAC): all signed-in users can read courses, while only the `Teacher` app role can create, edit, change status, or delete them.

The UI hides teacher controls for students, but this is not the security boundary. The ASP.NET API verifies the Entra access token and requires `Teacher` for every write endpoint.

## Entra setup

The tenant's sign-in address (`frederick.entra@outlook.com`) is not an identifier that can be used in application configuration. In the Entra admin center, copy the **Directory (tenant) ID** and complete the following.

1. Register an API application, for example `course-tracker-api`.
2. In **Expose an API**, set an Application ID URI (the default `api://<API client ID>` is fine) and create the delegated scope `access_as_user`.
3. In **App roles**, create these roles. Set **Allowed member types** to `Users/Groups`:
   - Display name `Teacher`, value `Teacher`
   - Display name `Student`, value `Student`
4. In **Enterprise applications** for the API, assign the `Teacher` or `Student` role to each demo user/group.
5. Register a second application as a **Single-page application**. Add `http://localhost:5173` as a redirect URI.
6. In the SPA app's **API permissions**, add the API's `access_as_user` delegated permission and grant consent if your tenant requires it.

## Local configuration

Copy `.env.example` to `.env.local` and replace every value. In `CourseTracker.APi/appsettings.Development.json`, add the same tenant ID and the **API app** client ID:

```json
{
  "EntraId": {
    "TenantId": "your-directory-tenant-id",
    "ClientId": "your-api-app-client-id"
  }
}
```

`appsettings.Development.json` is ignored by Git, so IDs can remain local. Do not put secrets in the SPA; this implementation uses the authorization-code flow with PKCE and needs no client secret.

## Run

Start the API from `CourseTracker/CourseTracker.APi` with `dotnet run`, then start the frontend from `course-admin` with `npm run dev`. Sign in through the button in the navigation bar.

For the clearest classroom demo, sign in first as a user assigned `Student`, then as a user assigned `Teacher`. A direct POST/PUT/DELETE request with a student's token receives `403 Forbidden`, even if the frontend is modified.
